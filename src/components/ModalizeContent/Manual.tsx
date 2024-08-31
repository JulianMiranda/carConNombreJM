import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

interface Props {
  onPress: () => void;
}

export const Manual = ({onPress}: Props) => {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={() => onPress()}
      style={styles.hist}>
      <View style={styles.containerIcon}>
        <Icon name="add-location" size={22} color={'#9F9F9F'} />
      </View>
      <View style={styles.addressContainer}>
        <Text style={styles.text}>Señalar ubicación en el mapa</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  addressContainer: {flex: 8},
  hist: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
  },
  text: {marginHorizontal: 3, fontSize: 14},
  textAddress: {
    marginHorizontal: 3,
    fontSize: 12,
    color: '#9F9F9F',
    marginTop: 2,
  },
  containerIcon: {
    flex: 1,
    alignSelf: 'center',
    alignItems: 'center',
  },
});
