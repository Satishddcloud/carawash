import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons'
import Upcoming from '../Screens/Upcoming';
import Completed from '../Screens/Completed';
import Cancelled from '../Screens/Cancelled';
import { COLORS } from '../Constants/Color';
import { useNavigation } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';


const Tab = createMaterialTopTabNavigator();

const TopTabs = () => {
    const navigation = useNavigation()
  return (
    <>
      <View style={{backgroundColor:COLORS.blue,}}>
        <View style={{flexDirection:'row'}}>
              <TouchableOpacity onPress={()=>{
                navigation.goBack()
              }}>
              <Ionicons name="arrow-back-outline" size={15} 
              style={{margin: 10,color:COLORS.white,backgroundColor:COLORS.black,borderRadius:100,padding:10}} />
               </TouchableOpacity> 
               <Text style={{color:COLORS.white,margin:5,alignSelf:'center',marginLeft:100}}>My Bookings</Text>
        </View> 
        </View>
       
      <Tab.Navigator
       tabBarOptions={{
        // labelStyle: { textTransform: 'lowercase' },
        activeTintColor: COLORS.white,
        inactiveTintColor: COLORS.white,
        style: { backgroundColor: COLORS.blue,borderBottomRightRadius:15,borderBottomLeftRadius:15 },
        indicatorStyle: { backgroundColor: COLORS.white },
      }}>
        <Tab.Screen name="Upcoming" component={Upcoming} />
        <Tab.Screen name="Completed" component={Completed} />
        <Tab.Screen name="Cancelled" component={Cancelled} />
      </Tab.Navigator>
      
    </>
  );
}

export default TopTabs;
