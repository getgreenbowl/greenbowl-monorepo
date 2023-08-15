import DbConnection from 'apps/api/src/core/db/db';
import { G_Model } from 'apps/api/src/types/shared';
import { DAYS, TSubscription } from 'greenbowl-schema';
import { DataTypes } from 'sequelize';
import { UserAddress } from '../../users/models/user-address.model';
import { User } from '../../users/models/user.model';

interface Subscription extends G_Model<Subscription>, TSubscription {}

const _DAYS = DAYS as unknown as string[];

export const Subscription = DbConnection.db.define<Subscription>(
  'Subscription',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      unique: true,
    },
    userID: {
      type: DataTypes.INTEGER,
      references: {
        model: User,
      },
    },
    days: {
      type: DataTypes.ENUM({ values: _DAYS }),
      defaultValue: '7',
    },
    breakfast: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    addressID: {
      type: DataTypes.INTEGER,
      references: {
        model: UserAddress,
        // @ts-ignore
        as: 'userAddress',
      },
    },

    lunch: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    lunchAddressID: {
      type: DataTypes.INTEGER,
      references: {
        model: UserAddress,
        // @ts-ignore
        as: 'lunchAddress',
      },
    },
    dinner: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },

    dinnerAddressID: {
      type: DataTypes.INTEGER,
      references: {
        model: UserAddress,
        // @ts-ignore
        as: 'dinnerAddress',
      },
    },
    active: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  }
);
