import { DataTypes, InferAttributes, Model, CreationOptional, Sequelize, InferCreationAttributes } from "sequelize";
import {TMenu} from "greenbowl-schema"
import DbConnection from "../../../core/db/db";

interface Menu extends Model<InferAttributes<Menu>, InferCreationAttributes<Menu>>, TMenu {}

export const Menu = DbConnection.db.define<Menu>('Menu', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        unique: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    isActive: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    }  
}, {
    timestamps: true,
    tableName: 'Menu'
})

// export class Menu extends Model<InferAttributes<Menu>, InferCreationAttributes<Menu>> {
//     declare id: CreationOptional<number>
//     declare parentID: number | null
//     declare title: string
//     declare icon: string
//     declare link: string | null
//     declare isActive: number | null
//     declare sequenceNumber: number | null

//     static initModel(sequelize: Sequelize): typeof Menu {
        // Menu.init({
        //     id: {
        //         type: DataTypes.INTEGER,
        //         primaryKey: true,
        //         autoIncrement: true,
        //         unique: true,
        //     },
        //     parentID: {
        //         type: DataTypes.INTEGER,
        //         defaultValue: null
        //     },
        //     title: {
        //         type: DataTypes.STRING,
        //         allowNull: false
        //     },
        //     link: {
        //         type: DataTypes.STRING,
        //         defaultValue: null
        //     },
        //     icon: {
        //         type: DataTypes.STRING,
        //         defaultValue: null
        //     },
        //     isActive: {
        //         type: DataTypes.SMALLINT,
        //         defaultValue: null
        //     },
        //     sequenceNumber: {
        //         type: DataTypes.SMALLINT,
        //         defaultValue: null
        //     }
        // },
        //     {
        //         sequelize,
        //         timestamps: false,
        //         indexes: [{ fields: ["parentID"], using: "BTREE" }],
        //     })

//         return Menu
//     }
// }