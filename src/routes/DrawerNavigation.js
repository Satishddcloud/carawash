import 'react-native-gesture-handler';
import * as React from 'react';
import DrawerContent from './DrawerContent';
import {createDrawerNavigator} from '@react-navigation/drawer';
import Home from '../Screens/Home';

const Drawer = createDrawerNavigator();

const DrawerNavigation = props => {
  return (
    <Drawer.Navigator
      drawerStyle={{
        width: '60%',
      }}
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName={'Home'}
      drawerContent={() => <DrawerContent {...props} />}>
      <Drawer.Screen name={'Home'} component={Home} />
    </Drawer.Navigator>
  );
};

export default DrawerNavigation;
