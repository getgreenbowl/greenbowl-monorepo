import * as dotenv from 'dotenv';
dotenv.config();
import { unauthorized } from 'proses-response';
import * as jwt from 'jsonwebtoken';

interface config {
  interceptor?: any;
  customErrorHandler?: any;
}

export class Jwtinstance {
  secret: string = process.env['secret'] || 'zxcasdqwemnblkjpoi';
  expiry: string = process.env['expiry'] || '12h';
  currentUser: any;
  private _interCeptor!: any | undefined;
  private _customErrorHandler!: any | undefined;

  constructor({ interceptor, customErrorHandler }: config) {
    this._customErrorHandler = customErrorHandler;
    this._interCeptor = interceptor;
  }

  generateToken = (payload: any): string => {
    return jwt.sign(payload, this.secret);
    // return jwt.sign(payload, this.secret, { expiresIn: this.expiry });
  };

  tokenMiddleWare = (req: any, res: any, next: any) => {
    try {
      const token = req.header('Authorization');

      if (!token) {
        return unauthorized(res, 'Invalid token');
      }

      const decoded: any = jwt.verify(token, this.secret);
      if (this._interCeptor) {
        this._interCeptor(decoded);
      }
      req.user = decoded;
      this.currentUser = decoded;
      next();
    } catch (error) {
      if (this._customErrorHandler) {
        this._customErrorHandler(error);
      } else {
        unauthorized(res, 'token expired');
      }
    }
  };

  decodeToken = (token: any): any => {
    try {
      const decode = jwt.verify(token, this.secret);
      return decode;
    } catch (error) {
      return false;
    }
  };
}
