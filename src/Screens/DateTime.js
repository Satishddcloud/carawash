import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  Alert,TextInput
} from 'react-native';
import React, {useState, useRef, useEffect} from 'react';
import {COLORS} from '../Constants/Color';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useNavigation, useRoute} from '@react-navigation/native';
import DateTimePicker from '@react-native-community/datetimepicker';
import DatePicker from 'react-native-date-picker';
import RBSheet from 'react-native-raw-bottom-sheet';
import Entypo from 'react-native-vector-icons/Entypo';
import {getJwtToken, getLocationData} from '../Constants/AsyncStorageHelper';
import {API_BASE_URL} from '../api/ApiClient';
import Loader from '../Components/Loader';
import {DateHelper} from '../Constants/DateHelper';
import {useSelector} from 'react-redux';

const DateTime = () => {
  const route = useRoute();
  const {services, details} = route.params;
  const navigation = useNavigation();
  const loginStatus = useSelector(state => state.User.login_status);
  console.log('loginStatus', loginStatus);
  const [loading, setLoading] = useState(false);
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [open, setOpen] = useState(false);
  const[carNumber,setCarNumber]=useState('')
  const[address,setAddress]=useState('')
  const refRBSheet = useRef();

  const onChangeDate = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowDatePicker(Platform.OS === 'ios');
    setDate(currentDate);
  };

  const onChangeTime = (event, selectedTime) => {
    const currentTime = selectedTime || time;
    setShowTimePicker(Platform.OS === 'ios');
    setTime(currentTime);
    // Handle time change as needed
  };

  const minTime = new Date();
  minTime.setHours(details.plan && details.plan.from_time, 0, 0); // 5:00 AM

  const maxTime = new Date();
  maxTime.setHours(details.plan && details.plan.to_time, 0, 0); // 8:00 PM (20:00)

  const currentFloatTime = time && time.toLocaleTimeString().substring(0, 2);
  const currentFloatDate = DateHelper.formatToDate(date);
  console.log(currentFloatTime, currentFloatDate);

  // const filteredData = services.filter(service => {
  //   return (currentFloatTime >= service.from_time && currentFloatTime <= service.to_time) || (currentFloatTime >= (service.plan && service.plan.from_time) && currentFloatTime <= (service.plan && service.plan.to_time));
  // });

  // console.log('filteredData',filteredData)

  const Addtocart = async details => {
    const loc = await getLocationData()
    console.log(loc)
    const token = await getJwtToken();
    setLoading(true);
    const myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');
    myHeaders.append('Authorization', `Bearer ${token}`);

    const raw = JSON.stringify({
      car_plan_id: parseInt(details.car_plan_id),
      slot_date: currentFloatDate,
      slot_time: parseInt(currentFloatTime),
      price: parseInt(details.price),
      car_number :carNumber,
      state_id: loc.state_id,
      city_id: loc.city_id,
      area_id: loc.area_id,
      location_id: loc.location_id,
      pincode:  loc.pincode,
      address :address
    });

    const requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow',
    };
    console.log(raw);

    fetch(`${API_BASE_URL}/api/add-to-cart`, requestOptions)
      .then(response => response.text())
      .then(result => {
        console.log('res', result);
        const res = JSON.parse(result);
        console.log(res);
        if (res && res.status == true) {
          Alert.alert('Cart', `${res.message}`, [
            {
              text: 'Cancel',
              onPress: () => {
                refRBSheet.current.close();
              },
              style: 'cancel',
            },
            {
              text: 'OK',
              onPress: () => {
                navigation.navigate('Carts');
                refRBSheet.current.close();
              },
            },
          ]);
        } else {
          alert(res.message);
          refRBSheet.current.close();
        }
        setLoading(false);
      })
      .catch(error => {
        console.error(error);
        setLoading(false);
      });
  };

  function formatTimeRange(startHour, endHour) {
    const formatHour = hour => {
      const period = hour >= 12 ? 'PM' : 'AM';
      const formattedHour = hour % 12 || 12; // Convert 0 to 12 for 12-hour format
      return `${formattedHour}:00 ${period}`;
    };

    const startTime = formatHour(startHour);
    const endTime = formatHour(endHour);

    return `${startTime} - ${endTime}`;
  }

  const startHour = details.plan && details.plan.from_time; // 5:00 AM
  const endHour = details.plan && details.plan.to_time; // 8:00 PM

  const timeRange = formatTimeRange(startHour, endHour);
  console.log(timeRange); // Output: "5:00 AM - 8:00 PM"

  useEffect(() => {}, []);

  return (
    <View style={{flex: 1, backgroundColor: COLORS.white}}>
      <Loader loading={loading}></Loader>
      <View style={{flexDirection: 'row', marginTop: '5%', marginLeft: '5%'}}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <AntDesign
            name="arrowleft"
            size={20}
            style={{fontWeight: 'bold', alignSelf: 'center'}}
            color={COLORS.blue}
          />
        </TouchableOpacity>
        <Text
          style={{
            color: COLORS.blue,
            fontSize: 20,
            marginLeft: 20,
            bottom: 5,
            fontWeight: 'bold',
            alignSelf: 'center',
          }}>
          Select Date & Time
        </Text>
      </View>
      <ScrollView>
        <View>
          <Text
            style={{
              fontSize: 15,
              fontWeight: 'bold',
              margin: 10,
              alignSelf: 'center',
              color: COLORS.black,
            }}>
            Service Available Timings : {timeRange}
          </Text>
        </View>
        <View style={{}}>
          <Text style={{fontSize:20,color:COLORS.black,fointWeight:'bold',margin:5,marginLeft:30}}>Enter Your Car Number : </Text>
          <TextInput
          placeholder='Enter car number'
          value={carNumber}
          onChangeText={(text)=>{
            setCarNumber(text)
          }}
          style={{borderWidth:1,borderRadius:5,width:200,margin:5,alignSelf:'center'}}
          />
            <Text style={{fontSize:20,color:COLORS.black,fointWeight:'bold',margin:5,marginLeft:30}}>Enter Your Address : </Text>
          <TextInput
          placeholder='Enter address'
          value={address}
          onChangeText={(text)=>{
            setAddress(text)
          }}
          style={{borderWidth:1,borderRadius:5,width:200,margin:5,alignSelf:'center'}}
          />
        </View>
        <View style={styles.container}>
          {/* <TouchableOpacity onPress={() => setOpen(true)} style={styles.button}>
          <Text style={styles.buttonText}>Select Date</Text>
        </TouchableOpacity> */}
          <Text
            style={{
              alignSelf: 'center',
              fontSize: 20,
              color: 'black',
              fontWeight: 'bold',
            }}>
            Select Date
          </Text>
          <Text style={styles.dateText}>Date: {date.toLocaleDateString()}</Text>

          {/* {showDatePicker && (
          <DateTimePicker
            testID="datePicker"
            value={date}
            mode="date"
            is24Hour={true}
            display="default"
            onChange={onChangeDate}
          />
        )} */}
          <DatePicker
            // modal
            mode="date"
            // open={open}
            date={date}
            onDateChange={date => {
              // setOpen(false)
              setDate(date);
            }}
            // onCancel={() => {
            //   setOpen(false)
            // }}
            minimumDate={new Date()}
          />

          {/* <TouchableOpacity onPress={() => setShowTimePicker(true)} style={[styles.button, { marginTop: '5%' }]}>
          <Text style={styles.buttonText}>Select Time</Text>
        </TouchableOpacity> */}
          <Text
            style={{
              alignSelf: 'center',
              fontSize: 20,
              color: 'black',
              fontWeight: 'bold',
            }}>
            Select Time
          </Text>
          <Text style={styles.dateText}>Time: {time.toLocaleTimeString()}</Text>

          {/* {showTimePicker && (
          <DateTimePicker
            testID="timePicker"
            value={time}
            mode="time"
            is24Hour={true}
            display="default"
            onChange={onChangeTime}
          />
        )} */}

          <DatePicker
            // modal
            mode="time"
            // open={open}
            date={time}
            onDateChange={time => {
              // setOpen(false)
              setTime(time);
            }}
            // onCancel={() => {
            //   setOpen(false)
            // }}
            locale="en"
            is24hourSource="locale"
            minimumDate={minTime}
            maximumDate={maxTime}
          />
        </View>
      </ScrollView>
      <View>
        <TouchableOpacity
          style={styles.proceedButton}
          onPress={() => {
            //  if(filteredData.length > 0){
            //   navigation.navigate('Services',{avaliableServices:filteredData})
            //  }else{
            //   alert('This time services are not available')
            //  }
            if(carNumber == ''){
              alert('Please enter car number')
            }else if(address == ''){
              alert('Please enter address')
            }
            else{
              refRBSheet.current.open();
            }
          }}>
          <Text style={styles.proceedButtonText}>Book your Slot</Text>
        </TouchableOpacity>
      </View>
      <RBSheet
        ref={refRBSheet}
        closeOnDragDown={true}
        closeOnPressMask={false}
        // useNativeDriver={true}
        customStyles={{
          wrapper: {
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            zIndex: 1000,
          },
          container: {
            borderTopLeftRadius: 25,
            borderTopRightRadius: 25,
          },
          draggableIcon: {
            backgroundColor: '#000',
          },
        }}
        // customModalProps={{
        //   animationType: 'slide',
        //   statusBarTranslucent: true,
        // }}
        // customAvoidingViewProps={{
        //   enabled: false,
        // }}
        height={400}>
        <ScrollView style={{flex: 1}}>
          <TouchableOpacity
            style={{}}
            onPress={() => {
              refRBSheet.current.close();
            }}>
            <Entypo
              name={'cross'}
              size={30}
              style={{
                alignSelf: 'flex-end',
                margin: 5,
                marginRight: 20,
                color: COLORS.black,
              }}
            />
          </TouchableOpacity>
          <View style={{padding: 5}}>
            <Text
              style={{
                color: COLORS.black,
                fontWeight: 'bold',
                margin: 5,
                fontSize: 20,
              }}>
              {details.name || (details.plan && details.plan.name)}
            </Text>
            <Text
              style={{
                color: COLORS.black,
                fontWeight: 'bold',
                margin: 5,
                fontSize: 20,
              }}>
              ₹ {details.price}
            </Text>
            <View
              style={{
                width: '95%',
                height: 2,
                backgroundColor: 'lightgrey',
                alignSelf: 'center',
                margin: 10,
              }}
            />

            <View style={{padding: 5}}>
              <Text
                style={{
                  color: COLORS.black,
                  marginLeft: 10,
                  fontWeight: 'bold',
                }}>
                Description
              </Text>
              <Text style={{marginLeft: 10, color: COLORS.black}}>
                {(details.description &&
                  details.description.replace(/<\/?[^>]+(>|$)/g, '')) ||
                  (details.plan &&
                    details.plan.description.replace(/<\/?[^>]+(>|$)/g, ''))}
              </Text>
            </View>
          </View>

          <View style={{flex: 1, marginTop: 50}}>
            <TouchableOpacity
              style={{
                padding: 15,
                borderRadius: 20,
                alignSelf: 'center',
                backgroundColor: COLORS.blue,
                width: 300,
                bottom: 10,
              }}
              onPress={() => {
                if (loginStatus) {
                  Addtocart(details);
                } else {
                  alert('Please Login');
                }
              }}>
              <Text style={{alignSelf: 'center', color: COLORS.white}}>
                Add to cart
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </RBSheet>
    </View>
  );
};

export default DateTime;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
    alignItems: 'center',
  },
  button: {
    backgroundColor: COLORS.blue,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  buttonText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: 'bold',
  },
  dateText: {
    color: COLORS.blue,
    fontSize: 20,
    marginTop: 10,
  },
  proceedButton: {
    backgroundColor: COLORS.blue,
    width: 200,
    marginBottom: 10,
    padding: 10,
    borderRadius: 8,
    alignSelf: 'center',
  },
  proceedButtonText: {
    color: COLORS.white,
    fontSize: 18,
    fontWeight: 'bold',
    alignSelf: 'center',
  },
});
