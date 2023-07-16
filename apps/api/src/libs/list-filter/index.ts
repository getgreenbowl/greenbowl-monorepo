import { c_pagination, v_grid_events } from "@gb/schema";
import { NextFunction, Request, Response } from "express";
import { other } from "proses-response";
import { Order } from "sequelize";

export class ModelOptions {

  private static readonly order: Order = [['id', 'DESC']]

  static build() {

    return (req:Request, res: Response, next: NextFunction) => {
      try {
        const incoming = v_grid_events.parse(req.query);
        const {limit, offset} = c_pagination({limit:incoming.limit, page: incoming.page})
        req.modelOptions = {limit, offset, order: this.order}
        next()
      } catch (error) {
        other(res, 'Invalid grid options')
      }

    }
  }

}
