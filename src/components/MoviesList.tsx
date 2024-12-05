import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { colors } from '../utils/Theme';
import { useQuery } from '@tanstack/react-query';
import { useEffect, useMemo, useRef, useState } from 'react';
import { Genre, Movie } from '../models/movieModels';
import API from '../services/API';
import Poster from './Poster';
import { queryClient } from '../services/queryClient';

const styles = StyleSheet.create({
  inputContainer: {
    borderWidth: 1,
    borderBottomColor: colors.searchAndWriting,
    display: 'flex',
    flexDirection: 'row',
    paddingBottom: 2,
  },
  iconContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  genreTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 10,
    color: '#f55',
    marginLeft: 10,
  },
  movieCard: {
    width: 120,
    marginHorizontal: 10,
    position: 'relative',
  },
  genrerType: {
    position: 'absolute',
    top: 0,
    height: 20,
    backgroundColor: '#A6AEBF',
    width: 100,
    left: 10,
    display: 'flex',
  },
  poster: {
    width: '100%',
    height: 180,
    borderRadius: 10,
  },
});

const MoviesByCategories = ({ genreId }: { genreId: string }) => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPage: 1,
  });
  const dataGenres: any = queryClient.getQueryData(['genres']);

  const { data: movieListResults, isLoading } = useQuery({
    queryKey: ['movieListResult', genreId, pagination.currentPage],
    queryFn: async () => {
      if (pagination.currentPage <= pagination.totalPage) {
        let endpoint = '';

        switch (genreId) {
          case 'popular':
            endpoint = '/movie/popular';
            break;
          case 'top_rated':
            endpoint = '/movie/top_rated';
            break;
          case 'now_playing':
            endpoint = '/movie/now_playing';
            break;
          case 'upcoming':
            endpoint = '/movie/upcoming';
            break;
        }

        let params: any = {
          page: pagination.currentPage,
          with_genres: genreId,
        };

        const response = await API.get<{
          page: number;
          results: Movie[];
          total_pages: number;
        }>(endpoint, {
          params,
        });

        setPagination({
          currentPage: response.data.page,
          totalPage: response.data.total_pages,
        });

        return response.data.results;
      } else {
        return null;
      }
    },
  });

  useEffect(() => {
    if (movieListResults != null && !isLoading) {
      setMovies(prev => {
        const movieSet = new Set(prev.map(movie => movie.id));
        const uniqueMovies = movieListResults.filter(
          movie => !movieSet.has(movie.id),
        );
        return [...prev, ...uniqueMovies];
      });
    }
  }, [movieListResults, isLoading]);

  if (!movieListResults || isLoading) {
    return null;
  }

  return (
    <FlatList
      data={movies}
      keyExtractor={movie => `${movie.id}`}
      horizontal
      onEndReached={() => {
        if (pagination.currentPage <= pagination.totalPage) {
          setPagination({
            ...pagination,
            currentPage: pagination.currentPage + 1,
          });
        }
      }}
      maxToRenderPerBatch={20}
      onEndReachedThreshold={0.1}
      ListFooterComponent={isLoading ? <ActivityIndicator /> : null}
      renderItem={({ item, index }) => (
        <Poster
          dataGenres={dataGenres}
          index={index}
          item={item}
          renderType={true}
        />
      )}
    />
  );
};

const RenderGenre = ({ genre }: { genre: Genre }) => {
  return (
    <View>
      <Text style={styles.genreTitle}>{genre.name}</Text>
      <MoviesByCategories genreId={String(genre.id)} />
    </View>
  );
};

const MoviesList = ({ movieList }: { movieList: Genre[] }) => {
  const renderGenre = useMemo(
    () =>
      ({ item }: { item: Genre }) => <RenderGenre genre={item} />,
    [],
  );

  return (
    <FlatList
      data={movieList}
      keyExtractor={item => item.id.toString()}
      renderItem={renderGenre}
    />
  );
};

export default MoviesList;
