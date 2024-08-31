import React, {useState} from 'react';
import {Fab} from '../../components/Fab';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {StackScreenProps} from '@react-navigation/stack';
import {RootStackParams} from '../../navigator/settingStack';
import Icon from 'react-native-vector-icons/MaterialIcons';

interface Props extends StackScreenProps<RootStackParams, 'PasswordScreen'> {}

export const PasswordScreen = ({navigation}: Props) => {
  const {top, bottom} = useSafeAreaInsets();
  const [actualPassword, setactualPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [hideNewPassword, setHideNewPassword] = useState(true);
  const [hideActualPassword, setHideActualPassword] = useState(true);
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
        <Text style={{fontSize: 16, marginTop: 10}}>
          Ingresa la contraseña actual y luego la nueva. Esta debe tener entre 8
          y 16 caracteres e incluir al menos 1 número, letras o signos
        </Text>
        <View style={styles.containerInputs}>
          <View
            style={{
              borderBottomWidth: 1,
              borderBottomColor: '#c1c1c1',
              marginTop: 20,
              paddingTop: 15,
              marginHorizontal: 20,
              paddingBottom: 3,
            }}>
            <TextInput
              secureTextEntry={hideActualPassword}
              value={actualPassword}
              onChangeText={setactualPassword}
              style={{fontSize: 18}}
              placeholder="Contraseña actual"
            />
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => setHideActualPassword(!hideActualPassword)}
              style={{
                position: 'absolute',
                right: 0,
                bottom: 0,
                padding: 5,
              }}>
              <Icon
                size={22}
                color={'#5A5A5A'}
                name={hideActualPassword ? 'visibility' : 'visibility-off'}
              />
            </TouchableOpacity>
          </View>
          <View
            style={{
              borderBottomWidth: 1,
              borderBottomColor: '#c1c1c1',
              marginTop: 20,
              paddingTop: 15,
              marginHorizontal: 20,
              paddingBottom: 3,
            }}>
            <TextInput
              secureTextEntry={hideNewPassword}
              value={newPassword}
              onChangeText={setNewPassword}
              style={{fontSize: 18}}
              placeholder="Contraseña nueva"
            />
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => setHideNewPassword(!hideNewPassword)}
              style={{position: 'absolute', right: 0, bottom: 0, padding: 5}}>
              <Icon
                color={'#5A5A5A'}
                name={hideNewPassword ? 'visibility' : 'visibility-off'}
                size={22}
              />
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            activeOpacity={0.8}
            style={{paddingBottom: 15, marginTop: 10}}>
            <Text
              style={{
                fontSize: 12,
                marginTop: 10,
                marginLeft: 20,
                color: '#5A5A5A',
              }}>
              Olvidé mi contraseña
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <TouchableOpacity
        style={{
          ...styles.button,
          marginBottom: bottom + 15,
        }}
        activeOpacity={0.8}
        onPress={() => console.log('Cambiar contraseña')}>
        <Text style={{color: '#fff', fontSize: 16}}>Cambiar contraseña</Text>
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
  containerInputs: {},
});
