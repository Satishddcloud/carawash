import * as React from 'react';
import{View,Text,Image} from 'react-native'
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Bookings from '../Screens/Bookings';
import Home from '../Screens/Home';
import Profile from '../Screens/Profile';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { COLORS } from '../Constants/Color';
import Vechiles from '../Screens/Vechiles';
import TopTabs from './TopTabs';
import SelectService from '../Screens/SelectService';

const Tab = createBottomTabNavigator();

const BottomTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: COLORS.white,
          height: 50,
         borderTopStartRadius:10,borderTopEndRadius:10
        },
        tabBarActiveTintColor: COLORS.orange,
        // tabBarLabelStyle: {fontSize: 12},
        tabBarInactiveTintColor: COLORS.black,
        tabBarActiveBackgroundColor: COLORS.white,
      }}>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({focused}) => {
            return (
              <Ionicons
                name="home"
                style={[
                  {fontSize: 20, color: COLORS.black},
                  focused && {tintColor: COLORS.orange, fontSize: 25, color: COLORS.orange,},
                ]}
              />
            );
          },
        }}
      
      />
      <Tab.Screen
        name="Bookings"
        component={TopTabs}
        options={{
          tabBarIcon: ({focused}) => {
            return (
              <FontAwesome
                name="calendar-minus-o"
                style={[
                  {fontSize: 25, color: COLORS.black},
                  focused && {tintColor: COLORS.orange, fontSize: 25, color: COLORS.orange,},
                
                ]}
              />
            );
          },
        }}
      />
      <Tab.Screen
        name="My Vechiles"
        component={SelectService}
        options={{
          tabBarIcon: ({focused}) => {
            return (
              <Image
              source={require('../assets/wheel.png')}
              style={[
                {fontSize: 25, color: COLORS.black},
                focused && {tintColor: COLORS.orange, fontSize: 25, color: COLORS.orange,},
              
              ]}
            />
            );
          },
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarIcon: ({focused}) => {
            return (
              <AntDesign
                name="user"
                style={[
                  {fontSize: 25, color: COLORS.black},
                  focused && {tintColor: COLORS.orange, fontSize: 25, color: COLORS.orange},
                ]}
              />
            );
          },
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTabs;
