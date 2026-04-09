export interface Genre {
  id: number;
  name: string;
  status: boolean;
}

export interface GenreRequest {
  name: string;
  status: boolean;
}
