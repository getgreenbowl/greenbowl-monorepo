import { _Object } from "dshelpers";
import { Router } from "express";
// import ax from "axios"
import moment from "moment";
import { other, success, unauthorized } from "proses-response";
import { Op, Sequelize } from "sequelize";
import {
  v_change_password, v_forgot_password, v_login,
  v_mobile_picked, v_otp,
  v_pagination, v_params, v_params_check_email, v_params_check_mobile, v_register,
  v_update_info,
  v_userInfo, v_user_params, v_user_query
} from "validations";
import DbConnection from "../../core/db/db";
import InfoLogger from "../../core/logger/info-logger";
import Session from "../../core/middlewares/jwt.middleware";
import { validate } from "../../core/middlewares/validation.middleware";
import ah from "../../core/utils/async-handler.util";
import { GLOBAL_CONSTANTS } from "../../core/utils/global-constants.util";
import { checkPassword } from "../../core/utils/password-hash";
import { sendEmail } from "../../libs/mail-service";
import { UserFcm } from "./models/user-fcmToken.model";
import { UserOS } from "./models/user-os.model";
import { User } from "./models/user.model";

const { MakeQuery } = require("../../libs/grid-filter/model-service");

const UserRouter = Router();

const InitialOffer = () => {
  const todaysDate = new Date();
  let date = todaysDate.setMonth(todaysDate.getMonth() + 2);
  return new Date(date);
};

const generateOTP = () => {
  return Math.floor(1000 + Math.random() * 9000);
};

const _formatPlainUser = (user: any) => {
  return _Object.exclude(user, ["otp", "otpVerified", "password"]);
};

