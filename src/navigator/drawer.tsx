import React, {useContext, useEffect} from 'react';
import {useWindowDimensions} from 'react-native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {HistoryScreen} from '../screens/HistoryScreen';
import {ShareScreen} from '../screens/ShareScreen';
import {StackNavigator} from './navigation';
import {InsideMenu} from '../components/Drawer/InsideMenu';
import {PermissionsContext} from '../context/PermissionsContext';
import {LoadingScreen} from '../screens/LoadingScreen';
import {PermissionsScreen} from '../screens/PermissionsScreen';
import {HelpStack} from './helpStack';
import {SettingStack} from './settingStack';
import {LoginPage} from '../screens/LoginPage';

const Drawer = createDrawerNavigator();

export const AppDrawer = () => {
  const {width} = useWindowDimensions();
  const {permissions} = useContext(PermissionsContext);

  useEffect(() => {
    console.log(permissions);
  }, [permissions]);

  if (permissions.locationStatus === 'unavailable') {
    return <LoadingScreen />;
  }

  return (
    <Drawer.Navigator
      screenOptions={{
        headerShown: false,
        headerStyle: {elevation: 0},
        drawerType: width >= 768 ? 'permanent' : 'front',
      }}
      drawerContent={props => <InsideMenu {...props} />}>
      {permissions.locationStatus === 'granted' ? (
        <Drawer.Screen
          name="Stack"
          options={{title: 'Principal'}}
          component={StackNavigator}
        />
      ) : (
        <Drawer.Screen name="PermissionsScreen" component={PermissionsScreen} />
      )}
      <Drawer.Screen
        name="LoginPage"
        options={{title: 'Iniciar Sesión'}}
        component={LoginPage}
      />
      <Drawer.Screen
        name="HistoryScreen"
        options={{title: 'Mis Viajes'}}
        component={HistoryScreen}
      />
      <Drawer.Screen
        name="HelpStack"
        options={{title: 'HelpStack'}}
        component={HelpStack}
      />
      <Drawer.Screen
        name="SettingStack"
        options={{title: 'SettingStack'}}
        component={SettingStack}
      />
      <Drawer.Screen
        name="ShareScreen"
        options={{title: 'ShareScreen'}}
        component={ShareScreen}
      />
    </Drawer.Navigator>
  );
};
