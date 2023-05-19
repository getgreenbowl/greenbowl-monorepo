import { Router } from "express";
import { other, success, notFound, unauthorized } from "proses-response";
import ah from "../../core/utils/async-handler.util";
import { Role } from "./models/role.model";
import { validate } from "../../core/middlewares/validation.middleware";
import Session from "../../core/middlewares/jwt.middleware";
import { _Object } from "dshelpers";
import { v_add_role, v_pagination, v_params, v_update_role } from "validations";
import { Menu } from "../menu/models/menu.model";
import { Op } from "sequelize";

const { MakeQuery } = require("../../libs/grid-filter/model-service");

const RoleRouter = Router();

export const getRolebyID = (params: any) => {
  return Role.findOne({
    where: {
      id: params.id,
    },
    raw: true,
  });
};

export const getAllActiveMenu = () => {
  return Menu.findAll({
    where: { isActive: 1 },
    raw: true,
    order: [["sequenceNumber", "ASC"]],
  });
};

export const addPermission = (body: any) => {
  const { permission, id } = body;

  return Role.update({ permission }, { where: { id } });
};

//addrole
RoleRouter.post(
  "/add",
  Session.secure,
  
  validate({ body: v_add_role }),
  ah(async (req, res) => {
    const { roleName, active } = v_add_role.parse(req.body);
    const exists = await Role.findOne({ where: { roleName } });

    if (exists) {
      return other(res, "Role Name Already Exists");
    }

    const newRole = await Role.create({
      roleName,
      active,
      createdAt: new Date(),
      createdBy: req.user.id,
    });
    success(res, newRole, "Role added");
  })
)

  .put(
    "/update/:id",
    Session.secure,
    
    validate({ body: v_update_role, params: v_params }),
    ah(async (req, res) => {
      const { roleName, active } = v_update_role.parse(req.body);

      const exists = await Role.findOne({
        where: { roleName, id: {[Op.ne]: req.params.id} },
      });
      if (exists) {
        return other(res, "Role Name Already Exists");
      }

      const role = await Role.update(
        {
          roleName,
          active,
          updatedAt: new Date(),
          modifiedBy: req.user.id,
        },
        {
          where: { id: req.params.id },
        }
      );

      success(res, role, "Role updated successfully");
    })
  )

  .delete(
    "/delete/:id",
    Session.secure,
    ah(async (req, res) => {
      if (!req.params.id) {
        throw other(res, "Id not found");
      }

      const deleteRole = await Role.destroy({
        where: { id: req.params.id },
      });

      success(res, deleteRole, "Role deleted");
    })
  )

  .get(
    "/get-all-paginated",
    Session.secure,
    
    validate({ query: v_pagination }),
    ah(async (req, res) => {
      const { limit, offset, modelOption, orderBy, attributes } = MakeQuery({
        query: req.query,
        Model: Role,
      });

      let roles = await Role.findAndCountAll({
        where: modelOption,
        attributes,
        order: orderBy,
        raw: true,
        limit,
        offset,
        subQuery: false,
      });

      success(res, roles, "get all role");
    })
  )

  .get(
    "/get-by-id/:id",
    Session.secure,
    
    ah(async (req, res) => {
      let role = await getRolebyID(req.params);

      success(res, role, "get role by id");
    })
  )

  .get(
    "/get-all-active-role",
    Session.secure,
    
    ah(async (req, res) => {
      const role = await Role.findAll({ where: { active: 1 } });

      success(res, role, "get all active role");
    })
  );

export default RoleRouter;
