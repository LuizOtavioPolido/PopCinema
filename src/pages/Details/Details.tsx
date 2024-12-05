import { useEffect, useState } from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { RouteProp, useRoute } from '@react-navigation/native';
import { RootStackParamList } from '../../router/Router';
import { MovieFavorite } from '../../models/movieModels';
import { colors } from '../../utils/Theme';
import { useQuery } from '@tanstack/react-query';
import API from '../../services/API';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useAppNavigation } from '../../hooks/useAppNavigation';
import AntDesign from '@expo/vector-icons/AntDesign';
import AsyncStorage from '@react-native-async-storage/async-storage';

type DetailsScreenRouteProp = RouteProp<RootStackParamList, 'Details'>;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  poster: {
    width: '100%',
    height: 300,
    resizeMode: 'cover',
    borderRadius: 20,
    marginTop: 30,
  },
  content: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.searchAndWriting,
    marginBottom: 10,
    width: '100%',
  },
  rating: {
    fontSize: 18,
    color: colors.starAndTrailer,
    marginBottom: 15,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  overview: {
    fontSize: 16,
    color: colors.searchAndWriting,
    lineHeight: 24,
  },
});

const Details = () => {
  const route = useRoute<DetailsScreenRouteProp>();
  const navigate = useAppNavigation();
  const [isInStorage, setIsInStorage] = useState(false);

  useEffect(() => {
    const checkIfFavorite = async () => {
      try {
        const favorites = await AsyncStorage.getItem('favorites');

        if (favorites && favorites?.length > 0) {
          const parsedFavorites = JSON.parse(favorites);
          const isFavorite = parsedFavorites.some(
            (fav: MovieFavorite) => fav.id === route.params.id,
          );
          setIsInStorage(isFavorite);
        } else {
          setIsInStorage(false);
        }
      } catch (error) {
        console.error('Error ao ler o AsyncStorage', error);
      }
    };

    checkIfFavorite();
  }, [route.params.id]);

  const { data: movie } = useQuery({
    queryKey: ['movieDetails'],
    queryFn: async () => {
      const response = await API.get(`/movie/${route.params.id}`);

      return response.data;
    },
    enabled: true,
  });

  const handleToggleFavorite = async () => {
    try {
      const favorites = await AsyncStorage.getItem('favorites');
      let parsedFavorites = favorites ? JSON.parse(favorites) : [];

      if (isInStorage) {
        parsedFavorites = parsedFavorites.filter(
          (fav: MovieFavorite) => fav.id !== route.params.id,
        );
        setIsInStorage(false);
      } else {
        const newFavorite: MovieFavorite = {
          id: route.params.id,
          title: movie.title,
          poster_path: movie.poster_path,
        };
        parsedFavorites.push(newFavorite);
        setIsInStorage(true);
      }

      await AsyncStorage.setItem('favorites', JSON.stringify(parsedFavorites));
    } catch (error) {
      console.error('Ocorreu um erro ao atualizar os favoritos', error);
    }
  };

  if (!movie) {
    return null;
  }

  return (
    <ScrollView style={styles.container}>
      <View style={{ position: 'relative' }}>
        <Image
          source={{
            uri: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
          }}
          style={styles.poster}
        />
        <View style={{ position: 'absolute', width: '100%', paddingTop: 2 }}>
          <TouchableOpacity onPress={() => navigate.goBack()}>
            <Ionicons name="arrow-back" size={24} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.content}>
        <Text style={styles.title}>{movie.title}</Text>
        <View style={{ display: 'flex', flexDirection: 'row' }}>
          <Text style={styles.rating}>
            Nota: {movie.vote_average?.toFixed(1)}/10{' '}
          </Text>
          <TouchableOpacity
            style={{ paddingTop: 2 }}
            onPress={handleToggleFavorite}
          >
            <AntDesign
              name={`${!isInStorage ? 'staro' : 'star'}`}
              size={22}
              color="#fff"
            />
          </TouchableOpacity>
        </View>
        <Text style={styles.overview}>{movie.overview}</Text>
      </View>
    </ScrollView>
  );
};

export default Details;
