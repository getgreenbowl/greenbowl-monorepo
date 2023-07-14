import { Router } from "express";
import ah from "../../core/utils/async-handler.util";
import { User } from "./models/user.model";
import { validate } from "../../core/middlewares/validation.middleware";
import { other, success } from "proses-response";
import { checkPassword } from "../../core/utils/password-hash";
import Session from "../../core/middlewares/jwt.middleware";
import { v_user } from "greenbowl-schema";

const UserRouter = Router();

const _formatPlainUser = (user: any) => {
  return {};
};

UserRouter.post(
  "/login",
  validate({ body: v_user.pick({ mobile: true, password: true }) }),
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
      return other(res, "No user found");
    }

    if (user.active === false) {
      return other(res, "No user found");
    }

    //wrong password
    if (!checkPassword(req.body.password, user.password)) {
      return other(res, "Invalid password");
    }

    const payload = _formatPlainUser(user);
    const token = Session.generateToken(payload);
    success(res, { token, user: payload }, "login successfully");
  })
);

UserRouter.post(
  "/register",
  validate({ body: v_user.pick({ mobile:true, name: true, password: true }) }),
  ah(async (req, res) => {
    const [user, created] = await User.findOrCreate({
      where: { mobile: req.body.mobile },
      defaults: req.body,
    });


    if (!created) {
      return other(res, "User already exists");
    }

    success(res, user, "Registration successful");
  })
);

export default UserRouter;