const randomPassword = (): string => {
  let result = "";
  let characters = "0123456789";
  for (let i = 0; i < 6; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
};

const whitespaceChars = [
  " ",
  "@",
  "/",
  "]",
  "[",
  "?",
  "<",
  "~",
  "#",
  "!",
  "$",
  "%",
  "^",
  "&",
  "*",
  "(",
  ")",
  "+",
  "=",
  "}",
  "|",
  ":",
  ";",
  "'",
  "`",
  ">",
];
function userNameValidation(s: string) {
  return !whitespaceChars.some((char) => s.includes(char));
}

function mobileNumberValidation(s: string) {
  return !whitespaceChars.some((char) => s.includes(char));
}

const getOTP_HTML = (otp: number) => {
  return `<p>Your new otp for tashan.</p> <br />
  <b>${otp}</b>
  `;
};

const getPassword_HTML = (password: string) => {
  return `<p>Your new password for tashan.</p> <br />
  <b>${password}</b>
  `;
};

//register schema
UserRouter.post(
  "/register",
  validate({ body: v_register }),
  ah(async (req, res) => {
    const { email, mobile, countryID } = v_register.parse(req.body);

    const exists = await User.findOne({
      where: { [Op.or]: [{ email }, { mobile }] },
    });

    if (exists) {

      return other(res, 'msg');
    }

    const otp = generateOTP();

    if (countryID !== GLOBAL_CONSTANTS.Country.India) {
      await sendEmail({
        to: email,
        html: getOTP_HTML(otp),
      });
      const newUser = await User.create({ ...req.body, otp, active: true });
      success(res, { user: newUser, otp }, "User registered");
    } else {
      const newUser = await User.create({ ...req.body, otp, active: true });
      success(res, { user: newUser, otp }, "User registered");
    }
  })
)
  .post(
    "/verify-otp",
    validate({ body: v_otp }),
    ah(async (req, res) => {
      const t = await DbConnection.db.transaction();

      try {
        const { mobile, otp, os } = req.body;

        const user = await User.fo_withOS({ mobile });
        if (!user) {
          throw other(res, "User not found");
        }
        if (!user.verifyOTP(otp)) {
          throw other(res, "Invalid otp");
        }
        await user.updateOtpVerified(mobile);

        if (req.body.fcmToken) {
          await UserFcm.findOrCreate({
            where: { fcmToken: req.body.fcmToken, userID: user.id },
            defaults: {
              fcmToken: req.body.fcmToken,
              userID: user.id,
            },
          });
        }


        const plainUser = _formatPlainUser(user.getPlain());
        const payload = {
          ...plainUser
        };

        await UserOS.updateUserOS(plainUser.UserOs, os, user.dataValues.id);
        const token = Session.generateToken(payload);

        await t.commit();
        success(res, { token, user: payload }, "otp verified");
      } catch (err) {
        await t.rollback();
        throw err;
      }
    })
  )
  .post(
    "/login",
    validate({ body: v_login }),
    ah(async (req, res) => {
      const user = await User.fo_withOS({
        mobile: req.body.mobile,
        active: true,
      });
      //invalid mobile number

      if (!user) {
        return unauthorized(res, "Invalid User");
      }

      if (user.active === false) {
        return unauthorized(res, "Invalid User");
      }

      //wrong password
      if (!user.validatePassword(req.body.password)) {
        return unauthorized(res, "Invalid password");
      }

      //otp verification
      if (!user.otpVerified) {
        return other(res, "otp not verified");
      }

      if (req.body.fcmToken) {
        await UserFcm.findOrCreate({
          where: { fcmToken: req.body.fcmToken, userID: user.id },
          defaults: {
            fcmToken: req.body.fcmToken,
            userID: user.id,
          },
        });
      }

      const plainUser = _formatPlainUser(user.getPlain());

      await UserOS.updateUserOS(
        plainUser.UserOs,
        req.body.os,
        user.dataValues.id
      );
      const payload = { ...plainUser };
      const token = Session.generateToken(payload);
      const refreshToken = Session.generateToken({ id: plainUser.id });
      success(
        res,
        { token, user: payload, refreshToken },
        "login successfully"
      );
    })
  )
  .put(
    "/edit-profile",
    Session.secure,
    validate({ body: v_update_info }),
    ah(async (req, res) => {
      const { email, mobile } = v_update_info.parse(req.body);

      const exists = await User.findOne({
        where: {
          [Op.or]: [{ email }, { mobile }],
          id: { [Op.ne]: req.user.id },
        },
      });

      if (exists) {
        const msg: string = `${
          email === exists.email
            ? "Email"
            : mobile === exists.mobile
            ? "Mobile"
            : "UserName"
        } exists`;
        return other(res, msg);
      }

      const [result] = await User.update(
        { ...req.body },
        { where: { id: req.user.id } }
      );
      if (result) {
        return success(
          res,
          { updateUser: result, user: req.body },
          "User Info Updated"
        );
      }
      success(res, { user: result }, "Already Updated");
    })
  )
  .post(
    "/forgot-password",
    validate({ body: v_forgot_password }),
    ah(async (req, res) => {
      const body = v_forgot_password.parse(req.body);
      const password = randomPassword();

      InfoLogger.write({ type: "forget password", body });

      if (body.mobile) {
        const user = await User.findByMobile(body.mobile);

        //invalid mobile-No.
        if (!user) {
          return other(res, "mobile number not found");
        }

        //generate new password
        await User.update({ password }, { where: { mobile: user.mobile } });
        success(
          res,
          { mobile: body.mobile, password },
          "successfully changed password"
        );
      }
      if (body.email) {
        const user = await User.findByEmail(body.email);

        //invalid email-Id.
        if (!user) {
          return other(res, "email not found");
        }

        await sendEmail({
          to: body.email,
          html: getPassword_HTML(password),
        });

        //generate new password
        await User.update({ password }, { where: { email: user.email } });
        success(
          res,
          { email: body.email, password },
          "successfully changed password"
        );
      }
    })
  )
  .post(
    "/change-password",
    Session.secure,
    validate({ body: v_change_password }),
    ah(async (req, res) => {
      const { oldPassword, newPassword } = v_change_password.parse(req.body);
      const user = await User.findOne({ where: { mobile: req.user.mobile } });

      if (!user) {
        return other(res, "user not found");
      }

      //validate password
      if (!checkPassword(oldPassword, user.password)) {
        return other(res, "Incorrect password");
      }
      await User.update(
        { password: newPassword },
        { where: { mobile: req.user.mobile } }
      );
      success(res, null, "successfully changed password");
    })
  )
  .post(
    "/resend-otp",
    validate({ body: v_mobile_picked }),
    ah(async (req, res) => {
      const { mobile } = v_mobile_picked.parse(req.body);
      const user = await User.findByMobile(mobile);

      if (!user) {
        return other(res, "User not found");
      }

      const otp = generateOTP();
      await User.update({ otp }, { where: { mobile } });
      success(res, { mobile, otp }, "OTP Sent");
    })
  )
  .get(
    "/get-all-user-paginated",
    Session.secure,
    
    validate({ query: v_pagination }),
    ah(async (req, res) => {
      const { limit, offset, modelOption, orderBy, attributes } = MakeQuery({
        query: req.query,
        Model: User,
      });

      let users = await User.findAndCountAll({
        where: modelOption,
        attributes,
        order: orderBy,
        // raw: true,
        limit,
        offset,
        subQuery: false,
        include: [{ model: UserOS }],
      });


      success(res, { rows: users }, "getting all users");
    })
  )
  .delete(
    "/logout",
    Session.secure,
    ah(async (req, res) => {
      let token = await UserFcm.destroy({ where: { id: req.user.id } });
      success(res, token, "fcmToken removed");
    })
  )
  .get(
    "/get-by-id/:id",
    Session.secure,
    
    validate({ params: v_params }),
    ah(async (req, res) => {
      const user = await User.findOne({
        where: { id: req.params.id }
      });
      success(res, user, "getting user by id.");
    })
  )
  .get(
    "/register-users/:datatype",
    Session.secure,
    
    validate({ query: v_user_query, params: v_user_params }),
    ah(async (req, res) => {
      let todaysDate = new Date();
      const { year, month } = v_user_query.parse(req.query);

      //getting yearly user
      if (req.params.datatype === "yearly") {
        let YearlyUserCount = await User.count({
          where: {
            createdAt: { [Op.substring]: year },
          },
          attributes: [
            [Sequelize.fn("MONTH", Sequelize.col("createdAt")), "month"],
          ],
          group: ["month"],
        });
        let monthlyCount = YearlyUserCount.map((d) => d.month);
        for (let i = 1; i <= 12; i++) {
          if (!monthlyCount.includes(i)) {
            YearlyUserCount.push({
              month: i,
              count: 0,
            });
          }
        }
        YearlyUserCount.sort((a, b) => {
          //@ts-ignore
          return new Date(a.month) - new Date(b.month);
        });
        success(res, YearlyUserCount, "getting yearly user count");
      }

      //getting monthly user
      if (req.params.datatype === "monthly") {
        let monthlyUserCount = await User.count({
          where: {
            createdAt: { [Op.substring]: `${year}-${month}%` },
          },
          attributes: [
            [Sequelize.fn("DAY", Sequelize.col("createdAt")), "day"],
          ],
          group: ["day"],
        });
        if (year && month) {
          let monthCount = monthlyUserCount.map((d) => d.day);
          let lastDay = new Date(+year, +month, 0);
          for (let i = 1; i <= lastDay.getDate(); i++) {
            if (!monthCount.includes(i)) {
              monthlyUserCount.push({
                day: i,
                count: 0,
              });
            }
          }
          monthlyUserCount.sort((a, b) => {
            //@ts-ignore
            return new Date(a.day) - new Date(b.day);
          });
        }

        success(res, monthlyUserCount, "getting monthly user count");
      }

      //getting weekly user
      if (req.params.datatype === "weekly") {
        let UserCount = await User.count({
          where: {
            createdAt: {
              [Op.between]: [moment().subtract(7, "day").toDate(), todaysDate],
            },
          },
          attributes: [
            [Sequelize.fn("Date", Sequelize.col("createdAt")), "date"],
            [Sequelize.fn("weekday", Sequelize.col("createdAt")), "weekday"],
          ],
          group: ["date"],
        });

        //  let weekdays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
        let week = UserCount.map((d) => d.weekday);
        for (let i = 0; i < 7; i++) {
          if (!week.includes(i)) {
            let dayOfWeek = i;
            let date = moment().subtract(7, "day").toDate();
            date.setDate(
              date.getDate() + ((dayOfWeek + 7 - date.getDay()) % 7)
            );
            date.setDate(date.getDate() + 1);
            let getDate = date.toISOString().split("T");
            UserCount.push({
              date: getDate[0],
              weekday: i,
              count: 0,
            });
          }
        }
        //@ts-ignore
        let countPerDate = UserCount.sort((a, b) => {
          //@ts-ignore
          return new Date(a.date) - new Date(b.date);
        });
        success(res, countPerDate, "getting weekly user count");
      }
    })
  )
  .get(
    "/check-mobile/:mobile",
    validate({ params: v_params_check_mobile }),
    ah(async (req, res) => {
      //validate mobile
      const validate = mobileNumberValidation(req.params.mobile);
      if (!validate) {
        return other(res, "mobile number should not contain space, @, /");
      }
      const mobileExist = await User.findOne({
        where: { mobile: req.params.mobile },
      });

      if (mobileExist) {
        return other(res, "Mobile number already exist");
      }

      success(res, req.params.mobile, "Mobile number available");
    })
  )

  .get(
    "/check-email/:email",
    validate({ params: v_params_check_email }),
    ah(async (req, res) => {
      const emailExist = await User.findOne({
        where: { email: req.params.email },
      });

      if (emailExist) {
        return other(res, "Email already exist");
      }

      success(res, req.params.email, "Email available");
    })
  );

export default UserRouter;
