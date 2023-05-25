import { Application } from "express";
import users from "./users/user.api";
import MenuRouter from "./menu/menu.api";
import RoleRouter from "./role/role.api";
import PermissionRouter from "./role/permission.api";
import NotificationRouter from "./notification/notification.api";
import ItemRouter from "./items/items.api";


const moduleWrapper = (app: Application) => {
    app
    .use('/users', users)
    .use('/menu', MenuRouter)
    .use('/items', ItemRouter)
    .use('/role', RoleRouter)
    .use('/permission', PermissionRouter)
    .use('/notification', NotificationRouter)
}

export default moduleWrapper