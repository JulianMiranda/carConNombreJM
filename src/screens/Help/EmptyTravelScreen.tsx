import React, {useState} from 'react';
import {HeaderScreen} from '../../components/HeaderScreen';
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import {RootStackParams} from '../../navigator/helpStack';
import {StackScreenProps} from '@react-navigation/stack';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {HistoryCard} from '../../components/HistoryCard';

interface Props extends StackScreenProps<RootStackParams, 'WrongRouteScreen'> {}
export const EmptyTravelScreen = ({route}: Props) => {
  const {travel} = route.params;
  const {bottom} = useSafeAreaInsets();
  const [description, setDescription] = useState('');
  return (
    <>
      <HeaderScreen title="Viaje sin tí" button="arrow-back" />
      <ScrollView style={styles.body}>
        <HistoryCard travel={travel} />
        <Text style={{...styles.title, marginTop: 20}}>
          El viaje inició sin mi
        </Text>
        <Text style={styles.text}>
          Si el socio conductor no pasó por ti, pero aun así se te cobró el
          viaje, háznoslo saber en esta página.
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
