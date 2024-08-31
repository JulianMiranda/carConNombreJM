import React, {useContext, useEffect} from 'react';
import {View, TouchableOpacity, Text, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {Balls} from './ModalizeContent/Balls';
import {ThemeContext} from '../context/theme/ThemeContext';
import {TravelContext} from '../context/travel/TravelContext';

export const CurrencyButtons = () => {
  const {
    theme: {colors},
  } = useContext(ThemeContext);
  const {setSelectedPayment, selectedPayment} = useContext(TravelContext);

  const handleCurrencyPress = (currency: any) => {
    setSelectedPayment({currency: currency, type: selectedPayment.type});

    if (currency === 'MLC') {
      setSelectedPayment({currency: currency, type: 'transfer'});
    } else if (currency === 'USD') {
      setSelectedPayment({currency: currency, type: 'cash'});
    } else {
    }
  };

  const handlePaymentMethodPress = (method: 'transfer' | 'cash') => {
    setSelectedPayment({currency: selectedPayment.currency, type: method});
  };
  useEffect(() => {
    console.log(selectedPayment);
  }, [selectedPayment]);

  return (
    <View style={styles.container}>
      {/* Botones de Currency */}
      <View style={styles.currencyContainer}>
        {['MN', 'MLC', 'USD'].map(currency => (
          <TouchableOpacity
            key={currency}
            style={[
              styles.currencyButton,
              selectedPayment.currency === currency &&
                styles.selectedCurrencyButton,
            ]}
            onPress={() => handleCurrencyPress(currency)}>
            <Text style={styles.buttonText}>{currency}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <View style={styles.separator} />

      {selectedPayment.currency !== 'MLC' && (
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => handlePaymentMethodPress('cash')}
          style={styles.efectivo}
          key={'Efectivo'}>
          <Icon name="local-atm" size={26} color={colors.primary} />
          <Text style={styles.paymentText}>Efectivo</Text>
          <View style={styles.iconContainer}>
            {selectedPayment.type === 'cash' ? (
              <Balls color="orange" />
            ) : (
              <Balls color="#c1c1c1" />
            )}
          </View>
        </TouchableOpacity>
      )}

      {selectedPayment.currency !== 'USD' && (
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => handlePaymentMethodPress('transfer')}
          style={styles.efectivo}
          key={'Transferencia'}>
          <Icon
            name="account-balance-wallet"
            size={26}
            color={colors.primary}
          />
          <Text style={styles.paymentText}>Transferencia</Text>
          <View style={styles.iconContainer}>
            {selectedPayment.type === 'transfer' ? (
              <Balls color="orange" />
            ) : (
              <Balls color="#c1c1c1" />
            )}
          </View>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingBottom: 5,
  },
  currencyContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  currencyButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    backgroundColor: '#B22222',
  },
  selectedCurrencyButton: {
    transform: [{scale: 1.2}],
    backgroundColor: '#FF6347',
  },
  paymentMethodContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  paymentButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    backgroundColor: '#B22222',
  },
  selectedPaymentButton: {
    transform: [{scale: 1.1}],
    backgroundColor: '#FF6347',
  },
  disabledButton: {
    backgroundColor: '#A9A9A9', // Gris para mostrar que está deshabilitado
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  iconContainer: {flex: 1, alignItems: 'flex-end'},
  paymentText: {fontSize: 18, fontWeight: '500', marginLeft: 10},
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 15,
    borderTopWidth: 1,
    borderTopColor: '#F4F4F4',
  },
  separator: {
    height: 10,
    width: '100%',
    marginBottom: 10,
    backgroundColor: '#F4F4F4',
  },
  efectivo: {
    padding: 0,
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 5,
  },
});
