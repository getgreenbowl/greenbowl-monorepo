import DbConnection from 'apps/api/src/core/db/db';
import { G_Model } from 'apps/api/src/types/shared';
import { DataTypes } from 'sequelize';
import { User } from './user.model';
import { TUserItem } from 'greenbowl-schema';
import { Item } from '../../items/models/item.model';

interface UserItems extends G_Model<UserItems>, TUserItem {}

export const UserItems = DbConnection.db.define<UserItems>('UserItems', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    unique: true,
  },
  userID: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: User,
    },
  },
  itemID: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Item,
    },
  },
  serveDate: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  skip: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
});
