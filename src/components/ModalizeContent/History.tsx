import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {TravelPoint} from '../../interfaces/TravelInfo.interface';
import {points} from '../../DATA';

interface Props {
  onPress: (travelPoint: TravelPoint) => void;
}

export const History = ({onPress}: Props) => {
  const testHistory = [
    points.Carcelen,
    points.PlazaBosque,
    points.Revival,
    points.Iess,
  ];

  return (
    <View>
      {testHistory.map(hist => (
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() =>
            onPress({
              name: hist.name,
              address: hist.address,
              coordinates: hist.coordinates,
            })
          }
          key={hist.name}
          style={styles.hist}>
          <View style={styles.historyIcon}>
            <Icon name="history" size={22} color={'#9F9F9F'} />
          </View>
          <View style={styles.addressContainer}>
            <Text style={styles.text}>{hist.name}</Text>
            <Text style={styles.textAddress}>{hist.address}</Text>
          </View>
          <Icon
            name="chevron-right"
            size={16}
            color={'#9F9F9F'}
            style={styles.chevronIcon}
          />
        </TouchableOpacity>
      ))}
    </View>
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
  historyIcon: {
    flex: 1,
    alignSelf: 'center',
    alignItems: 'center',
  },
  chevronIcon: {
    flex: 1,
    alignSelf: 'center',
    alignItems: 'center',
  },
});
