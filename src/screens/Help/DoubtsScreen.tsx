import React from 'react';
import {HeaderScreen} from '../../components/HeaderScreen';
import {StyleSheet, Text, View} from 'react-native';

export const DoubtsScreen = () => {
  return (
    <>
      <HeaderScreen title="Promociones" button="arrow-back" />
      <View style={styles.body}>
        <Text style={styles.title}>Códigos promocionales</Text>
        <Text style={styles.text}>
          Usualmente se obtienen como parte de alguna campaña y debes agregarlos
          manualmente desde la opción "Códigos promocionales".
        </Text>
        <Text style={styles.text}>
          Recuerda: El sistema elige automáticamente el cupón que se aplicará en
          el viaje, la lógica de esta elección se basa en el mayor descuento
          posible, dejando el menor monto de pago posible.
        </Text>
      </View>
    </>
  );
};
const styles = StyleSheet.create({
  body: {backgroundColor: '#fff', paddingVertical: 20, paddingHorizontal: 10},
  title: {fontSize: 20},
  text: {fontSize: 16, marginTop: 20},
});
