import 'react-native-gesture-handler';
import React from 'react';
import Routes from './src/routes';
import { StatusBar } from "react-native";

// import { Home } from './src/screens/Home';
import { PermissionsAndroid } from 'react-native';
import {
  MD3LightTheme as DefaultTheme,
  PaperProvider,
} from 'react-native-paper';

PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS);


export default function App() {

  return (
    <PaperProvider>
        <StatusBar
          barStyle='light-content'
          backgroundColor="#000000"
          translucent={false}
        />

        <Routes />
    </PaperProvider>
  );
}