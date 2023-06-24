import { TUser } from "greenbowl-schema";
import {
  DataTypes, Optional
} from "sequelize";
import DbConnection from "../../../core/db/db";
import { hashPassword } from "../../../core/utils/password-hash";
import { G_Model } from "../../../types/shared";

type UserCreationAttributes = Optional<TUser, 'id'>;
interface User extends G_Model<User>, UserCreationAttributes {}

export const User = DbConnection.db.define<User, UserCreationAttributes>('User',{
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    unique: true
  },
  email: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  mobile: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
    set(this: User, value: string) {
      let hash = hashPassword(value);
      this.setDataValue("password", hash);
    },
  },
  otp: {
    type: DataTypes.INTEGER,
    allowNull: true,
    comment: "4 digit random otp",
  },
  otpVerified: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
    comment: "True if otp is verified",
  },
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  active: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
},
{
  timestamps: false,
  indexes: [{ fields: ["email", "mobile"], using: "BTREE" }]
})

// export class User extends Model<
//   InferAttributes<User>,
//   InferCreationAttributes<User>
// > {
//   declare id: CreationOptional<number>;
//   declare password: string;
//   declare name: string;
//   declare email?: string;
//   declare mobile: string;
//   declare createdAt?: string;
//   declare otp?: number;
//   declare otpVerified?: number;
//   declare passwordChangedOn?: string;
//   declare zipcode?: number;
//   declare address?: string;
//   declare active: boolean;

//   static _attr = [
//     "email",
//     "mobile",
//     "createdAt",
//     "otpVerified",
//     "otp",
//     "id",
//     "active",
//     "name",
//     "zipcode",
//     "address",
//   ];

//   //validate password
//   validatePassword(this: User, userPass: string) {
//     return checkPassword(userPass, this.password);
//   }

//   static findByEmail = (email: string) => {
//     return User.findOne({
//       where: { email },
//       attributes: this._attr,
//     });
//   };

//   //todo write types to take optional keys from user attributes
//   static updateByMobile = (body: any, mobile: string) => {
//     return User.update(body, { where: { mobile } });
//   };

//   static findByMobile(mobile: string) {
//     return User.findOne({
//       where: { mobile },
//       attributes: this._attr,
//     });
//   }

//   /**
//    * @description findone user with os join
//    * @param where sequelize where options (optional)
//    * @returns Promise< single user >
//    */
//   static fo_withOS(where: WhereOptions<User> = {}) {
//     return User.scope("userOS").findOne({ where });
//   }

//   /**
//    * @description findall user with os join
//    * @param where sequelize where options (optional)
//    * @returns Promise< all user >
//    */
//   static fa_withOS(where: WhereOptions<User> = {}) {
//     return User.scope("userOS").findAll({ where });
//   }

//   /**
//    * @does find user by email or mobile
//    */
//   static f_emailORmobile({ email, mobile }: { email: string; mobile: string }) {
//     return User.findOne({
//       where: {
//         [Op.or]: [
//           {
//             email,
//           },
//           { mobile },
//         ],
//       },
//       raw: true,
//     });
//   }

//   getPlain() {
//     return this.get({ plain: true });
//   }

//   updateOtpVerified(mobile: string) {
//     return User.update({ otpVerified: 1 }, { where: { mobile } });
//   }

//   verifyOTP(this: User, otp: number): boolean {
//     if (this.otp === otp) {
//       return true;
//     }
//     return false;
//   }

//   static initModel(sequelize: Sequelize): typeof User {
//     User.init(
      // {
      //   id: {
      //     type: DataTypes.INTEGER,
      //     primaryKey: true,
      //     autoIncrement: true,
      //     unique: true,
      //   },
      //   email: {
      //     type: DataTypes.STRING,
      //     allowNull: true,
      //   },
      //   mobile: {
      //     type: DataTypes.STRING,
      //     allowNull: false,
      //   },
      //   name: {
      //     type: DataTypes.STRING,
      //     allowNull: false,
      //   },
      //   password: {
      //     type: DataTypes.STRING,
      //     allowNull: false,
      //     set(this: User, value: string) {
      //       let hash = hashPassword(value);
      //       this.setDataValue("password", hash);
      //     },
      //   },
      //   otp: {
      //     type: DataTypes.INTEGER,
      //     allowNull: true,
      //     comment: "4 digit random otp",
      //   },
      //   otpVerified: {
      //     type: DataTypes.BOOLEAN,
      //     defaultValue: false,
      //     comment: "True if otp is verified",
      //   },
      //   passwordChangedOn: {
      //     type: DataTypes.STRING,
      //     allowNull: true,
      //   },
      //   createdAt: {
      //     type: DataTypes.DATE,
      //     defaultValue: DataTypes.NOW,
      //   },
      //   zipcode: {
      //     type: DataTypes.INTEGER,
      //     allowNull: true
      //   },
      //   address: {
      //     type: DataTypes.STRING,
      //     allowNull: true
      //   },
      //   active: {
      //     type: DataTypes.BOOLEAN,
      //     defaultValue: true,
      //   },
      // },
      // {
      //   sequelize,
      //   timestamps: false,
      //   indexes: [{ fields: ["email", "mobile"], using: "BTREE" }],
      //   scopes: {
      //     userOS: {
      //       include: [{ model: UserOS, attributes: ["os"] }],
      //     }
      //   },
      // }
//     );

//     return User;
//   }
// }
