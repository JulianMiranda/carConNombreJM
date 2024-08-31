import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {HelpScreen} from '../screens/HelpScreen';
import {EmergencyScreen} from '../screens/Help/EmergencyScreen';
import {QuickScreen} from '../screens/Help/QuickScreen';
import {OpinionScreen} from '../screens/Help/OpinionScreen';
import {ReportScreen} from '../screens/Help/ReportScreen';
import {AccidentScreen} from '../screens/Help/AccidentScreen';
import {DifferentParnerScreen} from '../screens/Help/DifferentParnerScreen';
import {CallScreen} from '../screens/Help/CallScreen';
import {DoubtsScreen} from '../screens/Help/DoubtsScreen';
import {WrongRouteScreen} from '../screens/Help/WrongRouteScreen';
import {EmptyTravelScreen} from '../screens/Help/EmptyTravelScreen';
import {LateEndScreen} from '../screens/Help/LateEndScreen';
import {HistoryTravel} from '../interfaces/TravelInfo.interface';

const Stack = createStackNavigator();

export type RootStackParams = {
  HelpScreen: undefined;
  EmergencyScreen: undefined;
  QuickScreen: {travel: HistoryTravel};
  OpinionScreen: undefined;
  ReportScreen: undefined;
  AccidentScreen: undefined;
  DifferentParnerScreen: undefined;
  CallScreen: undefined;
  DoubtsScreen: undefined;
  WrongRouteScreen: {travel: HistoryTravel};
  EmptyTravelScreen: {travel: HistoryTravel};
  LateEndScreen: {travel: HistoryTravel};
};

export const HelpStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="HelpScreen"
        component={HelpScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="EmergencyScreen"
        component={EmergencyScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="QuickScreen"
        component={QuickScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="OpinionScreen"
        component={OpinionScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="ReportScreen"
        component={ReportScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="AccidentScreen"
        component={AccidentScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="DifferentParnerScreen"
        component={DifferentParnerScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="CallScreen"
        component={CallScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="DoubtsScreen"
        component={DoubtsScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="WrongRouteScreen"
        component={WrongRouteScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="EmptyTravelScreen"
        component={EmptyTravelScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="LateEndScreen"
        component={LateEndScreen}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};
