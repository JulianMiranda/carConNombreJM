import React, {useContext, useEffect, useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {TravelPoint} from '../../interfaces/TravelInfo.interface';
import {AuthContext} from '../../context/auth/AuthContext';

interface Props {
  onPress: (travelPoint: TravelPoint) => void;
  setShowSavePlaceMain: (setShowSavePlaceMain: boolean) => void;
  setIconTouchPlaceMain: (iconTouchPlaceMain: string) => void;
}
interface ListIcon {
  icon: 'house' | 'work' | 'star';
  name: 'Casa' | 'Trabajo' | 'Favoritos';
  place: TravelPoint;
  haveSaved: boolean;
}

export const SavePlace = ({
  onPress,
  setShowSavePlaceMain,
  setIconTouchPlaceMain,
}: Props) => {
  const {user} = useContext(AuthContext);
  const [listIcons, setListIcons] = useState<ListIcon[]>([
    {
      icon: 'house',
      haveSaved: false,
      name: 'Casa',
      place: {},
    },
    {
      icon: 'work',
      name: 'Trabajo',
      haveSaved: false,
      place: {},
    },
    {
      icon: 'star',
      name: 'Favoritos',
      haveSaved: false,
      place: {},
    },
  ]);
  useEffect(() => {
    if (user) {
      user.favoritesPlaces.map(fav => {
        if (fav.name === 'Home') {
          setListIcons([
            {
              icon: 'house',
              name: 'Casa',
              place: fav.place,
              haveSaved: true,
            },
            ...listIcons.filter(li => li.name !== 'Casa'),
          ]);
        }
      });
      user.favoritesPlaces.map(fav => {
        if (fav.name === 'Work') {
          setListIcons([
            ...listIcons.filter(li => li.name !== 'Trabajo'),
            {
              icon: 'work',
              name: 'Trabajo',
              place: fav.place,
              haveSaved: true,
            },
          ]);
        }
      });
    }
  }, [user]);

  const handleClickIcon = ({name, address, coordinates}: TravelPoint) => {
    console.log('handleClickIcon', name, address, coordinates);
    if (name === 'Casa') {
      const savedHome = listIcons.filter(li => li.name === 'Casa');
      if (savedHome[0].haveSaved) {
        onPress({
          name,
          address,
          coordinates,
        });
      } else {
        console.log('Agregar favorito');
        setShowSavePlaceMain(true);
        setIconTouchPlaceMain('Home');
      }
    }
    if (name === 'Trabajo') {
      const savedWork = listIcons.filter(li => li.name === 'Trabajo');
      if (savedWork[0].haveSaved) {
        onPress({
          name,
          address,
          coordinates,
        });
      } else {
        console.log('Agregar favorito');
        setShowSavePlaceMain(true);
        setIconTouchPlaceMain('Work');
      }
    }
    /*  onPress({
      name,
      address,
      coordinates,
    }); */
  };

  return (
    <>
      <View style={styles.container}>
        {listIcons.map(place => (
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() =>
              handleClickIcon({
                name: place.name,
                address: place.place.address,
                coordinates: place.place.coordinates,
              })
            }
            key={place.icon}
            style={styles.place}>
            <Icon name={place.icon} size={16} color={'#9F9F9F'} />
            <Text style={styles.text}>
              {place.place && place.place.name ? (
                <>
                  {place.place.name.length < 10
                    ? place.place.name
                    : place.place.name.substring(0, 9) + '...'}
                </>
              ) : (
                <>{place.name}</>
              )}
            </Text>
            <Icon name={'chevron-right'} size={16} color={'#9F9F9F'} />
          </TouchableOpacity>
        ))}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  place: {flexDirection: 'row', alignItems: 'center'},
  text: {marginHorizontal: 3},
});
