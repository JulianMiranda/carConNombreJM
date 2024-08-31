import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

export const FailedConnection = () => {
  const {top} = useSafeAreaInsets();
  return (
    <View style={{...styles.container, marginTop: top + 5}}>
      <Text style={styles.text}>En estos momentos no estás conectado</Text>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    width: '85%',
    alignSelf: 'center',
    borderRadius: 4,
    paddingVertical: 4,
    zIndex: 9999999999999999,
  },
  text: {
    color: '#FFF',
  },
});
