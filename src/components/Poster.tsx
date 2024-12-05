import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Genre, Movie } from '../models/movieModels';
import { useAppNavigation } from '../hooks/useAppNavigation';

const styles = StyleSheet.create({
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

const Poster = ({
  item,
  index,
  dataGenres,
  renderType = true,
}: {
  item: Movie;
  index: number;
  dataGenres: Genre[] | undefined;
  renderType: boolean;
}) => {
  const navigate = useAppNavigation();
  return (
    <TouchableOpacity
      key={`movie-${item.id}-${index}`}
      style={styles.movieCard}
      onPress={() => navigate.navigate('Details', { id: item.id })}
      id={`movie-${index}`}
    >
      <Image
        source={{
          uri: `https://image.tmdb.org/t/p/w500${item.poster_path}`,
        }}
        style={styles.poster}
      />
      {renderType ? (
        <View style={styles.genrerType}>
          <Text style={{ textAlign: 'center', fontSize: 12 }}>
            {dataGenres?.find(it => it?.id == item?.genre_ids?.[0])?.name ??
              'Sem gênero '}
          </Text>
        </View>
      ) : null}

      <Text numberOfLines={1} ellipsizeMode="tail" style={{ color: '#fff' }}>
        {item.title}
      </Text>
    </TouchableOpacity>
  );
};

export default Poster;
