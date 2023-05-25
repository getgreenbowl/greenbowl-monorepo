import {
  DataTypes,
  InferAttributes,
  Model,
  InferCreationAttributes,
} from "sequelize";
import { TMenu } from "greenbowl-schema";
import DbConnection from "../../../core/db/db";

interface Menu
  extends Model<InferAttributes<Menu>, InferCreationAttributes<Menu>>,
    TMenu {}

export const Menu = DbConnection.db.define<Menu>(
  "Menu",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      unique: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  },
  {
    timestamps: true,
    freezeTableName: true
  }
);
