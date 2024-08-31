import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {HeaderScreen} from '../../components/HeaderScreen';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParams} from '../../navigator/helpStack';

type Key = 'report' | 'accident' | 'different-parner' | 'devices' | 'call';

interface PropsNavigation
  extends StackNavigationProp<RootStackParams, 'EmergencyScreen'> {}

export const EmergencyScreen = () => {
  const navigation = useNavigation<PropsNavigation>();

  const selectedComponent = (key: Key) => {
    switch (key) {
      case 'report':
        navigation.navigate('ReportScreen');
        break;
      case 'accident':
        navigation.navigate('AccidentScreen');
        break;
      case 'different-parner':
        navigation.navigate('DifferentParnerScreen');
        break;
      case 'call':
        navigation.navigate('CallScreen');
        break;
    }
  };
  const menuOptions = generateOptions(selectedComponent);
  return (
    <>
      <HeaderScreen title="Emergencias" button="arrow-back" />
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
      title: 'Reportar un caso de emergencia',
      iconType: 'material-community',

      iconNameRight: 'chevron-right',
      iconSizeRight: 26,
      color: '#FF2E00',
      onPress: () => selectedComponent('report'),
    },
    {
      title: 'Estuve involucrado en un accidente',
      iconType: 'material-community',

      iconNameRight: 'chevron-right',
      iconSizeRight: 26,
      color: '#21e462',
      onPress: () => selectedComponent('accident'),
    },

    {
      title: 'El socio conductor no era el mismo',
      iconType: 'material-community',

      iconNameRight: 'chevron-right',
      iconSizeRight: 26,
      color: '#ecf024',
      onPress: () => selectedComponent('different-parner'),
    },

    {
      title: 'Contáctanos',
      iconType: 'material-community',

      iconNameRight: 'chevron-right',
      iconSizeRight: 26,
      color: '#ecf024',
      onPress: () => selectedComponent('call'),
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
