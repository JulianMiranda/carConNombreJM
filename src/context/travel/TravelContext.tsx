import React, {createContext, useEffect, useReducer} from 'react';

import Geolocation from '@react-native-community/geolocation';
import {TravelState, travelReducer} from './travelReducer';
import {
  DistanceCalculated,
  Location,
  Travel,
  TravelPoint,
} from '../../interfaces/TravelInfo.interface';
import {points} from '../../DATA';
import {Card} from '../../interfaces/Card.interface';
import api from '../../api/api';
import {
  SearchingTravelProps,
  TravelStatus,
  TravelType,
} from '../../interfaces/Travel.type';
import {Prices, PricesResponse} from '../../interfaces/Prices.interface';

type TravelContextProps = {
  userLocation: Location;
  pointUser: TravelPoint;
  selectedPayment: Card;
  setSelectedPayment: (type: Card) => void;
  calculatePriceTravel: () => void;
  takeFastTravel: (to: TravelPoint) => void;
  setTravelType: (travelType: TravelType) => void;
  setTravelDate: (travelDate: Date) => void;
  travelValue: number;
  travelFastValue: number;
  travelScheduleValue: number;
  travelFastSharedValue: number;
  travelScheduleSharedValue: number;
  travelFrom: TravelPoint;
  travelTo: TravelPoint;
  travelStatus: TravelStatus;
  travelId: string;
  loadingCalculatedTravel: boolean;
  travelType: TravelType;
  travelDate: Date;
  prices: Prices | null;

  setTravelFrom: (travelFrom: TravelPoint) => void;
  setTravelTo: (travelTo: TravelPoint) => void;
  setTravelStatus: (travelStatus: TravelStatus) => void;

  setTravelValue: (travelValue: number) => void;

  searchingTravel: ({handle, userId}: SearchingTravelProps) => void;
};
const travelInicialState: TravelState = {
  userLocation: {latitude: -0.14, longitude: -70},
  pointUser: {name: '', address: '', coordinates: {latitude: 0, longitude: 0}},
  selectedPayment: {currency: 'MN', type: 'cash'},
  travelValue: 0,
  travelFastValue: 0,
  travelScheduleValue: 0,
  travelFastSharedValue: 0,
  travelScheduleSharedValue: 0,
  travelId: '',
  travelStatus: 'init',
  travelFrom: {name: '', address: '', coordinates: {latitude: 0, longitude: 0}},
  travelTo: {name: '', address: '', coordinates: {latitude: 0, longitude: 0}},
  loadingCalculatedTravel: false,
  travelType: 'fast',
  travelDate: new Date(),
  prices: null,
};

export const TravelContext = createContext({} as TravelContextProps);

