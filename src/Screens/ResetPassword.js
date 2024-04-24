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

export const ResetFormInitialValues = props => ({
  oldPassword: '',
  newPassword: '',
  confirmPassword: '',

});

export const ResetFormValidator = () => {
  return yup.object().shape({
    oldPassword: yup.string().required('old password is Required'),
    newPassword: yup.string().required('new password Required'),
    confirmPassword: yup.string().required('confirm password Required'),
  });
};

const ResetPassword = withGlobalize(
  memo(props => {
    const [loading, setLoading] = useState(false);
    const intl = IntlProvider(props);
    const navigation = useNavigation();
 
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
          <Text style={{fontSize:20,fontWeight:'bold',color:COLORS.white,margin:5}}>Reset Password</Text>
          <Text style={{color:COLORS.white,margin:5}}>Reset your  password for login</Text>
        </View>
        <ScrollView>
        <Formik
          initialValues={ResetFormInitialValues(props)}
          // validationSchema={ResetFormValidator}
          onSubmit={(values, {resetForm}) => {
            console.log(values);
            navigation.navigate('Reset');
            // Register(values, resetForm());
          }}>
          {({
            values,
            handleChange,
            setFieldValue,
            errors,
            touched,
            setFieldTouched,
            isValid,
            handleSubmit,
          }) => (
            <>
              <View
                style={{
                  alignSelf: 'center',
                  flex: 1,
                  marginBottom:20,marginTop:20
                }}>

                   <Text style={{color:COLORS.black,padding:10}}>Old Password</Text>
                    <TextInput
                      value={values.oldPassword}
                      placeholder="Enter old password"
                      onChangeText={text => {
                        setFieldValue('email', text);
                      }}
                      style={{borderRadius:10,borderWidth:1,borderColor:'#C1C1C1',margin:5,width:300}}
                    />
                  <Text style={{color:COLORS.black,padding:10}}>New Password </Text>
                    <TextInput
                      value={values.newPassword}
                      placeholder="Enter new password"
                      onChangeText={text => {
                        setFieldValue('mobile', text);
                      }}
                      style={{borderRadius:10,borderWidth:1,borderColor:'#C1C1C1',margin:5,width:300}}
                    />
                   <Text style={{color:COLORS.black,padding:10}}>Password</Text>
                    <TextInput
                      value={values.confirmPassword}
                      placeholder="Enter confirm password"
                      onChangeText={text => {
                        setFieldValue('password', text);
                      }}
                      style={{borderRadius:10,borderWidth:1,borderColor:'#C1C1C1',margin:5,width:300}}
                    />
                   
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
                      handleSubmit();
                    }}>
                    <Text style={{alignSelf: 'center', color: COLORS.white}}>
                      Reset Passowrd
                    </Text>
                  </TouchableOpacity>
              </View>
            </>
          )}
        </Formik>
        </ScrollView>
      </View>
    );
  }),
);

export default ResetPassword;
