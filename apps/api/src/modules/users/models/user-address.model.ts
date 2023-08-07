import DbConnection from 'apps/api/src/core/db/db';
import { G_Model } from 'apps/api/src/types/shared';
import { TUserAddress } from 'greenbowl-schema';
import { DataTypes, Optional } from 'sequelize';
import { User } from './user.model';

type UserAddressCreationAttributes = Optional<TUserAddress, 'id'>;
interface UserAddress
  extends G_Model<UserAddress>,
    UserAddressCreationAttributes {}

export const UserAddress = DbConnection.db.define<
  UserAddress,
  UserAddressCreationAttributes
>('UserAddress', {
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
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  address: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  pinCode: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});
