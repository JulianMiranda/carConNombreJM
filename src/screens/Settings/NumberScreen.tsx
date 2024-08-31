import React from 'react';
import {Fab} from '../../components/Fab';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {StackScreenProps} from '@react-navigation/stack';
import {RootStackParams} from '../../navigator/settingStack';

interface Props extends StackScreenProps<RootStackParams, 'NumberScreen'> {}

export const NumberScreen = ({route, navigation}: Props) => {
  const {phoneNumber} = route.params;
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
          Cambiar número de teléfono
        </Text>
        <Text style={{fontSize: 16, marginTop: 10}}>
          Tu número de teléfono actual es {phoneNumber.substring(0, 3)}**
          {phoneNumber.substring(phoneNumber.length - 3, phoneNumber.length)}
        </Text>
        <Text style={{fontSize: 16, marginTop: 10}}>
          Importante: después de modificar tu número de teléfono, deberás
          iniciar sesión con tu nuevo número
        </Text>
      </View>
      <TouchableOpacity
        style={{
          ...styles.button,
          marginBottom: bottom + 15,
        }}
        activeOpacity={0.8}
        onPress={() => console.log('Cambiar número de telefono')}>
        <Text style={{color: '#fff', fontSize: 16}}>
          Cambiar número de teléfono
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
