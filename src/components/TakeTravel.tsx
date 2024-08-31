import React, {useContext, useEffect, useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {GradientBackground} from './GradientBackground';
import {ThemeContext} from '../context/theme/ThemeContext';
import {TravelPoint} from '../interfaces/TravelInfo.interface';
import {RootStackParams} from '../navigator/navigation';
import {StackNavigationProp} from '@react-navigation/stack';
import {useNavigation} from '@react-navigation/native';
import {TravelContext} from '../context/travel/TravelContext';
import {AuthContext} from '../context/auth/AuthContext';

interface PropsNavigation
  extends StackNavigationProp<RootStackParams, 'TravelScreen'> {}
interface Props {
  openModal: () => void;
}
export const TakeTravel = ({openModal}: Props) => {
  const navigation = useNavigation<PropsNavigation>();
  const {takeFastTravel} = useContext(TravelContext);
  const {user, status} = useContext(AuthContext);

  const [history1, setHistory1] = useState<TravelPoint>();
  const [history2, setHistory2] = useState<TravelPoint>();
  const {theme} = useContext(ThemeContext);

  useEffect(() => {
    if (status === 'authenticated') {
      if (user?.lastTravel && user?.lastTravel.length > 0) {
        setHistory1(user.lastTravel[0]);
      }
      if (user?.lastTravel && user?.lastTravel.length > 1) {
        setHistory2(user.lastTravel[1]);
      }
    }
  }, [status, user?.lastTravel]);

  const handleHistory = (history: TravelPoint) => {
    takeFastTravel({
      name: history.name,
      coordinates: history.coordinates,
      address: history.address,
    });
    navigation.navigate('TravelScreen');
  };

  return (
    <>
      <GradientBackground>
        <View style={styles.container}>
          <View style={styles.searchContainer}>
            <Icon
              name={'search'}
              color={theme.colors.primary}
              size={22}
              style={styles.icon}
            />
            <TouchableOpacity activeOpacity={0.8} onPress={() => openModal()}>
              <Text style={styles.title}>¿A dónde vamos?</Text>
            </TouchableOpacity>
          </View>
          {history1 && (
            <View style={styles.historyContainer}>
              <Icon
                name={'history'}
                color="#c1c1c1"
                size={18}
                style={styles.icon}
              />
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => handleHistory(history1)}>
                <Text style={styles.textHistory}>{history1.name}</Text>
              </TouchableOpacity>
            </View>
          )}
          {history2 && (
            <View style={styles.historyContainer}>
              <Icon
                name={'history'}
                color="#c1c1c1"
                size={18}
                style={styles.icon}
              />
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => handleHistory(history2)}>
                <Text style={styles.textHistory}>{history2.name}</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </GradientBackground>
    </>
  );
};
const styles = StyleSheet.create({
  container: {
    width: '95%',
    padding: 10,
    borderRadius: 20,
    paddingBottom: 20,
    backgroundColor: '#FDFDFD',
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: '#000',
  },
  searchContainer: {
    flexDirection: 'row',
    backgroundColor: '#F3F3F3',
    alignItems: 'center',
    borderRadius: 15,
    paddingHorizontal: 10,
    paddingVertical: 10,
    paddingLeft: 10,
  },
  historyContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingTop: 20,
    paddingLeft: 10,
  },
  textHistory: {
    fontSize: 12,
    fontWeight: '300',
  },
  icon: {marginRight: 10},
});
