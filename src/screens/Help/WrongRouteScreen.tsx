import React, {useState} from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import {HeaderScreen} from '../../components/HeaderScreen';
import {StackScreenProps} from '@react-navigation/stack';
import {RootStackParams} from '../../navigator/helpStack';
import {HistoryCard} from '../../components/HistoryCard';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

interface Props extends StackScreenProps<RootStackParams, 'WrongRouteScreen'> {}

export const WrongRouteScreen = ({route}: Props) => {
  const {travel} = route.params;
  const {bottom} = useSafeAreaInsets();
  const [description, setDescription] = useState('');
  return (
    <>
      <HeaderScreen title="Ruta equivocada" button="arrow-back" />
      <ScrollView style={styles.body}>
        <HistoryCard travel={travel} />
        <Text style={{...styles.title, marginTop: 20}}>
          Recibimos tu comentario
        </Text>
        <Text style={styles.text}>
          Las tarifas de la solicitud de viaje se calculan con un algoritmo en
          función del tiempo y la distancia, y pueden incluir otros cargos como
          la tarifa dinámica.
        </Text>
        <Text style={styles.text}>
          Ten en cuenta que para que tu caso sea elegible para un ajuste de
          tarifa, la distancia de la solicitud de viaje debe ser
          significativamente más larga que la ruta recomendada por el algoritmo.
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
