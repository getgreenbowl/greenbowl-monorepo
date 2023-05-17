import { DataTypes, Model, Sequelize, Op, WhereOptions, InferAttributes, InferCreationAttributes, CreationOptional } from "sequelize";
import { checkPassword, hashPassword } from "../../../core/utils/password-hash";
import { Role } from "../../role/models/role.model";

export class AdminUser extends Model<InferAttributes<AdminUser>, InferCreationAttributes<AdminUser>> {

  declare id: CreationOptional<number>;
  declare password: string;
  declare email: string;
  declare roleId?: number;
  declare passwordChangedOn?: string;
  declare active: boolean;

  static _attr = ["email", "passwordChangedOn", "roleId", "active",];

  getPlain() {
    return this.get({ plain: true });
  }

  validatePassword(this: AdminUser, userPass: string) {
    return checkPassword(userPass, this.password);
  }

  static findByEmail = (email: string) => {
    return AdminUser.findOne({
      where: { email },
      attributes: this._attr,
    });
  };

  static initModel(sequelize: Sequelize): typeof AdminUser {
    AdminUser.init(
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
            let hash = hashPassword(value);
            this.setDataValue("password", hash);
          },
        },
        roleId: {
          type: DataTypes.INTEGER,
          allowNull: true,
          references: {
            model: Role
          }
        },
        active: {
          type: DataTypes.BOOLEAN,
          defaultValue: false,
        },
        passwordChangedOn: {
          type: DataTypes.STRING,
          allowNull: true
        }
      },
      {
        sequelize,
        timestamps: false,
        indexes: [{ fields: ["email"], using: "BTREE" }],
      }
    );

    return AdminUser;
  }

}

