import React, {useContext, useState} from 'react';
import {StyleSheet, TextInput, View} from 'react-native';
import {History} from './ModalizeContent/History';
import {Manual} from './ModalizeContent/Manual';
import {Search} from './ModalizeContent/Search';
import {TravelPoint} from '../interfaces/TravelInfo.interface';
import {AuthContext} from '../context/auth/AuthContext';

interface Props {
  setShowSavePlaceMain: (showSavePlaceMain: boolean) => void;
  name: string;
}
export const SavePlaceMain = ({setShowSavePlaceMain, name}: Props) => {
  const {user, setFavoritePlace} = useContext(AuthContext);
  const [input, setInput] = useState('');

  const handlePress = (arg: TravelPoint) => {
    console.log('handlePress SavePlaceMain', name, arg);
    setFavoritePlace({name, place: arg});

    setShowSavePlaceMain(false);
  };
  const handleSave = () => {
    console.log('handleSave');
  };
  const handelSaveModal = () => {
    console.log('handelSaveModal');
    /*   setFavoritePlace({name: namePoint, place: point});
        close();
        navigation.goBack(); */
  };

  return (
    <>
      <TextInput
        placeholder="Ingresa la dirección"
        value={input}
        onChangeText={setInput}
        style={styles.input}
      />
      {input !== '' ? (
        <Search onPress={handlePress} />
      ) : (
        <View>
          <View style={styles.separator} />
          <View style={styles.historyContainer}>
            <History onPress={handlePress} />
          </View>
          <View style={styles.separator} />
          <View style={styles.historyContainer}>
            <Manual onPress={handleSave} />
          </View>
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  input: {
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: '#fff',
    marginHorizontal: 10,
    marginTop: 10,
    shadowColor: '#000',
    borderRadius: 20,
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    elevation: 6,
  },
  separator: {
    width: '100%',
    height: 7,
    backgroundColor: '#f1f1f1',
    marginVertical: 10,
  },
  historyContainer: {},
});
