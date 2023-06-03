import { Router } from "express";
import ah from "../../core/utils/async-handler.util";
import { User } from "./models/user.model";
import { validate } from "../../core/middlewares/validation.middleware";
import { success, unauthorized } from "proses-response";
import { checkPassword } from "../../core/utils/password-hash";
import { _Object } from "dshelpers";
import Session from "../../core/middlewares/jwt.middleware";
import {v_user} from "greenbowl-schema"

const UserRouter = Router();

const _formatPlainUser = (user: any) => {
  return _Object.exclude(user, ["otp", "otpVerified", "password"]);
};

UserRouter.post(
  "/login",
  validate({body: v_user}),
  ah(async (req, res) => {
    const user = await User.findOne({
      where: {
        mobile: req.body.mobile,
        active: true,
      },
      raw: true,
    });
    //invalid mobile number

    if (!user) {
      return unauthorized(res, "Invalid User");
    }

    if (user.active === false) {
      return unauthorized(res, "Invalid User");
    }

    //wrong password
    if (!checkPassword(user.password, req.body.password)) {
      return unauthorized(res, "Invalid password");
    }

    const payload = _formatPlainUser(user);
    const token = Session.generateToken(payload);
    success(res, { token, user: payload }, "login successfully");
  })
);

export default UserRouter;
