import React from 'react';
import {HeaderScreen} from '../../components/HeaderScreen';
import {StyleSheet, Text, View} from 'react-native';

export const CallScreen = () => {
  return (
    <>
      <HeaderScreen title="Contáctanos" button="arrow-back" />
      <View style={styles.body}>
        <Text style={styles.title}>Contáctate con nosotros</Text>
        <Text style={styles.text}>
          Si te encuentras en una situación de emergencia o riesgo, puedes
          presionar el botón de emergencia en la app que te conecta con la Línea
          de Emergencia 911.
        </Text>
        <Text style={styles.text}>
          También puedes reportar el caso al número +593 962914922. Recuerda que
          en esta linea únicamente se dará soporte a casos de emergencia.
        </Text>
        <Text style={styles.text}>
          Si necesitas comunicarte con un agente para tener información sobre el
          uso de la aplicación o reportar situaciones diferentes a un caso de
          emergencia, por favor contáctanos a nuestro chat en vivo.
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
