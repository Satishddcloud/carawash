import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { View, Text } from 'react-native';

import Login from '../Screens/Login';
import { NavigationContainer } from '@react-navigation/native';
import Splash from '../Screens/Splash';
import Register from '../Screens/Register';
import MainRoute from './MainRoute';
import ResetPassword from '../Screens/ResetPassword';
import ForgetPassword from '../Screens/ForgetPassword';
import OtpForMail from '../Screens/OtptoMail';
import Reset from '../Screens/Reset';
import Profile from '../Screens/Profile';
import AddtoCart from '../Screens/AddtoCart';
import SelectService from '../Screens/SelectService';
import DateTime from '../Screens/DateTime';
import TermsAndConditions from '../Screens/TermsAndConditions';
import Payments from '../Screens/Payments';




const Stack = createStackNavigator();

const AuthRoute = () => {
  return (
    <NavigationContainer>
    <Stack.Navigator  screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Splash" component={Splash} />
     <Stack.Screen name="Login" component={Login} />
     <Stack.Screen name="Register" component={Register} />
     <Stack.Screen name="ForgetPassword" component={ForgetPassword} />
     <Stack.Screen name="ResetPassword" component={ResetPassword} />
     <Stack.Screen name="OtpForMail" component={OtpForMail} />
     <Stack.Screen name="Reset" component={Reset} />
     <Stack.Screen name="Profile" component={Profile} />
     <Stack.Screen name="AddtoCart" component={AddtoCart} />
     <Stack.Screen name="SelectService" component={SelectService} />
     <Stack.Screen name="DateTime" component={DateTime} />
     <Stack.Screen name="TermsAndConditions" component={TermsAndConditions} />
     <Stack.Screen name="Payments" component={Payments} />
     <Stack.Screen name="MainRoute" component={MainRoute} />

   </Stack.Navigator>
   </NavigationContainer>
  );
}

export default AuthRoute;
