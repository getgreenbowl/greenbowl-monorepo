export type GridQueryType = {
  filters: string;
  limit: string;
  sort: string;
  page: string;
  forExcel: string;
};

export type PureGridQueryType = {
  filters: string | boolean;
  limit: number | boolean;
  page: number | boolean;
  sort: boolean | string;
  forExcel: boolean;
};
