import React, {useContext, useEffect, useState} from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {FadeInImage} from '../../components/FadeInImage';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {DrawerScreenProps} from '@react-navigation/drawer';
import {HeaderScreen} from '../../components/HeaderScreen';
import {AuthContext} from '../../context/auth/AuthContext';

type Key = 'number' | 'email' | 'password' | 'devices' | 'delete-account';

interface Props extends DrawerScreenProps<any, any> {}
export const PerfilScreen = ({navigation}: Props) => {
  const {user} = useContext(AuthContext);
  const [name, setName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
    /* Traer Nombre*/
    if (user) {
      setName(user.name ? user.name : '');
      setLastName(user.lastName ? user.lastName : '');
      setPhone(user.phone ? user.phone : '');
      setEmail(user.email ? user.email : '');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const selectedComponent = (key: Key) => {
    switch (key) {
      case 'number':
        navigation.navigate('NumberScreen', {phoneNumber: phone});
        break;
      case 'email':
        navigation.navigate('EmailScreen', {email});
        break;
      case 'password':
        navigation.navigate('PasswordScreen');
        break;
      case 'devices':
        navigation.navigate('DevicesScreen');
        break;
      case 'delete-account':
        deleteAccount();
        break;
    }
  };

  const deleteAccount = () => {};
  const menuOptions = generateOptions(selectedComponent);

  return (
    <>
      <HeaderScreen title="Perfil" button="arrow-back" />
      <ScrollView style={styles.scroll}>
        <View style={styles.firstCard}>
          <View style={styles.firstCardInside}>
            {user?.image && user?.image.url ? (
              <>
                <FadeInImage uri={user?.image.url} style={styles.image} />
              </>
            ) : (
              <>
                <View style={styles.imagePlaceholder} />
              </>
            )}
            <TouchableOpacity activeOpacity={0.8} style={styles.editButton}>
              <Text style={styles.text18}>Editar mi foto de perfil</Text>
              <Icon
                name="chevron-right"
                style={styles.icon}
                size={24}
                color={'#c1c1c1'}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.containerName}>
            <Text style={styles.nameText}>Nombre</Text>
            <TextInput
              value={name}
              onChangeText={setName}
              style={styles.text18}
            />
          </View>
          <View style={styles.containerName}>
            <Text style={styles.nameText}>Apellido</Text>
            <TextInput
              value={lastName}
              onChangeText={setLastName}
              style={styles.text18}
            />
          </View>
        </View>
        <View style={styles.secondCard}>
          {menuOptions.map((menu, index) => (
            <View key={index.toString()}>
              <TouchableOpacity
                style={styles.cardContainer}
                onPress={menu.onPress}
                activeOpacity={0.8}>
                <View style={styles.cardInside}>
                  <Text style={{...styles.name}}> {menu.title}</Text>
                  {index === 0 && (
                    <View>
                      <Text>
                        {phone.substring(0, 3)}**
                        {phone.substring(phone.length - 3, phone.length)}
                      </Text>
                    </View>
                  )}
                  {index === 1 && (
                    <>
                      {!email ? (
                        <Text style={styles.emailText}>Sin verificar</Text>
                      ) : (
                        <View>
                          <Text>
                            {email.substring(0, 3)}**
                            {email.substring(email.length - 3, email.length)}
                          </Text>
                        </View>
                      )}
                    </>
                  )}
                  <Icon
                    name={menu.iconNameRight}
                    color={'#2F2F2F'}
                    size={menu.iconSizeRight}
                  />
                </View>
              </TouchableOpacity>
            </View>
          ))}
        </View>
      </ScrollView>
    </>
  );
};

function generateOptions(selectedComponent: any) {
  return [
    {
      title: 'Número de teléfono',
      iconType: 'material-community',
      iconNameLeft: 'shield',
      iconNameRight: 'chevron-right',
      iconSizeRight: 26,
      color: '#FF2E00',
      onPress: () => selectedComponent('number'),
    },
    {
      title: 'Correo electrónico',
      iconType: 'material-community',
      iconNameLeft: 'info',
      iconNameRight: 'chevron-right',
      iconSizeRight: 26,
      color: '#21e462',
      onPress: () => selectedComponent('email'),
    },

    {
      title: 'Cambiar mi contraseña',
      iconType: 'material-community',
      iconNameLeft: 'domain',
      iconNameRight: 'chevron-right',
      iconSizeRight: 26,
      color: '#ecf024',
      onPress: () => selectedComponent('password'),
    },
    {
      title: 'Mis dispositivos',
      iconType: 'material-community',
      iconNameLeft: 'domain',
      iconNameRight: 'chevron-right',
      iconSizeRight: 26,
      color: '#ecf024',
      onPress: () => selectedComponent('devices'),
    },
    {
      title: 'Eliminar cuenta',
      iconType: 'material-community',
      iconNameLeft: 'domain',
      iconNameRight: 'chevron-right',
      iconSizeRight: 26,
      color: '#ecf024',
      onPress: () => selectedComponent('delete-account'),
    },
  ];
}

const styles = StyleSheet.create({
  scroll: {
    flex: 1,
    backgroundColor: '#F4F4F4',
  },

  firstCard: {
    backgroundColor: '#fff',
    paddingVertical: 10,
  },
  secondCard: {
    marginTop: 10,
    backgroundColor: '#fff',
  },
  name: {
    fontSize: 16,
    color: 'black',
    marginLeft: 5,
    flex: 1,
  },

  cardInside: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cardContainer: {
    paddingVertical: 20,
    backgroundColor: '#fff',
    paddingHorizontal: 10,

    borderTopWidth: 1,
    borderTopColor: '#F7F7F7',
  },
  firstCardInside: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  imagePlaceholder: {
    width: 55,
    height: 55,
    borderRadius: 100,
    backgroundColor: '#c1c1c1',
  },
  editButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 20,
  },
  image: {width: 55, height: 55, borderRadius: 100},
  containerName: {
    borderTopWidth: 1,
    borderTopColor: '#F4F4F4',
    marginTop: 20,
    paddingTop: 15,
    marginLeft: 20,
  },
  text18: {fontSize: 18},
  icon: {marginLeft: 10},
  nameText: {
    fontSize: 16,
    fontWeight: '400',
    color: '#c1c1c1',
    marginBottom: 10,
  },
  emailText: {color: 'red'},
});
