import { Model } from "sequelize";
import { GridQueryType, PureGridQueryType } from "./types";

const _invalid = ["false", false, "undefined", undefined, "null", null];

export abstract class GridModel<
  TModelAttributes extends {} = any,
  TCreationAttributes extends {} = TModelAttributes
> extends Model<TModelAttributes, TCreationAttributes> {
  public static findForGrid(query: any) {
    const {filters, limit, page, sort, forExcel} = purify(query);

    
    


  }
}

function purify({ filters, limit, page, sort, forExcel }: GridQueryType): PureGridQueryType {
  return {
    filters: isInvalid(filters) ? false : filters,
    limit: isInvalid(limit) ? false : parseInt(limit),
    page: isInvalid(page) ? false : parseInt(page),
    sort: isInvalid(sort) ? false : sort,
    forExcel: isInvalid(forExcel) ? false : true
  };
}


function isInvalid(value: string) {
    return _invalid.includes(value);
}