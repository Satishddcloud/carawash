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

export const SignUpFormInitialValues = props => ({
  name: '',
  email: '',
  mobile: '',
  password: '',

});

export const SignUpFormValidator = () => {
  return yup.object().shape({
    name: yup.string().required('Name is Required'),
    email: yup.string().required('Email Required'),
    mobile: yup.string().required('Mobile number Required'),
    password: yup.string().required('Password is required'),
  });
};

const Register = withGlobalize(
  memo(props => {
    const [loading, setLoading] = useState(false);
    const intl = IntlProvider(props);
    const navigation = useNavigation();

    const Register = async values => {
      setLoading(true);
      const payload = {
        email: values.email,
        password: values.password,
      };
      try {
        const res = await api.user.login(intl, payload);
        console.log('response res', res.data);
        if (res && res.status == 'OK') {
          let userInfo = res.data;
          await saveUserProfileInfo(userInfo);
          navigation.navigate('Login');
          setLoading(false);
        } else {
          setLoading(false);
          alert('Invalid details');
        }
      } catch (e) {
        console.log('error', e);
        setLoading(false);
      }
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
          // validationSchema={SignUpFormValidator}
          onSubmit={(values, {resetForm}) => {
            console.log(values);
            navigation.navigate('Login');
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
                  <Text style={{color:COLORS.black,padding:10}}>Name</Text>
                    <TextInput
                      value={values.name}
                      placeholder="Enter name"
                      onChangeText={text => {
                        setFieldValue('name', text);
                      }}
                      style={{borderRadius:10,borderWidth:1,borderColor:'#C1C1C1',margin:5,width:300}}
                    />

                   <Text style={{color:COLORS.black,padding:10}}>Email</Text>
                    <TextInput
                      value={values.email}
                      placeholder="Enter email"
                      onChangeText={text => {
                        setFieldValue('email', text);
                      }}
                      style={{borderRadius:10,borderWidth:1,borderColor:'#C1C1C1',margin:5,width:300}}
                    />
                  <Text style={{color:COLORS.black,padding:10}}>Phone Number </Text>
                    <TextInput
                      value={values.mobile}
                      placeholder="Enter phone number"
                      onChangeText={text => {
                        setFieldValue('mobile', text);
                      }}
                      style={{borderRadius:10,borderWidth:1,borderColor:'#C1C1C1',margin:5,width:300}}
                    />
                   <Text style={{color:COLORS.black,padding:10}}>Password</Text>
                    <TextInput
                      value={values.password}
                      placeholder="Enter password"
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
