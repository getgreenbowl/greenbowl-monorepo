import { Application } from 'express';
import MenuRouter from './menu/menu.api';
import NotificationRouter from './notification/notification.api';
import ItemRouter from './items/items.api';
import UserRouter from './users/user.api';
import AdminUserRouter from './adminUser/adminUser.api';
import IngredientsRouter from './ingredients/ingredients.api';
import UserAddressRouter from './users/user-address.api';

const moduleWrapper = (app: Application) => {
  app
    .use('/user', UserRouter)
    .use('/menu', MenuRouter)
    .use('/ingredient', IngredientsRouter)
    .use('/items', ItemRouter)
    .use('/notification', NotificationRouter)
    .use('/admin-user', AdminUserRouter)
    .use('/user-address', UserAddressRouter);
};

export default moduleWrapper;
