import React, { memo, useEffect } from 'react';
import { View, Text, Image, Dimensions, ImageBackground } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { RFValue } from 'react-native-responsive-fontsize';
import { isObject } from 'util';
import { isNullOrUndefined } from 'util';

import { withGlobalize } from 'react-native-globalize';
import { getUserProfileInfo } from '../Constants/AsyncStorageHelper';

const { width, height } = Dimensions.get('window');

const Splash = withGlobalize(memo(props => {
    const navigation = useNavigation();

    const navigationStep = async () => {
        const userObject = await getUserProfileInfo();
        console.log('userObject',userObject)
        setTimeout(() => {
            if (isObject(userObject) && !isNullOrUndefined(userObject.id)) {
                navigation.navigate('MainRoute');
            }
            else {
                // navigation.navigate('MainRoute');
                navigation.navigate('Login');
            }
        }, 3000);
    };

    useEffect(() => {
        navigationStep();
    }, []);

    return (
        <View style={{
            flex: 1,
            justifyContent: 'center',
        }}>
             <Image
                source={require('../assets/carwash2.png')}
                style={{
                    width: 200 ,
                    height: 150,
                    alignSelf: 'center'
                }}
            >

            </Image>
           {/* <Text style={{fontSize:20,alignSelf:'center',fontWeight:'bold'}}>Car Wash</Text> */}
        </View>

    );
}));

export default Splash;
