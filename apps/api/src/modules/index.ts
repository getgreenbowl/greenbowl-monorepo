import { Application } from "express";
import MenuRouter from "./menu/menu.api";
import RoleRouter from "./role/role.api";
import PermissionRouter from "./role/permission.api";
import NotificationRouter from "./notification/notification.api";
import ItemRouter from "./items/items.api";
import UserRouter from "./users/user.api";
import AdminUserRouter from "./adminUser/adminUser.api";


const moduleWrapper = (app: Application) => {
    app
    .use('/user', UserRouter)
    .use('/menu', MenuRouter)
    .use('/items', ItemRouter)
    .use('/role', RoleRouter)
    .use('/permission', PermissionRouter)
    .use('/notification', NotificationRouter)
    .use('/admin-user', AdminUserRouter)
}

export default moduleWrapper