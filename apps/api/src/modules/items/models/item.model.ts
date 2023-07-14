import { CreationOptional, DataTypes, InferAttributes, InferCreationAttributes, Model, ModelDefined, Optional } from "sequelize";
import type { TItem } from "greenbowl-schema";
import { DbConnection } from "../../../core/db/db";
import { Menu } from "../../menu/models/menu.model";

interface Item extends Model<InferAttributes<Item>>, TItem {}

export const Item = DbConnection.db.define<Item>(
  "Item",
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
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    menuID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Menu,
      },
    },
    protien: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    fat: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    energy: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    carbs: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    calories: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      defaultValue: null,
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  },
  {
    indexes: [{ fields: ["menuID"], using: "BTREE" }],
    freezeTableName: true
  }
);