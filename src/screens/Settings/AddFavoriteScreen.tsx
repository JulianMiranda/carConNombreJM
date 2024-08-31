import React, {useContext, useState} from 'react';
import {StyleSheet, TextInput, View} from 'react-native';
import {HeaderScreen} from '../../components/HeaderScreen';
import {StackScreenProps} from '@react-navigation/stack';
import {RootStackParams} from '../../navigator/settingStack';
import {Search} from '../../components/ModalizeContent/Search';
import {History} from '../../components/ModalizeContent/History';
import {Manual} from '../../components/ModalizeContent/Manual';
import {TravelPoint} from '../../interfaces/TravelInfo.interface';
import {Modalize, useModalize} from 'react-native-modalize';
import {NameFavorite} from '../../components/NameFavorite';
import {AuthContext} from '../../context/auth/AuthContext';

interface Props
  extends StackScreenProps<RootStackParams, 'AddFavoriteScreen'> {}

export const AddFavoriteScreen = ({navigation, route}: Props) => {
  const {fav} = route.params;
  const {setFavoritePlace} = useContext(AuthContext);
  const [input, setInput] = useState('');
  const [point, setPoint] = useState<TravelPoint>();
  const [namePoint, setNamePoint] = useState<string>('');
  const {ref, open, close} = useModalize();

  const handlePress = (arg: TravelPoint) => {
    console.log('handlePress', arg);
    setNamePoint(arg.name);
    setPoint(arg);
    if (fav === 'Home') {
      setFavoritePlace({name: 'Home', place: arg});
      navigation.goBack();
    } else if (fav === 'Work') {
      console.log('Point', point);
      setFavoritePlace({name: 'Work', place: arg});
      navigation.goBack();
    } else {
      open();
    }
  };
  const handleSave = () => {
    console.log('handleSave');
  };
  const handelSaveModal = () => {
    console.log('handelSaveModal');
    setFavoritePlace({name: namePoint, place: point});
    close();
    navigation.goBack();
  };
  return (
    <>
      <HeaderScreen button="arrow-back" title="Agregar favorito" />
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
      <Modalize
        modalStyle={{
          zIndex: 99999,
          flex: 1,
          alignSelf: 'center',
          width: '95%',
          backgroundColor: '#FDFDFD',
        }}
        disableScrollIfPossible
        ref={ref}
        scrollViewProps={{
          showsVerticalScrollIndicator: false,
          scrollEnabled: false,
        }}
        withOverlay={true}
        modalHeight={400}>
        <NameFavorite
          name={point?.name ? point?.name : ''}
          namePoint={namePoint}
          setNamePoint={setNamePoint}
          handelSaveModal={handelSaveModal}
        />
      </Modalize>
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
