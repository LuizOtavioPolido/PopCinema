import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SearchStyled } from './SearchStyled';
import Ionicons from '@expo/vector-icons/Ionicons';
import { colors } from '../../utils/Theme';
import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import Icon from 'react-native-vector-icons/AntDesign';
import { Genre, Movie } from '../../models/movieModels';
import API from '../../services/API';
import Poster from '../../components/Poster';
import Modal from 'react-native-modal';
import { queryClient } from '../../services/queryClient';

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
});

const Movies = ({
  movies,
  onEndReach,
}: {
  movies: Movie[];
  onEndReach: any;
}) => {
  const getSearchedMoviesFromCache: Movie[] | undefined =
    queryClient.getQueryData(['searched']);
  const dataGenres: any = queryClient.getQueryData(['genres']);

  const popularData = movies || [];
  const searchedData = getSearchedMoviesFromCache || [];

  const moviesToShow =
    searchedData != null && searchedData.length > 0
      ? searchedData
      : popularData;

  return (
    <View style={{ marginBottom: 40, marginTop: 10 }}>
      <FlatList
        data={moviesToShow}
        renderItem={({ item, index }) => (
          <Poster
            key={`item-${index}`}
            dataGenres={dataGenres}
            index={index}
            item={item}
            renderType={false}
          />
        )}
        numColumns={2}
        columnWrapperStyle={{
          justifyContent: 'space-between',
          padding: 20,
        }}
        onEndReached={onEndReach}
      />
    </View>
  );
};

const Search = () => {
  const [inputSearch, setInputSearch] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [genreSelected, setGenreSelected] = useState(-1);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPage: 1,
  });
  const [movies, setMovies] = useState<Movie[]>([]);

  useEffect(() => {
    setTimeout(() => {
      refetch();
    }, 1);
  }, [genreSelected]);

  const dataGenres: any = queryClient.getQueryData(['genres']);

  const { data: searchedData, refetch } = useQuery({
    queryKey: ['searched'],
    queryFn: async () => {
      if (inputSearch.length > 0 || genreSelected != -1) {
        let params: any = {
          query: inputSearch,
          page: 1,
        };

        let endpoint = '/search/movie';

        if (genreSelected != -1) {
          endpoint = '/discover/movie';
          params = {
            with_genres: genreSelected,
            page: 1,
          };
        }

        const response = await API.get<{
          page: number;
          results: Movie[];
          total_pages: number;
          total_results: number;
        }>(endpoint, {
          params: params,
        });

        return response.data.results;
      } else {
        return null;
      }
    },
    enabled: false,
  });

  const { data: popularData } = useQuery({
    queryKey: ['popularData', pagination.currentPage],
    queryFn: async () => {
      const response = await API.get<{
        page: number;
        results: Movie[];
        total_pages: number;
        total_results: number;
      }>('/movie/popular', {
        params: {
          page: pagination.currentPage,
        },
      });

      setPagination({
        currentPage: response.data.page,
        totalPage: response.data.total_pages,
      });

      return response.data.results;
    },
    enabled: true,
  });

  const onEndReach = () => {
    setPagination({
      ...pagination,
      currentPage: pagination.currentPage + 1,
    });
  };

  useEffect(() => {
    setMovies(prev => {
      const newMovies =
        popularData?.filter(
          movie => !prev.some(prevMovie => prevMovie.id === movie.id),
        ) ?? [];
      return [...prev, ...newMovies];
    });
  }, [popularData]);

  return (
    <SafeAreaView
      style={{
        height: '100%',
        display: 'flex',
        flexGrow: 1,
      }}
    >
      <SearchStyled.Container>
        <SearchStyled.Content>
          <View style={styles.inputContainer}>
            <SearchStyled.Input
              value={inputSearch}
              onChangeText={setInputSearch}
              placeholder="Pesquisar..."
              placeholderTextColor={colors.searchAndWriting}
              editable={genreSelected == -1}
            />
            {inputSearch != '' ? (
              <TouchableOpacity
                style={styles.iconContainer}
                onPress={() => {
                  setInputSearch('');
                  queryClient.resetQueries({
                    queryKey: ['searched'],
                  });
                }}
              >
                <Icon
                  name="close"
                  color={'#ffffff'}
                  size={15}
                  style={{ paddingLeft: 5, paddingRight: 5 }}
                />
              </TouchableOpacity>
            ) : null}
            <TouchableOpacity
              style={styles.iconContainer}
              onPress={() => {
                setPagination({
                  currentPage: 1,
                  totalPage: 1,
                });
                refetch();
              }}
            >
              <Icon
                name="search1"
                color={'#fff'}
                size={15}
                style={{ paddingLeft: 5, paddingRight: 5 }}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.iconContainer}
              onPress={() => setShowModal(true)}
            >
              <Icon
                name="filter"
                color={'#fff'}
                size={15}
                style={{ paddingLeft: 5, paddingRight: 5 }}
              />
            </TouchableOpacity>
          </View>

          {genreSelected != -1 ? (
            <>
              <Text key={genreSelected} style={{ color: '#fff' }}>
                Gênero selecionado:{' '}
                {
                  dataGenres?.find((item: Genre) => item.id == genreSelected)
                    ?.name
                }
              </Text>
              <TouchableOpacity onPress={() => setGenreSelected(-1)}>
                <Text key={genreSelected} style={{ color: '#fff' }}>
                  Limpar
                </Text>
              </TouchableOpacity>
            </>
          ) : null}

          <Movies
            key={`movies-${popularData?.length}-${searchedData?.length}`}
            movies={movies}
            onEndReach={onEndReach}
          />
        </SearchStyled.Content>
      </SearchStyled.Container>
      <Modal isVisible={showModal} onTouchCancel={() => setShowModal(false)}>
        <View style={{ backgroundColor: '#000000', flex: 1 }}>
          <View
            style={{
              flexDirection: 'row',
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <TouchableOpacity
              style={{ padding: 8 }}
              onPress={() => setShowModal(false)}
            >
              <Ionicons name="arrow-back" size={24} color="#fff" />
            </TouchableOpacity>
            <Text style={{ color: '#fff', textAlign: 'center', fontSize: 18 }}>
              Selecione o Gênero
            </Text>
          </View>

          <FlatList
            data={dataGenres}
            renderItem={({ item, index }) => {
              return (
                <TouchableOpacity
                  key={`genre-${index}`}
                  style={{
                    borderWidth: 1,
                    borderColor: colors.searchAndWriting,
                    padding: 10,
                    flex: 1,
                  }}
                  onPress={() => {
                    setPagination({
                      currentPage: 1,
                      totalPage: 1,
                    });
                    setGenreSelected(item.id);
                    setShowModal(false);
                    setInputSearch('');
                  }}
                >
                  <Text style={{ color: '#fff' }}>{item.name}</Text>
                </TouchableOpacity>
              );
            }}
            numColumns={2}
            columnWrapperStyle={{
              justifyContent: 'space-between',
              width: '100%',
            }}
          />
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default Search;
