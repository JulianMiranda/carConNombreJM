import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {formatToCurrency} from '../utils/formatToCurrency';
import moment from 'moment';
import {Balls} from './ModalizeContent/Balls';

interface Props {
  travel: {
    from: {
      name: string;
      address: string;
      coordinates: {
        latitude: number;
        longitude: number;
      };
    };
    to: {
      name: string;
      address: string;
      coordinates: {
        latitude: number;
        longitude: number;
      };
    };
    createdAt: string;
    cost: number;
  };
}
export const HistoryCard = ({travel}: Props) => {
  return (
    <>
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          marginBottom: 10,
          marginLeft: 5,
        }}>
        <View style={{flex: 5, flexDirection: 'row'}}>
          <Icon name="history" size={16} color={'#c1c1c1'} />
          <Text style={{marginLeft: 5}}>
            {moment(travel.createdAt).calendar()}
          </Text>
        </View>
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'flex-end',
            paddingRight: 10,
          }}>
          <Text>{formatToCurrency(travel.cost)}</Text>
        </View>
      </View>
      <View style={{flexDirection: 'row', minHeight: 60, marginTop: 10}}>
        <View
          style={{
            flex: 1,
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <Balls color="green" style={{padding: 0}} />
          <View
            style={{
              flex: 1,
              width: 1,
              backgroundColor: '#c1c1c1',
            }}
          />
          <Balls color="orange" style={{padding: 0}} />
        </View>
        <View
          style={{
            flex: 11,
            justifyContent: 'space-between',
            alignItems: 'flex-start',
          }}>
          <Text numberOfLines={1}>{travel.from.address}</Text>
          <Text numberOfLines={1}>{travel.to.address}</Text>
        </View>
      </View>
    </>
  );
};
