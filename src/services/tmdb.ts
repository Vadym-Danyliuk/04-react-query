import axios from 'axios';
import type { MovieSearchResponse } from '../types/movie';

const API_KEY = 'c5078527dcedcadb2ace6781a679976d'; 
const BASE_URL = 'https://api.themoviedb.org/3';

const tmdbApi = axios.create({
  baseURL: BASE_URL,
  params: {
    api_key: API_KEY,
  },
});

export const searchMovies = async (query: string, page: number = 1): Promise<MovieSearchResponse> => {
  const response = await tmdbApi.get<MovieSearchResponse>('/search/movie', {
    params: {
      query,
      page,
    },
  });
  return response.data;
};

export const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';