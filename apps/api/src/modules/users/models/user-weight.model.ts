import DbConnection from 'apps/api/src/core/db/db';
import { G_Model } from 'apps/api/src/types/shared';
import { TUserWeight } from 'greenbowl-schema';
import { DataTypes, Optional } from 'sequelize';

type UserWeightCreationAttributes = Optional<TUserWeight, 'id'>;
interface UserWeight
  extends G_Model<UserWeight>,
    UserWeightCreationAttributes {}

export const User = DbConnection.db.define<
  UserWeight,
  UserWeightCreationAttributes
>(
  'UserWeight',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      unique: true,
    },
    weight: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    userID: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    createdAt: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    timestamps: false,
    indexes: [{ fields: ['userID'], using: 'BTREE' }],
  }
);
