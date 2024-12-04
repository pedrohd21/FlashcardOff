import React from 'react';

import { Home } from '../screens/Home';


import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { StyleSheet } from 'react-native';
import { Icon, MD3Colors } from 'react-native-paper';

const Tab = createBottomTabNavigator();

export function MyTabs() {

  return (
    <Tab.Navigator screenOptions={{
      headerShown: false,
    }}>
      <Tab.Screen name="Home" component={Home}
        options={{
          tabBarIcon: ({ color }) => (
            <Icon
              source="camera"
              color={MD3Colors.error50}
              size={20}
            />),

        }}
      />
    </Tab.Navigator>
  );
}