import { CreationOptional, DataTypes, InferAttributes, InferCreationAttributes, Model, Sequelize } from "sequelize";
import { User } from "./user.model";


export class UserOS extends Model<InferAttributes<UserOS>, InferCreationAttributes<UserOS>> {

  declare id: CreationOptional<number>;
  declare userID: number;
  declare os: "android" | "ios";

  /**
   * @description checks and add new os user has logged in from
   * @param userID user id
   * @param os android | ios
   * @returns promise
   */
  static async updateUserOS(existing: any[], os: "android" | "ios", userID: number|undefined) {
    if(!userID) {
      return Promise.resolve('no user id provided')
    }
    if (existing) {
      if (existing.length >= 2) {
        return Promise.resolve("Cannot add more then two os");
      }

      const singleUser = existing[0];
      if (singleUser?.os === os) {
        return Promise.resolve("os already exist");
      }
    }

    return UserOS.create({ userID, os });
  }

  static initModel(sequelize: Sequelize): typeof UserOS {
    UserOS.init(
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
        os: {
          type: DataTypes.ENUM({ values: ["android", "ios"] }),
          defaultValue: "android",
        },
      },
      {
        sequelize,
        timestamps: false,
        indexes: [{ fields: ["userID"], using: "BTREE" }],
      }
    );

    return UserOS;
  }
}
