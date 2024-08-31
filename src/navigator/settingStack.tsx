import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {SettingScreen} from '../screens/Settings/SettingScreen';
import {PerfilScreen} from '../screens/Settings/PerfilScreen';
import {PrivacityScreen} from '../screens/Settings/PrivacityScreen';
import {TermsScreen} from '../screens/Settings/TermsScreen';
import {FavoritesScreen} from '../screens/Settings/FavoritesScreen';
import {NumberScreen} from '../screens/Settings/NumberScreen';
import {EmailScreen} from '../screens/Settings/EmailScreen';
import {PasswordScreen} from '../screens/Settings/PasswordScreen';
import {AddFavoriteScreen} from '../screens/Settings/AddFavoriteScreen';

const Stack = createStackNavigator();

export type RootStackParams = {
  SettingScreen: undefined;
  PerfilScreen: undefined;
  FavoritesScreen: undefined;
  PrivacityScreen: undefined;
  TermsScreen: undefined;
  PasswordScreen: undefined;
  AddFavoriteScreen: {fav: string};
  NumberScreen: {phoneNumber: string};
  EmailScreen: {email: string};
};

export const SettingStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="SettingScreen"
        component={SettingScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="PerfilScreen"
        component={PerfilScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="FavoritesScreen"
        component={FavoritesScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="PrivacityScreen"
        component={PrivacityScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="TermsScreen"
        component={TermsScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="PasswordScreen"
        component={PasswordScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="NumberScreen"
        component={NumberScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="EmailScreen"
        component={EmailScreen}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="AddFavoriteScreen"
        component={AddFavoriteScreen}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};
