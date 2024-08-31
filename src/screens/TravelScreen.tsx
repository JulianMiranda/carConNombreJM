import React, {useContext, useEffect} from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Dimensions,
  Text,
} from 'react-native';
import {RootStackParams} from '../navigator/navigation';
import {StackScreenProps} from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {MapTravel} from '../components/MapTravel';
import {Modalize, useModalize} from 'react-native-modalize';
import LinearGradient from 'react-native-linear-gradient';
import {TravelContext} from '../context/travel/TravelContext';
import {ThemeContext} from '../context/theme/ThemeContext';
import {useTravel} from '../hooks/useTravel';
import {TravelOptions} from '../components/TravelOptions';

interface Props extends StackScreenProps<RootStackParams, 'TravelScreen'> {}
const {height} = Dimensions.get('window');
export const TravelScreen = (props: Props) => {
  const {navigation} = props;
  const {
    theme: {colors},
  } = useContext(ThemeContext);
  const {travelFrom, travelTo, selectedPayment} = useContext(TravelContext);

  const {top} = useSafeAreaInsets();
  const {ref, open} = useModalize();
  const {textButton, openModal, handleConfirm} = useTravel();

  /*   console.log('Travel Screen');
  console.log('From', travelFrom);
  console.log('To', travelTo); */

  useEffect(() => {
    open();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <TouchableOpacity
        style={{...styles.openMenuButton, marginTop: top}}
        onPress={() => navigation.goBack()}>
        <Icon name={'arrow-back'} color="black" size={30} />
      </TouchableOpacity>

      <View style={styles.mapContainer}>
        <MapTravel from={travelFrom} to={travelTo} />
        <View style={styles.backgroundGradient}>
          <LinearGradient
            style={{flex: 1}}
            colors={[
              'rgba(255,255,255,0)',
              'rgba(255,255,255,0.7)',
              'rgba(255,255,255,0.9)',
              '#F3F3F3',
            ]}
          />
        </View>
      </View>

      <Modalize
        modalStyle={{...styles.modalize, marginTop: top + 50}}
        ref={ref}
        scrollViewProps={{
          showsVerticalScrollIndicator: false,
          scrollEnabled: true,
          contentContainerStyle: {height: '100%'},
        }}
        withOverlay={false}
        disableScrollIfPossible={false}
        alwaysOpen={height * 0.6}>
        <TravelOptions />
      </Modalize>
      <View style={styles.containerButtons}>
        <TouchableOpacity
          style={styles.paymentType}
          activeOpacity={0.8}
          onPress={() => openModal()}>
          <View style={styles.paymentContainer}>
            <Icon
              name={
                selectedPayment.type === 'cash' ? 'local-atm' : 'credit-card'
              }
              size={26}
              color={colors.primary}
            />
            <Text style={styles.paymentText}>
              {selectedPayment.currency}
              {' - '}
              {selectedPayment.type === 'cash' ? 'Efectivo' : 'Transferencia'}
            </Text>
          </View>

          <Icon style={styles.rightIcon} name="chevron-right" size={22} />
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            ...styles.button,
            backgroundColor: colors.primary,
          }}
          activeOpacity={0.8}
          onPress={handleConfirm}>
          <Text style={styles.textConfirm}>{textButton}</Text>
        </TouchableOpacity>
      </View>
    </>
  );
};
const styles = StyleSheet.create({
  openMenuButton: {
    position: 'absolute',
    top: 15,
    left: 15,
    padding: 10,
    borderRadius: 100,
    backgroundColor: '#FDFDFD',
    zIndex: 100,
    shadowColor: 'rgba(0, 0, 0, 0.2)',
    shadowOpacity: 0.8,
    elevation: 6,
    shadowRadius: 15,
    shadowOffset: {width: 10, height: 13},
  },
  mapContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backgroundGradient: {
    height: height * 0.6,
    zIndex: 50,
    width: '100%',
    position: 'absolute',
    bottom: 0,
  },
  modalize: {
    zIndex: 99999,
    flex: 1,
    alignSelf: 'center',
    width: '95%',
    backgroundColor: '#FDFDFD',
  },
  containerButtons: {
    position: 'absolute',
    bottom: 0,
    zIndex: 999999,
    width: '95%',
    backgroundColor: '#FFF',
    alignSelf: 'center',
  },
  button: {
    paddingVertical: 15,
    alignItems: 'center',
    alignSelf: 'center',
    borderRadius: 5,
    width: '85%',
    marginBottom: 20,
  },
  textConfirm: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 20,
  },

  paymentType: {
    paddingVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    /*  paddingHorizontal: 10, */
    width: '85%',
    alignSelf: 'center',
  },
  paymentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  paymentText: {fontSize: 18, fontWeight: 'bold', marginLeft: 10},
  rightIcon: {color: '#5f5f5f'},
});
