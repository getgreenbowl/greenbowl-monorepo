import { DataTypes, InferAttributes, Model } from "sequelize";
import Db, { DbConnection } from "../../../core/db/db";
import { Ingredients } from "../../ingredients/models/ingredients.model";
import { Item } from "./item.model";
import { TItemIngredients } from "greenbowl-schema";

interface ItemIngredients
  extends TItemIngredients,
    Model<InferAttributes<ItemIngredients>> {}

export const ItemIngredients = DbConnection.db.define<ItemIngredients>(
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
    freezeTableName: true
  }
);
