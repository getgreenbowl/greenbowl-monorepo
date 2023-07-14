import { InferAttributes, InferCreationAttributes, Model } from "sequelize";

export class G_Model<T extends Model> extends Model<InferAttributes<T>, InferCreationAttributes<T>> {}