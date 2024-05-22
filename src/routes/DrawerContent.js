import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import React from 'react';
import { View, Text, Alert } from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import { DrawerActions, useNavigation } from '@react-navigation/native';
import { withGlobalize } from 'react-native-globalize';
import { memo } from 'react';
import { saveCarData,  saveUserId, saveUserProfileInfo, setJwtToken } from '../Constants/AsyncStorageHelper';
import { logout } from '../Redux/reducer/User';
import { useDispatch } from 'react-redux';
import { COLORS } from '../Constants/Color';
import { TouchableOpacity } from 'react-native';
import { color } from 'react-native-reanimated';
import DeviceInfo from 'react-native-device-info';



const DrawerContent = withGlobalize(
  memo(props => {
    const navigation = useNavigation();
    const dispatch = useDispatch();

    const logoutUser = async () => {
      const deviceId = await DeviceInfo.getUniqueId();
      const cardata = {
        "selected_car_id": 0,
        "device_id": `${deviceId}`,
          "car_id": 0,
          "car_image": "https://testmodel.co.in/carwash/uploads/cars/1714130732.jpg"   
    }
      await saveUserId(undefined);
      await saveUserProfileInfo({});
      await setJwtToken(null)
      await saveCarData(cardata)
      dispatch(logout());
      navigation.reset({
        index: 0,
        routes: [{ name: 'Splash' }],
      });
    };
    return (
      <View style={{ flex: 1, backgroundColor: '#FFFFFF' }}>
        <View style={{flex:1}}>
        <DrawerContentScrollView {...props}>
          <DrawerItem
            labelStyle={{ color: COLORS.blue, fontSize: (20), }}
            // icon={() => (
            //   <Entypo
            //     name="home"
            //     style={{ color: '#98280B', fontSize: (20) }}
            //   />
            // )}
            label=" Home"
            onPress={() => {
              navigation.navigate('Home')
              navigation.dispatch(DrawerActions.closeDrawer()
              )
            }}
          />
           <DrawerItem
            labelStyle={{ color: COLORS.blue, fontSize: (20), }}
            // icon={() => (
            //   <Entypo
            //     name="home"
            //     style={{ color: '#98280B', fontSize: (20) }}
            //   />
            // )}
            label=" Login"
            onPress={() => {
              navigation.navigate('Login')
              navigation.dispatch(DrawerActions.closeDrawer()
              )
            }}
          />
          <DrawerItem
            labelStyle={{ color: COLORS.blue, fontSize: (20), }}
            // icon={() => (
            //   <Entypo
            //     name="home"
            //     style={{ color: '#98280B', fontSize: (20) }}
            //   />
            // )}
            label=" My Orders"
            onPress={() => {
              navigation.navigate('MyOrders')
              navigation.dispatch(DrawerActions.closeDrawer()
              )
            }}
          />

         
          
        </DrawerContentScrollView>
        </View>
        <View style={{bottom:20}}>
            <TouchableOpacity style={{padding:10,backgroundColor:COLORS.blue,margin:20,borderRadius:10}}
            onPress={()=>{
              Alert.alert('Logout', `Are you Logout ?`, [
                {
                  text: 'Cancel',
                  onPress: () => console.log('Cancel Pressed'),
                  style: 'cancel',
                },
                {text: 'OK', onPress: () =>{  logoutUser()  }}
              ])
            }}>
              <Text style={{alignSelf:'center',color:COLORS.white,fontWeight:'bold'}}>Logout</Text>
            </TouchableOpacity>
          </View>
      </View>
    );
  }),
);
export default DrawerContent;
