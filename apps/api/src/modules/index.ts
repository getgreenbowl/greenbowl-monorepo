import { Application } from "express";
import users from "./users/user.api";
import MenuRouter from "./menu/menu.api";
import ItemRouter from "./item/item.api";
import IngredientsRouter from "./ingredients/ingredients.api";
// import RoleRouter from "./role/role.api";
// import PermissionRouter from "./role/permission.api";
// import NotificationRouter from "./notification/notification.api";


const moduleWrapper = (app: Application) => {
    app
    .use('/users', users)
    .use('/menu', MenuRouter)
    .use('/items', ItemRouter)
    .use('/ingredients', IngredientsRouter)
    // .use('/role', RoleRouter)
    // .use('/permission', PermissionRouter)
    // .use('/notification', NotificationRouter)
}

export default moduleWrapper