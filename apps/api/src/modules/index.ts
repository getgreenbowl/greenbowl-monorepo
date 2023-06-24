import { Application } from "express";
import MenuRouter from "./menu/menu.api";
import RoleRouter from "./role/role.api";
import PermissionRouter from "./role/permission.api";
import NotificationRouter from "./notification/notification.api";
import ItemRouter from "./items/items.api";
import UserRouter from "./users/user.api";


const moduleWrapper = (app: Application) => {
    app
    .use('/users', UserRouter)
    .use('/menu', MenuRouter)
    .use('/items', ItemRouter)
    .use('/role', RoleRouter)
    .use('/permission', PermissionRouter)
    .use('/notification', NotificationRouter)
}

export default moduleWrapper