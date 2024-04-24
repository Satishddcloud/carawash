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
  getUserProfileInfo,
  saveUserProfileInfo,
  setJwtToken,
} from '../Constants/AsyncStorageHelper';
import Loader from '../Components/Loader';
import * as yup from 'yup';
import {Formik} from 'formik';
import {COLORS} from '../Constants/Color';
import {useNavigation} from '@react-navigation/native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {Avatar} from 'react-native-paper';
import { logout } from '../Redux/reducer/User';
import { useDispatch } from 'react-redux';

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

const Profile = withGlobalize(
  memo(props => {
    const [loading, setLoading] = useState(false);
    const intl = IntlProvider(props);
    const navigation = useNavigation();
    const dispatch = useDispatch()

    const handleSubmit = async values => {
      const resp = await getUserProfileInfo();
      console.log('res', resp);
      setLoading(true);
      const myHeaders = new Headers();
      myHeaders.append('Accept', 'application/json');

      const formdata = new FormData();
      formdata.append('name', `${values.name}`);
      formdata.append('email', `${values.email}`);
      formdata.append('mobile', `${values.mobile}`);
      formdata.append('password', `${values.password}`);
      formdata.append('password_confirmation', `${values.confirmPassword}`);

      const requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: formdata,
        redirect: 'follow',
      };
      // console.log(formdata)
      fetch(`${API_BASE_URL}/api/register`, requestOptions)
        .then(response => response.text())
        .then(async result => {
          console.log(result);
          const res = JSON.parse(result);
          console.log(res);
          if (res && res.status == true) {
            alert(res.message);
            navigation.navigate('Login');
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

    const Logout = async ()=>{
      await saveUserProfileInfo({});
      await setJwtToken(null)
      dispatch(logout());
      navigation.navigate('Login')
    }

    return (
      <View style={{flex: 1, backgroundColor: 'white'}}>
        <Loader loading={loading}></Loader>
        <View
          style={{
            backgroundColor: COLORS.blue,
            padding: 5,
          }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginleft: 6,
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
            <Text
              style={{
                fontSize: 20,
                fontWeight: 'bold',
                color: COLORS.white,
                margin: 5,
                alignSelf: 'center',
              }}>
              Profile{' '}
            </Text>

            <TouchableOpacity
              onPress={() => {
                navigation.goBack();
              }}>
              <AntDesign
                name="sharealt"
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
          <View style={{alignSelf: 'center', top: 55}}>
            <Avatar.Image
              size={100}
              source={require('../assets/profileLogo.png')}
            />
          </View>
        </View>
        <ScrollView>
          <Formik
            initialValues={LoginFormInitialValues(props)}
            // validationSchema={LoginFormValidator}
            onSubmit={(values, {resetForm}) => {
              console.log(values);
              handleSubmit(values);
              // navigation.navigate('MainRoute');
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
                    marginBottom: 20,
                    marginTop: 20,
                  }}>
                  <Text style={{color: COLORS.black, padding: 10}}>
                    User Name
                  </Text>
                  <TextInput
                    value={values.username}
                    placeholder="Enter User Name"
                    onChangeText={text => {
                      setFieldValue('username', text);
                    }}
                    style={{
                      borderRadius: 10,
                      borderWidth: 1,
                      borderColor: '#C1C1C1',
                      margin: 5,
                      width: 300,
                    }}
                  />

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
                    }}
                  />

                  <Text style={{color: COLORS.black, padding: 10}}>
                    Phone Number
                  </Text>
                  <TextInput
                    value={values.phonenumber}
                    placeholder="Enter phonenumber"
                    onChangeText={text => {
                      setFieldValue('phonenumber', text);
                    }}
                    style={{
                      borderRadius: 10,
                      borderWidth: 1,
                      borderColor: '#C1C1C1',
                      margin: 5,
                      width: 300,
                    }}
                  />

                  <Text style={{color: COLORS.black, padding: 10}}>
                    Refferal
                  </Text>
                  <TextInput
                    value={values.refferal}
                    placeholder="Enter refferal"
                    onChangeText={text => {
                      setFieldValue('refferal', text);
                    }}
                    style={{
                      borderRadius: 10,
                      borderWidth: 1,
                      borderColor: '#C1C1C1',
                      margin: 5,
                      width: 300,
                    }}
                  />

                  <Text style={{color: COLORS.black, padding: 10}}>
                    Address
                  </Text>
                  <TextInput
                    value={values.address}
                    placeholder="Enter Address"
                    onChangeText={text => {
                      setFieldValue('address', text);
                    }}
                    style={{
                      borderRadius: 10,
                      borderWidth: 1,
                      borderColor: '#C1C1C1',
                      margin: 5,
                      width: 300,
                    }}
                  />

                  <Text style={{color: COLORS.black, padding: 10}}>
                    Add Vehicle{' '}
                  </Text>
                  <TextInput
                    value={values.vehicle}
                    placeholder="Enter vehicle"
                    onChangeText={text => {
                      setFieldValue('vehicle', text);
                    }}
                    style={{
                      borderRadius: 10,
                      borderWidth: 1,
                      borderColor: '#C1C1C1',
                      margin: 5,
                      width: 300,
                    }}
                  />

                  <TouchableOpacity
                    style={{
                      backgroundColor: COLORS.blue,
                      borderRadius: 10,
                      padding: 10,
                      width: 300,
                      alignSelf: 'center',
                      marginTop: 20,
                    }}
                    onPress={() => {
                      // handleSubmit();
                      Logout()
                    }}>
                    <Text style={{alignSelf: 'center', color: COLORS.white}}>
                      LogOut{' '}
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

export default Profile;
