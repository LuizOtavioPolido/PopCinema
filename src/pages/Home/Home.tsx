import { ActivityIndicator, Platform } from 'react-native';
import { HomeStyled } from './HomeStyled';
import { Genre } from '../../models/movieModels';
import MovieList from '../../components/MoviesList';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useGenres } from '../../hooks/useGenres';

const movieList: Genre[] = [
  {
    id: 'now_playing',
    name: 'Em Cartaz',
  },
  {
    id: 'popular',
    name: 'Popular',
  },
  {
    id: 'top_rated',
    name: 'Melhores Avaliados',
  },
  {
    id: 'upcoming',
    name: 'Em Breve',
  },
];

const Home = () => {
  const { data, isLoading } = useGenres();

  return (
    <SafeAreaView style={{ height: '100%', display: 'flex', flexGrow: 1 }}>
      <HomeStyled.Container
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <HomeStyled.Content>
          {data && !isLoading ? (
            <MovieList movieList={movieList} />
          ) : (
            <ActivityIndicator size={50} color={'#fff'} style={{ flex: 1 }} />
          )}
        </HomeStyled.Content>
      </HomeStyled.Container>
    </SafeAreaView>
  );
};

export default Home;
