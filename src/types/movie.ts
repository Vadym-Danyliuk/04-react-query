export interface Movie {
  id: number;
  title: string;
  overview: string;
  poster_path: string | null;
  release_date: string;
  vote_average: number;
  vote_count: number;
}

export interface MovieSearchResponse {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
}

export interface MovieVideo {
  id: string;
  iso_639_1: string;
  iso_3166_1: string;
  key: string;
  name: string;
  official: boolean;
  published_at: string;
  site: string;
  size: number;
  type: string;
}

export interface MovieDetails extends Movie {
  backdrop_path: string | null;
  budget: number;
  genres: Array<{ id: number; name: string }>;
  homepage: string;
  runtime: number;
  status: string;
  tagline: string;
  videos: {
    results: MovieVideo[];
  };
}