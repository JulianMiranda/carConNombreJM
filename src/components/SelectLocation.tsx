import React, {useContext, useEffect, useState} from 'react';
import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';
import MapView, {Marker} from 'react-native-maps';
import {TravelContext} from '../context/travel/TravelContext';
import {ConfirmLocation} from './ConfirmLocation';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {TravelPoint} from '../interfaces/TravelInfo.interface';
import {useNavigation} from '@react-navigation/native';
import {RootStackParams} from '../navigator/navigation';
import {StackNavigationProp} from '@react-navigation/stack';
import {SelectShow} from './ModalizeContent/ModalizeContent';

interface Props {
  fromFocussed: boolean;
  setSelectShow: React.Dispatch<React.SetStateAction<SelectShow>>;
  updateFrom: (travelPoint: TravelPoint) => void;
  fromConfirmed: TravelPoint;
}

interface PropsNavigation
  extends StackNavigationProp<RootStackParams, 'TravelScreen'> {}

export const SelectLocation = ({
  fromFocussed,
  updateFrom,
  setSelectShow,
}: Props) => {
  const {pointUser, setTravelTo} = useContext(TravelContext);
  const [location, setlocation] = useState<TravelPoint>(pointUser);
  const [name, setName] = useState<string>('');
  const [address, setAddress] = useState<string>('');
  const navigation = useNavigation<PropsNavigation>();

  const hanleConfirm = () => {
    setSelectShow('history-to');
    if (fromFocussed) {
      updateFrom({
        name,
        address: location.address,
        coordinates: location.coordinates,
      });
    } else {
      setTravelTo({
        name: name,
        address: address,
        coordinates: location.coordinates,
      });
      navigation.navigate('TravelScreen');
    }
  };

  useEffect(() => {
    /* Buscar nombre y direccion */
    setName('Name ejemplo');
    setAddress('Address ejemplo');
  }, [location]);

  return (
    <>
      <TouchableOpacity
        style={{...styles.openMenuButton}}
        onPress={() => setSelectShow('history-to')}>
        <Icon name={'arrow-back'} color="black" size={30} />
      </TouchableOpacity>
      <View style={styles.container}>
        <MapView
          style={styles.map}
          initialRegion={{
            ...location.coordinates,
            latitudeDelta: 0.09,
            longitudeDelta: 0.04,
          }}
          onRegionChange={region =>
            setlocation({...location, coordinates: region})
          }>
          <Marker
            coordinate={{
              latitude: location.coordinates.latitude,
              longitude: location.coordinates.longitude,
            }}
            title={fromFocussed ? 'Inicio' : 'LLegada'}
            description={
              fromFocussed ? 'Inicio de la carrera' : 'LLegada de la carrera'
            }>
            <Image
              source={require('../assets/marker.png')}
              style={{width: 36, height: 40}}
              resizeMode="contain"
            />
          </Marker>
        </MapView>
        <ConfirmLocation
          onPress={hanleConfirm}
          fromFocussed={fromFocussed}
          name={name}
        />
      </View>
    </>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    height: 800,
    width: '100%',
    ...StyleSheet.absoluteFillObject,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  openMenuButton: {
    position: 'absolute',
    top: 15,
    left: 15,
    padding: 10,
    borderRadius: 100,
    backgroundColor: '#FDFDFD',
    zIndex: 100,

    shadowColor: 'rgba(0, 0, 0, 0.2)',
    shadowOpacity: 0.8,
    elevation: 6,
    shadowRadius: 15,
    shadowOffset: {width: 10, height: 13},
  },
});
