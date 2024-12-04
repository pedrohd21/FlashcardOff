import React from 'react';
import { createStackNavigator, CardStyleInterpolators } from '@react-navigation/stack';

import { NavigationContainer } from '@react-navigation/native';

import { Home } from '../screens/Home';
import { Login } from '../screens/Auth/Login';



import { useState, useEffect } from "react";
import auth, { FirebaseAuthTypes } from "@react-native-firebase/auth"


import { MyTabs } from './myTab.routes';
import { Easing } from 'react-native';

const Stack = createStackNavigator();

export function MyStack() {

  const [user, setUser] = useState<FirebaseAuthTypes.User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth().onAuthStateChanged((_user) => {
      setUser(_user);
      if (isLoading) {
        setIsLoading(false)
      }
    });

    return unsubscribe;
  }, [])
  // if (isLoading) {
  //   return (
  //     // <Loading />
  //   )
  

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{
      headerShown: false,
    }}>
        {user ? <>
          <Stack.Screen name="MyTabs" component={MyTabs} />
          <Stack.Screen name="Home" component={Home} />

          
        </> : <Stack.Screen name="Login" component={Login} options={{ headerShown: false }}/>}

      </Stack.Navigator>
    </NavigationContainer>
  )

}