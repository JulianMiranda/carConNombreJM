import React, {useContext, useEffect, useState} from 'react';
import {ActivityIndicator, StyleSheet, Text, View} from 'react-native';
import {TravelContext} from '../context/travel/TravelContext';
import {AnimatedText} from './AnimatedText';
import {CarImage} from './CarImage';
import {DateTimePickerComponent} from './Date';

interface Props {}

export const AcceptTravel = ({}: Props) => {
  const {travelValue, travelDate, travelType, loadingCalculatedTravel} =
    useContext(TravelContext);

  const [showPicker, setShowPicker] = useState(false);

  const updateAgendedText = (date: Date) => {
    const horas = date.getHours().toString().padStart(2, '0');
    const minutos = date.getMinutes().toString().padStart(2, '0');
    const dia = date.getDate().toString().padStart(2, '0');
    const mes = (date.getMonth() + 1).toString().padStart(2, '0');
    const anio = date.getFullYear().toString().slice(-2);

    const formatoFechaHora = `${horas}:${minutos} ${dia}-${mes}-${anio}`;
    return formatoFechaHora;
  };
  const [scheduleText, setAgendedText] = useState(
    updateAgendedText(new Date()),
  );
  const fastText = '👇 Pograma tu viaje para después';

  const fechaActual = new Date();
  const fechaFutura = new Date(fechaActual);
  fechaFutura.setMinutes(fechaFutura.getMinutes() + 10);

  useEffect(() => {
    setAgendedText(updateAgendedText(travelDate));
  }, [travelDate]);

  const handleCalendar = () => {
    setShowPicker(true);
  };

  return (
    <>
      <View style={styles.container}>
        <View style={styles.price}>
          {travelType === 'fast' ? (
            <AnimatedText text={fastText} />
          ) : (
            <AnimatedText text={scheduleText} />
          )}
          <View style={styles.carContainer}>
            <CarImage style={styles.image} onPress={handleCalendar} />
            <View>
              <Text style={styles.title}>
                {travelType === 'fast' ? 'Express' : 'Agendado'}
              </Text>
              <Text style={styles.text}>
                {travelType === 'fast'
                  ? 'Rápido y económico'
                  : 'Seguro y fiable'}
              </Text>
            </View>
          </View>
          <View>
            {loadingCalculatedTravel ? (
              <ActivityIndicator size={26} style={styles.activity} />
            ) : (
              <>
                {travelValue === 0 ? (
                  <>
                    <Text style={styles.textPrice}>
                      <Text style={styles.textPriceDollar}>$</Text>
                      N/A
                    </Text>
                  </>
                ) : (
                  <>
                    <Text style={styles.textPrice}>
                      <Text style={styles.textPriceDollar}>$</Text>
                      {travelValue}
                    </Text>
                  </>
                )}
              </>
            )}
          </View>
        </View>
      </View>
      <DateTimePickerComponent
        showPicker={showPicker}
        setShowPicker={setShowPicker}
      />
    </>
  );
};
const styles = StyleSheet.create({
  container: {backgroundColor: '#FDFDFD', borderRadius: 20},
  carContainer: {flexDirection: 'row', alignItems: 'center'},
  price: {
    zIndex: 999999999999999,
    backgroundColor: '#fff',
    width: '100%',
    flexDirection: 'row',
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 10,
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
  },
  title: {fontSize: 26, fontWeight: 'bold'},
  textPrice: {fontSize: 26, fontWeight: 'bold', marginRight: 10},
  textPriceDollar: {fontSize: 18, fontWeight: 'bold', marginRight: 10},
  text: {fontSize: 16, color: '#5f5f5f'},

  containerCalendar: {
    marginTop: 10,
    paddingVertical: 20,
    flexDirection: 'row',
    backgroundColor: '#fff',
    width: '100%',
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'space-between',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    elevation: 6,
  },
  activity: {marginRight: 20},
});
