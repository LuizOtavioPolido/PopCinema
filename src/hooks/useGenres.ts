import { useQuery } from '@tanstack/react-query';
import API from '../services/API';
import { Genre } from '../models/movieModels';

export const useGenres = () => {
  return useQuery({
    queryKey: ['genres'],
    queryFn: async () => {
      const response = await API.get<{ genres: Genre[] }>('/genre/movie/list');

      return response.data.genres;
    },
    enabled: true,
  });
};
