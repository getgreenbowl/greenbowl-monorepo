import {
  DataTypes,
  InferAttributes,
  Model
} from "sequelize";
import { DbConnection } from "../../../core/db/db";
import { Item } from "./item.model";
import { TItemImages } from "greenbowl-schema";

interface ItemImages extends TItemImages, Model<InferAttributes<ItemImages>> {}

export const ItemImages = DbConnection.db.define<ItemImages>(
  "ItemImages",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      unique: true,
    },
    itemID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Item,
      },
    },
    img: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    main: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    indexes: [{ fields: ["itemID"], using: "BTREE" }],
    freezeTableName: true
  }
);
