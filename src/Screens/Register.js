import {View, Text, TextInput, TouchableOpacity} from 'react-native';
import React, {useState, memo} from 'react';
import api from '../api';
import IntlProvider from '../Constants/IntlProvider';
import {withGlobalize} from 'react-native-globalize';
import {saveUserProfileInfo} from '../Constants/AsyncStorageHelper';
import Loader from '../Components/Loader';
import * as yup from 'yup';
import {Formik} from 'formik';
import {Card} from 'react-native-paper';
import {COLORS} from '../Constants/Color';
import {useNavigation} from '@react-navigation/native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

export const SignUpFormInitialValues = props => ({
  name: '',
  email: '',
  mobile: '',
  password: '',
  confirmPassword: '',
});

export const SignUpFormValidator = () => {
  return yup.object().shape({
    name: yup.string().required('Name is Required'),
    email: yup.string().required('Email Required'),
    mobile: yup.string().required('Mobile number Required'),
    password: yup.string().required('Password is required'),
    confirmPassword: yup.string().required('confirm password Required'),
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
        <Text
          style={{
            alignSelf: 'center',
            fontWeight: 'bold',
            color: COLORS.blue,
            fontSize: 20,
            top: 50,
          }}>
          LOGO
        </Text>
        <Formik
          initialValues={SignUpFormInitialValues(props)}
          validationSchema={SignUpFormValidator}
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
                  justifyContent: 'center',
                  flex: 1,
                }}>
                <Card
                  style={{
                    padding: 30,
                    backgroundColor: COLORS.blue,
                    alignSelf: 'center',
                  }}>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      width: 250,
                      backgroundColor: 'white',
                      margin: 10,
                      borderRadius: 5,
                    }}>
                    <TextInput
                      value={values.name}
                      placeholder="Enter name"
                      onChangeText={text => {
                        setFieldValue('name', text);
                      }}
                    />
                    <AntDesign name="user" size={20} style={{margin: 10}} />
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      width: 250,
                      backgroundColor: 'white',
                      margin: 10,
                      borderRadius: 5,
                    }}>
                    <TextInput
                      value={values.email}
                      placeholder="Enter email"
                      onChangeText={text => {
                        setFieldValue('email', text);
                      }}
                    />
                    <AntDesign name="mail" size={20} style={{margin: 10}} />
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      width: 250,
                      backgroundColor: 'white',
                      margin: 10,
                      borderRadius: 5,
                    }}>
                    <TextInput
                      value={values.mobile}
                      placeholder="Enter mobile number"
                      onChangeText={text => {
                        setFieldValue('mobile', text);
                      }}
                    />
                    <AntDesign name="mobile1" size={20} style={{margin: 10}} />
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      width: 250,
                      backgroundColor: 'white',
                      margin: 10,
                      borderRadius: 5,
                    }}>
                    <TextInput
                      value={values.password}
                      placeholder="Enter password"
                      onChangeText={text => {
                        setFieldValue('password', text);
                      }}
                    />
                   <MaterialIcons name="lock-outline" size={20} style={{margin: 10}} />  
               </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      width: 250,
                      backgroundColor: 'white',
                      margin: 10,
                      borderRadius: 5,
                    }}>
                    <TextInput
                      value={values.confirmPassword}
                      placeholder="Enter confirm Password"
                      onChangeText={text => {
                        setFieldValue('confirmPassword', text);
                      }}
                    />
                    <MaterialIcons name="lock-outline" size={20} style={{margin: 10}} />
                  </View>
                  <TouchableOpacity
                    style={{
                      backgroundColor: 'white',
                      borderRadius: 5,
                      padding: 10,
                      width: 100,
                      alignSelf: 'center',
                      marginTop: 20,
                    }}
                    onPress={() => {
                      handleSubmit();
                    }}>
                    <Text style={{alignSelf: 'center', color: COLORS.blue}}>
                      Sign Up
                    </Text>
                  </TouchableOpacity>
                </Card>
              </View>
            </>
          )}
        </Formik>
      </View>
    );
  }),
);

export default Register;
