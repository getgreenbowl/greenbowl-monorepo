import { Router } from "express";
import { success } from "proses-response";
import {
  v_notification,
  v_pagination,
  v_params,
  v_params_create_status,
  v_params_update_status,
} from "validations";
import Session from "../../core/middlewares/jwt.middleware";
import { validate } from "../../core/middlewares/validation.middleware";
import ah from "../../core/utils/async-handler.util";
import { AdminUser } from "../adminUser/models/adminUser.model";
import { Notification } from "./models/notification.model";
import { Op } from "sequelize";

const { MakeQuery } = require("../../libs/grid-filter/model-service");

const NotificationRouter = Router();

NotificationRouter.post(
  "/create/:status",
  Session.secure,
  
  validate({ body: v_notification, params: v_params_create_status }),
  ah(async (req, res) => {
    const { title, description, active } = v_notification.parse(req.body);
    const notification = await Notification.create({
      title,
      description,
      active,
      createdBy: req.user.id,
      status: req.params.status,
    });

    if (req.params.status === "Sent") {
      await Notification.sendNotification({
        title,
        body: description,
      });
    }

    success(res, notification, "Notification created");
  })
)
  .put(
    "/update/:status/:id",
    Session.secure,
    
    validate({ body: v_notification, params: v_params_update_status }),
    ah(async (req, res) => {
      const { title, description, active } = v_notification.parse(req.body);

      const notification_update = await Notification.update(
        {
          title,
          description,
          active,
          status: req.params.status,
        },
        {
          where: { id: req.params.id },
        }
      );

      if (req.params.status === "Sent") {
        await Notification.sendNotification({
          title,
          body: description,
        });
      }

      success(res, notification_update, "notification updated");
    })
  )

  .put(
    "/update/:id",
    Session.secure,
    
    validate({ body: v_notification, params: v_params }),
    ah(async (req, res) => {
      const { title, description, active } = v_notification.parse(req.body);

      const notificationUpdate = await Notification.update(
        {
          title,
          description,
          active,
        },
        {
          where: { id: req.params.id },
        }
      );

      success(res, notificationUpdate, "notification updated");
    })
  )
  .get(
    "/get-notification-by-id/:id",
    Session.secure,
    
    validate({ params: v_params }),
    ah(async (req, res) => {
      let color = await Notification.findOne({
        where: { id: req.params.id },
      });
      success(res, color, "successfully getting notification");
    })
  )
  .get(
    "/get-all",
    Session.secure,
    ah(async (_, res) => {
      let notification = await Notification.findAll();
      success(res, notification, "getting all notification");
    })
  )
  .get(
    "/get-paginated-list",
    Session.secure,
    
    validate({ query: v_pagination }),
    ah(async (req, res) => {
      const { limit, offset, modelOption, orderBy, attributes } = MakeQuery({
        query: req.query,
        Model: Notification,
      });

      modelOption.push({ notifType: null });

      let notification = await Notification.findAndCountAll({
        where: modelOption,
        attributes,
        order: orderBy,
        raw: true,
        limit,
        offset,
        subQuery: false,
        include: [{ model: AdminUser }],
      });
      success(res, notification, "getting all paginated notification");
    })
  )
  .get(
    "/my-notification",
    Session.secure,
    ah(async (req, res) => {
      const notification = await Notification.findAll({
        order: [["id", "DESC"]],
        where: {
          [Op.or]: [
            { userID: req.user.id, active: 1 },
            { notifType: null, active: 1 },
          ],
        },
      });
      success(res, notification, "user notification");
    })
  );

export default NotificationRouter;
