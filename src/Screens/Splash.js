import React, {memo, useEffect, useState} from 'react';
import {
  View,
  Text,
  Image,
  Dimensions,
  ImageBackground,
  Linking,
  Alert,
  Platform,
  PermissionsAndroid,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {RFValue} from 'react-native-responsive-fontsize';
import {isObject} from 'util';
import {isNullOrUndefined} from 'util';
import Geolocation from '@react-native-community/geolocation';
import Loader from '../Components/Loader';
import {withGlobalize} from 'react-native-globalize';
import {
  getCarData,
  getUserProfileInfo,
  saveCarData,
  saveLocationData,
} from '../Constants/AsyncStorageHelper';
import {API_BASE_URL} from '../api/ApiClient';
import DeviceInfo from 'react-native-device-info';
import LocationServicesDialogBox from 'react-native-android-location-services-dialog-box';

const {width, height} = Dimensions.get('window');

const Splash = withGlobalize(
  memo(props => {
    const navigation = useNavigation();
    const [location, setLocation] = useState('...Loading');
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [pincode, setPincode] = useState('');
    console.log('postcode', pincode);

    const navigationStep = async () => {
      const userObject = await getUserProfileInfo();
      console.log('userObject', userObject);
      setTimeout(() => {
        if (isObject(userObject) && !isNullOrUndefined(userObject.id)) {
          navigation.navigate('MainRoute');
        } else {
          // navigation.navigate('MainRoute');
          navigation.navigate('Login');
        }
      }, 3000);
    };

    useEffect(() => {
      // navigationStep();
    }, []);

    useEffect(() => {
      const requestLocationPermission = async () => {
        if (Platform.OS === 'ios') {
          getLocation();
        } else {
          try {
            const granted = await PermissionsAndroid.request(
              PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
              {
                title: 'Location Access Required',
                message: 'This App needs to Access your location',
              },
            );
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
              //To Check, If Permission is granted
              getLocation();
            } else {
              setLocationStatus('Permission Denied');
            }
          } catch (err) {
            console.warn(err);
          }
        }
      };
      requestLocationPermission();
    }, []);

    //useEffect(() => {
    const checkLocationServices = async () => {
      try {
        const success =
          await LocationServicesDialogBox.checkLocationServicesIsEnabled({
            message:
              '<h2> Location </h2>Please enable location permission from settings.<br/>',
            ok: 'Open Settings',
            cancel: 'Cancel',
            enableHighAccuracy: true,
            showDialog: true,
            openLocationServices: true,
            preventOutSideTouch: false,
            preventBackClick: false,
            providerListener: true,
          });
        getLocation();
      } catch (error) {
        console.log(error.message);
      }
    };

    // checkLocationServices();

    // const listener = DeviceEventEmitter.addListener(
    //   'locationProviderStatusChange',
    //   status => {
    //     console.log(status);
    //   },
    // );

    // return () => {
    //   LocationServicesDialogBox.stopListener();
    //   listener.remove();
    // };
    //  }, [isFocused]);

    function getLocation() {
      setLoading(true);
      Geolocation.getCurrentPosition(
        position => {
          const {latitude, longitude} = position.coords;
          getAddress(latitude, longitude);
          console.log(position);
          setError(null);
          setLoading(false);
        },
        error => {
          console.error('..', error);
          setError('Error getting location');
          checkLocationServices();
          setLoading(false);
        },
        //   {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000},
      );
      setLoading(flase);
    }

    const getAddress = async (latitude, longitude) => {
      // const apiKey = 'GOOGLE_MAPS_APIKEY';
      // const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${apiKey}`;
      const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&addressdetails=1`;
      try {
        fetch(url)
          .then(response => response.json())
          .then(result => {
            if (result) {
              //   // Print the full address

              console.log(result.address);
              if (result && result.address) {
                let addressData = 'Fetching location..';
                if (error) {
                  addressData = error;
                } else if (result.address) {
                  const {
                    amenity,neighbourhood,road,
                    state,
                    city,
                    suburb,
                    postcode,
                    city_district,
                    county,
                    state_district,
                    country,
                  } = result.address;
                  addressData = `${suburb || amenity}, ${city_district || neighbourhood }, ${city || road}, ${county}, ${state_district},  ${state},  ${postcode}, ${country}`;
                  setPincode(postcode);
                }
                console.log('address...', addressData);
                setLocation(addressData);
                getServiceLocation(addressData);
              } else {
                setLocation({error: 'Address not found'});
              }
            }
          });
      } catch (error) {
        console.error('Error fetching address:', error);
        setLocation({error: 'Error fetching address'});
      }
    };

    const getServiceLocation = async location => {
      const carRes = await getCarData();
      const deviceId = await DeviceInfo.getUniqueId();
      setLoading(true);
      const myHeaders = new Headers();
      myHeaders.append('Content-Type', 'application/json');

      const requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow',
      };

      fetch(
        `${API_BASE_URL}/api/get-service-location?area=${location}`,
        requestOptions,
      )
        .then(response => response.text())
        .then(async result => {
          const res = JSON.parse(result);
          console.log('service location res', res, res.getarea);
          if (carRes && carRes.car_id != 0) {
            await saveCarData(carRes);
          } else {
            const cardata = {
              selected_car_id: 0,
              device_id: `${deviceId}`,
              car_id: 0,
              car_image:
                'https://img.lovepik.com/png/20231001/black-and-white-classic-car-plane-logo-flat-classic-cars_50407_wh1200.png',
            };
            await saveCarData(cardata);
          }
          if (res && res.getarea == 'true') {
            Alert.alert('Location', `Service Availbale`, [
              {text: 'Cancel', onPress: () => {}},
              {
                text: 'Ok',
                onPress: async () => {
                  const loc = res.locaton_data;
                  const obj = {
                    state_id: loc.state_id,
                    city_id: loc.city_id,
                    area_id: loc.area_id,
                    location_id: loc.location_id,
                    pincode: parseInt(pincode),
                  };
                  console.log(obj);
                  await saveLocationData(obj);
                  navigation.navigate('MainRoute')
                },
              },
            ]);
            setLoading(false);
          } else {
            Alert.alert('Location', `${res.getarea}`, [
              {text: 'Cancel', onPress: () => {}},
              {
                text: 'Ok',
                onPress: async () => {
                  navigation.navigate('SelectLocation');
                },
              },
            ]);
            setLoading(false);
          }
          setLoading(false);
        })
        .catch(error => {
          console.log('error', error);
          setLoading(false);
        });
    };

    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
        }}>
        <Loader loading={loading}></Loader>
        <Image
          source={require('../assets/carwash2.png')}
          style={{
            width: 200,
            height: 150,
            alignSelf: 'center',
          }}></Image>
        {/* <Text style={{fontSize:20,alignSelf:'center',fontWeight:'bold'}}>Car Wash</Text> */}
      </View>
    );
  }),
);

export default Splash;
