import React, {useContext} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {
  DrawerContentComponentProps,
  DrawerContentScrollView,
} from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {FadeInImage} from '../FadeInImage';
import {AuthContext} from '../../context/auth/AuthContext';

export const InsideMenu = ({navigation}: DrawerContentComponentProps) => {
  const {user} = useContext(AuthContext);

  return (
    <>
      <View style={styles.container}>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => navigation.navigate('PerfilScreen')}
          style={styles.editButton}>
          <Text style={styles.name}>
            {user?.name} {user?.lastName}
          </Text>
          <View style={styles.editName}>
            <Text style={styles.editText}>Editar mi perfil</Text>
            <Icon
              name="chevron-right"
              color="#C3C5C8"
              size={20}
              style={styles.icon}
            />
          </View>
        </TouchableOpacity>

        <View style={styles.imageContainer}>
          {user?.image && user?.image.url ? (
            <>
              <FadeInImage uri={user?.image.url} style={styles.image} />
            </>
          ) : (
            <>
              <View style={styles.imagePlaceholder} />
            </>
          )}
        </View>
      </View>
      <View style={styles.drawerContainer}>
        <DrawerContentScrollView>
          {/* Menu */}
          <View style={styles.menu}>
            <TouchableOpacity
              style={styles.option}
              onPress={() => navigation.navigate('Stack')}>
              <Icon name="home" color="#5EB8FA" size={26} />
              <Text style={styles.optionText}>Solicitar viaje</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.optionButton}
              onPress={() => navigation.navigate('HistoryScreen')}>
              <Icon name="history" color="#59E28C" size={26} />
              <Text style={styles.optionText}>Mis Viajes</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.optionContainer}
              onPress={() => navigation.navigate('HelpStack')}>
              <Icon name="headset-mic" color="#F56925" size={26} />
              <Text style={styles.optionText}>Ayuda</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.optionContainer}
              onPress={() => navigation.navigate('SettingStack')}>
              <Icon name="settings-suggest" color="#5EB8FA" size={26} />
              <Text style={styles.optionText}>Configuración</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.optionContainer}
              onPress={() => navigation.navigate('ShareScreen')}>
              <Icon name="home" color="#F56925" size={26} />
              <Text style={styles.optionText}>Comparte y gana</Text>
            </TouchableOpacity>

            {/*  <TouchableOpacity
              style={styles.optionContainer}
              onPress={() => navigation.navigate('ChangeServerScreen')}>
              <Icon name="home" color="#F56925" size={26} />
              <Text style={styles.optionText}>Cambiar servidor</Text>
            </TouchableOpacity> */}
          </View>
        </DrawerContentScrollView>
      </View>
    </>
  );
};
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#E3E7E8',
    flex: 2,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
  },
  editButton: {
    flex: 3,
    marginLeft: 10,
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  editName: {flexDirection: 'row', alignItems: 'center', marginTop: 3},
  editText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#C3C5C8',
  },
  imageContainer: {flex: 1, alignItems: 'flex-start'},
  icon: {marginLeft: 3},
  image: {width: 55, height: 55, borderRadius: 100},
  imagePlaceholder: {
    width: 55,
    height: 55,
    borderRadius: 100,
    backgroundColor: '#c1c1c1',
  },
  drawerContainer: {
    backgroundColor: 'white',
    flex: 6,
    borderTopEndRadius: 20,
    marginTop: -20,
  },
  menu: {
    marginVertical: 0,
    marginHorizontal: 20,
  },
  option: {
    padding: 7,
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 20,
  },
  optionButton: {
    padding: 7,
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 20,
  },
  optionText: {fontSize: 18, marginLeft: 10},
  optionContainer: {
    padding: 7,
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 20,
  },
});
