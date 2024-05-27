import {View, Text, TextInput, TouchableOpacity, Image, ScrollView} from 'react-native';
import React, {useState, memo} from 'react';
import api from '../api';
import IntlProvider from '../Constants/IntlProvider';
import {withGlobalize} from 'react-native-globalize';
import Loader from '../Components/Loader';
import * as yup from 'yup';
import {Formik} from 'formik';
import {COLORS} from '../Constants/Color';
import {useNavigation, useRoute} from '@react-navigation/native';
import AntDesign from 'react-native-vector-icons/AntDesign'
import { API_BASE_URL } from '../api/ApiClient';

export const ResetFormInitialValues = props => ({
  // oldPassword: '',
  newPassword: '',
  confirmPassword: '',

});

export const ResetFormValidator = () => {
  return yup.object().shape({
    // oldPassword: yup.string().required('old password is Required'),
    newPassword: yup.string().required('new password Required'),
    confirmPassword: yup.string().required('confirm password Required'),
  });
};

const ResetPassword = withGlobalize(
  memo(props => {
    const route = useRoute()
    const {email} = route.params;
    const [loading, setLoading] = useState(false);
    const intl = IntlProvider(props);
    const navigation = useNavigation();
 
    
    const UpdatePassword = async (values)=>{
      setLoading(true)
      const myHeaders = new Headers();
     myHeaders.append("Accept", "application/json");
     myHeaders.append("Content-Type", "application/json");

     const raw = JSON.stringify({
       "email":`${email}`,
       "new_password": parseInt(values.newPassword),
       "password_confirmation": parseInt(values.confirmPassword)
     });
     
     const requestOptions = {
       method: "POST",
       headers: myHeaders,
       body: raw,
       redirect: "follow"
     };
     fetch(`${API_BASE_URL}/api/reset-password`, requestOptions)
       .then((response) => response.text())
        .then((result) => {
         const res= JSON.parse(result)
         console.log(res,res.status)
         if(res && res.status == true){
           alert(res.message)
           navigation.navigate('Login');
         }else{
           alert(res.message)
         }
         
         setLoading(false)
       })
        .catch((error) =>{ 
         console.error(error)
         setLoading(false)
       });
}

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
              right:8,
            }}>
            <TouchableOpacity
              onPress={() => {
                navigation.goBack();
              }}>
              <AntDesign
                name="left"
                size={15}
                style={{
                  margin: 10,
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
            Set a new password
          </Text>
          <Text style={{color: COLORS.black, margin: 5}}>
         create a new password. Ensure it differs from previous one for security
          </Text>
        
        </View>
        <ScrollView>
        <Formik
          initialValues={ResetFormInitialValues(props)}
          // validationSchema={ResetFormValidator}
          onSubmit={(values, {resetForm}) => {
            console.log(values);
            
            UpdatePassword(values, resetForm());
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

                   {/* <Text style={{color:COLORS.black,padding:10}}>Old Password</Text>
                    <TextInput
                      value={values.oldPassword}
                      placeholder="Enter old password"
                      onChangeText={text => {
                        setFieldValue('email', text);
                      }}
                      style={{borderRadius:10,borderWidth:1,borderColor:'#C1C1C1',margin:5,width:300}}
                    /> */}
                  <Text style={{color:COLORS.black,padding:10,fontWeight:'bold'}}> Password </Text>
                    <TextInput
                      value={values.newPassword}
                      placeholder="Enter new password"
                      onChangeText={text => {
                        setFieldValue('newPassword', text);
                      }}
                      style={{borderRadius:10,borderWidth:1,borderColor:'#C1C1C1',margin:5,width:300}}
                    />
                   <Text style={{color:COLORS.black,padding:10,fontWeight:'bold'}}>Confirm Password</Text>
                    <TextInput
                      value={values.confirmPassword}
                      placeholder="Enter confirm password"
                      onChangeText={text => {
                        setFieldValue('confirmPassword', text);
                      }}
                      style={{borderRadius:10,borderWidth:1,borderColor:'#C1C1C1',margin:5,width:300}}
                    />
                   
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
                      handleSubmit();
                    }}>
                    <Text style={{alignSelf: 'center', color: COLORS.white}}>
                      Update Passowrd
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
