import { Order, WhereOptions } from 'sequelize';

export interface ModelOptionBuild {
  limit: number;
  offset: number;
  order: Order;
  where: WhereOptions;
}
