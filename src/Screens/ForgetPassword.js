import {View, Text, TextInput, TouchableOpacity, Image, ScrollView} from 'react-native';
import React, {useState, memo} from 'react';
import api from '../api';
import IntlProvider from '../Constants/IntlProvider';
import {withGlobalize} from 'react-native-globalize';
import Loader from '../Components/Loader';
import * as yup from 'yup';
import {Formik} from 'formik';
import {COLORS} from '../Constants/Color';
import {useNavigation} from '@react-navigation/native';
import AntDesign from 'react-native-vector-icons/AntDesign'

const ForgetPassword = withGlobalize(
  memo(props => {
    const [loading, setLoading] = useState(false);
    const intl = IntlProvider(props);
    const navigation = useNavigation();
    const [email,setEmail]=useState('')

  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
        <Loader loading={loading}></Loader>
        <View
          style={{
            backgroundColor: COLORS.white,
            padding: 10,
            borderBottomRightRadius: 10,
            borderBottomLeftRadius: 10,
          }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              margin: 10,
            }}>
            <TouchableOpacity
              onPress={() => {
                navigation.goBack();
              }}>
              <AntDesign
                name="left"
                size={15}
                style={{
                  right:8 ,
                  color: COLORS.medBlack,
                  backgroundColor: COLORS.medgrey,
                  borderRadius: 100,
                  padding: 10,
                }}
              />
            </TouchableOpacity>
          </View>
          <Text
            style={{
              fontSize: 20,
              fontWeight: 'bold',
              color: COLORS.medBlack,
              margin: 5,
            }}>
           Forgot Password
          </Text>
          <Text style={{color: COLORS.lgrey, marginLeft: 5}}>
            enter 5 digit code that mentioned in the email
          </Text>
        </View>
           <View
                style={{
                  alignSelf: 'center',
                  marginTop:10
                }}>
        <Text style={{color:COLORS.black,padding:10}}>Your Email</Text>
                    <TextInput
                      value={email}
                      placeholder="Enter email"
                      onChangeText={text => {
                        setEmail( text);
                      }}
                      style={{borderRadius:10,borderWidth:1,borderColor:'#C1C1C1',margin:5,width:300}}
                    />
             </View>
              
             <TouchableOpacity
                    style={{
                      backgroundColor:COLORS.blue,
                      borderRadius: 30,
                      padding: 15,
                      width: 300,
                      alignSelf: 'center',
                      marginTop: 20,
                    }}
                    onPress={() => {
                     navigation.navigate('OtpForMail')
                   }}>
                    <Text style={{alignSelf: 'center', color: COLORS.white}}>
                      Reset Passowrd
                    </Text>
                  </TouchableOpacity>
    </View>
  );
}))

export default ForgetPassword;
