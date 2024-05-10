import {View, Text, TextInput, TouchableOpacity, Image, ScrollView} from 'react-native';
import React, {useState, memo} from 'react';
import api from '../api';
import IntlProvider from '../Constants/IntlProvider';
import {withGlobalize} from 'react-native-globalize';
import {saveUserProfileInfo} from '../Constants/AsyncStorageHelper';
import Loader from '../Components/Loader';
import * as yup from 'yup';
import {Formik} from 'formik';
import {COLORS} from '../Constants/Color';
import {useNavigation} from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons'
import { API_BASE_URL } from '../api/ApiClient';

export const SignUpFormInitialValues = props => ({
  name: '',
  email: '',
  mobile: '',
  password: '',
  confirmPassword:''
});

export const SignUpFormValidator = () => {
  return yup.object().shape({
    name: yup.string().required('Name is Required'),
    email: yup.string().required('Email Required'),
    mobile: yup.string().required('Mobile number is Required'),
    password: yup.string().required('Password is required'),
    confirmPassword: yup.string().required('Confirm Password is required'),
  });
};

const Register = withGlobalize(
  memo(props => {
    const [loading, setLoading] = useState(false);
    const intl = IntlProvider(props);
    const navigation = useNavigation();

    const SignUp = async values => {
      setLoading(true);
      const myHeaders = new Headers();
      myHeaders.append('Accept', 'application/json');

      const formdata = new FormData();
      formdata.append("name", `${values.name}`);
      formdata.append("email", `${values.email}`);
      formdata.append("mobile", `${values.mobile}`);
      formdata.append("password", `${values.password}`);
      formdata.append("password_confirmation", `${values.confirmPassword}`);

      const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: formdata,
        redirect: "follow"
      };
      // console.log(formdata)
      fetch(`${API_BASE_URL}/api/register`, requestOptions)
        .then((response) => response.text())
        .then(async(result) => {
          console.log(result)
          const res = JSON.parse(result)
          console.log(res)
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
  
    };

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
          <Text style={{fontSize:20,fontWeight:'bold',color:COLORS.white,margin:5}}>Sign up</Text>
          <Text style={{color:COLORS.white,margin:5}}>Add your email and password to create an account</Text>
        </View>
        <ScrollView>
        <Formik
          initialValues={SignUpFormInitialValues(props)}
          validationSchema={SignUpFormValidator}
          onSubmit={(values, {resetForm}) => {
            console.log(values);
            SignUp(values);
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
                  <Text style={{color:COLORS.black,padding:10}}>Name</Text>
                    <TextInput
                      value={values.name}
                      placeholder="Enter name"
                      onChangeText={text => {
                        setFieldValue('name', text);
                      }}
                      style={{borderRadius:10,borderWidth:1,borderColor:'#C1C1C1',margin:5,width:300,textAlignVertical: 'center',paddingVertical: 10}}
                    />
                     {errors.name &&
                         <Text style={{ fontSize: 10, color: 'red' }}>* {errors.name}</Text>
                      }
                   <Text style={{color:COLORS.black,padding:10}}>Email</Text>
                    <TextInput
                      value={values.email}
                      placeholder="Enter email"
                      onChangeText={text => {
                        setFieldValue('email', text);
                      }}
                      style={{borderRadius:10,borderWidth:1,borderColor:'#C1C1C1',margin:5,width:300,textAlignVertical: 'center',paddingVertical: 10}}
                    />
                    {errors.email &&
                         <Text style={{ fontSize: 10, color: 'red' }}>* {errors.email}</Text>
                      }
                  <Text style={{color:COLORS.black,padding:10}}>Phone Number </Text>
                    <TextInput
                      value={values.mobile}
                      placeholder="Enter phone number"
                      onChangeText={text => {
                        setFieldValue('mobile', text);
                      }}
                      style={{borderRadius:10,borderWidth:1,borderColor:'#C1C1C1',margin:5,width:300,textAlignVertical: 'center',paddingVertical: 10}}
                    />
                    {errors.mobile &&
                         <Text style={{ fontSize: 10, color: 'red' }}>* {errors.mobile}</Text>
                      }
                   <Text style={{color:COLORS.black,padding:10}}>Password</Text>
                    <TextInput
                      value={values.password}
                      placeholder="Enter password"
                      onChangeText={text => {
                        setFieldValue('password', text);
                      }}
                      style={{borderRadius:10,borderWidth:1,borderColor:'#C1C1C1',margin:5,width:300,textAlignVertical: 'center',paddingVertical: 10}}
                    />
                   {errors.password &&
                         <Text style={{ fontSize: 10, color: 'red' }}>* {errors.password}</Text>
                      }
                       <Text style={{color:COLORS.black,padding:10}}> Confirm Password</Text>
                    <TextInput
                      value={values.confirmPassword}
                      placeholder="Enter confirm password"
                      onChangeText={text => {
                        setFieldValue('confirmPassword', text);
                      }}
                      style={{borderRadius:10,borderWidth:1,borderColor:'#C1C1C1',margin:5,width:300,textAlignVertical: 'center',paddingVertical: 10}}
                    />
                   {errors.confirmPassword &&
                         <Text style={{ fontSize: 10, color: 'red' }}>* {errors.confirmPassword}</Text>
                      }
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
                      if(values.password == values.confirmPassword){
                        handleSubmit();
                      }else{
                        alert('Passwords are not matched')
                      }
                     
                    }}>
                    <Text style={{alignSelf: 'center', color: COLORS.white}}>
                      Sign Up
                    </Text>
                  </TouchableOpacity>
                   <View >
                  <Text style={{margin:10,alignSelf:'center'}}>Have an accout ?</Text>
                  <TouchableOpacity onPress={()=>{
                      navigation.navigate('Login')
                    }} >
                      <Text style={{color:COLORS.orange,margin:5,alignSelf:'center',fontWeight:'bold'}}>SIGN IN</Text>
                    </TouchableOpacity>
                    </View>
              </View>
            </>
          )}
        </Formik>
        </ScrollView>
      </View>
    );
  }),
);

export default Register;
