import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import {View, Text} from 'react-native';

import DrawerNavigation from './DrawerNavigation';
import BottomTabs from './BottomTabs';
import Services from '../Screens/Services';
import AddtoCart from '../Screens/AddtoCart';
import SelectService from '../Screens/SelectService';
import DateTime from '../Screens/DateTime';
import TermsAndConditions from '../Screens/TermsAndConditions';
import Payments from '../Screens/Payments';
import SelectVechile from '../Screens/SelectVechile';
import SelectBrand from '../Screens/SelectBrand';


const Stack = createStackNavigator();

const MainRoute = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      {/* <Stack.Screen name="DrawerNavigation" component={DrawerNavigation} />  */}
      <Stack.Screen name={'BottomTabs'} component={BottomTabs} />
      <Stack.Screen name={'Services'} component={Services} />
      <Stack.Screen name="AddtoCart" component={AddtoCart} />
     <Stack.Screen name="SelectService" component={SelectService} />
     <Stack.Screen name="DateTime" component={DateTime} />
     <Stack.Screen name="TermsAndConditions" component={TermsAndConditions} />
     <Stack.Screen name="Payments" component={Payments} />
     <Stack.Screen name="SelectBrand" component={SelectBrand} />
     <Stack.Screen name="SelectVechile" component={SelectVechile} />
    </Stack.Navigator>
  );
};

export default MainRoute;
