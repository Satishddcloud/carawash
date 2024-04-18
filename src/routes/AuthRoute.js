import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { View, Text } from 'react-native';

import Login from '../Screens/Login';
import { NavigationContainer } from '@react-navigation/native';
import Splash from '../Screens/Splash';
import Register from '../Screens/Register';
import MainRoute from './MainRoute';




const Stack = createStackNavigator();

const AuthRoute = () => {
  return (
    <NavigationContainer>
    <Stack.Navigator  screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Splash" component={Splash} />
     {/* <Stack.Screen name="Login" component={Login} />
     <Stack.Screen name="Register" component={Register} /> */}
     <Stack.Screen name="MainRoute" component={MainRoute} />

   </Stack.Navigator>
   </NavigationContainer>
  );
}

export default AuthRoute;
