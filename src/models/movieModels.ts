export type Genre = {
  id: string | number;
  name: string;
};

export type Movie = {
  id: number;
  title: string;
  original_title: string;
  overview: string;
  release_date: string;
  popularity: number;
  vote_average: number;
  vote_count: number;
  genre_ids: number[];
  backdrop_path: string | null;
  poster_path: string | null;
  adult: boolean;
  original_language: string;
  video: boolean;
};

export type MovieFavorite = {
  id: number;
  title: string;
  poster_path: string;
};
