import { t_admin_user } from 'greenbowl-schema';
import { DataTypes, Optional } from 'sequelize';
import DbConnection from '../../../core/db/db';
import { hashPassword } from '../../../core/utils/password-hash';
import { G_Model } from '../../../types/shared';

type AdminUserCreationAttributes = Optional<t_admin_user, 'id' | 'active'>;
interface AdminUser extends G_Model<AdminUser>, AdminUserCreationAttributes {}

export const AdminUser = DbConnection.db.define<
  AdminUser,
  AdminUserCreationAttributes
>(
  'AdminUser',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      unique: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      set(this: AdminUser, value: string) {
        const hash = hashPassword(value);
        this.setDataValue('password', hash);
      },
    },
    roleId: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    active: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    passwordChangedOn: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    timestamps: false,
    indexes: [{ fields: ['email'], using: 'BTREE' }],
  }
);
