import React from 'react';
import {HeaderScreen} from '../../components/HeaderScreen';
import {StyleSheet, Text, View} from 'react-native';

export const AccidentScreen = () => {
  return (
    <>
      <HeaderScreen title="¿Tuviste un accidente?" button="arrow-back" />
      <View style={styles.body}>
        <Text style={styles.title}>Estuve involucrado en un accidente</Text>
        <Text style={styles.text}>
          Lamentamos que hayas tenido una situación desagradable durante tu
          viaje, pero haremos todo lo posible para ayudarte. Si tuviste un
          accidente de tránsito durante el viaje, cuentas con la ayuda de un
          equipo especializado que ofrece asistencia inmediata a través del
          Centro de Seguridad.
        </Text>
        <Text style={styles.text}>
          Para acceder al Centro de Seguridad, haz clic en el botón"Seguridad"
          en la pantalla principal de tu aplicación. En el Centro de Seguridad
          atendemos las 24 horas del día los 7 días de la semana con un equipo
          dedicado para atender solo casos relacionados con tu seguridad física,
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
