import {
  DataTypes,
  InferAttributes,
  Model,
  CreationOptional,
  Sequelize,
  InferCreationAttributes,
} from "sequelize";

export class Role extends Model<
  InferAttributes<Role>,
  InferCreationAttributes<Role>
> {
  declare id: CreationOptional<number>;
  declare roleName: string;
  declare permission?: string;
  declare active: boolean;
  declare createdBy: number | null;
  declare modifiedBy: number | null;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;

  static initModel(sequelize: Sequelize): typeof Role {
    Role.init(
      {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          unique: true,
        },
        roleName: {
          type: DataTypes.STRING,
          allowNull: false,
          unique: true,
        },
        permission: {
          type: DataTypes.TEXT,
          allowNull: true,
        },
        active: {
          type: DataTypes.BOOLEAN,
          allowNull: false,
        },
        createdBy: {
          type: DataTypes.INTEGER,
          allowNull: true,
        },
        modifiedBy: {
          type: DataTypes.INTEGER,
          allowNull: true,
        },
        createdAt: {
          type: DataTypes.DATE,
          allowNull: true,
        },
        updatedAt: {
          type: DataTypes.DATE,
          allowNull: true,
        },
      },
      {
        sequelize,
        timestamps: false,
        indexes: [{ fields: ["roleName"], using: "BTREE" }],
      }
    );
    return Role;
  }
}
