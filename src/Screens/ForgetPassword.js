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
import Ionicons from 'react-native-vector-icons/Ionicons'

const ForgetPassword = withGlobalize(
  memo(props => {
    const [loading, setLoading] = useState(false);
    const intl = IntlProvider(props);
    const navigation = useNavigation();
    const [email,setEmail]=useState('')

  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
        <Loader loading={loading}></Loader>
        <View style={{backgroundColor:COLORS.blue,padding:10,borderBottomRightRadius:10,borderBottomLeftRadius:10}}>
        <View style={{flexDirection:'row',justifyContent:'space-between',margin:10}}>
              <TouchableOpacity onPress={()=>{
                navigation.goBack()
              }}>
              <Ionicons name="arrow-back-outline" size={15} 
              style={{margin: 10,color:COLORS.white,backgroundColor:COLORS.black,borderRadius:100,padding:10}} />
               </TouchableOpacity> 
               <Image
               source= {require('../assets/logo.png')}
               style={{width:120,height:50}}
               />
          </View>
          <Text style={{fontSize:20,fontWeight:'bold',color:COLORS.white,margin:5}}>Forget Password</Text>
          <Text style={{color:COLORS.white,margin:5}}>Forget your  password for login</Text>
        </View>
           <View
                style={{
                  alignSelf: 'center',
                  marginTop:100
                }}>
        <Text style={{color:COLORS.black,padding:10}}>Email</Text>
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
                      backgroundColor:COLORS.orange,
                      borderRadius: 30,
                      padding: 15,
                      width: 300,
                      alignSelf: 'center',
                      marginTop: 20,
                    }}
                    onPress={() => {
                     navigation.navigate('Login')
                   }}>
                    <Text style={{alignSelf: 'center', color: COLORS.white}}>
                      Forget Passowrd
                    </Text>
                  </TouchableOpacity>
    </View>
  );
}))

export default ForgetPassword;
