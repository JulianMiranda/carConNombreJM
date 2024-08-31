import React from 'react';
import {Location} from '../interfaces/TravelInfo.interface';
import {StyleSheet, Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
interface Props {
  leftIcon: string;
  rightIcon: string;
  title: string;
  address: string;
  coordinates: Location;
}
export const Favorite = ({
  leftIcon,
  rightIcon,
  title,
  address,
  coordinates,
}: Props) => {
  return (
    <View style={styles.container}>
      <Icon
        name={leftIcon}
        size={26}
        color={'#5f5f5f'}
        style={styles.leftIcon}
      />
      <View style={styles.textContainer}>
        <Text style={styles.title}>{title}</Text>
        {address && <Text style={styles.address}>{address}</Text>}
      </View>
      <Icon
        name={rightIcon}
        size={26}
        color={'#c1c1c1'}
        style={styles.rightIcon}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  textContainer: {flex: 5},
  leftIcon: {flex: 1},
  rightIcon: {flex: 1},
  title: {fontSize: 18},
  address: {color: '#5f5f5f'},
});
