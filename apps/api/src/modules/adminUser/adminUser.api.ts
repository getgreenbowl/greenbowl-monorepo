// import { Router } from "express";
// import { notFound, other, success, unauthorized } from "proses-response";
// import {
//   v_adminlogin,
//   v_admin_change_password,
//   v_email_picked,
//   v_update_user,
//   v_admin_user as  v_user,
//   v_pagination
// } from "greenbowl-schema";
// import Session from "../../core/middlewares/jwt.middleware";
// import { validate } from "../../core/middlewares/validation.middleware";
// import ah from "../../core/utils/async-handler.util";
// import { checkPassword } from "../../core/utils/password-hash";
// import { sendEmail } from "../../libs/mail-service";
// import { Role } from "../role/models/role.model";
// import { AdminUser } from "./models/adminUser.model";

// const { MakeQuery } = require("../../libs/grid-filter/model-service");

// const AdminUserRouter = Router();

// const _formatPlainUser = (user: any) => {
//   return _Object.exclude(user, ["password"]);
// };

// const randomPassword = (): string => {
//   let result = "";
//   let characters =
//     "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
//   for (let i = 0; i < 8; i++) {
//     result += characters.charAt(Math.floor(Math.random() * characters.length));
//   }
//   return result;
// };

// const adjustMenu = (data: any, parent_id: any) => {
//   if (!data) return;

//   let tempMenu: any = [];

//   data.forEach((ele: any) => {
//     if (ele.parentID === parent_id) {
//       let obj;

//       if (parent_id === null) {
//         obj = {
//           type: "parent",
//           id: ele.id,
//           title: ele.title,
//           icon: ele.icon,
//           link: ele.link,
//           children: adjustMenu(data, ele.id),
//         };
//       } else {
//         obj = {
//           type: "child",
//           id: ele.id,
//           title: ele.title,
//           link: ele.link,
//           icon: ele.icon,
//           parentID: parent_id,
//           children: [],
//         };
//       }

//       tempMenu.push(obj);
//     }
//   });

//   return tempMenu;
// };

// /** role based permited menu */
// const getPermission = (singleMenu: any, permission: any) => {
//   if (!singleMenu.children.length) {
//     return [
//       permission?.[singleMenu?.id]?.["view"],
//       [],
//       permission?.[singleMenu?.id],
//     ];
//   }

//   const children = singleMenu.children
//     .filter((i: any) => permission?.[i.id]?.["view"])
//     .map((j: any) => ({ ...j, permission: permission?.[j.id] }));

//   return [!!children.length, children, null];
// };

// /** return the permission based menu */
// export function permitedMenu(menu: any, permission: any) {
//   const MENU = adjustMenu(menu, null);

//   let tempMenu: any = [];

//   for (let item of MENU) {
//     const [flag, children, perm] = getPermission(item, permission);

//     // console.log(perm, 'this is perm');

//     if (flag) {
//       if (perm) {
//         tempMenu.push({
//           ...item,
//           children,
//           permission: perm,
//         });
//       } else {
//         tempMenu.push({
//           ...item,
//           children,
//         });
//       }
//     }
//   }

//   return tempMenu;
// }

// /**
//  *  menu - if menu/submenu hav view permission then it is in sidebar
//  */
// export const setPermission = function (menu: any, perm: any) {
//   let d = setMenuOfViewPermission(menu, perm);
//   return d;
//   function setMenuOfViewPermission(menu: any, permission: any) {
//     return menu.filter((item: any) => {
//       const basePerm = {
//         view: false,
//         add: false,
//         edit: false,
//         delete: false,
//         disabled: false,
//       };

//       const singlePerm = permission ? permission[item?.id] : basePerm;

//       if (item?.children?.length === 0) {
//         item.permission = singlePerm;
//         return true;
//       } else if (item?.children?.length > 0) {
//         /**if menu have children then recursive call for pemission set in child menu */
//         item.children = setMenuOfViewPermission(item.children, perm);
//         return item.children.length > 0;
//       }
//       return false;
//     });
//   }
// };

// const getForgotPasswordHTML = (password: string) => {
//   return `<p>Your new password for tashan.</p> <br />
//   <b>${password}</b>
//   `;
// };

// AdminUserRouter.post(
//   "/create",
//   validate({ body: v_user }),
//   Session.secure,
//   ah(async (req, res) => {
//     const { email } = v_user.parse(req.body);
//     const exists = await AdminUser.findOne({ where: { email } });

