import {
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from "sequelize";
import DbConnection from "../../../core/db/db";
import { TIngredients } from "greenbowl-schema";

interface Ingredients
  extends Model<
      InferAttributes<Ingredients>,
      InferCreationAttributes<Ingredients>
    >,
    TIngredients {}

export const Ingredients = DbConnection.db.define("Ingredients", {
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
    defaultValue: false,
  },
}, {timestamps: true});
