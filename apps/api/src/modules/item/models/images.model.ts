import { IItemImages } from "greenbowl-data-models";
import {
  DataTypes,
  InferAttributes,
  Model
} from "sequelize";
import Db from "../../../core/db/db";
import { Item } from "./item.model";

interface _ItemImages extends IItemImages, Model<InferAttributes<_ItemImages>> {}

export const ItemImages = Db.instance.define<_ItemImages>(
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
  }
);
