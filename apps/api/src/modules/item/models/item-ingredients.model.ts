import { IItemIngredients } from "greenbowl-data-models";
import { DataTypes, InferAttributes, Model } from "sequelize";
import Db from "../../../core/db/db";
import { Ingredients } from "../../ingredients/models/ingredients.model";
import { Item } from "./item.model";

interface _ItemIngredients
  extends IItemIngredients,
    Model<InferAttributes<_ItemIngredients>> {}

export const ItemIngredients = Db.instance.define<_ItemIngredients>(
  "ItemIngredients",
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
    ingredientID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Ingredients,
      },
    },
  },
  {
    indexes: [{ fields: ["itemID", "ingredientID"], using: "BTREE" }],
  }
);
