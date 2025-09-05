import axios from 'axios';
import { Movie } from '../types/movie';

interface MovieSearchResponse {
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

const BASE_URL = 'https://api.themoviedb.org/3';

const API_TOKEN = import.meta.env.VITE_TMDB_API_TOKEN;

if (!API_TOKEN) {
  console.error('❌ TMDB API токен не знайдено! Додайте VITE_TMDB_API_TOKEN до .env файлу');
  throw new Error('TMDB API токен відсутній');
}

const movieApi = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Authorization': `Bearer ${API_TOKEN}`,
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

movieApi.interceptors.request.use(
  (config) => {
    console.log('🔍 Запит:', config.url);
    console.log('🔑 Токен встановлено:', !!API_TOKEN);
    return config;
  },
  (error) => {
    console.error('❌ Помилка запиту:', error);
    return Promise.reject(error);
  }
);

movieApi.interceptors.response.use(
  (response) => {
    console.log('✅ Успішна відповідь:', response.status);
    return response;
  },
  (error) => {
    console.error('❌ Помилка відповіді:', error.response?.status, error.response?.data);
    if (error.response?.status === 401) {
      console.error('🔐 Помилка авторизації: перевірте ваш TMDB Bearer токен');
    }
    return Promise.reject(error);
  }
);

export const searchMovies = async (query: string, page: number = 1): Promise<MovieSearchResponse> => {
  const response = await movieApi.get<MovieSearchResponse>('/search/movie', {
    params: {
      query,
      page,
    },
  });
  return response.data;
};


export const getMovieVideos = async (movieId: number): Promise<MovieVideo[]> => {
  const response = await movieApi.get(`/movie/${movieId}/videos`);
  return response.data.results;
};

export const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';