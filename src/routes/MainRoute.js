import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import {View, Text} from 'react-native';

import DrawerNavigation from './DrawerNavigation';
import BottomTabs from './BottomTabs';
import Services from '../Screens/Services';


const Stack = createStackNavigator();

const MainRoute = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      {/* <Stack.Screen name="DrawerNavigation" component={DrawerNavigation} />  */}
      <Stack.Screen name={'BottomTabs'} component={BottomTabs} />
      <Stack.Screen name={'Services'} component={Services} />

    </Stack.Navigator>
  );
};

export default MainRoute;
