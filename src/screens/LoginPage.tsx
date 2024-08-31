import React, {useState} from 'react';
import {Image, StyleSheet, Text, TextInput, View} from 'react-native';
import {Fab} from '../components/Fab';
import {DrawerScreenProps} from '@react-navigation/drawer';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {LoginIcon} from '../components/LoginIcon';

interface Props extends DrawerScreenProps<any, any> {}
export const LoginPage = ({navigation}: Props) => {
  const {top} = useSafeAreaInsets();
  const [phone, setPhone] = useState('');
  const handleCloseButton = () => {
    navigation.goBack();
  };

  const handleLoginIcon = (icon: string) => {
    console.log('Login icon', icon);
  };

  return (
    <>
      <Fab
        iconName="close"
        onPress={handleCloseButton}
        style={{...styles.backButton, top: top + 15, zIndex: 99999999999}}
      />
      <View style={styles.container}>
        <Image
          source={require('../assets/CarAppBackground.png')}
          style={styles.image}
          resizeMode="contain"
        />
        <View style={styles.movil}>
          <Text style={styles.text}>Comencemos</Text>
          <View style={styles.containerInput}>
            <View>
              <Text style={styles.code}>+593</Text>
            </View>
            <TextInput
              value={phone}
              onChangeText={setPhone}
              style={styles.input}
              placeholder="Ingresa tu celular"
            />
          </View>
          <View style={styles.icons}>
            <LoginIcon
              name="facebook"
              onPress={() => handleLoginIcon('facebook')}
            />
            <LoginIcon name="login" onPress={() => handleLoginIcon('google')} />
            <LoginIcon name="apple" onPress={() => handleLoginIcon('apple')} />
          </View>
        </View>
      </View>
    </>
  );
};
const styles = StyleSheet.create({
  backButton: {
    position: 'absolute',
    left: 15,
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {flex: 5},
  movil: {
    flex: 2,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 20,
    paddingBottom: 20,
  },
  movilInside: {
    backgroundColor: 'fff',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
  },
  text: {
    flex: 2,
    fontSize: 24,
    fontWeight: 'bold',
  },
  code: {fontSize: 16, fontWeight: 'bold', marginRight: 5},
  containerInput: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    paddingHorizontal: 30,
    paddingVertical: 15,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
  },
  input: {
    backgroundColor: '#f5f5f5',
    paddingHorizontal: 20,
    paddingVertical: 5,
  },
  icons: {
    flex: 2,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
});
