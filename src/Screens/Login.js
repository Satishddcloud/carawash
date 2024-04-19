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

export const LoginFormInitialValues = props => ({
  email: '',
  password: '',
});

export const LoginFormValidator = () => {
  return yup.object().shape({
    email: yup.string().required('UserName Required'),
    password: yup.string().required('Password is required'),
  });
};

const Login = withGlobalize(
  memo(props => {
    const [loading, setLoading] = useState(false);
    const intl = IntlProvider(props);
    const navigation = useNavigation();

    const Login = async values => {
      setLoading(true);
      const payload = {
        userName: values.email,
        password: values.password,
      };
      try {
        const res = await api.user.login(intl, payload);
        console.log('response res', res.data);
        if (res && res.status == 'OK') {
          let userInfo = res.data;
          await saveUserProfileInfo(userInfo);
          navigation.navigate('MainRoute');
          setLoading(false);
        } else {
          setLoading(false);
          alert('Invalid username or password');
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
        <View style={{alignSelf:'flex-end',margin:10}}>
             <Image
             source= {require('../assets/logo.png')}
             style={{width:120,height:50}}
             />
        </View>
        <Text style={{fontSize:20,fontWeight:'bold',color:COLORS.white,margin:5}}>Sign in</Text>
        <Text style={{color:COLORS.white,margin:5}}>Add your email and password to login</Text>
      </View>
      <ScrollView>
      <Formik
        initialValues={LoginFormInitialValues(props)}
        // validationSchema={LoginFormValidator}
        onSubmit={(values, {resetForm}) => {
          console.log(values);
          navigation.navigate('MainRoute');
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

                 <Text style={{color:COLORS.black,padding:10}}>Email</Text>
                  <TextInput
                    value={values.email}
                    placeholder="Enter email"
                    onChangeText={text => {
                      setFieldValue('email', text);
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
                    Sign In
                  </Text>
                </TouchableOpacity>
                 <View >
                <Text style={{margin:10,alignSelf:'center'}}>You don't have an accout ?</Text>
                <TouchableOpacity onPress={()=>{
                    navigation.navigate('Register')
                  }} >
                    <Text style={{color:COLORS.orange,margin:5,alignSelf:'center',fontWeight:'bold'}}>SIGN UP</Text>
                  </TouchableOpacity>
                  </View>
                  <View style={{flexDirection:'row',justifyContent:'space-between',marginTop:30}}>
                  <TouchableOpacity onPress={()=>{
                    navigation.navigate('ForgetPassword')
                  }} >
                    <Text style={{color:COLORS.orange,margin:5,alignSelf:'center',fontWeight:'bold'}}>Forget Password ?</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={()=>{
                    navigation.navigate('ResetPassword')
                  }} >
                    <Text style={{color:COLORS.orange,margin:5,alignSelf:'center',fontWeight:'bold'}}>Reset Password ?</Text>
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

export default Login;
