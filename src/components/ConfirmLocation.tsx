import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {GradientBackground} from './GradientBackground';
import {Balls} from './ModalizeContent/Balls';
interface Props {
  fromFocussed: boolean;
  onPress: () => void;
  name: string;
}
export const ConfirmLocation = ({onPress, fromFocussed, name}: Props) => {
  return (
    <>
      <GradientBackground>
        <View style={styles.container}>
          <Text style={{fontSize: 14, fontWeight: '700', marginBottom: 25}}>
            {fromFocussed ? 'Elige un inicio' : 'Elige un destino'}
          </Text>
          <View style={styles.searchContainer}>
            <Balls color="#55D61F" />
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => console.log('Editar')}>
              <Text style={{fontSize: 14, fontWeight: '600', paddingLeft: 25}}>
                {name}
              </Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            activeOpacity={0.8}
            style={styles.button}
            onPress={() => onPress()}>
            <Text style={{fontSize: 20, fontWeight: '500', color: '#fff'}}>
              {fromFocussed ? 'Confirmar el inicio' : 'Confirmar el destino'}
            </Text>
          </TouchableOpacity>
        </View>
      </GradientBackground>
    </>
  );
};
const styles = StyleSheet.create({
  container: {
    width: '95%',
    padding: 10,
    borderRadius: 20,
    paddingBottom: 20,
    backgroundColor: '#FDFDFD',
  },
  searchContainer: {
    flexDirection: 'row',
    backgroundColor: '#F3F3F3',
    alignItems: 'center',
    borderRadius: 15,
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  button: {
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
    borderRadius: 20,
    marginTop: 20,
  },
});
