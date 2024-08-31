import {DrawerScreenProps} from '@react-navigation/drawer';
import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialIcons';

interface Props extends DrawerScreenProps<any, any> {}

export const ShareScreen = ({navigation}: Props) => {
  const {top} = useSafeAreaInsets();
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

      <View style={{flex: 1, marginTop: top}}>
        <Text>ShareScreen</Text>
      </View>
    </>
  );
};
