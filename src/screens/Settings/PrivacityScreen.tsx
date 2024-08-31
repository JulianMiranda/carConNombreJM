import React from 'react';
import {ActivityIndicator, StyleSheet, View} from 'react-native';
import WebView from 'react-native-webview';
import {HeaderScreen} from '../../components/HeaderScreen';

export const PrivacityScreen = () => {
  return (
    <>
      <HeaderScreen title="Privacidad" button="arrow-back" />
      <View style={styles.body}>
        <WebView
          source={{
            uri: 'https://encarga-politics.web.app',
          }}
          startInLoadingState
          renderLoading={() => (
            <View
              style={{
                alignItems: 'center',
                backgroundColor: '#F4F4F4',
              }}>
              <ActivityIndicator color={'orange'} size={32} />
            </View>
          )}
        />
      </View>
    </>
  );
};
const styles = StyleSheet.create({
  body: {
    flex: 1,
    backgroundColor: '#F4F4F4',
  },
});
