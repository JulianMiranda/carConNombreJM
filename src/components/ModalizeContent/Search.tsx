import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {Manual} from './Manual';
import {TravelPoint} from '../../interfaces/TravelInfo.interface';
import {points} from '../../DATA';
interface Props {
  onPress: (travelPoint: TravelPoint) => void;
}
export const Search = ({onPress}: Props) => {
  const searchs = [points.Revival, points.Recreo, points.Carcelen];

  return (
    <View>
      {searchs.map(search => (
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() =>
            onPress({name: search.name, coordinates: search.coordinates})
          }
          key={search.name}
          style={styles.search}>
          <View style={styles.containerIcon}>
            <Icon name="location-on" size={22} color={'#9F9F9F'} />
          </View>
          <View style={styles.addressContainer}>
            <Text style={styles.text}>{search.name}</Text>
            <Text style={styles.textAddress}>{search.address}</Text>
          </View>
        </TouchableOpacity>
      ))}
      <View style={styles.separator} />
      {/* <Manual onPress={handleManual} /> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  addressContainer: {flex: 8},
  search: {
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
  separator: {
    width: '100%',
    height: 7,
    backgroundColor: '#f1f1f1',
    marginVertical: 10,
  },
});
