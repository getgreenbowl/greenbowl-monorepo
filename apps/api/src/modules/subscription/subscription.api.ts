import { Router } from 'express';
import { validate } from '../../core/middlewares/validation.middleware';
import { v_subscription } from 'greenbowl-schema';
import ah from '../../core/utils/async-handler.util';
import { Subscription } from './models/subscription.model';
import { success } from 'proses-response';
import { SubscriptionJourney } from './models/subscription-journey.model';
import { UserItems } from '../users/models/user-items.model';
import { Item } from '../items/models/item.model';
import { add, format } from 'date-fns';
import DbConnection from '../../core/db/db';
import Session from '../../core/middlewares/jwt.middleware';
import { User } from '../users/models/user.model';

const SubscriptionRouter = Router();

const getNArray = (n: number) => {
  return Array.from(Array(n).keys());
};

SubscriptionRouter.post(
  '/new',
  validate({
    body: v_subscription
      .omit({ id: true, userID: true, active: true })
      .partial(),
  }),
  ah(async (req, res) => {
    const t = await DbConnection.db.transaction();
    try {
      const payload = req.body;
      const subscription = await Subscription.create(
        {
          ...payload,
          userID: req.user.id,
        },
        { transaction: t }
      );
      const limit = +payload.days;
      const items = await Item.findAll({
        where: { isActive: true },
        attributes: ['id'],
        raw: true,
      });
      const itemsLength = items.length;
      let lunchItems = [];
      let dinnerItems = [];
      if (payload.lunch) {
        lunchItems = getNArray(limit).map((_, index: number) => {
          const random = Math.floor(Math.random() * itemsLength);
          const item = items[random];
          const serveDate = add(new Date(), { days: index + 1 });
          return {
            itemID: item.id,
            userID: req.user.id,
            serveDate: format(serveDate, 'dd-MM-yyyy'),
            mealType: 'lunch',
          };
        });
      }

      if (payload.dinner) {
        dinnerItems = getNArray(limit).map((_, index: number) => {
          const random = Math.floor(Math.random() * itemsLength);
          const item = items[random];
          const serveDate = add(new Date(), { days: index + 1 });

          return {
            itemID: item.id,
            userID: req.user.id,
            serveDate: format(serveDate, 'dd-MM-yyyy'),
            mealType: 'dinner',
          };
        });
      }

      await UserItems.bulkCreate([...lunchItems, ...dinnerItems], {
        transaction: t,
      });
      await t.commit();
      success(res, subscription, 'You are subscribed');
    } catch (error) {
      await t.rollback();
      throw new Error(error);
    }
  })
).get(
  '/',
  ah(async (req, res) => {
    const subscription = await Subscription.findOne({
      where: { userID: req.user.id },
      include: { model: User, attributes: ['weight', 'id'] },
    });

    success(res, subscription, 'user items');
  })
);

export default SubscriptionRouter;