//     if (exists) {
//       const msg = "Email Already Exists";
//       throw other(res, msg);
//     }

//     const newUser = await AdminUser.create({ ...req.body });
//     success(res, newUser, "User created");
//   })
// )
//   .put(
//     "/update/:id",
//     Session.secure,

//     validate({ body: v_update_user }),
//     ah(async (req, res) => {
//       const { email, roleId, password, active } = v_update_user.parse(req.body);
//       if (!req.params.id) {
//         throw other(res, "UserId not found");
//       }
//       if (password) {
//         const details = await AdminUser.update(
//           { email, roleId, password, active },
//           { where: { id: req.params.id } }
//         );
//         success(res, details, "Updated successfully");
//       }
//       const details = await AdminUser.update(
//         { email, roleId, active },
//         { where: { id: req.params.id } }
//       );
//       success(res, details, "Updated successfully");
//     })
//   )
//   .delete(
//     "/delete/:id",
//     Session.secure,
//     ah(async (req, res) => {
//       if (!req.params.id) {
//         throw other(res, "UserId not found");
//       }

//       const deleteUser = await AdminUser.destroy({
//         where: { id: req.params.id },
//       });

//       success(res, deleteUser, "User deleted");
//     })
//   )

//   .get(
//     "/get-all-paginated",
//     Session.secure,

//     validate({ query: v_pagination }),
//     ah(async (req, res) => {
//       const { limit, offset, modelOption, orderBy, attributes } = MakeQuery({
//         query: req.query,
//         Model: AdminUser,
//       });
//       let users = await AdminUser.findAndCountAll({
//         where: modelOption,
//         attributes,
//         order: orderBy,
//         raw: true,
//         limit,
//         offset,
//         include: { model: Role },
//       });

//       success(res, users, "getting all users");
//     })
//   )
//   .get(
//     "/get-by-id/:id",
//     Session.secure,

//     ah(async (req, res) => {
//       if (!req.params.id) {
//         throw other(res, "UserId not found");
//       }

//       const users = await AdminUser.findOne({ where: { id: req.params.id } });

//       success(res, users, "getting user by id.");
//     })
//   )
//   .post(
//     "/login",
//     validate({ body: v_adminlogin }),
//     ah(async (req, res) => {
//       const { email, password } = v_adminlogin.parse(req.body);

//       const user = await AdminUser.findOne({ where: { email, active: 1 } });

//       if (!user) {
//         throw unauthorized(res, "Invalid User");
//       }

//       //wrong password
//       if (!checkPassword(password, user.password)) {
//         throw unauthorized(res, "Invalid password");
//       }

//       const plainUser = _formatPlainUser(user.get({plain: true}));
//       const token = Session.generateToken(plainUser);

//       const data = {
//         token,
//         user: plainUser
//       };
//       success(res, data, "login successfully");
//     })
//   )
//   .post(
//     "/forgot-password",
//     validate({ body: v_email_picked }),
//     ah(async (req, res) => {
//       const { email } = v_email_picked.parse(req.body);

//       const user = await AdminUser.findOne({where: {email}});

//       if (!user) {
//         return notFound(res, "Email Not found");
//       }
//       //generate new password
//       const password = randomPassword();
//       await sendEmail({
//         to: user.email,
//         html: getForgotPasswordHTML(password),
//       });

//       await AdminUser.update({ password }, { where: { email: user.email } });
//       success(res, { email, password }, "successfully changed password");
//     })
//   )
//   .post(
//     "/change-password",
//     Session.secure,

//     validate({ body: v_admin_change_password }),
//     ah(async (req, res) => {
//       const { oldPassword, newPassword } = v_admin_change_password.parse(
//         req.body
//       );
//       const user = await AdminUser.findOne({
//         where: { email: req.user.email },
//       });

//       if (!user) {
//         throw other(res, "Email not found");
//       }

//       //validate password
//       if (!checkPassword(oldPassword, user.password)) {
//         throw other(res, "Incorrect password");
//       }
//       await AdminUser.update(
//         { password: newPassword },
//         { where: { email: req.user.email } }
//       );

//       success(res, null, "successfully changed password");
//     })
//   )
//   .get(
//     "/get-all-active-admin",
//     Session.secure,
//     ah(async (req, res) => {
//       let include = [
//         {
//           model: Role,
//         },
//       ];

//       const role = await AdminUser.findAll({
//         where: { active: 1 },
//         include,
//         raw: true,
//       });

//       success(res, role, "get all active Admin");
//     })
//   );

// export default AdminUserRouter;
