import React, {useContext} from 'react';
import {
  ActivityIndicator,
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {TravelContext} from '../context/travel/TravelContext';
import {DateTimePickerComponent} from './Date';
import {useTravelOptions} from '../hooks/useTravelOptions';
import {Balls} from './ModalizeContent/Balls';
import {ScrollView} from 'react-native-gesture-handler';

interface Props {}
const {height} = Dimensions.get('screen');
export const TravelOptions = ({}: Props) => {
  const {loadingCalculatedTravel, selectedPayment, prices} =
    useContext(TravelContext);

  const {menuOptions, selected, showPicker, setShowPicker} = useTravelOptions();

  const diferentCurrency = (value: number) => {
    if (!prices) {
      return value;
    }
    if (selectedPayment.currency === 'USD') {
      return value * prices?.usd;
    } else if (selectedPayment.currency === 'MLC') {
      return value * prices.mlc;
    } else if (selectedPayment.currency === 'MN') {
      return value * prices.mn;
    } else {
      return value;
    }
  };
  return (
    <>
      <ScrollView showsVerticalScrollIndicator={false} style={{flex: 1}}>
        {menuOptions.map((menu, index) => (
          <TouchableOpacity
            key={index.toString()}
            // eslint-disable-next-line react-native/no-inline-styles
            style={{
              ...styles.cardContainer,
              borderWidth: menu.selected === selected ? 1 : 0,
              borderColor: menu.selected === selected ? '#c1c1c1' : '#fff',
              borderRadius: menu.selected === selected ? 20 : 0,
              margin: 2,
            }}
            onPress={menu.onPress}
            activeOpacity={0.8}>
            <View style={styles.imageContainer}>
              <Image source={menu.image} style={styles.image} />
            </View>
            <View style={styles.textContainer}>
              <Text style={styles.title}>{menu.title}</Text>
              <Text style={styles.subtitle}>{menu.subtitle}</Text>
            </View>
            <View style={styles.priceContainer}>
              {loadingCalculatedTravel ? (
                <ActivityIndicator size={26} style={styles.activity} />
              ) : (
                <>
                  {menu.price === 0 ? (
                    <>
                      <Text style={styles.textPrice}>
                        <Text style={styles.textPriceDollar}>
                          {selectedPayment.currency}
                        </Text>
                        N/A
                      </Text>
                    </>
                  ) : (
                    <>
                      <Text style={styles.textPrice}>
                        {diferentCurrency(menu.price).toFixed(2)}{' '}
                        <Text style={styles.textPriceDollar}>
                          {selectedPayment.currency}
                        </Text>
                      </Text>
                    </>
                  )}
                </>
              )}

              {/* <Text style={styles.price}>{formatToCurrency(menu.price)}</Text> */}
            </View>
            <View style={styles.ballsContainer}>
              {menu.selected === selected ? (
                <Balls color="orange" />
              ) : (
                <Balls color="#c1c1c1" />
              )}
            </View>
          </TouchableOpacity>
        ))}
        <View style={{height: height * 0.55}} />
      </ScrollView>
      <DateTimePickerComponent
        showPicker={showPicker}
        setShowPicker={setShowPicker}
      />
    </>
  );
};

const styles = StyleSheet.create({
  cardContainer: {flexDirection: 'row', alignItems: 'center'},
  imageContainer: {
    flex: 1,
    height: 100,
    width: 80,
    paddingHorizontal: 15,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    height: 60,
    width: 60,
    overflow: 'hidden',
    borderRadius: 20,
    resizeMode: 'contain',
  },
  textContainer: {
    flex: 4,
    padding: 10,
    paddingLeft: 15,
  },
  title: {fontSize: 18, fontWeight: 'bold'},
  subtitle: {},
  priceContainer: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  price: {fontSize: 16, fontWeight: 'bold'},
  ballsContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textPrice: {fontSize: 18, fontWeight: 'bold'},
  textPriceDollar: {fontSize: 12, fontWeight: 'bold', marginRight: 10},
  activity: {marginRight: 20},
});
