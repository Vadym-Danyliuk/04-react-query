import axios from 'axios';
import { Movie } from '../types/movie';

interface MovieSearchResponse {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
}

const BASE_URL = 'https://api.themoviedb.org/3';
const API_TOKEN = import.meta.env.VITE_TMDB_API_TOKEN;

const movieApi = axios.create({
  baseURL: BASE_URL,
  headers: {
    Authorization: `Bearer ${API_TOKEN}`,
    'Content-Type': 'application/json',
  },
});

export const searchMovies = async (query: string, page: number = 1): Promise<MovieSearchResponse> => {
  const response = await movieApi.get<MovieSearchResponse>('/search/movie', {
    params: {
      query,
      page,
    },
  });
  return response.data;
};

export const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';