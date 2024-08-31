import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {Card} from '../interfaces/Card.interface';

export const SelectPaymentCard = ({number, type}: Card) => {
  return (
    <>
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          alignItems: 'center',
          paddingLeft: 10,
        }}>
        <Icon name="credit-card" size={24} color={'#c1c1c1'} />
        <Text style={styles.paymentText}>.... {number}</Text>
      </View>
    </>
  );
};
const styles = StyleSheet.create({
  paymentText: {fontSize: 18, fontWeight: '500', marginLeft: 10},

  container: {},
});
