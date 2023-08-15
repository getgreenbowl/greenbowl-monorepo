import { Application } from 'express';
import MenuRouter from './menu/menu.api';
import NotificationRouter from './notification/notification.api';
import ItemRouter from './items/items.api';
import UserRouter from './users/user.api';
import AdminUserRouter from './adminUser/adminUser.api';
import IngredientsRouter from './ingredients/ingredients.api';
import UserAddressRouter from './users/user-address.api';
import Session from '../core/middlewares/jwt.middleware';
import SubscriptionRouter from './subscription/subscription.api';

const moduleWrapper = (app: Application) => {
  app
    .use('/user', UserRouter)
    .use(Session.secure)
    .use('/menu', MenuRouter)
    .use('/ingredient', IngredientsRouter)
    .use('/items', ItemRouter)
    .use('/notification', NotificationRouter)
    .use('/admin-user', AdminUserRouter)
    .use('/user-address', UserAddressRouter)
    .use('/subscription', SubscriptionRouter);
};

export default moduleWrapper;
