export interface EventResponse {
  data: Event[];
  meta?: Meta;
}

export interface Event {
  id?: number;
  title?: string;
  description?: string;
  extendedDescription?: string;
  place?: string;
  unitPrice?: number;
  genreId?: number;
  genre?: string;
  dateEvent?: string;
  timeEvent?: string;
  imageUrl?: string;
  capacity?: number;
  finalized?: boolean;
  status?: string;
  image?: File | null;
}

export interface Meta {
  totalCount?: number;
  page?: number;
  pageSize?: number;
  totalPages?: number;
}
