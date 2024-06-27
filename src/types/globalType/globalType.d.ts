export interface PaginationType {
  perPage: number;
  currentPage: number;
  total: number;
}

export interface StarpiDefaultType<T = any> {
  data: {
    attributes: T
  }
}