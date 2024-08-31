import 'react-native-gesture-handler';
import React from 'react';
import {StatusBar} from 'react-native';
import {ToastProvider} from 'react-native-toast-notifications';
import {SafeAreaProvider} from 'react-native-safe-area-context';

import moment from 'moment';
import 'moment/locale/es';
import {AppDrawer} from './src/navigator/drawer';
import {PermissionsProvider} from './src/context/PermissionsContext';
import {NavigationContainer} from '@react-navigation/native';
moment.locale('es');
import {ThemeProvider} from './src/context/theme/ThemeContext';
import {TravelProvider} from './src/context/travel/TravelContext';
import {AuthProvider} from './src/context/auth/AuthContext';
import {ChatProvider} from './src/context/chat/ChatContext';
import {SocketProvider} from './src/context/SocketContext';

const AppState = ({children}: any) => {
  return (
    <>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle={'dark-content'}
      />
      <SafeAreaProvider>
        <PermissionsProvider>
          <TravelProvider>
            <AuthProvider>
              <SocketProvider>
                <ChatProvider>
                  <ThemeProvider>
                    <ToastProvider>{children}</ToastProvider>
                  </ThemeProvider>
                </ChatProvider>
              </SocketProvider>
            </AuthProvider>
          </TravelProvider>
        </PermissionsProvider>
      </SafeAreaProvider>
    </>
  );
};
const App = () => {
  return (
    <NavigationContainer>
      <AppState>
        <AppDrawer />
      </AppState>
    </NavigationContainer>
  );
};
export default App;
