import { Router } from 'express';
import { validate } from '../../core/middlewares/validation.middleware';
import { v_subscription } from 'greenbowl-schema';
import ah from '../../core/utils/async-handler.util';
import { Subscription } from './models/subscription.model';
import { success } from 'proses-response';
import { SubscriptionJourney } from './models/subscription-journey.model';
import { UserItems } from '../users/models/user-items.model';
import { Item } from '../items/models/item.model';
import { add } from 'date-fns';
import DbConnection from '../../core/db/db';

const SubscriptionRouter = Router();

const getNArray = (n: number) => {
  return Array.from(Array(n).keys());
};

SubscriptionRouter.post(
  '/new',
  validate({
    body: v_subscription.omit({ id: true, userID: true, active: true }),
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
        limit: 30,
      });
      const itemsLength = items.length;
      const userItems = getNArray(limit).map((_, index: number) => {
        const random = Math.floor(Math.random() * itemsLength);
        const item = items[random];
        return {
          itemID: item.id,
          userID: req.user.id,
          serveDate: add(new Date(), { days: index + 1 }),
        };
      });

      await UserItems.bulkCreate(userItems, { transaction: t });
      await t.commit();
      success(res, subscription, 'You are subscribed');
    } catch (error) {
      await t.rollback();
      throw new Error(error);
    }
  })
)
  .post(
    '/update-journey',
    validate({
      body: v_subscription.omit({ id: true, userID: true, active: true }),
    }),
    ah(async (req, res) => {
      const payload = { ...req.body, userID: req.user.id };
      const [_, created] = await SubscriptionJourney.findOrCreate({
        where: { userID: req.user.id },
        defaults: payload,
      });

      if (!created) {
        await SubscriptionJourney.update(payload, {
          where: { userID: req.user.id },
        });
      }

      success(res, null, 'subscription journey updated');
    })
  )
  .get(
    '/get-journey',
    ah(async (req, res) => {
      const journey = await SubscriptionJourney.findOne({
        where: { userID: req.user.id },
      });
      success(res, journey, 'User journey');
    })
  );

export default SubscriptionRouter;
