import { CreationOptional, DataTypes, InferAttributes, InferCreationAttributes, Model, Sequelize, WhereOptions } from "sequelize";
import { User } from "./user.model";


export class UserFcm extends Model<InferAttributes<UserFcm>, InferCreationAttributes<UserFcm>> {

  declare id: CreationOptional<number>;
  declare userID: number;
  declare fcmToken: string;


  static async getTokens(where: WhereOptions<UserFcm> = {}) {
    const data = await UserFcm.findAll({where});
    return data.map(d => d.fcmToken);
  }

  static initModel(sequelize: Sequelize): typeof UserFcm {
    UserFcm.init(
      {
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
        fcmToken: {
          type: DataTypes.STRING,
        },
      },
      {
        sequelize,
        timestamps: false,
        indexes: [{ fields: ["userID"], using: "BTREE" }],
      }
    );

    return UserFcm;
  }
}
