import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import React from 'react';
import { View, Text, Alert } from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import { DrawerActions, useNavigation } from '@react-navigation/native';
import { withGlobalize } from 'react-native-globalize';
import { memo } from 'react';
import { saveUserId, saveUserProfileInfo } from '../Constants/AsyncStorageHelper';
import { logout } from '../Redux/reducer/User';
import { useDispatch } from 'react-redux';



const DrawerContent = withGlobalize(
  memo(props => {
    const navigation = useNavigation();
    const dispatch = useDispatch();

    const logoutUser = async () => {
      await saveUserId(undefined);
      await saveUserProfileInfo({});
      dispatch(logout());
      navigation.reset({
        index: 0,
        routes: [{ name: 'Login' }],
      });
    };
    return (
      <View style={{ flex: 1, backgroundColor: '#FFFFFF' }}>
        <DrawerContentScrollView {...props}>
          <DrawerItem
            labelStyle={{ color: '#98280B', fontSize: (20) }}
            icon={() => (
              <Entypo
                name="home"
                style={{ color: '#98280B', fontSize: (20) }}
              />
            )}
            label=" Home"
            onPress={() => {
              navigation.navigate('Home')
              navigation.dispatch(DrawerActions.closeDrawer()
              )
            }}
          />
         
          
        </DrawerContentScrollView>
      </View>
    );
  }),
);
export default DrawerContent;
