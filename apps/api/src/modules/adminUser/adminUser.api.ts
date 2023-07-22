import { Router } from 'express';
import { validate } from '../../core/middlewares/validation.middleware';
import { v_adminlogin } from 'greenbowl-schema';
import ah from '../../core/utils/async-handler.util';
import { AdminUser } from './models/adminUser.model';
import { success, unauthorized } from 'proses-response';
import { checkPassword } from '../../core/utils/password-hash';
import Session from '../../core/middlewares/jwt.middleware';

const AdminUserRouter = Router();

//     validate({ body: v_adminlogin }),
AdminUserRouter.post(
  '/login',
  validate({ body: v_adminlogin }),
  ah(async (req, res) => {
    const { email, password } = v_adminlogin.parse(req.body);

    const user = await AdminUser.findOne({ where: { email, active: 1 } });

    if (!user) {
      throw unauthorized(res, 'Invalid User');
    }

    //wrong password
    if (!checkPassword(password, user.password)) {
      throw unauthorized(res, 'Invalid password');
    }

    const plainUser = user.get({ plain: true });
    const token = Session.generateToken(plainUser);

    const data = {
      token,
      user: plainUser,
    };
    success(res, data, 'login successfully');
  })
);

export default AdminUserRouter;
