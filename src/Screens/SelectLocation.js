import { Formik } from 'formik';
import React,{useState,useEffect} from 'react';
import { View, Text,TextInput,TouchableOpacity,ScrollView,Image } from 'react-native';
import { API_BASE_URL } from '../api/ApiClient';
import Loader from '../Components/Loader';
import AppDropDown from '../Components/AppDropDown';
import * as yup from 'yup';
import { COLORS } from '../Constants/Color';
import AntDesign from 'react-native-vector-icons/AntDesign'
import { useNavigation, useRoute } from '@react-navigation/native';
import {  getUserProfileInfo, saveLocationData } from '../Constants/AsyncStorageHelper';


export const LocationInitialValues = props => ({
  location: '',
  area:'',
  state: '',
  city: '',
  pincode: '',
});
export const LocationFormValidator = props => {
  return yup.object().shape({
    location: yup.string().required('Please Select your location'),
    area: yup.string().required('Please Select your area'),
    state: yup.string().required('Please enter your State'),
    city: yup.string().required('Please enter your city'),
    // address: yup.string().required('Please enter your  Address'),
  });
};

const SelectLocation = (props) => {
  
    const navigation = useNavigation()
    const [loading,setLoading]=useState('')
    const [states,setStates] =useState([])
    const [cities,setCities] =useState([])
    const [areas,setAreas] =useState([])
    const [locations,setLocations] =useState([])
    const [pincode,setPincode] = useState('')
     console.log(pincode)
  const getStates = async ()=>{
    setLoading(true);
    const myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');

    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow',
    };

    fetch(`${API_BASE_URL}/api/states`, requestOptions)
      .then(response => response.text())
      .then(async result => {
        const res = JSON.parse(result);
        console.log(res);
        if (res && res.data.length > 0) {
            const state = res.data.map((i)=>({
                ...i,
                label : i.name,
                value : i.state_id
            }))
          setStates(state);
        }
        setLoading(false);
      })
      .catch(error => {
        console.error(error);
        setLoading(false);
      });
  }
  const getCities = async (id)=>{
    setLoading(true);
    const myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');

    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow',
    };

    fetch(`${API_BASE_URL}/api/cities?state_id=${id}`, requestOptions)
      .then(response => response.text())
      .then(async result => {
        const res = JSON.parse(result);
        console.log(res);
        if (res && res.data.length > 0) {
            const state = res.data.map((i)=>({
                ...i,
                label : i.name,
                value : i.city_id
            }))
          setCities(state);
        }else{
          setCities([])
        }

        setLoading(false);
      })
      .catch(error => {
        console.error(error);
        setLoading(false);
      });
  }
  const getAreas = async (id)=>{
    setLoading(true);
    const myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');

    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow',
    };

    fetch(`${API_BASE_URL}/api/areas?city_id=${id}`, requestOptions)
      .then(response => response.text())
      .then(async result => {
        const res = JSON.parse(result);
        console.log(res);
        if (res && res.data.length > 0) {
            const state = res.data.map((i)=>({
                ...i,
                label : i.name,
                value : i.area_id
            }))
          setAreas(state);
        }else{
          setAreas([]);
        }
        setLoading(false);
      })
      .catch(error => {
        console.error(error);
        setLoading(false);
      });
  }
  const getLocations = async (id)=>{
    setLoading(true);
    const myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');

    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow',
    };

    fetch(`${API_BASE_URL}/api/locations?area_id=${id}`, requestOptions)
      .then(response => response.text())
      .then(async result => {
        const res = JSON.parse(result);
        console.log(res);
        if (res && res.data.length > 0) {
            const state = res.data.map((i)=>({
                ...i,
                label : i.name,
                value : i.id
            }))
          setLocations(state);
        }else{
          setLocations([]);
        }
        setLoading(false);
      })
      .catch(error => {
        console.error(error);
        setLoading(false);
      });
  }

  const getServiceLocation = async (location)=>{
    setLoading(true)
    const myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

const requestOptions = {
  method: "GET",
  headers: myHeaders,
  redirect: "follow"
};

fetch(`${API_BASE_URL}/api/get-service-location?area=${location}`, requestOptions)
  .then((response) => response.text())
  .then((result) => {
    const res = JSON.parse(result)
    console.log('service location res',res,res.getarea)

    if(res && res.getarea == true){
      Alert.alert("Location", `Service Availbale`,
      [
        { text: "Cancel", onPress: () => { } },
        { text: "Ok", onPress: () => navigation.navigate('MainRoute') }
      ])
      setLoading(false);
    }
   
    setLoading(false)
  })
  .catch(error => {
    console.log('error', error);
    setLoading(false);
  });
  }


  useEffect(()=>{
    getStates()
    // getCities()
    // getAreas()
    // getLocations()
  },[])

  return (
    <View style={{flex:1}}>
        <Loader loading={loading}></Loader>
     <View style={{flexDirection: 'row', marginTop: '5%', marginLeft: '5%'}}>
       {/* <TouchableOpacity onPress={() => navigation.goBack()}>
         <AntDesign
           name="arrowleft"
           size={20}
           style={{fontWeight: 'bold'}}
           color={COLORS.blue}
         />
       </TouchableOpacity> */}
       <Text
         style={{
           color: COLORS.blue,
           marginLeft: 20,
           fontWeight: 'bold',alignSelf:'center'
         }}>
         Select Your Location
       </Text>
     </View>
     
      <ScrollView style={{}}>
        <Formik
          initialValues={LocationInitialValues(props)}
          validationSchema={LocationFormValidator()}
          onSubmit={async (values, {resetForm}) => {
          //  const location = values.state + ' , ' + values.city + ' , ' + values.area + ' , ' + values.location 
           const obj ={
            "state_id": values.state,
            "city_id": values.city,
            "area_id": values.area,
            "location_id": values.location,
            "pincode": values.pincode || pincode
        }
        await saveLocationData(obj)
            navigation.navigate('MainRoute')
            // getServiceLocation(location );
            console.log(obj);
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
             
              <AppDropDown
                label={`Select State`}
                items={states || []}
                value={values.state}
                placeholder={'Select State'}
                changeText={text => {
                  if (text != null) {
                    setFieldValue('state', text);
                    getCities(text)
                  }
                }}
                autoCapitalize={'none'}
                containerStyle={{
                  padding: 10,
                  width: '85%',
                  alignSelf: 'center',
                //   margin: 10,
                }}
                viewStyle={{
                  borderRadius: 5,
                  borderWidth: 1,
                  borderColor: COLORS.black,
                }}
              />
              {errors.state && (
                <Text style={{fontSize: 10, color: 'red', marginLeft: 40}}>
                  {' '}
                  * {errors.state}
                </Text>
              )}
              <AppDropDown
                label={`Select City`}
                items={cities || []}
                value={values.city}
                placeholder={'Select City'}
                changeText={text => {
                  if (text != null) {
                    setFieldValue('city', text);
                    getAreas(text)
                  }
                }}
                autoCapitalize={'none'}
                containerStyle={{
                  padding: 10,
                  width: '85%',
                  alignSelf: 'center',
                //   margin: 10,
                }}
                viewStyle={{
                  borderRadius: 5,
                  borderWidth: 1,
                  borderColor: COLORS.black,
                }}
              />
              {errors.city && (
                <Text style={{fontSize: 10, color: 'red', marginLeft: 40}}>
                  {' '}
                  * {errors.city}
                </Text>
              )}
               <AppDropDown
                label={`Select Area`}
                items={areas || []}
                value={values.area}
                placeholder={'Select Area'}
                changeText={text => {
                  if (text != null) {
                    setFieldValue('area', text);
                    getLocations(text)
                  }
                }}
                autoCapitalize={'none'}
                containerStyle={{
                  padding: 10,
                  width: '85%',
                  alignSelf: 'center',
                }}
                viewStyle={{
                  borderRadius: 5,
                  borderWidth: 1,
                  borderColor: COLORS.black,
                }}
              />
              {errors.area && (
                <Text style={{fontSize: 10, color: 'red', marginLeft: 40}}>
                  {' '}
                  * {errors.area}
                </Text>
              )}
               <AppDropDown
                label={`Select Location`}
                items={locations || []}
                value={values.location}
                placeholder={'Select Location'}
                changeText={text => {
                  if (text != null) {
                    const item = locations.find(obj => obj.id === text);
                    setPincode(item && item.pincode)
    
                    setFieldValue('location', text);
                  }
                }}
                autoCapitalize={'none'}
                containerStyle={{
                  padding: 10,
                  width: '85%',
                  alignSelf: 'center',
                }}
                viewStyle={{
                  borderRadius: 5,
                  borderWidth: 1,
                  borderColor: COLORS.black,
                }}
              />
              {errors.location && (
                <Text style={{fontSize: 10, color: 'red', marginLeft: 40}}>
                  {' '}
                  * {errors.location}
                </Text>
              )}
            
              <Text style={{
                fontSize:15,
                color: 'black',
                fontWeight:'bold',marginLeft:50,marginTop:5
            }}>{'Pincode'}</Text>
              <TextInput
                placeholder=" "
                value={values.pincode || `${pincode != undefined ? pincode :''}`}
                onChangeText={text => {
                  setFieldValue('pincode',text);
                }}
                style={{
                  width: '80%',
                  borderWidth: 1,
                  borderColor: COLORS.black,
                  alignSelf: 'center',
                  height: 40,
                  borderRadius: 5,
                  margin: 10,
                }}
              />
              {/* {errors.address && (
                <Text style={{fontSize: 10, color: 'red', marginLeft: 40}}>
                  {' '}
                  * {errors.address}
                </Text>
              )} */}
           
              <View style={{alignSelf: 'center', marginBottom: 20}}>
                <TouchableOpacity
                  style={{
                    backgroundColor: COLORS.blue,
                    borderRadius: 5,
                    padding: 10,
                    marginTop: 30,
                    width:100
                  }}
                  onPress={() => {
                    handleSubmit();
                  }}>
                  <Text style={{alignSelf: 'center', color: '#fff'}}>
                   Submit
                  </Text>
                </TouchableOpacity>
               
              </View>
            </>
          )}
        </Formik>
      </ScrollView>
    </View>
  );
}

export default SelectLocation;
