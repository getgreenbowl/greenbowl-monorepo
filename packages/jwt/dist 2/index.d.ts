interface config {
    interceptor?: Function;
    customErrorHandler?: Function;
}
declare class Jwtinstance {
    secret: string;
    expiry: string;
    currentUser: any;
    private _interCeptor;
    private _customErrorHandler;
    constructor({ interceptor, customErrorHandler }: config);
    generateToken: (payload: any) => string;
    tokenMiddleWare: (req: any, res: any, next: any) => void;
    decodeToken: (token: any) => any;
}

export { Jwtinstance as default };