export const TravelProvider = ({children}: any) => {
  const [state, dispatch] = useReducer(travelReducer, travelInicialState);
  /*  const {user} = useContext(AuthContext); */

  useEffect(() => {
    getCurrentLocation().then(location => {
      dispatch({type: 'set_user_location', payload: location});
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    getPrices();
  }, []);

  const getPrices = async () => {
    try {
      const prices = await api.get<PricesResponse>('/prices/getPrices');
      console.log(prices.data.prices);
      dispatch({type: 'setPrices', payload: prices.data.prices});
    } catch (error) {
      console.log(JSON.stringify(error));
      console.log('Error al obtener Prices');
    }
  };
  const getCurrentLocation = (): Promise<Location> => {
    return new Promise((resolve, reject) => {
      Geolocation.getCurrentPosition(
        ({coords}) => {
          resolve({
            latitude: coords.latitude,
            longitude: coords.longitude,
          });
          const myAdd = getAddress({
            latitude: coords.latitude,
            longitude: coords.longitude,
          });
          setPointUser(myAdd);
          setTravelFrom(myAdd);
        },
        err => reject({err}),
        {enableHighAccuracy: true},
      );
    });
  };
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const getAddress = ({latitude, longitude}: any) => {
    return points.Occidental;
  };
  const setSelectedPayment = (type: Card) => {
    dispatch({type: 'set_selected_payment', payload: type});
  };

  const setTravelFrom = (travelFrom: TravelPoint) => {
    dispatch({type: 'set_travel_from', payload: travelFrom});
  };

  const setTravelTo = (travelTo: TravelPoint) => {
    dispatch({type: 'set_travel_to', payload: travelTo});
  };
  const setTravelType = (travelType: TravelType) => {
    dispatch({type: 'set_travel_type', payload: travelType});
  };
  const setTravelDate = (travelDate: Date) => {
    dispatch({type: 'set_travel_date', payload: travelDate});
  };

  const setTravelStatus = (travelStatus: TravelStatus) => {
    dispatch({type: 'set_travel_status', payload: travelStatus});
  };

  const setPointUser = (pointUser: TravelPoint) => {
    dispatch({type: 'set_point_user', payload: pointUser});
  };
  const takeFastTravel = (travelTo: TravelPoint) => {
    dispatch({type: 'set_travel_to', payload: travelTo});
    /*  dispatch({type: '_point_user', payload: pointUser}); */
  };

  const calculatePriceTravel = () => {
    dispatch({type: 'set_loading_calculated_travel', payload: true});
    const body = {
      latitud_punto1: state.travelFrom.coordinates.latitude,
      longitud_punto1: state.travelFrom.coordinates.longitude,
      latitud_punto2: state.travelTo.coordinates.latitude,
      longitud_punto2: state.travelTo.coordinates.longitude,
    };
    try {
      api
        .post<DistanceCalculated>('/queries/distanceFromTo', body)
        .then(({data}) => {
          dispatch({
            type: 'set_travel_value',
            payload: diferentCurrency(data.fast),
          });
          dispatch({type: 'set_travel_fast_value', payload: data.fast});
          dispatch({
            type: 'set_travel_fast_shared_value',
            payload: data.fastShared,
          });
          dispatch({type: 'set_travel_schedule_value', payload: data.schedule});
          dispatch({
            type: 'set_travel_schedule_shared_value',
            payload: data.scheduleShared,
          });
          dispatch({type: 'set_loading_calculated_travel', payload: false});
        })
        .catch(error => {
          console.log('Error calculate price', error);
          dispatch({type: 'set_travel_value', payload: 0});
          dispatch({type: 'set_loading_calculated_travel', payload: false});
        });
    } catch (error) {
      console.log('Error calculate price', error);
      dispatch({type: 'set_travel_value', payload: 0});
      dispatch({type: 'set_loading_calculated_travel', payload: false});
    }
  };

  const diferentCurrency = (value: number) => {
    if (!state.prices) {
      return value;
    }
    if (state.selectedPayment.currency === 'USD') {
      return value * state.prices?.usd;
    } else if (state.selectedPayment.currency === 'MLC') {
      return value * state.prices.mlc;
    } else if (state.selectedPayment.currency === 'MN') {
      return value * state.prices.mn;
    } else {
      return value;
    }
  };

  const setTravelId = (id: string) => {
    dispatch({type: 'set_travel_id', payload: id});
  };

  const setTravelValue = (travelValue: number) => {
    dispatch({type: 'set_travel_value', payload: travelValue});
  };

  const searchingTravel = ({handle, userId}: SearchingTravelProps) => {
    console.log('searchingTravel TravelContext', handle, userId);
    if (!userId) {
      return;
    }
    if (handle) {
      console.log('Creando Travel', userId);
      console.log('Creando TravelFrom', JSON.stringify(state.travelFrom));
      console.log('Creando TravelTo', JSON.stringify(state.travelTo));

      try {
        api
          .post<Travel>('/travels/create', {
            user: userId,
            fromCoordinates: state.travelFrom,
            toCoordinates: state.travelTo,
            type: state.travelType,
            date: state.travelDate,
            cost: state.travelValue,
            payment: state.selectedPayment,
          })
          .then(response => setTravelId(response.data.id))
          .catch(err => console.error('PostError', err));
      } catch (error) {
        console.error('TryError', error);
      }
    } else {
      try {
        console.log('Update', state.travelId);
        api
          .put('/travels/update/' + state.travelId, {
            state: 'cancelled',
          })
          .catch(err => console.error('TryErrorCatch', err));
      } catch (error) {
        console.log('TryError', error);
      }
    }
  };
  return (
    <TravelContext.Provider
      value={{
        ...state,
        setSelectedPayment,
        calculatePriceTravel,
        setTravelFrom,
        setTravelTo,
        setTravelStatus,
        takeFastTravel,
        searchingTravel,
        setTravelType,
        setTravelDate,
        setTravelValue,
      }}>
      {children}
    </TravelContext.Provider>
  );
};
