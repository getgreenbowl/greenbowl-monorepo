import { Application } from "express";
import users from "./users/user.api";
import MenuRouter from "./menu/menu.api";
import RoleRouter from "./role/role.api";
import PermissionRouter from "./role/permission.api";
import NotificationRouter from "./notification/notification.api";


const moduleWrapper = (app: Application) => {
    app
    .use('/users', users)
    .use('/menu', MenuRouter)
    .use('/role', RoleRouter)
    .use('/permission', PermissionRouter)
    .use('/notification', NotificationRouter)
}

export default moduleWrapper