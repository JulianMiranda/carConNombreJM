import {DrawerScreenProps} from '@react-navigation/drawer';
import React from 'react';
import {
  ActivityIndicator,
  FlatList,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {points} from '../DATA';
import {HistoryCard} from '../components/HistoryCard';

interface Props extends DrawerScreenProps<any, any> {}

export const HistoryScreen = ({navigation}: Props) => {
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
      <TouchableOpacity
        style={{
          marginTop: top,
          position: 'absolute',
          top: 15,
          left: 15,
          padding: 10,
          borderRadius: 100,
          backgroundColor: '#ECECEC',
          zIndex: 10,

          shadowColor: 'rgba(0, 0, 0, 0.2)',
          shadowOpacity: 0.8,
          elevation: 6,
          shadowRadius: 15,
          shadowOffset: {width: 10, height: 13},
        }}
        /*  style={{position: 'absolute', left: 25, top: 25}} */
        onPress={() => {
          navigation.navigate('Stack');
          navigation.toggleDrawer();
        }}>
        <Icon name={'close'} color="black" size={30} />
      </TouchableOpacity>

      <View style={{marginTop: top + 30, alignItems: 'center'}}>
        <Text style={{fontSize: 20, fontWeight: '600'}}>Mis viajes</Text>
      </View>
      <View
        style={{
          marginTop: 50,
          padding: 10,
          flex: 1,
          backgroundColor: '#F4F4F4',
        }}>
        <FlatList
          ListHeaderComponent={
            <Text
              style={{
                color: '#c1c1c1',
                fontSize: 18,
                marginBottom: 10,
                fontWeight: '400',
              }}>
              Finalizados
            </Text>
          }
          data={historial}
          keyExtractor={(category, index) => index.toString()}
          showsVerticalScrollIndicator={false}
          onEndReached={() => (
            <ActivityIndicator
              color={'black'}
              style={{justifyContent: 'center', alignItems: 'center'}}
            />
          )}
          onEndReachedThreshold={0.4}
          renderItem={({item}) => (
            <TouchableOpacity
              activeOpacity={0.8}
              style={{
                padding: 5,
                paddingVertical: 30,
                marginBottom: 7,
                backgroundColor: '#fff',
                shadowColor: 'rgba(0, 0, 0, 0.2)',
                shadowOpacity: 0.8,
                elevation: 6,
                shadowRadius: 15,
                shadowOffset: {width: 10, height: 13},
              }}>
              <HistoryCard travel={item} />
            </TouchableOpacity>
          )}
        />
      </View>
    </>
  );
};
