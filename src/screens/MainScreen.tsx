import React, {useContext, useRef} from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {Map} from '../components/Map';
import {TakeTravel} from '../components/TakeTravel';
import {DrawerScreenProps} from '@react-navigation/drawer';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {AuthContext} from '../context/auth/AuthContext';
import {Modalize} from 'react-native-modalize';
import {ModalizeContent} from '../components/ModalizeContent/ModalizeContent';
import {FailedConnection} from '../components/FailedConnection';
import {useSocket} from '../context/SocketContext';

interface Props extends DrawerScreenProps<any, any> {}
export const MainScreen = ({navigation}: Props) => {
  const {status} = useContext(AuthContext);
  const {online} = useSocket();

  const {top} = useSafeAreaInsets();
  const modalizeRef = useRef<Modalize>(null);
  const handleMenu = () => {
    if (status === 'authenticated') {
      navigation.toggleDrawer();
    } else {
      navigation.navigate('LoginPage');
    }
  };
  const openModal = () => modalizeRef.current?.open();
  return (
    <>
      {!online && <FailedConnection />}
      <TouchableOpacity
        style={{...styles.openMenuButton, marginTop: top}}
        onPress={handleMenu}>
        <Icon name={'clear-all'} color="black" size={30} />
      </TouchableOpacity>
      <View style={styles.mapContainer}>
        <Map />
        <TakeTravel openModal={openModal} />
      </View>
      <Modalize
        modalStyle={{...styles.modalize, marginTop: top + 20}}
        ref={modalizeRef}>
        <ModalizeContent />
      </Modalize>
    </>
  );
};
const styles = StyleSheet.create({
  openMenuButton: {
    position: 'absolute',
    top: 15,
    left: 15,
    padding: 10,
    borderRadius: 100,
    backgroundColor: '#FDFDFD',
    zIndex: 1,
    shadowColor: 'rgba(0, 0, 0, 0.2)',
    shadowOpacity: 0.8,
    elevation: 6,
    shadowRadius: 15,
    shadowOffset: {width: 10, height: 13},
  },
  mapContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalize: {
    zIndex: 999,
    flex: 1,
  },
});
