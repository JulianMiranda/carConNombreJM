/* eslint-disable react-hooks/exhaustive-deps */
import React, {useContext, useEffect} from 'react';
import {StyleSheet, View} from 'react-native';
import {MapTravel} from '../components/MapTravel';
import LinearGradient from 'react-native-linear-gradient';
import {Modalize, useModalize} from 'react-native-modalize';
import {TravelContext} from '../context/travel/TravelContext';
import {SearchingTravel} from '../components/SearchingTravel';
import {AuthContext} from '../context/auth/AuthContext';

export const SearchingTravelScreen = () => {
  const {ref, open} = useModalize();

  const {travelFrom, travelTo} = useContext(TravelContext);
  const {setHistoryTravel} = useContext(AuthContext);

  console.log('Searching Screen');
  /*   console.log('From', travelFrom);
  console.log('To', travelTo); */

  useEffect(() => {
    open();
  }, []);

  useEffect(() => {
    setHistoryTravel({travelTo});
  }, []);

  return (
    <>
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
        modalStyle={styles.modalize}
        disableScrollIfPossible
        ref={ref}
        scrollViewProps={{
          showsVerticalScrollIndicator: false,
          scrollEnabled: false,
        }}
        withOverlay={false}
        alwaysOpen={290}
        modalHeight={290}>
        <SearchingTravel />
      </Modalize>
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
    height: 200,
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
});
