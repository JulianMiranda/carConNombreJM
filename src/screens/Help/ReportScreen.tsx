import React from 'react';
import {HeaderScreen} from '../../components/HeaderScreen';
import {StyleSheet, Text, View} from 'react-native';

export const ReportScreen = () => {
  return (
    <>
      <HeaderScreen title="Reportar una emergencia" button="arrow-back" />
      <View style={styles.body}>
        <Text style={styles.title}>Reportar un caso de emergencia</Text>
        <Text style={styles.text}>
          Si te encuentras en una situación de emergencia o riesgo, puedes
          presionar el botón de emergencia en la app que te conecta con la Línea
          Nacional de Emergencia 911.
        </Text>
        <Text style={styles.text}>
          Si no te encuentras en riesgo y quieres comunicarte con nosotros para
          reportar una situación de emergencia, por favor da clic en "No
          resuelta".
        </Text>
        <Text style={styles.text}>
          Nota: Ten en cuenta que estos servicios no buscan reemplazar las
          líneas oficiales de emergencia del estado y son solo para el soporte
          de alquileres asignados a través de la plataforma.
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
