import React, {useState} from 'react';
import {HeaderScreen} from '../../components/HeaderScreen';
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

export const DifferentParnerScreen = () => {
  const [description, setDescription] = useState('');
  const {bottom} = useSafeAreaInsets();
  return (
    <>
      <HeaderScreen title="¿Problemas con tu socio?" button="arrow-back" />
      <ScrollView style={styles.body}>
        <Text style={styles.title}>El socio no era el mismo</Text>
        <Text style={styles.text}>
          Tu reporte nos ayuda a tomar las medidas correspondientes y evitar que
          estas situaciones se vuelvan a presentar.
        </Text>
        <Text style={styles.text}>
          Si hiciste una solicitud y la foto del socio es diferente a la de la
          persona que realizó la solicitud, cancela la solicitud e infórmanos lo
          sucedido a continuación:
        </Text>
        <Text style={{...styles.text, fontSize: 24}}>
          <Text style={{...styles.text, color: 'orange'}}>* </Text>Describe las
          características del socio conductor que estaba en el vehículo:
        </Text>
        <TextInput
          value={description}
          onChangeText={setDescription}
          placeholder="Escribe las características físicas - Altura, edad aproximada, cabello, etc. ¿El recorrido ocurrió normalmente?
          ¿Había otra persona en el carro?"
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
  body: {
    flex: 1,
    backgroundColor: '#fff',
    paddingVertical: 20,
    paddingHorizontal: 10,
  },
  title: {fontSize: 20},
  text: {fontSize: 16, marginTop: 20},
  input: {
    paddingVertical: 50,
    paddingHorizontal: 5,
    marginTop: 20,
    backgroundColor: '#f2f2f2',
  },
  button: {
    backgroundColor: 'orange',
    paddingVertical: 10,
    alignItems: 'center',
    marginHorizontal: 15,
    borderRadius: 5,
  },
});
