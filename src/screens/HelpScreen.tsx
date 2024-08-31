import {DrawerScreenProps} from '@react-navigation/drawer';
import React, {useEffect, useRef, useState} from 'react';
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {points} from '../DATA';
import {HistoryCard} from '../components/HistoryCard';
import {Modalize} from 'react-native-modalize';
import {SelectModalizeContent} from '../components/SelectModalizeContent';
import {HistoryTravel} from '../interfaces/TravelInfo.interface';
import {HeaderScreen} from '../components/HeaderScreen';

interface Props extends DrawerScreenProps<any, any> {}

type Key = 'emergency' | 'quick' | 'opinion';

export const HelpScreen = ({navigation}: Props) => {
  const {top} = useSafeAreaInsets();
  const modalizeRef = useRef<Modalize>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedTravel, setSelectedTravel] = useState({
    from: {
      name: '',
      address: '',
      coordinates: {
        latitude: 0,
        longitude: 0,
      },
    },
    to: {
      name: '',
      address: '',
      coordinates: {
        latitude: 0,
        longitude: 0,
      },
    },
    createdAt: '',
    cost: 0,
  });

  useEffect(() => {
    /*Buscar ultimo viaje de la BD*/
    findLastTravel();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const delay = (ms: number) => new Promise(res => setTimeout(res, ms));

  const opinion = () => {};

  const selectTravel = (travel: HistoryTravel) => {
    setSelectedTravel(travel);
    modalizeRef.current?.close();
  };

  const findLastTravel = async () => {
    setIsLoading(true);
    await delay(200);
    setSelectedTravel({
      from: points.Tumbaco,
      to: points.Carcelen,
      createdAt: '2022-09-14T23:38:25.206+00:00',
      cost: 6,
    });
    setIsLoading(false);
  };

  const selectedComponent = (key: Key) => {
    switch (key) {
      case 'emergency':
        navigation.navigate('EmergencyScreen');
        break;
      case 'quick':
        navigation.navigate('QuickScreen', {travel: selectedTravel});
        break;
      case 'opinion':
        navigation.navigate('OpinionScreen');
        break;
    }
  };
  const menuOptions = generateOptions(selectedComponent);

  return (
    <>
      <HeaderScreen title="Ayuda" button="close" />
      <ScrollView style={styles.scroll}>
        {isLoading ? (
          <ActivityIndicator color={'black'} />
        ) : (
          <>
            <TouchableOpacity
              activeOpacity={0.8}
              style={styles.card}
              onPress={() => modalizeRef.current?.open()}>
              <HistoryCard travel={selectedTravel} />
              <View style={styles.selectView}>
                <Text style={{marginLeft: 15, color: 'orange'}}>
                  Selecciona otro viaje
                </Text>
              </View>
            </TouchableOpacity>
          </>
        )}
        <View
          style={{
            marginTop: 10,
          }}>
          {menuOptions.map((menu, index) => (
            <TouchableOpacity
              key={index.toString()}
              style={styles.cardContainer}
              onPress={menu.onPress}
              activeOpacity={0.8}>
              <View style={styles.cardInside}>
                <Icon
                  name={menu.iconNameLeft}
                  color={'#2F2F2F'}
                  size={menu.iconSizeRight}
                />
                <Text style={{...styles.name}}> {menu.title}</Text>
                <Icon
                  name={menu.iconNameRight}
                  color={'#2F2F2F'}
                  size={menu.iconSizeRight}
                />
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
      <Modalize
        modalStyle={{zIndex: 9999999999999, flex: 1, marginTop: top + 20}}
        ref={modalizeRef}>
        <SelectModalizeContent
          selectedTravel={selectedTravel}
          selectTravel={selectTravel}
        />
      </Modalize>
    </>
  );
};

function generateOptions(selectedComponent: any) {
  return [
    {
      title: 'Emergencias',
      iconType: 'material-community',
      iconNameLeft: 'shield',
      iconNameRight: 'chevron-right',
      iconSizeRight: 26,
      color: '#FF2E00',
      onPress: () => selectedComponent('emergency'),
    },
    {
      title: 'Ayuda rápida',
      iconType: 'material-community',
      iconNameLeft: 'info',
      iconNameRight: 'chevron-right',
      iconSizeRight: 26,
      color: '#21e462',
      onPress: () => selectedComponent('quick'),
    },

    {
      title: 'Tu opinión',
      iconType: 'material-community',
      iconNameLeft: 'domain',
      iconNameRight: 'chevron-right',
      iconSizeRight: 26,
      color: '#ecf024',
      onPress: () => selectedComponent('opinion'),
    },
  ];
}

const styles = StyleSheet.create({
  scroll: {
    flex: 1,
    backgroundColor: '#F4F4F4',
  },
  card: {
    padding: 5,
    paddingVertical: 30,
    marginBottom: 7,
    backgroundColor: '#fff',
  },
  selectView: {
    borderTopWidth: 1,
    borderTopColor: '#c1c1c1',
    marginTop: 15,
    paddingTop: 15,
    marginBottom: -15,
  },
  cardContainer: {
    paddingVertical: 20,
    backgroundColor: '#fff',
    paddingHorizontal: 10,

    borderTopWidth: 1,
    borderTopColor: '#F7F7F7',
  },
  name: {
    fontSize: 16,
    color: 'black',
    marginLeft: 5,
    flex: 1,
  },

  cardInside: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
