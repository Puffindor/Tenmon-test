export interface IPost {
  id: number;
  body: string;
  title: string;
  userId: number;
}

export interface IFilters {
  id?: string | null;
  userId?: string | null;
  pagination?: IPagination;
}

export interface IPagination {
  page: number;
  perPage: number;
}
