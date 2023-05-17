import { DataTypes, ModelDefined, Optional } from "sequelize";
import Db from "../../../core/db/db";
import type { IMenu } from "greenbowl-data-models";

export const Menu: ModelDefined<
  IMenu,
  Optional<IMenu, "id">
> = Db.instance.define("Menu", {
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
});

