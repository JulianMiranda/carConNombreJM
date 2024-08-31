import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {points} from '../DATA';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {SelectHistoryCard} from './SelectHistoryCard';
import {Balls} from './ModalizeContent/Balls';
import {HistoryTravel} from '../interfaces/TravelInfo.interface';

interface Props {
  selectedTravel: HistoryTravel;
  selectTravel: (travel: HistoryTravel) => void;
}

export const SelectModalizeContent = ({
  selectedTravel,
  selectTravel,
}: Props) => {
  const {top} = useSafeAreaInsets();
  const historial = [
    {
      from: points.Tumbaco,
      to: points.Carcelen,
      createdAt: '2022-09-14T23:38:25.206+00:00',
      cost: 6,
    },
    {
      from: points.Revival,
      to: points.Occidental,
      createdAt: '2022-09-16T23:38:25.206+00:00',
      cost: 3.5,
    },
    {
      from: points.Condado,
      to: points.MitadMundo,
      createdAt: '2023-10-01T15:18:25.206+00:00',
      cost: 5.35,
    },
    {
      from: points.Iess,
      to: points.PlazaBosque,
      createdAt: '2023-11-12T12:38:25.206+00:00',
      cost: 1.89,
    },
  ];

  return (
    <>
      <View style={{marginTop: top + 30, alignItems: 'center'}}>
        <Text style={{fontSize: 20, fontWeight: '600'}}>Mis viajes</Text>
      </View>
      <View
        style={{
          marginTop: 50,
          padding: 10,
          flex: 1,
          backgroundColor: '#fff',
        }}>
        {historial.map((hist, i) => (
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => selectTravel(hist)}
            style={{
              padding: 5,
              borderTopColor: '#e1e1e1',
              borderTopWidth: 1,
              flexDirection: 'row',
              alignItems: 'center',
            }}
            key={i}>
            <View style={{flex: 5}}>
              <SelectHistoryCard travel={hist} />
            </View>
            <View style={{flex: 1, alignItems: 'flex-end'}}>
              {JSON.stringify(selectedTravel) === JSON.stringify(hist) ? (
                <Balls color="orange" />
              ) : (
                <Balls color="#c1c1c1" />
              )}
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </>
  );
};
