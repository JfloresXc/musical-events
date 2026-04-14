export interface Sale {
  saleId?: number;
  email?: string;
  dateEvent?: string;
  timeEvent?: string;
  genre?: string;
  imageUrl?: string;
  title?: string;
  operationCode?: string;
  fullName?: string;
  quantity?: number;
  saleDate?: string;
  total?: number;
}

export interface SaleResponse {
  data: Sale[];
  meta?: Meta;
}

export interface Meta {
  totalCount?: number;
  page?: number;
  pageSize?: number;
  totalPages?: number;
}
