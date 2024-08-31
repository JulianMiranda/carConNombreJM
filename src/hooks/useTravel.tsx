import {useContext, useEffect, useState} from 'react';
import {useToast} from 'react-native-toast-notifications';
import {AuthContext} from '../context/auth/AuthContext';
import {TravelContext} from '../context/travel/TravelContext';
import {useNavigation} from '@react-navigation/native';
import {RootStackParams} from '../navigator/navigation';
import {StackNavigationProp} from '@react-navigation/stack';
import {TravelType} from '../interfaces/Travel.type';

interface PropsNavigation
  extends StackNavigationProp<RootStackParams, 'TravelScreen'> {}
export const useTravel = () => {
  const {user} = useContext(AuthContext);
  const {travelValue, travelType, calculatePriceTravel} =
    useContext(TravelContext);
  const toast = useToast();

  const [textButton, setTextButton] = useState('Confirmar express');

  const navigation = useNavigation<PropsNavigation>();

  useEffect(() => {
    calculatePriceTravel();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    updateTextButton(travelType);
  }, [travelType]);
  const updateTextButton = (travelTypeOpt: TravelType) => {
    switch (travelTypeOpt) {
      case 'fast':
        setTextButton('Confirmar express');
        break;
      case 'fast-shared':
        setTextButton('Express compartido');
        break;
      case 'schedule':
        setTextButton('Agendar express');
        break;
      case 'schedule-shared':
        setTextButton('Agendar compartido');
        break;

      default:
        break;
    }
  };
  const handleConfirm = () => {
    if (travelValue === 0) {
      return toast.show('Ups, algo falló, inténtelo más tarde', {
        type: 'normal',
        placement: 'top',
        duration: 3000,
        style: {
          zIndex: 9999,
          justifyContent: 'center',
          borderRadius: 8,
          marginTop: 35,
          paddingHorizontal: 20,
          paddingVertical: 10,

          backgroundColor: 'rgba(255, 71, 71, 0.92)',
        },
        textStyle: {fontSize: 16, fontWeight: 'bold'},
        animationType: 'zoom-in',
      });
    }
    if (user) {
      navigation.navigate('SearchingTravelScreen');
    } else {
      toast.show('Revisa tu conexión a Internet', {
        type: 'normal',
        placement: 'top',
        duration: 3000,
        style: {
          zIndex: 9999,
          justifyContent: 'center',
          borderRadius: 8,
          marginTop: 35,
          paddingHorizontal: 20,
          paddingVertical: 10,

          backgroundColor: 'rgba(255, 71, 71, 0.92)',
        },
        textStyle: {fontSize: 16, fontWeight: 'bold'},
        animationType: 'zoom-in',
      });
    }
  };

  const openModal = () => {
    navigation.navigate('SelectPaymentScreen');
  };

  return {
    textButton,
    handleConfirm,
    openModal,
  };
};
