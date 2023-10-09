import { Router } from 'express';
import ah from '../../core/utils/async-handler.util';
import { User } from './models/user.model';
import { validate } from '../../core/middlewares/validation.middleware';
import { other, success } from 'proses-response';
import { checkPassword } from '../../core/utils/password-hash';
import Session from '../../core/middlewares/jwt.middleware';
import { v_user } from 'greenbowl-schema';
import { ModelOptions } from '../../libs/list-filter';
import { Cacher } from '../../core/middlewares/cache.middleware';
import { Cache } from '../../core/cache/cache-model';
import { SubscriptionJourney } from '../subscription/models/subscription-journey.model';
import { UserItems } from './models/user-items.model';
import { getDay, parseISO } from 'date-fns';
import { Item } from '../items/models/item.model';
import { Subscription } from '../subscription/models/subscription.model';

const UserRouter = Router();

const _formatPlainUser = (user: any) => {
  return {};
};

const clearUserCache = () => {
  Cache.clearCacheByGroup('user-list');
};

UserRouter.post(
  '/login',
  validate({ body: v_user.pick({ mobile: true, password: true }) }),
  ah(async (req, res) => {
    // DbConnection.db.query('DELETE FROM UserItems').then(() => {
    //   console.log('table dropped');
    // });

    const user = await User.findOne({
      where: {
        mobile: req.body.mobile,
        active: true,
      },
      raw: true,
    });

    //invalid mobile number
    if (!user) {
      return other(res, 'No user found');
    }

    //wrong password
    if (!checkPassword(req.body.password, user.password)) {
      return other(res, 'Invalid password');
    }

    const subscription = await Subscription.findOne({
      where: { userID: user.id },
    });

    const { password, ...payload } = user;
    const token = Session.generateToken(payload);
    success(res, { token, user: payload, subscription }, 'login successfully');
  })
);

UserRouter.post(
  '/register',
  validate({ body: v_user.pick({ mobile: true, name: true, password: true }) }),
  ah(async (req, res) => {
    const [user, created] = await User.findOrCreate({
      where: { mobile: req.body.mobile },
      defaults: req.body,
    });

    if (!created) {
      return other(res, 'User already exists');
    }
    clearUserCache();
    success(res, user, 'Registration successful');
  })
);

UserRouter.get(
  '/list',
  Cacher.cache('user-list'),
  ModelOptions.build(),
  ah(async (req, res) => {
    const users = await User.findAndCountAll(req.modelOptions);
    success(res, users, 'Users list');
  })
);

UserRouter.get(
  '/my-meals',
  Session.secure,
  ah(async (req, res) => {
    const _meals = await UserItems.findAll({
      where: { delivered: 0 },
      include: [{ model: Item }],
      limit: 7,
    });
    const meals = _meals.map((m) => m.get({ plain: true }));

    const result = meals.map((meal: any) => {
      return {
        ...meal,
        day: getDay(parseISO(meal.serveDate)),
      };
    });
    success(res, result, 'users meals');
  })
);

UserRouter.put(
  '/update-weight',
  Session.secure,
  validate({ body: v_user.pick({ weight: true }) }),
  ah(async (req, res) => {
    const [result] = await User.update(
      { weight: req.body.weight },
      { where: { id: req.user.id } }
    );
    success(res, result, 'weight updated');
  })
);

export default UserRouter;
