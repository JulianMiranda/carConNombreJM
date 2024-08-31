import React from 'react';
import {Fab} from '../../components/Fab';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {StackScreenProps} from '@react-navigation/stack';
import {RootStackParams} from '../../navigator/settingStack';

interface Props extends StackScreenProps<RootStackParams, 'EmailScreen'> {}

export const EmailScreen = ({route, navigation}: Props) => {
  const {email} = route.params;
  const {top, bottom} = useSafeAreaInsets();
  return (
    <>
      <Fab
        iconName={'arrow-back'}
        onPress={() => navigation.goBack()}
        style={{...styles.backButton, top: top + 15, zIndex: 99999999999}}
      />
      <View
        style={{
          paddingTop: top + 90,
          ...styles.body,
        }}>
        <Text style={{fontSize: 20, fontWeight: '600'}}>
          Cambiar correo electrónico
        </Text>
        <Text style={{fontSize: 16, marginTop: 10}}>
          {email
            ? `Tu correo electrónico actual es ${email.substring(0, 3)}` +
              '***' +
              `${email.substring(email.length - 9, email.length)}`
            : 'No tienes un correo electrónico vinculado a lu cuenta'}
        </Text>
        <Text style={{fontSize: 16, marginTop: 10}}>
          {email
            ? '¿Deseas cambiar tu dirección de correo actual?'
            : 'Añade una dirección de correo electrónico'}
        </Text>
      </View>
      <TouchableOpacity
        style={{
          ...styles.button,
          marginBottom: bottom + 15,
        }}
        activeOpacity={0.8}
        onPress={() => console.log('Cambiar correo')}>
        <Text style={{color: '#fff', fontSize: 16}}>
          {email ? 'Cambiar correo' : 'Añadir correo'}
        </Text>
      </TouchableOpacity>
    </>
  );
};

const styles = StyleSheet.create({
  backButton: {
    position: 'absolute',
    left: 15,
  },
  body: {paddingBottom: 30, marginLeft: 15, flex: 1},
  button: {
    backgroundColor: 'orange',
    paddingVertical: 10,
    alignItems: 'center',
    marginHorizontal: 15,
    borderRadius: 5,
  },
});
