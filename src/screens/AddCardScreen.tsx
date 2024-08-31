import React, {useContext, useState} from 'react';
import {HeaderScreen} from '../components/HeaderScreen';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {TextInput} from 'react-native-gesture-handler';
import {Card} from '../interfaces/Card.interface';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {AuthContext} from '../context/auth/AuthContext';
import {StackScreenProps} from '@react-navigation/stack';
import {RootStackParams} from '../navigator/navigation';

interface Props extends StackScreenProps<RootStackParams, 'AddCardScreen'> {}
export const AddCardScreen = ({navigation}: Props) => {
  const {setCreditCard} = useContext(AuthContext);
  const [card, setCard] = useState<Card>({number: '', type: 'visa'});
  const [date, setDate] = useState<string>('');
  const [code, setCode] = useState<string>('');
  const {bottom} = useSafeAreaInsets();
  return (
    <>
      <HeaderScreen title="Agrega tu tarjeta" button="arrow-back" />
      <View style={styles.container}>
        <Text style={styles.title}>Número de tarjeta</Text>
        <View style={styles.numberContainer}>
          <Icon name="credit-card" color={'#c1c1c1'} size={26} />
          <TextInput
            style={styles.number}
            value={card.number}
            onChangeText={value => setCard({...card, number: value})}
            placeholder="0000 0000 0000 0000"
          />
        </View>

        <View style={styles.codes}>
          <View>
            <Text style={styles.textCodes}>Fecha de venciminto</Text>
            <TextInput
              style={styles.inputDate}
              value={date}
              onChangeText={setDate}
              placeholder="MM/AA"
            />
          </View>
          <View>
            <Text style={styles.textCodes}>Fecha de venciminto</Text>
            <TextInput
              style={styles.inputCode}
              value={code}
              onChangeText={setCode}
              placeholder="CVV"
            />
          </View>
        </View>
      </View>
      <TouchableOpacity
        style={{
          ...styles.button,
          marginBottom: bottom + 15,
        }}
        activeOpacity={0.8}
        onPress={() => {
          setCreditCard(card);
          navigation.goBack();
        }}>
        <Text style={{color: '#fff', fontSize: 18}}>Agregar</Text>
      </TouchableOpacity>
    </>
  );
};
const styles = StyleSheet.create({
  container: {padding: 10},
  title: {fontSize: 18},
  numberContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    paddingVertical: 10,
  },
  number: {
    fontSize: 24,
    marginLeft: 10,
  },
  codes: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  inputDate: {
    fontSize: 24,
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  inputCode: {
    fontSize: 24,
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  textCodes: {fontSize: 18},
  button: {
    backgroundColor: 'orange',
    paddingVertical: 10,
    alignItems: 'center',
    marginHorizontal: 15,
    borderRadius: 5,
  },
});
