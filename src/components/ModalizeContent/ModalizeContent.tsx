/* eslint-disable react-native/no-inline-styles */
import React, {useContext, useEffect, useRef, useState} from 'react';
import {StyleSheet, TextInput, View} from 'react-native';
import {SavePlace} from './SavePlace';
import {History} from './History';
import {Manual} from './Manual';
import {Search} from './Search';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParams} from '../../navigator/navigation';
import {TravelPoint} from '../../interfaces/TravelInfo.interface';
import {SelectLocation} from '../SelectLocation';
import {TravelContext} from '../../context/travel/TravelContext';
import {SavePlaceMain} from '../SavePlaceMain';
import {InputsModal} from './InputsModal';

export interface Selector {
  selector: 'history' | 'search';
}

export type SelectShow =
  | 'history-to'
  | 'recomended-from'
  | 'manual-from'
  | 'manual-to'
  | 'search-show';

interface PropsNavigation
  extends StackNavigationProp<RootStackParams, 'TravelScreen'> {}

export const ModalizeContent = () => {
  const navigation = useNavigation<PropsNavigation>();
  const {travelFrom, travelTo, setTravelTo, setTravelFrom} =
    useContext(TravelContext);

  const toInputRef = useRef<TextInput>();
  const [from, setFrom] = useState('Avenida Occidental Test');
  const [to, setTo] = useState('');
  const [fromFocussed, setFromFocussed] = useState(false);
  const [toFocussed, setToFocussed] = useState(false);
  const [showSavePlaceMain, setShowSavePlaceMain] = useState(false);
  const [iconTouchPlaceMain, setIconTouchPlaceMain] = useState('');
  const [selectShow, setSelectShow] = useState<SelectShow>('history-to');

  const fromBlur = () => {
    setFromFocussed(false);
    setFrom(travelFrom.name);
  };
  const toBlur = () => {
    setToFocussed(false);
  };

  useEffect(() => {}, [travelFrom, travelTo]);

  useEffect(() => {
    setFrom(travelFrom.name);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const updateFrom = (travelPoint: TravelPoint) => {
    if (fromFocussed) {
      setTravelFrom(travelPoint);
      setFrom(travelPoint.name);
      setFromFocussed(false);
      toInputRef.current?.focus();
      setToFocussed(true);
      setSelectShow('history-to');
    } else {
      setTravelTo(travelPoint);
      navigation.navigate('TravelScreen');
    }
  };
  const navigateTravel = (travelPoint: TravelPoint) => {
    setTravelTo(travelPoint);
    navigation.navigate('TravelScreen');
  };
  const handleManual = () => {
    toFocussed ? setSelectShow('manual-to') : setSelectShow('manual-from');
  };

  useEffect(() => {
    if (selectShow === 'manual-to' || selectShow === 'manual-from') {
      return;
    }
    if (to !== '' || (travelFrom.name !== from && fromFocussed)) {
      setSelectShow('search-show');
    } else {
      setSelectShow('history-to');
    }
  }, [from, fromFocussed, travelFrom.name, selectShow, to]);

  if (showSavePlaceMain) {
    return (
      <SavePlaceMain
        setShowSavePlaceMain={setShowSavePlaceMain}
        name={iconTouchPlaceMain}
      />
    );
  }

  return (
    <>
      {selectShow === 'manual-from' && (
        <SelectLocation
          setSelectShow={setSelectShow}
          fromFocussed={fromFocussed}
          updateFrom={updateFrom}
          fromConfirmed={travelFrom}
        />
      )}
      {selectShow === 'manual-to' && (
        <SelectLocation
          setSelectShow={setSelectShow}
          fromFocussed={fromFocussed}
          updateFrom={updateFrom}
          fromConfirmed={travelFrom}
        />
      )}
      {selectShow !== 'manual-from' && selectShow !== 'manual-to' && (
        <View style={styles.container}>
          <InputsModal
            setFromFocussed={setFromFocussed}
            fromBlur={fromBlur}
            fromFocussed={fromFocussed}
            setFrom={setFrom}
            setToFocussed={setToFocussed}
            toBlur={toBlur}
            setTo={setTo}
            toFocussed={toFocussed}
            to={to}
            from={from}
            toInputRef={toInputRef}
          />
          {selectShow === 'search-show' && <Search onPress={updateFrom} />}
          {selectShow === 'history-to' && (
            <View>
              <View style={styles.favContainer}>
                <SavePlace
                  onPress={navigateTravel}
                  setShowSavePlaceMain={setShowSavePlaceMain}
                  setIconTouchPlaceMain={setIconTouchPlaceMain}
                />
              </View>
              <View style={styles.separator} />
              <View style={styles.historyContainer}>
                <History onPress={navigateTravel} />
              </View>
              <View style={styles.separator} />
            </View>
          )}
          <View style={styles.historyContainer}>
            <Manual onPress={handleManual} />
          </View>
        </View>
      )}

      {/* {showManual ? (
        <SelectLocation
          setShowManual={setShowManual}
          fromFocussed={fromFocussed}
          updateFrom={updateFrom}
          fromConfirmed={fromConfirmed}
        />
      ) : (
        <View style={styles.container}>
          <InputsModal
            setFromFocussed={setFromFocussed}
            fromBlur={fromBlur}
            fromFocussed={fromFocussed}
            setFrom={setFrom}
            setToFocussed={setToFocussed}
            toBlur={toBlur}
            setTo={setTo}
            toFocussed={toFocussed}
            to={to}
            from={from}
            toInputRef={toInputRef}
          />
          {to !== '' || (pointUser.name !== from && fromFocussed) ? (
            <Search onPress={updateFrom} />
          ) : (
            <View>
              <View style={styles.favContainer}>
                <SavePlace
                  onPress={navigateTravel}
                  setShowSavePlaceMain={setShowSavePlaceMain}
                  setIconTouchPlaceMain={setIconTouchPlaceMain}
                />
              </View>
              <View style={styles.separator} />
              <View style={styles.historyContainer}>
                <History onPress={navigateTravel} />
              </View>
              <View style={styles.separator} />
              <View style={styles.historyContainer}>
                <Manual onPress={handleManual} />
              </View>
            </View>
          )}
        </View>
      )} */}
    </>
  );
};
const styles = StyleSheet.create({
  container: {
    padding: 5,
    paddingTop: 10,
    borderRadius: 10,
    paddingBottom: 100,
    zIndex: 99999999999999,
    backgroundColor: '#fafafa',
  },
  favContainer: {},
  separator: {
    width: '100%',
    height: 7,
    backgroundColor: '#f1f1f1',
    marginVertical: 10,
  },
  historyContainer: {},
});
