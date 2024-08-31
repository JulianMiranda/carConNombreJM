import React, {useContext, useEffect, useState} from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {ThemeContext} from '../context/theme/ThemeContext';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {TravelContext} from '../context/travel/TravelContext';
import {useNavigation} from '@react-navigation/native';
import {AuthContext} from '../context/auth/AuthContext';

interface Props {}
export const SearchingTravel = ({}: Props) => {
  const {
    theme: {colors},
  } = useContext(ThemeContext);
  const {travelValue, selectedPayment, searchingTravel} =
    useContext(TravelContext);
  const {user} = useContext(AuthContext);
  const {bottom} = useSafeAreaInsets();
  const navigation = useNavigation();

  const cancelTravel = () => {
    handleSearchingTravel(false);
    navigation.goBack();
  };

  useEffect(() => {
    handleSearchingTravel(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [mins, setMinutes] = useState(4);
  const [secs, setSeconds] = useState(59);

  useEffect(() => {
    let sampleInterval = setInterval(() => {
      if (secs > 0) {
        setSeconds(secs - 1);
      }
      if (secs === 0) {
        if (mins === 0) {
          clearInterval(sampleInterval);
        } else {
          setMinutes(mins - 1);
          setSeconds(59);
        }
      }
    }, 1000);
    return () => {
      clearInterval(sampleInterval);
    };
  }, [mins, secs]);

  const handleSearchingTravel = (handle: boolean) => {
    console.log('handleSearchingTravel', user);
    if (user) {
      console.log('crear o cancelar Travel', handle);
      searchingTravel({handle, userId: user!.id});
    }
  };

  return (
    <>
      <View style={styles.container}>
        <View style={styles.price}>
          <Text style={styles.conductors}>13 conductores cerca de ti</Text>
          <Image style={styles.image} source={require('../assets/200w.gif')} />
          <Text style={styles.conductors}>
            {mins}:{secs}
          </Text>
          <View style={{justifyContent: 'center', alignItems: 'center'}}>
            <Text style={styles.textPrice}>
              {' -  '} {travelValue} {selectedPayment.currency}
              {'  - '}
            </Text>
            <Text style={styles.textPriceDollar}>
              {selectedPayment.type === 'cash' ? 'Efectivo' : 'Transferencia'}
            </Text>
          </View>
        </View>
      </View>
      <TouchableOpacity
        style={{
          ...styles.button,
          marginBottom: bottom + 20,
          backgroundColor: colors.primary,
        }}
        activeOpacity={0.8}
        onPress={cancelTravel}>
        <Text style={styles.textConfirm}>Cancelar</Text>
      </TouchableOpacity>
    </>
  );
};
const styles = StyleSheet.create({
  container: {backgroundColor: '#FDFDFD', borderRadius: 20, marginBottom: 10},
  conductors: {fontSize: 16, fontWeight: 'bold', marginTop: 10},
  carContainer: {flexDirection: 'row', alignItems: 'center'},
  price: {
    zIndex: 999999999999999,
    backgroundColor: '#fff',
    width: '100%',
    borderRadius: 14,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    elevation: 6,
  },
  image: {
    height: 100,
    width: 100,
    borderRadius: 50,
  },
  title: {fontSize: 26, fontWeight: 'bold'},
  textPrice: {fontSize: 24, fontWeight: 'bold'},
  textPriceDollar: {
    fontSize: 18,
    fontWeight: '500',
    marginBottom: 5,
  },
  text: {fontSize: 16, color: '#5f5f5f'},
  paymentType: {
    paddingVertical: 30,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },
  paymentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  paymentText: {fontSize: 18, fontWeight: 'bold', marginLeft: 10},
  rightIcon: {color: '#5f5f5f'},
  textConfirm: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 20,
  },
  button: {
    paddingVertical: 10,
    alignItems: 'center',
    marginHorizontal: 15,
    borderRadius: 5,
  },
});
