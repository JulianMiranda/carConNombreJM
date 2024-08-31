import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {HeaderScreen} from '../../components/HeaderScreen';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {StackScreenProps} from '@react-navigation/stack';
import {RootStackParams} from '../../navigator/helpStack';

type Key = 'doubts' | 'wrong-route' | 'empty-travel' | 'late-end';

interface Props extends StackScreenProps<RootStackParams, 'WrongRouteScreen'> {}

export const QuickScreen = ({route, navigation}: Props) => {
  const {travel} = route.params;

  const selectedComponent = (key: Key) => {
    switch (key) {
      case 'doubts':
        navigation.navigate('DoubtsScreen');
        break;
      case 'wrong-route':
        navigation.navigate('WrongRouteScreen', {travel});
        break;
      case 'empty-travel':
        navigation.navigate('EmptyTravelScreen', {travel});
        break;
      case 'late-end':
        navigation.navigate('LateEndScreen', {travel});
        break;
    }
  };
  const menuOptions = generateOptions(selectedComponent);

  return (
    <>
      <HeaderScreen title="Ayuda rápida" button="arrow-back" />
      <View style={styles.body}>
        {menuOptions.map((menu, index) => (
          <View key={index.toString()}>
            <TouchableOpacity
              style={styles.cardContainer}
              onPress={menu.onPress}
              activeOpacity={0.8}>
              <View style={styles.cardInside}>
                <Text style={{...styles.name}}> {menu.title}</Text>

                <Icon
                  name={menu.iconNameRight}
                  color={'#F0F0F0'}
                  size={menu.iconSizeRight}
                />
              </View>
            </TouchableOpacity>
          </View>
        ))}
      </View>
    </>
  );
};

function generateOptions(selectedComponent: any) {
  return [
    {
      title: 'Dudas sobre mis promociones',
      iconType: 'material-community',

      iconNameRight: 'chevron-right',
      iconSizeRight: 26,
      color: '#FF2E00',
      onPress: () => selectedComponent('doubts'),
    },
    {
      title: 'El socio conductor tomó una ruta más larga',
      iconType: 'material-community',

      iconNameRight: 'chevron-right',
      iconSizeRight: 26,
      color: '#21e462',
      onPress: () => selectedComponent('wrong-route'),
    },

    {
      title: 'El viaje inició sin mí',
      iconType: 'material-community',

      iconNameRight: 'chevron-right',
      iconSizeRight: 26,
      color: '#ecf024',
      onPress: () => selectedComponent('empty-travel'),
    },

    {
      title: 'El socio conductor tardó en finalizar mi viaje',
      iconType: 'material-community',

      iconNameRight: 'chevron-right',
      iconSizeRight: 26,
      color: '#ecf024',
      onPress: () => selectedComponent('late-end'),
    },
  ];
}
const styles = StyleSheet.create({
  body: {},
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
  cardContainer: {
    paddingVertical: 20,
    backgroundColor: '#fff',
    paddingHorizontal: 10,

    borderTopWidth: 1,
    borderTopColor: '#F7F7F7',
  },
});
