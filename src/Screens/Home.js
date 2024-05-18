import React, {useEffect, useState, useRef} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  FlatList,
  ScrollView,
  TouchableOpacity,
  Linking,
  Platform,
  PermissionsAndroid,BackHandler,Alert
} from 'react-native';
import {SwiperFlatList, Pagination} from 'react-native-swiper-flatlist';
import Feather from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import {COLORS} from '../Constants/Color';
import {Badge} from 'react-native-elements';
import {DrawerActions, useIsFocused, useNavigation} from '@react-navigation/native';
import Geolocation from '@react-native-community/geolocation';
import Loader from '../Components/Loader';
import {API_BASE_URL} from '../api/ApiClient';
import { getCarData } from '../Constants/AsyncStorageHelper';

const {width, height} = Dimensions.get('window');

const Home = () => {
  const isFocused = useIsFocused()
  const navigation = useNavigation();
  const [catinfo,setCarInfo] = useState({})
  const [location, setLocation] = useState('...Loading');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [services, setServices] = useState([]);
  const[servicesByCars,setServicesByCar] = useState([])

  const scrollRef = useRef(null);
  const next = () => {
    scrollRef.current.scrollToIndex({
      index: scrollRef.current.getCurrentIndex() + 1,
    });
  };
  const newImage = [
    require('../assets/offer.png'),
    require('../assets/offer.png'),
    require('../assets/offer.png'),
  ];
  let len = newImage.length;

  const image = index => ({image: newImage[index % newImage.length]});

  const items = Array.from(Array(len)).map((_, index) => image(index));
  const CustomPagination = props => {
    return (
      <Pagination
        {...props}
        paginationStyle={styles.paginationContainer}
        paginationStyleItem={styles.pagination}
        paginationDefaultColor="gray"
        paginationActiveColor="black"
      />
    );
  };

  const data = [
    {id: 1, image: require('../assets/carwash.png'), name: 'Pressure Car Wash'},
    {id: 2, image: require('../assets/carwash1.png'), name: 'Underbody'},
    {
      id: 3,
      image: require('../assets/carwash2.png'),
      name: 'Waterless Cleaning',
    },
    {id: 4, image: require('../assets/carwash3.png'), name: 'Deep Car Clean'},
    {id: 5, image: require('../assets/carwash4.png'), name: 'Wash & Coat'},
    {id: 6, image: require('../assets/carwash5.png'), name: 'Bike Washing'},
  ];

  const data1 = [
    {
      id: 1,
      image: require('../assets/service.png'),
      name: 'Basic Service',
      amount: '2,599',
    },
    {
      id: 2,
      image: require('../assets/service.png'),
      name: 'Underbody',
      name: 'Basic Service',
      amount: '2,599',
    },
  ];

  const GetCarData = async ()=>{
    const car = await getCarData()
    console.log('cardata.',car,car.car_id)
    setCarInfo(car)
    if(car.car_id == 0){
      getServices();
    }else{
      getServicesBycar()
    }
  }

  useEffect(() => {
    GetCarData()
  },[isFocused])

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

  function getLocation() {
    Geolocation.getCurrentPosition(
      position => {
        const {latitude, longitude} = position.coords;
        getAddress(latitude, longitude);
        console.log(position);
      },
      error => {
        console.error(error);
        setError('Error getting location');
      },
      // {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000},
    );
  }

  const getAddress = async (latitude, longitude) => {
    // const apiKey = 'GOOGLE_MAPS_APIKEY';
    // const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${apiKey}`;
    const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&addressdetails=1`
    try {
      fetch(url)
        .then(response => response.json())
        .then(result => {
          if (result) {
          //   // Print the full address
          //   if (result && result.results[0] != undefined) {
          //     let address = result.results[0].formatted_address;
          //     setLocation(address);
          //     console.log(address);
          //   }

          // } else {
          //   console.error('No results found');
          // }
          //  console.log(result.address)
          if (result && result.address) {
            let addressData = 'Fetching location..';
            if (error) {
              addressData = error;
            } else if (result.address) {
              const {  state, suburb, postcode, country } = result.address;
              addressData = `${country},  ${state}, ${suburb},${postcode}`;
            }
           console.log('address...',addressData)
            setLocation(addressData);
          } else {
            setLocation({ error: 'Address not found' });
          }
        }
        });
    } catch (error) {
      console.error('Error fetching address:', error);
      setLocation({ error: 'Error fetching address' });
    }
  };

 

  const getServices = async () => {
    setLoading(true);
    const myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');

    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow',
    };

    fetch(`${API_BASE_URL}/api/services`, requestOptions)
      .then(response => response.text())
      .then(async result => {
        const res = JSON.parse(result);
        // console.log(res);
        if (res && res.data.length > 0) {
          setServices(res.data);
        }
        setLoading(false);
      })
      .catch(error => {
        console.error(error);
        setLoading(false);
      });
  };

  useEffect(() => {
   
  }, [isFocused]);

  const getServicesBycar = async (id)=>{
    const car = await getCarData()
    setLoading(true)
    const requestOptions = {
        method: "GET",
        redirect: "follow"
      };
      
      fetch(`${API_BASE_URL}/api/services-by-car?car_id=${car.car_id}`, requestOptions)
        .then((response) => response.text())
        .then((result) => {
            const res = JSON.parse(result)
             console.log('services by car res',res.data)
             setServicesByCar(res.data)
            setLoading(false)
        })
        .catch((error) => {
            console.error(error)
            setLoading(false)
        });
   }

  const Item = ({item}) => {
    // console.log(item.image, item.name);
    return (
      <View style={{margin: 5, alignSelf: 'center'}}>
        <TouchableOpacity
          onPress={() => {
            // navigation.navigate('DateTime',{services:services});
            alert('Please select car')
          }}>
          <Image
            source={{uri: item.image}}
            style={{
              width: 100,
              height: 70,
              borderRadius: 5,
              alignSelf: 'center',
            }}
          />
          <Text
            style={{
              color: COLORS.black,
              alignSelf: 'center',
              fontSize: 10,
              margin: 5,
              width: 100,
            }}>
            {item.name}
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

  const Item2 = ({item}) => {
    // console.log('item',item);
    return (
      <View style={{margin: 5, alignSelf: 'center'}}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('DateTime',{details:item});
            // navigation.navigate('Services',{services:servicesByCars});
          }}>
          <Image
            source={{uri: item.car_image}}
            style={{
              width: 90,
              height: 50,
              borderRadius: 5,
              alignSelf: 'center',
            }}
          />
          <Text
            style={{
              color: COLORS.black,
              alignSelf: 'center',
              fontSize: 10,
              margin: 5,
              width: 100,
            }}>
            {item.plan && item.plan.name}
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

  const Item1 = ({item}) => {
    return (
      <View
        style={{
          margin: 10,
          alignSelf: 'center',
          flex: 1,
          backgroundColor: '#FFFFFF',
          borderRadius: 5,
        }}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('Services', {item: item});
          }}>
          <Image
            source={item.image}
            style={{height: 150, borderRadius: 10, width: 300}}
          />
          <Text style={{color: COLORS.black, fontWeight: 'bold', margin: 5}}>
            {item.name}
          </Text>
          <Text style={{marginLeft: 10}}>.Every 500 kms/3 Months</Text>
          <Text style={{marginLeft: 10}}>.Take 4 hours</Text>
          <TouchableOpacity
            style={{
              margin: 5,
              borderWidth: 0.5,
              borderRadius: 10,
              borderColor: COLORS.black,
              width: 70,
              marginLeft: 10,
            }}>
            <Text style={{alignSelf: 'center'}}>+9 more</Text>
          </TouchableOpacity>
          <View
            style={{
              margin: 10,
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <Text
              style={{fontSize: 20, color: COLORS.black, fontWeight: 'bold'}}>
              {' '}
              ₹ {item.amount}
            </Text>
            <TouchableOpacity
              style={{
                backgroundColor: COLORS.blue,
                borderRadius: 5,
                width: 50,
                padding: 5,
              }}>
              <Text style={{alignSelf: 'center', color: COLORS.white}}>
                ADD
              </Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  // const backPressed = () => {
  //   Alert.alert(
  //     `ExitApp`,
  //     `Are you Sure`,
  //     [
  //       { text: `No`, onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
  //       { text: `Yes`, onPress: () => BackHandler.exitApp() },
  //     ],
  //     { cancelable: false })
  //   return true;
  // }

  // useEffect(() => {
  //   BackHandler.addEventListener('hardwareBackPress', backPressed);
  //   return () => {
  //     BackHandler.removeEventListener('hardwareBackPress', backPressed);
  //   }
  // }, [isFocused]);

  return (
    <View style={{flex: 1}}>
      <Loader loading={loading}></Loader>
      <View style={{padding: 10, backgroundColor: COLORS.blue,flexDirection: 'row',justifyContent:'space-between'}}>
       <TouchableOpacity onPress={()=>{
        navigation.dispatch(DrawerActions.openDrawer())
       }} style={{alignSelf:'center',marginTop:10}}>
        <Feather
        name='menu'
        size={30}
        color={COLORS.white}
        style={{alignSelf:'center'}}
        />
       </TouchableOpacity>
        
        <View style={{flexDirection: 'row', marginTop: 10}}>
          <Entypo
            name="location-pin"
            size={20}
            color={COLORS.white}
            style={{
              backgroundColor: '#FFFFFF4D',
              alignSelf: 'center',
              borderRadius: 2,
              padding: 3,
              margin: 5,
            }}
          />
          <View style={{marginLeft: 10,alignSelf:'center',}}>
            <Text style={{color: COLORS.white,}}>Office</Text>
            {/* <Text style={{color:COLORS.white}}>3/5-10,Mehdipatnam, Hyderabad</Text> */}
            {error == 'Error getting location' ? (
              <TouchableOpacity
                onPress={() => {
                  Linking.sendIntent(
                    'android.settings.LOCATION_SOURCE_SETTINGS',
                  );
                }}>
                <Text style={{color: COLORS.white,alignSelf:'center',}}>Enable Location</Text>
              </TouchableOpacity>
            ) : (
              <Text style={{color: COLORS.white, width: 200, fontSize: 10,alignSelf:'center',}}>
                {location}
              </Text>
            )}
          </View>
          </View>
          <View style={{  marginRight: 10}}>
            {/* <Badge
              value={''}
              badgeStyle={{backgroundColor:COLORS.orange}}
              // value={msgRes && msgRes.length}
              containerStyle={{
                top: (8),
                // right: (-35),
                alignSelf:'flex-end'
              }}></Badge> */}

            {/* <Feather
                name="bell"
                size={20}
                color={COLORS.white}
                style={{alignSelf:'flex-end',}}
              /> */}
            <TouchableOpacity onPress={()=>{navigation.navigate('SelectService')}}>
              <Image
                source={{uri:catinfo.car_image}}
                style={{padding:5,alignSelf:'center',margin:5,width:50,height:30}}
              />
            <View style={{backgroundColor:COLORS.white,borderRadius:2,padding:2}}>
              <Text style={{color:COLORS.blue,alignSelf:'center'}}>Wagon R</Text>
            </View>
            </TouchableOpacity>
          </View>
        </View>
      {/* </View> */}
      <View style={{flex: 1}}>
        <ScrollView>
          <Text
            style={{
              margin: 10,
              color: COLORS.black,
              fontSize: 17,
              fontWeight: 'bold',
            }}>
            #SpecialForYou
          </Text>
          <View style={{marginLeft: 10}}>
            <SwiperFlatList
              autoplay
              autoplayDelay={3}
              autoplayLoop
              ref={scrollRef}
              showPagination
              PaginationComponent={CustomPagination}
              data={items}
              renderItem={({item}) => (
                <Image style={styles.image} source={item.image} />
              )}
            />
          </View>
          <Text
            style={{
              margin: 10,
              color: COLORS.black,
              fontSize: 17,
              fontWeight: 'bold',
              marginTop: 30,
            }}>
            Choose Services
          </Text>
          <View style={{flex: 1, alignSelf: 'center'}}>
          {catinfo.car_id != 0 ?(
               <FlatList
               numColumns={3}
               data={servicesByCars || []}
               renderItem={Item2}
               keyExtractor={item => item.service_id}
             />
          ):(
            <FlatList
            numColumns={3}
            data={services || []}
            renderItem={Item}
            keyExtractor={item => item.service_id}
          />
          )}
           
      
          </View>
          {/* <View style={{flex: 1, flexDirection: 'row'}}>
            <AntDesign
              name="star"
              size={20}
              color={'orange'}
              style={{margin: 5}}
            />
            <Text
              style={{
                color: COLORS.black,
                marginLeft: 10,
                fontWeight: 'bold',
                margin: 5,
              }}>
              Recommended for you
            </Text>
            <View style={{alignSelf: 'center', flex: 1, marginRight: 10}}>
              <Text style={{color: COLORS.orange, alignSelf: 'flex-end'}}>
                See all
              </Text>
            </View>
          </View>
          <View style={{alignSelf: 'center', flex: 1}}>
            <FlatList
              horizontal
              data={data1 || []}
              renderItem={Item1}
              keyExtractor={item => item.id}
            />
          </View> */}
        </ScrollView>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  paginationContainer: {
    top: '100%',
  },
  pagination: {
    borderRadius: 10,
    width: 10,
    height: 10,
  },
  image: {
    // marginTop:5,
    height: 150,
    width: 300,
    borderRadius: 10,
    margin: 5,
  },
});
export default Home;
