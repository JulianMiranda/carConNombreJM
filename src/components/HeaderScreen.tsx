import React from 'react';
import {Fab} from './Fab';
import {StyleSheet, Text, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useNavigation} from '@react-navigation/native';

interface Props {
  title: string;
  button: 'close' | 'arrow-back';
}
export const HeaderScreen = ({button, title}: Props) => {
  const {top} = useSafeAreaInsets();
  const navigation = useNavigation<any>();
  return (
    <>
      <Fab
        iconName={button}
        onPress={() => {
          navigation.goBack();
          if (button === 'close') {
            navigation.toggleDrawer();
          }
        }}
        style={{...styles.backButton, top: top + 15}}
      />
      <View
        style={{
          ...styles.container,
          paddingTop: top + 30,
        }}>
        <Text style={styles.title}>{title}</Text>
      </View>
      <View style={styles.separator} />
    </>
  );
};
const styles = StyleSheet.create({
  backButton: {
    zIndex: 99999999999,
    position: 'absolute',
    left: 15,
  },
  container: {
    paddingBottom: 30,
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  title: {fontSize: 20, fontWeight: '600'},
  separator: {
    height: 10,
    width: '100%',
    backgroundColor: '#F4F4F4',
  },
});
