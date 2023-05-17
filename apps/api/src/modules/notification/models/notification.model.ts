import {
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
  Sequelize,
} from "sequelize";
import { Firebase } from "../../../firebase/firebase";
import { AdminUser } from "../../adminUser/models/adminUser.model";
import { UserFcm } from "../../users/models/user-fcmToken.model";
import { Notification as NotificationType } from "firebase-admin/lib/messaging/messaging-api";
import { User } from "../../users/models/user.model";

export type NotifType =
  | "share-item"
  | "premium-reminder"
  | "share-wardrobe"
  | "share-outfit"
  | null;
export class Notification extends Model<
  InferAttributes<Notification>,
  InferCreationAttributes<Notification>
> {
  declare id: CreationOptional<number>;
  declare title: string;
  declare description: string;
  declare status?: string;
  declare createdBy?: number;
  declare createdAt: CreationOptional<Date>;
  declare active?: boolean;
  declare userID?: number; //this is an optional field
  declare notifType?: NotifType; //notification field

  static async sendNotification(body: NotificationType) {
    const tokens = await UserFcm.getTokens();
    const res = await Firebase.sendNotification(tokens, body);
    return res;
  }

  static async sendUserNotification(
    users: number[],
    message: NotificationType,
    type: NotifType
  ) {
    const tokens = await UserFcm.getTokens({ userID: users });
    const res = await Firebase.sendNotification(tokens, message);

    const payload = users.map((user) => ({
      userID: user,
      title: message.title || "",
      description: message.body || "",
      notifType: type,
    }));
    await Notification.bulkCreate(payload);
    return res;
  }

  static initModel(sequelize: Sequelize): typeof Notification {
    Notification.init(
      {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          unique: true,
        },
        title: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        description: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        status: {
          type: DataTypes.ENUM,
          values: ["Sent", "Draft"],
          allowNull: true,
        },
        userID: {
          type: DataTypes.INTEGER,
          references: {
            model: User,
          },
        },
        notifType: {
          type: DataTypes.ENUM,
          values: [
            "share-item",
            "premium-reminder",
            "share-wardrobe",
            "share-outfit",
          ],
          allowNull: true,
        },
        createdBy: {
          type: DataTypes.INTEGER,
          allowNull: true,
          references: {
            model: AdminUser,
          },
        },
        createdAt: {
          type: DataTypes.DATE,
          defaultValue: sequelize.literal("CURRENT_TIMESTAMP"),
          allowNull: false,
        },
        active: {
          type: DataTypes.BOOLEAN,
          defaultValue: true,
        },
      },
      {
        sequelize,
        timestamps: false,
      }
    );
    return Notification;
  }
}
