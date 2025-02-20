import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import Home from '../screen/Home';

// Création d'une instance de stack navigation
const Stack = createNativeStackNavigator();

// Composant de navigation pour les articles
export function PlayerStack() { 
  return (
    <Stack.Navigator>
      <Stack.Screen name='List' component={Home} />
      <Stack.Screen name='Detail' component={Detail} />
    </Stack.Navigator>
  );
}

// Création d'une instance de tab navigation (navigation par onglets)
const Tabs = createBottomTabNavigator();

// Composant de navigation principal
export default function AppNavigation() {
  return (
    <NavigationContainer>
      <Tabs.Navigator>
        <Tabs.Screen name='Home' component={PlayerStack} options={{ headerShown: false }} />
      </Tabs.Navigator>
    </NavigationContainer>
  );
}
