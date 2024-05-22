import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import {View, Text} from 'react-native';

import DrawerNavigation from './DrawerNavigation';
import BottomTabs from './BottomTabs';
import Services from '../Screens/Services';
import SelectService from '../Screens/SelectService';
import DateTime from '../Screens/DateTime';
import TermsAndConditions from '../Screens/TermsAndConditions';
import Payments from '../Screens/Payments';
import SelectVechile from '../Screens/SelectVechile';
import SelectBrand from '../Screens/SelectBrand';
import Login from '../Screens/Login';
import Register from '../Screens/Register';
import ForgetPassword from '../Screens/ForgetPassword';
import ResetPassword from '../Screens/ResetPassword';
import OtpForMail from '../Screens/OtptoMail';
import Reset from '../Screens/Reset';
import Carts from '../Screens/Carts';
import MyOrders from '../Screens/MyOrders';

const Stack = createStackNavigator();

const MainRoute = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      {/* <Stack.Screen name="DrawerNavigation" component={DrawerNavigation} />  */}
      <Stack.Screen name={'BottomTabs'} component={BottomTabs} />
      <Stack.Screen name={'DrawerNavigation'} component={DrawerNavigation} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Register" component={Register} />
      <Stack.Screen name="ForgetPassword" component={ForgetPassword} />
      <Stack.Screen name="ResetPassword" component={ResetPassword} />
      <Stack.Screen name="OtpForMail" component={OtpForMail} />
      <Stack.Screen name="Reset" component={Reset} />
      <Stack.Screen name={'Services'} component={Services} />
      <Stack.Screen name="Carts" component={Carts} />
      <Stack.Screen name="SelectService" component={SelectService} />
      <Stack.Screen name="DateTime" component={DateTime} />
      <Stack.Screen name="TermsAndConditions" component={TermsAndConditions} />
      <Stack.Screen name="Payments" component={Payments} />
      <Stack.Screen name="SelectBrand" component={SelectBrand} />
      <Stack.Screen name="SelectVechile" component={SelectVechile} />
      <Stack.Screen name="MyOrders" component={MyOrders} />
    </Stack.Navigator>
  );
};

export default MainRoute;
