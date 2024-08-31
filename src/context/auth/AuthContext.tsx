import React, {createContext, useEffect, useReducer} from 'react';
import {User} from '../../interfaces/User.interface';
import {authReducer, AuthState} from './authReducer';
import {TravelPoint} from '../../interfaces/TravelInfo.interface';
import api from '../../api/api';

export interface FavProp {
  name: string;
  place: TravelPoint;
}
type SetHistoryTravelProps = {
  travelTo: TravelPoint;
};

type AuthContextProps = {
  status:
    | 'checking'
    | 'authenticated'
    | 'not-authenticated'
    | 'not-internet'
    | 'login';
  user: User | null;
  logIn: () => void;
  updateUser: (user: User) => void;
  logOut: () => void;
  updateReciveNotifications: (user: User) => void;
  /*   setCreditCard: (card: Card) => void; */
  setFavoritePlace: ({name, place}: FavProp) => void;
  /*  savedCards: Card[]; */
  setHistoryTravel: ({travelTo}: SetHistoryTravelProps) => void;
};

const authInicialState: AuthState = {
  status: 'checking',
  user: null,
  /*   savedCards: [], */
};

export const AuthContext = createContext({} as AuthContextProps);

export const AuthProvider = ({children}: any) => {
  const [state, dispatch] = useReducer(authReducer, authInicialState);
  /*  const {setSelectedPayment} = useContext(TravelContext); */
  useEffect(() => {
    checkToken();
  }, []);

  const checkToken = async () => {
    // Hay token
    try {
      console.log('Auth');

      const token = 'TokenTest';
      if (!token) {
        return dispatch({type: 'notAuthenticated'});
      }
      /*  const resp = await api.get<User>('/login'); */
      const resp = await api.get<User>(
        '/users/getOne/65471117c32a0f304c3e608a',
      );

      if (resp.status !== 200) {
        return dispatch({type: 'notAuthenticated'});
      }
      dispatch({
        type: 'login',
        payload: {
          user: resp.data,
        },
      });
      /*  dispatch({
        type: 'setCard',
        payload: {card: {type: 'visa', number: '4922'}},
      });
      dispatch({
        type: 'setCard',
        payload: {card: {type: 'visa', number: '5201'}},
      }); */
    } catch (error: any) {
      console.log('error login catch', error);
      if (error && error.message === 'Network Error') {
        dispatch({type: 'notInternet'});
      }
      dispatch({type: 'notAuthenticated'});
      // return dispatch({type: 'notAuthenticated'});
    }
  };

  const updateUser = async (user: User) => {
    try {
      dispatch({
        type: 'updateUser',
        payload: {
          user,
        },
      });
    } catch (error) {}
  };

  const logOut = async () => {
    dispatch({type: 'logout'});
  };
  const logIn = async () => {
    dispatch({type: 'logout'});
  };

  const updateReciveNotifications = (user: User) => {
    dispatch({type: 'updateReciveNotifications', payload: user});
  };
  /*   const setCreditCard = (card: Card) => {
    dispatch({
      type: 'setCard',
      payload: {card: {type: 'visa', number: card.number.slice(-4)}},
    });
    setSelectedPayment({type: 'visa', number: card.number.slice(-4)});
  }; */
  const setFavoritePlace = async ({name, place}: FavProp) => {
    if (state.user) {
      const deleteProp = state.user.favoritesPlaces.filter(
        f => f.name !== name,
      );

      let userUp = {
        ...state.user,
        favoritesPlaces: [...deleteProp, {name, place}],
      };
      dispatch({type: 'updateUserFavoritePlace', payload: {user: userUp}});
    }
  };
  const setHistoryTravel = ({travelTo}: SetHistoryTravelProps) => {
    try {
      if (state.user) {
        api
          .put('users/update/' + state.user.id, {lastTravelUpdate: travelTo})
          .then(({data}) => {
            dispatch({type: 'updateUserLastTravel', payload: {user: data}});
          });
      }
    } catch (error) {
      console.log('Error setHistoryTravel');
    }
  };
  return (
    <AuthContext.Provider
      value={{
        ...state,
        logOut,
        logIn,
        updateUser,
        updateReciveNotifications,
        setFavoritePlace,
        setHistoryTravel,
      }}>
      {children}
    </AuthContext.Provider>
  );
};
