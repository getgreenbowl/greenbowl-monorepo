import { DataTypes, InferAttributes, InferCreationAttributes, Model, Sequelize } from "sequelize";

export class Cache extends Model<InferAttributes<Cache>, InferCreationAttributes<Cache>> {

    declare key: string;
    declare data: any;
    declare group: string;

    static async f_cache(key: string) {
        const cache = await Cache.findOne({where: {key}, raw: true});
        if(cache?.data) {
            return JSON.parse(cache.data)
        }
        return null
    }


    static addCache(key:string, data: any, group: string) {
        return Cache.create({key, data: JSON.stringify(data), group})
    }

    static clearCacheByGroup(group: string) {
      return Cache.destroy({where: {group}})
    }

    static clearCache() {
        return Cache.destroy()
    }


    static initModel(sequelize: Sequelize): typeof Cache {

        Cache.init(
            {
              key: {
                type: DataTypes.STRING,
                allowNull: false,
              },
              data: {
                type: DataTypes.BLOB,
                allowNull: false
              },
              group: {
                type: DataTypes.STRING,
                allowNull: false
              }
            },
            {
              sequelize,
              timestamps: false,
            }
          );


        return Cache;
    }
}