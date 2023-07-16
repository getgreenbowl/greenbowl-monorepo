import { Order } from "sequelize";

export interface ModelOptionBuild {
  limit:number,
  offset: number,
  order: Order
}
