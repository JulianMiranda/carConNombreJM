import React, {useContext} from 'react';
import {DrawerScreenProps} from '@react-navigation/drawer';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {HeaderScreen} from '../../components/HeaderScreen';
import {AuthContext} from '../../context/auth/AuthContext';

interface Props extends DrawerScreenProps<any, any> {}

type Key = 'perfil' | 'favorites' | 'privacity' | 'terms' | 'close-sesion';

export const SettingScreen = ({navigation}: Props) => {
  const {logOut} = useContext(AuthContext);
  const selectedComponent = (key: Key) => {
    switch (key) {
      case 'perfil':
        navigation.navigate('PerfilScreen');
        break;
      case 'favorites':
        navigation.navigate('FavoritesScreen');
        break;
      case 'privacity':
        navigation.navigate('PrivacityScreen');
        break;
      case 'terms':
        navigation.navigate('TermsScreen');
        break;
      case 'close-sesion':
        closeSesion();
        break;
    }
  };

  const closeSesion = () => {
    logOut();
    navigation.navigate('LoginPage');
  };
  const menuOptions = generateOptions(selectedComponent);

  return (
    <>
      <HeaderScreen title="Configuración" button="close" />

      <ScrollView style={styles.scroll}>
        <View style={{}}>
          {menuOptions.map((menu, index) => (
            <View key={index.toString()}>
              <TouchableOpacity
                style={styles.cardContainer}
                onPress={menu.onPress}
                activeOpacity={0.8}>
                <View style={styles.cardInside}>
                  <Text style={{...styles.name}}> {menu.title}</Text>
                  <Icon
                    name={menu.iconNameRight}
                    color={'#2F2F2F'}
                    size={menu.iconSizeRight}
                  />
                </View>
              </TouchableOpacity>

              {index === 1 && <View style={styles.separator} />}
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
      title: 'Mi perfil',
      iconType: 'material-community',
      iconNameLeft: 'shield',
      iconNameRight: 'chevron-right',
      iconSizeRight: 26,
      color: '#FF2E00',
      onPress: () => selectedComponent('perfil'),
    },
    {
      title: 'Mis lugares favoritos',
      iconType: 'material-community',
      iconNameLeft: 'info',
      iconNameRight: 'chevron-right',
      iconSizeRight: 26,
      color: '#21e462',
      onPress: () => selectedComponent('favorites'),
    },

    {
      title: 'Privacidad',
      iconType: 'material-community',
      iconNameLeft: 'domain',
      iconNameRight: 'chevron-right',
      iconSizeRight: 26,
      color: '#ecf024',
      onPress: () => selectedComponent('privacity'),
    },
    {
      title: 'Términos y Condiciones',
      iconType: 'material-community',
      iconNameLeft: 'domain',
      iconNameRight: 'chevron-right',
      iconSizeRight: 26,
      color: '#ecf024',
      onPress: () => selectedComponent('terms'),
    },
    {
      title: 'Cerrar sesión',
      iconType: 'material-community',
      iconNameLeft: 'domain',
      iconNameRight: 'chevron-right',
      iconSizeRight: 26,
      color: '#ecf024',
      onPress: () => selectedComponent('close-sesion'),
    },
  ];
}
const styles = StyleSheet.create({
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
  scroll: {
    flex: 1,
    backgroundColor: '#F4F4F4',
  },
  cardContainer: {
    paddingVertical: 20,
    backgroundColor: '#fff',
    paddingHorizontal: 10,

    borderTopWidth: 1,
    borderTopColor: '#F7F7F7',
  },
  separator: {
    flex: 1,
    height: 7,
    width: '100%',
    backgroundColor: '#F4F4F4',
  },
});
