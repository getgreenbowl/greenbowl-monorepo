import {
  FilterData,
  GridEvents,
  c_pagination,
  v_grid_events,
} from 'greenbowl-schema';
import { NextFunction, Request, Response } from 'express';
import { other } from 'proses-response';
import { Order, WhereOptions } from 'sequelize';
import { Op } from 'sequelize';

export class ModelOptions {
  private static readonly order: Order = [['id', 'DESC']];

  static build() {
    return (req: Request, res: Response, next: NextFunction) => {
      try {
        const incoming = v_grid_events.parse(req.query);
        const { limit, offset } = c_pagination({
          limit: incoming.limit,
          page: incoming.page,
        });

        req.modelOptions = {
          limit,
          offset,
          order: orderBy(incoming.sort),
          where: whereOptions(incoming.filters),
        };
        next();
      } catch (error) {
        other(res, 'Invalid grid options');
      }
    };
  }
}

function whereOptions(options: FilterData[]): WhereOptions {
  return options.map((option) => {
    if (option.condition === 'equals') {
      return { [option.field]: option.value };
    }

    if (option.condition === 'contains') {
      return { [option.field]: { [Op.substring]: `%${option.value}%` } };
    }

    if (option.condition === 'not equal') {
      return { [option.field]: { [Op.not]: option.value } };
    }

    if (option.condition === 'between' && typeof option.value === 'string') {
      const value = option.value.split('-');
      return { [option.field]: { [Op.between]: [value[0], value[1]] } };
    }

    if (option.condition === 'greater than') {
      return { [option.field]: { [Op.gt]: option.value } };
    }

    if (option.condition === 'less than') {
      return { [option.field]: { [Op.lt]: option.value } };
    }

    return {};
  });
}

function orderBy(sort: GridEvents['sort']): Order {
  if (sort.Desc) {
    return [[sort.Desc, 'DESC']];
  }

  if (sort.Asc) {
    return [[sort.Asc, 'ASC']];
  }

  return [['id', 'DESC']];
}
