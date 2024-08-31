import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Fab} from '../../components/Fab';
import {useNavigation} from '@react-navigation/native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {HeaderScreen} from '../../components/HeaderScreen';

export const OpinionScreen = () => {
  const {top} = useSafeAreaInsets();
  const navigation = useNavigation();
  return (
    <>
      <HeaderScreen title="Opinión" button="arrow-back" />
      <View style={styles.body}>
        <Text style={{...styles.title, marginTop: 20}}>
          Recibimos tu comentario
        </Text>
        <Text style={styles.text}>
          Calafica cómo ha sido tu experiencia con Carapp.
        </Text>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  backButton: {
    flex: 1,
    backgroundColor: '#F4F4F4',
  },
  body: {backgroundColor: '#fff', paddingVertical: 20, paddingHorizontal: 10},
  title: {fontSize: 20},
  text: {fontSize: 16, marginTop: 20},
});
