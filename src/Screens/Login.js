import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import React, {useState, memo} from 'react';
import api from '../api';
import IntlProvider from '../Constants/IntlProvider';
import {withGlobalize} from 'react-native-globalize';
import {
  saveUserProfileInfo,
  setJwtToken,
} from '../Constants/AsyncStorageHelper';
import Loader from '../Components/Loader';
import * as yup from 'yup';
import {Formik} from 'formik';
import {COLORS} from '../Constants/Color';
import {useNavigation} from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {API_BASE_URL} from '../api/ApiClient';
import {useDispatch} from 'react-redux';
import {setuser} from '../Redux/reducer/User';

export const LoginFormInitialValues = props => ({
  email: '',
  password: '',
});

export const LoginFormValidator = () => {
  return yup.object().shape({
    email: yup.string().required('Email is Required'),
    password: yup.string().required('Password is required'),
  });
};

const Login = withGlobalize(
  memo(props => {
    const [loading, setLoading] = useState(false);
    const intl = IntlProvider(props);
    const navigation = useNavigation();
    const dispatch = useDispatch();

    const Login = async values => {
      setLoading(true);
      const myHeaders = new Headers();

      const formdata = new FormData();
      formdata.append('email', `${values.email}`);
      formdata.append('password', `${values.password}`);

      const requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: formdata,
        redirect: 'follow',
      };

      fetch(`${API_BASE_URL}/api/login`, requestOptions)
        .then(response => response.text())
        .then(async result => {
          const res = JSON.parse(result);
          console.log(res);
          if (res && res.status == true) {
            // dispatch(setuser(res))
            const token = res.token;
            getProfile(token);
            await setJwtToken(token);
            alert(res.message);
          } else {
            alert(res.message);
          }
          setLoading(false);
        })
        .catch(error => {
          console.error(error);
          setLoading(false);
        });
    };

    const getProfile = async token => {
      setLoading(true);
      const myHeaders = new Headers();
      myHeaders.append('Accept', 'application/json');
      myHeaders.append('Authorization', `Bearer ${token}`);
      const requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow',
      };

      fetch(`${API_BASE_URL}/api/profile`, requestOptions)
        .then(response => response.text())
        .then(async result => {
          console.log(result);
          const res = JSON.parse(result);
          if (res && res.status == true) {
            // console.log(res.data)
            const userdata = res.data;
            await saveUserProfileInfo(userdata);
            dispatch(setuser(userdata));
            navigation.reset({
              index: 0,
              routes: [{name: 'MainRoute'}],
            });
          }
          setLoading(false);
        })
        .catch(error => {
          console.error(error);
          setLoading(false);
        });
    };

    return (
      <View style={{flex: 1, backgroundColor: 'white'}}>
        <Loader loading={loading}></Loader>
        <View
          style={{
            backgroundColor: COLORS.blue,
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
              <Ionicons
                name="arrow-back-outline"
                size={15}
                style={{
                  margin: 10,
                  color: COLORS.white,
                  backgroundColor: COLORS.black,
                  borderRadius: 100,
                  padding: 10,
                }}
              />
            </TouchableOpacity>
          <TouchableOpacity 
            onPress= {()=>{
              navigation.reset({
                index: 0,
                routes: [{name: 'MainRoute'}],
              });
            }}>
            <Image
              source={require('../assets/logo.png')}
              style={{width: 120, height: 50}}
            />
            </TouchableOpacity>
          </View>
          <Text
            style={{
              fontSize: 20,
              fontWeight: 'bold',
              color: COLORS.white,
              margin: 5,
            }}>
            Sign in
          </Text>
          <Text style={{color: COLORS.white, margin: 5}}>
            Add your email and password to login
          </Text>
        </View>
        <ScrollView>
          <Formik
            initialValues={LoginFormInitialValues(props)}
            validationSchema={LoginFormValidator}
            onSubmit={(values, {resetForm}) => {
              console.log(values);
              Login(values, resetForm());
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
                    marginBottom: 20,
                    marginTop: 20,
                  }}>
                  <Text style={{color: COLORS.black, padding: 10}}>Email</Text>
                  <TextInput
                    value={values.email}
                    placeholder="Enter email"
                    onChangeText={text => {
                      setFieldValue('email', text);
                    }}
                    style={{
                      borderRadius: 10,
                      borderWidth: 1,
                      borderColor: '#C1C1C1',
                      margin: 5,
                      width: 300,
                      textAlignVertical: 'center',
                      paddingVertical: 10,
                    }}
                  />
                  {errors.email && (
                    <Text style={{fontSize: 10, color: 'red'}}>
                      * {errors.email}
                    </Text>
                  )}
                  <Text style={{color: COLORS.black, padding: 10}}>
                    Password
                  </Text>
                  <TextInput
                    value={values.password}
                    placeholder="Enter password"
                    secureTextEntry={true}
                    onChangeText={text => {
                      setFieldValue('password', text);
                    }}
                    style={{
                      borderRadius: 10,
                      borderWidth: 1,
                      borderColor: '#C1C1C1',
                      margin: 5,
                      width: 300,
                      textAlignVertical: 'center',
                      paddingVertical: 10,
                    }}
                  />
                  {errors.password && (
                    <Text style={{fontSize: 10, color: 'red'}}>
                      {' '}
                      * {errors.password}
                    </Text>
                  )}

                  <TouchableOpacity
                    onPress={() => {
                      navigation.navigate('ForgetPassword');
                    }}
                    style={{alignSelf: 'flex-end'}}>
                    <Text
                      style={{
                        color: COLORS.blue,
                        margin: 5,
                        alignSelf: 'center',
                        fontWeight: 'bold',
                      }}>
                      Forget Password ?
                    </Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={{
                      backgroundColor: COLORS.blue,
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
                  <View style={{marginTop: 100}}>
                    <Text style={{margin: 10, alignSelf: 'center'}}>
                      You don't have an accout ?
                    </Text>
                    <TouchableOpacity
                      onPress={() => {
                        navigation.navigate('Register');
                      }}>
                      <Text
                        style={{
                          color: COLORS.blue,
                          margin: 5,
                          alignSelf: 'center',
                          fontWeight: 'bold',
                        }}>
                        SIGN UP
                      </Text>
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
