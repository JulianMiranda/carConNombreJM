import React from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

interface Props {
  onPress: React.Dispatch<React.SetStateAction<string>>;
}
export const ClearInput = ({onPress}: Props) => {
  return (
    <TouchableOpacity style={styles.icon} onPress={() => onPress('')}>
      <Icon name={'clear'} color="#c1c1c1" size={15} />
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  icon: {
    position: 'absolute',
    top: 8,
    right: 25,
    padding: 10,
    zIndex: 1000000000,
  },
});
