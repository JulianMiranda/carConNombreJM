import React, {useContext, useEffect, useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {HeaderScreen} from '../../components/HeaderScreen';
import {AuthContext} from '../../context/auth/AuthContext';
import {Favorite} from '../../components/Favorite';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {RootStackParams} from '../../navigator/settingStack';
import {StackScreenProps} from '@react-navigation/stack';
import {Location} from '../../interfaces/TravelInfo.interface';

interface Props extends StackScreenProps<RootStackParams, 'FavoritesScreen'> {}
interface Fav {
  title: string;
  address: string;
  coordinates: Location;
}
export const FavoritesScreen = ({navigation}: Props) => {
  const {user} = useContext(AuthContext);
  const [home, setHome] = useState({
    title: 'Agrega tu dirección de la casa',
    address: '',
    coordinates: {latitude: 0, longitude: 0},
  });
  const [work, setWork] = useState({
    title: 'Agrega tu dirección de trabajo',
    address: '',
    coordinates: {latitude: 0, longitude: 0},
  });
  const [favs, setFavs] = useState<Fav[]>([]);
  useEffect(() => {
    if (user) {
      const casa = user?.favoritesPlaces.filter(f => f.name === 'Home');
      if (casa.length > 0) {
        setHome({
          title: casa[0].name,
          address: casa[0].place.name,
          coordinates: casa[0].place.coordinates,
        });
      }
    }
    if (user) {
      const trabajo = user?.favoritesPlaces.filter(f => f.name === 'Work');
      if (trabajo.length > 0) {
        setWork({
          title: trabajo[0].name,
          address: trabajo[0].place.name,
          coordinates: trabajo[0].place.coordinates,
        });
      }
    }
  }, [user]);
  useEffect(() => {
    if (user) {
      const myfavs = user?.favoritesPlaces.filter(
        f => f.name !== 'Work' && f.name !== 'Home',
      );
      if (myfavs.length > 0) {
        myfavs.map(f =>
          setFavs([
            ...favs,
            {
              title: f.name,
              address: f.place.name,
              coordinates: f.place.coordinates,
            },
          ]),
        );
      }
    }
  }, [user]);

  return (
    <>
      <HeaderScreen title="Mis lugares favoritos" button="arrow-back" />
      <View style={styles.mainFavs}>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() =>
            navigation.navigate('AddFavoriteScreen', {fav: 'Home'})
          }
          style={styles.containerFav}>
          <Favorite
            leftIcon="house"
            rightIcon="chevron-right"
            title={home.title}
            address={home.address}
            coordinates={home.coordinates}
          />
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() =>
            navigation.navigate('AddFavoriteScreen', {fav: 'Work'})
          }
          style={styles.containerFav}>
          <Favorite
            leftIcon="work"
            rightIcon="chevron-right"
            title={work.title}
            address={work.address}
            coordinates={work.coordinates}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.mainFavs}>
        <View style={styles.separator} />
        <Text style={styles.favoritos}>Favoritos</Text>
        {favs.map((place, i) => (
          <TouchableOpacity
            activeOpacity={0.8}
            key={i}
            onPress={() =>
              navigation.navigate('AddFavoriteScreen', {fav: place.title})
            }
            style={styles.containerFav}>
            <Favorite
              leftIcon="work"
              rightIcon="chevron-right"
              title={place.title}
              address={place.address}
              coordinates={place.coordinates}
            />
          </TouchableOpacity>
        ))}
      </View>
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => navigation.navigate('AddFavoriteScreen', {fav: 'New'})}
        style={styles.containerAdd}>
        <Icon name="add" size={26} color={'#5f5f5f'} />
        <Text style={styles.addText}>Agregar lugar</Text>
      </TouchableOpacity>
    </>
  );
};
const styles = StyleSheet.create({
  mainFavs: {
    backgroundColor: '#fff',
  },
  containerFav: {
    padding: 20,
  },
  containerAdd: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  addText: {fontSize: 18, color: '#5f5f5f', fontWeight: 'bold', marginLeft: 10},
  favoritos: {fontSize: 18, fontWeight: 'bold', marginLeft: 10, marginTop: 20},
  separator: {
    width: '100%',
    height: 10,
    backgroundColor: '#f1f1f1',
    marginVertical: 10,
  },
});
