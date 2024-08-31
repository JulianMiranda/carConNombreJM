import React, {useState} from 'react';
import {HeaderScreen} from '../../components/HeaderScreen';
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import {StackScreenProps} from '@react-navigation/stack';
import {RootStackParams} from '../../navigator/helpStack';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {HistoryCard} from '../../components/HistoryCard';

interface Props extends StackScreenProps<RootStackParams, 'LateEndScreen'> {}

export const LateEndScreen = ({route}: Props) => {
  const {travel} = route.params;
  const {bottom} = useSafeAreaInsets();
  const [description, setDescription] = useState('');
  return (
    <>
      <HeaderScreen title="¿Tuviste un accidente?" button="arrow-back" />
      <ScrollView style={styles.body}>
        <HistoryCard travel={travel} />
        <Text style={{...styles.title, marginTop: 20}}>
          El viaje no finalizó a tiempo
        </Text>
        <Text style={styles.text}>
          Si el mapa en tu recibo de viaje o el historial de viaje muestran un
          destino diferente, háznoslo saber. Revisaremos la situación y
          ajustaremos la tarifa en caso de ser necesario.
        </Text>
        <TextInput
          value={description}
          onChangeText={setDescription}
          placeholder="Describe la situación"
          style={styles.input}
          multiline={true}
          numberOfLines={5}
        />
      </ScrollView>
      <TouchableOpacity
        style={{
          ...styles.button,
          marginBottom: bottom + 15,
        }}
        activeOpacity={0.8}
        onPress={() => console.log('Enviar comentario')}>
        <Text style={{color: '#fff', fontSize: 16}}>Enviar</Text>
      </TouchableOpacity>
    </>
  );
};
const styles = StyleSheet.create({
  body: {backgroundColor: '#fff', paddingVertical: 20, paddingHorizontal: 10},
  title: {fontSize: 20},
  text: {fontSize: 16, marginTop: 20},
  button: {
    backgroundColor: 'orange',
    paddingVertical: 10,
    alignItems: 'center',
    marginHorizontal: 15,
    borderRadius: 5,
  },
  input: {
    paddingVertical: 50,
    paddingHorizontal: 5,
    marginTop: 20,
    backgroundColor: '#f2f2f2',
  },
});
