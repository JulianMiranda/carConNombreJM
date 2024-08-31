import React from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialIcons';

interface Props {
  name: string;
  handelSaveModal: () => void;
  namePoint: string;
  setNamePoint: (name: string) => void;
}
export const NameFavorite = ({
  name,
  handelSaveModal,
  namePoint,
  setNamePoint,
}: Props) => {
  const {bottom} = useSafeAreaInsets();
  return (
    <>
      <View style={styles.container}>
        <Icon name="star" size={22} color={'#5f5f5f'} />
        <Text style={styles.title}>{name}</Text>
      </View>
      <TextInput
        value={namePoint}
        onChangeText={setNamePoint}
        style={styles.input}
      />
      <TouchableOpacity
        style={{
          ...styles.button,
          marginBottom: bottom + 15,
        }}
        activeOpacity={0.8}
        onPress={() => handelSaveModal()}>
        <Text style={{color: '#fff', fontSize: 16}}>Guardar</Text>
      </TouchableOpacity>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 5,
    marginTop: 15,
    marginLeft: 15,
  },
  title: {fontSize: 16, marginLeft: 7},
  text: {fontSize: 16, marginTop: 20},
  button: {
    backgroundColor: 'orange',
    paddingVertical: 10,
    alignItems: 'center',
    marginHorizontal: 15,
    borderRadius: 5,
  },
  input: {
    paddingVertical: 15,
    paddingHorizontal: 10,
    marginTop: 20,
    marginBottom: 20,
    backgroundColor: '#f2f2f2',
  },
});
