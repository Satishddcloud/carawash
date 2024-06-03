import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import React, {useState, memo, useEffect} from 'react';
import api from '../api';
import IntlProvider from '../Constants/IntlProvider';
import {withGlobalize} from 'react-native-globalize';
import {
  getJwtToken,
  getUserProfileInfo,
  saveCarData,
  saveUserId,
  saveUserProfileInfo,
  setJwtToken,
} from '../Constants/AsyncStorageHelper';
import Loader from '../Components/Loader';
import * as yup from 'yup';
import {Formik} from 'formik';
import {COLORS} from '../Constants/Color';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {Avatar} from 'react-native-paper';
import {logout} from '../Redux/reducer/User';
import {useDispatch, useSelector} from 'react-redux';
import {API_BASE_URL} from '../api/ApiClient';
import DeviceInfo from 'react-native-device-info';

export const ProfileFormInitialValues = (props, profileRes) => {
  return {
    name: profileRes != undefined ? profileRes.name : '',
    email: profileRes != undefined ? profileRes.email : '',
    mobile: profileRes != undefined ? profileRes.mobile : '',
    address: profileRes != undefined ? profileRes.address : '',
    vehicle: profileRes != undefined ? profileRes.vehicle : '',
  };
};

export const ProfileFormValidator = () => {
  return yup.object().shape({
    email: yup.string().required('email is Required'),
    vehicle: yup.string().required('Vehicle is required'),
    name: yup.string().required('name is Required'),
    mobile: yup.string().required('mobile number is required'),
    address: yup.string().required('address number is required'),
  });
};

const Profile = withGlobalize(
  memo(props => {
    const [loading, setLoading] = useState(false);
    const isFocused = useIsFocused();
    const [profileRes1, setProfileRes] = useState();
    const intl = IntlProvider(props);
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const loginStatus = useSelector(state => state.User.login_status);
    const profileRes = useSelector(state => state.User.userData);
    console.log('profileRes', profileRes, loginStatus);
    const [name, setName] = useState(
      profileRes != undefined ? profileRes.name : '',
    );
    const [email, setEmail] = useState(
      profileRes != undefined ? profileRes.email : '',
    );
    const [mobile, setMobile] = useState(
      profileRes != undefined ? profileRes.mobile : '',
    );
    const [address, setAddress] = useState('');
    const [vehicle, setVehicle] = useState('');

    useEffect(() => {
      getProfile();
    }, [isFocused]);

    const updateProfile = async values => {
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

    const Logout = async () => {
      const deviceId = await DeviceInfo.getUniqueId();
      const cardata = {
        selected_car_id: 0,
        device_id: `${deviceId}`,
        car_id: 0,
        car_image:
          'https://img.lovepik.com/png/20231001/black-and-white-classic-car-plane-logo-flat-classic-cars_50407_wh1200.png',
      };
      await saveUserId(undefined);
      await saveUserProfileInfo({});
      await setJwtToken(null);
      await saveCarData(cardata);
      dispatch(logout());
      navigation.reset({
        index: 0,
        routes: [{name: 'Splash'}],
      });
    };

    const getProfile = async () => {
      const token = await getJwtToken();
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
            setProfileRes(userdata);
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
          {/* <Formik
            initialValues={ProfileFormInitialValues(props,profileRes)}
            validationSchema={ProfileFormValidator}
            onSubmit={(values, {resetForm}) => {
              console.log(values);
           
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
            }) => ( */}
          <>
            <View
              style={{
                alignSelf: 'center',
                flex: 1,
                marginBottom: 20,
                marginTop: 20,
              }}>
              <Text style={{color: COLORS.black, padding: 10}}>User Name</Text>
              <TextInput
                value={name}
                placeholder="Enter User Name"
                onChangeText={text => {
                  setName(text);
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

              <Text style={{color: COLORS.black, padding: 10}}>Email</Text>
              <TextInput
                value={`${email != undefined ? email : ''}`}
                placeholder="Enter email"
                onChangeText={text => {
                  setEmail(text);
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

              <Text style={{color: COLORS.black, padding: 10}}>
                Phone Number
              </Text>
              <TextInput
                value={`${mobile != undefined ? mobile : ''}`}
                placeholder="Enter phonenumber"
                onChangeText={text => {
                  setMobile(text);
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

              {/* <Text style={{color: COLORS.black, padding: 10}}>
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
                  /> */}

              {/* <Text style={{color: COLORS.black, padding: 10}}>
                    Address
                  </Text>
                  <TextInput
                    value={address}
                    placeholder="Enter Address"
                    onChangeText={text => {
                      setAddress( text);
                    }}
                    style={{
                      borderRadius: 10,
                      borderWidth: 1,
                      borderColor: '#C1C1C1',
                      margin: 5,
                      width: 300,
                      textAlignVertical: 'center',paddingVertical: 10
                    }}
                  /> 

                  <Text style={{color: COLORS.black, padding: 10}}>
                    Add Vehicle{' '}
                  </Text>
                  <TextInput
                    value={vehicle}
                    placeholder="Enter vehicle"
                    onChangeText={text => {
                      setVehicle( text);
                    }}
                    style={{
                      borderRadius: 10,
                      borderWidth: 1,
                      borderColor: '#C1C1C1',
                      margin: 5,
                      width: 300,
                      textAlignVertical: 'center',paddingVertical: 10
                    }}
                  />*/}

              {loginStatus ? (
                <TouchableOpacity
                  style={{
                    backgroundColor: COLORS.blue,
                    borderRadius: 10,
                    padding: 10,
                    width: 300,
                    alignSelf: 'center',
                    marginTop: 20,
                  }}
                  onPress={()=>{
                    Alert.alert('Logout', `Are you Logout ?`, [
                      {
                        text: 'Cancel',
                        onPress: () => console.log('Cancel Pressed'),
                        style: 'cancel',
                      },
                      {text: 'OK', onPress: () =>{  Logout()  }}
                    ])
                  }}>
                  <Text style={{alignSelf: 'center', color: COLORS.white}}>
                    LogOut{' '}
                  </Text>
                </TouchableOpacity>
              ) : null}
            </View>
          </>
          {/* )}
          </Formik> */}
        </ScrollView>
      </View>
    );
  }),
);

export default Profile;
