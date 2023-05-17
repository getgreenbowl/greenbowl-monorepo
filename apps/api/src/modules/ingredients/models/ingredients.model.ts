import {
    CreationOptional,
    DataTypes,
    InferAttributes,
    InferCreationAttributes,
    Model,
    Sequelize,
  } from "sequelize";
  
  export class Ingredients extends Model<
    InferAttributes<Ingredients>,
    InferCreationAttributes<Ingredients>
  > {
    declare id: CreationOptional<number>;
    declare name: string;
    declare isActive: boolean;
  
    static initModel(sequelize: Sequelize) {
      Ingredients.init(
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
            defaultValue: false,
          },
        },
        { sequelize }
      );
      return Ingredients;
    }
  }
  