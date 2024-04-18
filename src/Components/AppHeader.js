import { useNavigation } from '@react-navigation/native';
import React, { memo, useState } from 'react';
import { View, Text, Dimensions, Pressable, TouchableOpacity, Alert, StyleSheet,FlatList } from 'react-native';
import { withGlobalize } from 'react-native-globalize';
import Entypo from 'react-native-vector-icons/Entypo';
import {
  NavigationActions,
  DrawerActions,
  CommonActions,
} from '@react-navigation/native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {Badge} from 'react-native-elements';
import {useDispatch} from 'react-redux';
// import LottieView from 'lottie-react-native';

import {logout} from '../Redux/reducer/User';

import Loader from './Loader';
import { saveUserId, saveUserProfileInfo } from '../Constants/AsyncStorageHelper';

const {width, height} = Dimensions.get('window');

const AppHeader = withGlobalize(memo(props => {
  const { bellIcon, profile, backIcon, name, powerOff  } = props;
  
    const navigation = useNavigation();
    const dispatch = useDispatch();

 
  const logoutUser = async () => {
    await saveUserId(undefined);
    await saveUserProfileInfo({});
    dispatch(logout());
    navigation.navigate('SigninScreen')
  };
  
  return (
    <View style={{
      backgroundColor: 'orange',
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingHorizontal: 15,
      alignItems: 'center',
      height: height * 0.07,
      width: width * 1,
    }}>
   
      {backIcon && (
        <View style={{ flexDirection: 'row',  }}>
          <Entypo
            onPress={() => {
              props.back == false
                ? navigation.dispatch(DrawerActions.openDrawer())
                : navigation.goBack()
            }}
            style={{
              paddingRight: 5
            }}
            name={props.back == false ? 'menu' : 'chevron-left'}
            size={30}
            color={'white'}
          />
        </View>
      )}
      {name && (
        <View style={{ paddingLeft: 0, marginRight:50,  }}>
          <Text
            style={{
              color: 'white',
              fontFamily: 'Poppins-Medium',
              fontSize: 20,
              fontWeight: 'bold',
             
            }}>
            {props.name}
          </Text>
        </View>

      )}
     
      {bellIcon && (
        <View style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: '#EFF1F3', borderRadius: 20, height: 30, width: 30, paddingLeft: 5 }}>
            <TouchableOpacity
              onPress={() => {
                
              }}>
            <FontAwesome
              name="bell" size={20} color={'#41bab0'} style={{ alignItems: 'center', alignSelf: 'center', }}
            />
          </TouchableOpacity>
          </View>
        )}
        {profile && (
          <View style={{}}>
            
           
        </View>
      )}
        {powerOff && (
          <View style={{}}>
            <TouchableOpacity
              onPress={() => {
                Alert.alert('Logout', `Are you Logout ?`, [
                  {
                    text: 'Cancel',
                    onPress: () => console.log('Cancel Pressed'),
                    style: 'cancel',
                  },
                  {text: 'OK', onPress: () =>{  logoutUser()  }}
                ])
              }}>
            <MaterialIcons
              name="power-settings-new" size={30} color={'white'} style={{ alignItems: 'center', alignSelf: 'center', }}
            />
          </TouchableOpacity>
           
        </View>
      )}
    </View>
  );
}))
const styles = StyleSheet.create({
  headerContainer: {
    backgroundColor: 'gray',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    alignItems: 'center',
    height: height * 0.07,
    width: width * 1,
  },
  languageContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dropDownContainer: {
    padding: 10,
  },
  dropDownView: {
    borderRadius: 5,
  },
})
export default AppHeader;
