import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {MainScreen} from '../screens/MainScreen';
import {TravelScreen} from '../screens/TravelScreen';
import {SelectPaymentScreen} from '../screens/SelectPaymentScreen';
import {AddCardScreen} from '../screens/AddCardScreen';
import {SearchingTravelScreen} from '../screens/SearchingTravelScreen';

const Stack = createStackNavigator();

export type RootStackParams = {
  MainScreen: undefined;
  TravelScreen: undefined;
  SelectPaymentScreen: undefined;
  AddCardScreen: undefined;
  SearchingTravelScreen: undefined;
};

export const StackNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        headerStyle: {elevation: 0},
        cardStyle: {backgroundColor: 'white'},
      }}>
      <Stack.Screen name="Main" component={MainScreen} />
      <Stack.Screen name="TravelScreen" component={TravelScreen} />
      <Stack.Screen
        name="SearchingTravelScreen"
        component={SearchingTravelScreen}
      />
      <Stack.Screen
        name="SelectPaymentScreen"
        component={SelectPaymentScreen}
      />
      <Stack.Screen name="AddCardScreen" component={AddCardScreen} />
    </Stack.Navigator>
  );
};
