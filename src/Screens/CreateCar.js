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
import {  getUserProfileInfo } from '../Constants/AsyncStorageHelper';


export const CarInitialValues = props => ({
  location: '',
  area:'',
  state: '',
  city: '',
  planId: '',
  carNumber: '',
  address: '',
});
export const CarFormValidator = props => {
  return yup.object().shape({
    location: yup.string().required('Please Select your location'),
    area: yup.string().required('Please Select your area'),
    state: yup.string().required('Please enter your State'),
    city: yup.string().required('Please enter your city'),
    planId: yup.string().required('Please enter your Plan id'),
    carNumber: yup.string().required('Please enter your  Car Number '),
    address: yup.string().required('Please enter your  Address'),
  });
};

const CreateCar = (props) => {
    const route = useRoute()
    const {carPlans}= route.params;
    const navigation = useNavigation()
    const [loading,setLoading]=useState('')
    const [states,setStates] =useState([])
    const [cities,setCities] =useState([])
    const [areas,setAreas] =useState([])
    const [locations,setLocations] =useState([])


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
                value : i.id
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
  const getCities = async ()=>{
    setLoading(true);
    const myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');

    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow',
    };

    fetch(`${API_BASE_URL}/api/cities`, requestOptions)
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
          setCities(state);
        }
        setLoading(false);
      })
      .catch(error => {
        console.error(error);
        setLoading(false);
      });
  }
  const getAreas = async ()=>{
    setLoading(true);
    const myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');

    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow',
    };

    fetch(`${API_BASE_URL}/api/areas`, requestOptions)
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
          setAreas(state);
        }
        setLoading(false);
      })
      .catch(error => {
        console.error(error);
        setLoading(false);
      });
  }
  const getLocations = async ()=>{
    setLoading(true);
    const myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');

    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow',
    };

    fetch(`${API_BASE_URL}/api/locations`, requestOptions)
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
        }
        setLoading(false);
      })
      .catch(error => {
        console.error(error);
        setLoading(false);
      });
  }

  const createCar = async (values)=>{
      setLoading(true)
      const userinfo = await getUserProfileInfo()
      console.log(userinfo)
      const myHeaders = new Headers();
myHeaders.append("Accept", "application/json");

const formdata = new FormData();
formdata.append("user_id", `${userinfo.id}`);
formdata.append("state_id", `${values.state}`);
formdata.append("city_id",  `${values.city}`);
formdata.append("area_id",  `${values.area}`);
formdata.append("location_id",  `${values.location}`);
formdata.append("car_number",  `${values.carNumber}`);
formdata.append("address",  `${values.address}`);
formdata.append("car_plan_id", `${values.planId}`);

const requestOptions = {
  method: "POST",
  headers: myHeaders,
  body: formdata,
  redirect: "follow"
};
fetch(`${API_BASE_URL}/api/save-customer-car`, requestOptions)
.then(response => response.text())
.then(async result => {
  const res = JSON.parse(result);
  console.log(res);
  if(res && res.status == true){
    alert(res.message)
    setLoading(false)
  }
  setLoading(false)
})
.catch(error => {
    console.error(error);
    setLoading(false);
  });
  }

  useEffect(()=>{
    getStates()
    getCities()
    getAreas()
    getLocations()
  },[])

  return (
    <View style={{flex:1}}>
        <Loader loading={loading}></Loader>
     <View style={{flexDirection: 'row', marginTop: '5%', marginLeft: '5%'}}>
       <TouchableOpacity onPress={() => navigation.goBack()}>
         <AntDesign
           name="arrowleft"
           size={20}
           style={{fontWeight: 'bold'}}
           color={COLORS.blue}
         />
       </TouchableOpacity>
       <Text
         style={{
           color: COLORS.blue,
           marginLeft: 20,
           fontWeight: 'bold',alignSelf:'center'
         }}>
         Customer Car 
       </Text>
     </View>
     
      <ScrollView style={{}}>
        <Formik
          initialValues={CarInitialValues(props)}
          validationSchema={CarFormValidator()}
          onSubmit={ (values, {resetForm}) => {
           
            createCar(values,resetForm() );
            console.log(values);
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
                fontWeight:'bold',marginLeft:40,marginTop:5
            }}>{'Car Number'}</Text>
              <TextInput
                placeholder="Enter Car Number "
                value={values.carNumber}
                onChangeText={text => {
                  setFieldValue('carNumber', text);
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
              {errors.carNumber && (
                <Text style={{fontSize: 10, color: 'red', marginLeft: 40}}>
                  {' '}
                  * {errors.carNumber}
                </Text>
              )}
              <Text style={{
                fontSize:15,
                color: 'black',
                fontWeight:'bold',marginLeft:40,marginTop:5
            }}>{'Address'}</Text>
              <TextInput
                placeholder="Enter Address "
                value={values.Tag}
                onChangeText={text => {
                  setFieldValue('address', text);
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
              {errors.address && (
                <Text style={{fontSize: 10, color: 'red', marginLeft: 40}}>
                  {' '}
                  * {errors.address}
                </Text>
              )}
             <AppDropDown
                label={`Select Car Plan`}
                items={carPlans || []}
                value={values.planId}
                placeholder={'Select car plan'}
                changeText={text => {
                  if (text != null) {
                    setFieldValue('planId', text);
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
              {errors.planId && (
                <Text style={{fontSize: 10, color: 'red', marginLeft: 40}}>
                  {' '}
                  * {errors.planId}
                </Text>
              )}
              <View style={{alignSelf: 'center', marginBottom: 20}}>
                <TouchableOpacity
                  style={{
                    backgroundColor: COLORS.blue,
                    borderRadius: 5,
                    padding: 10,
                    marginTop: 30,
                  }}
                  onPress={() => {
                    handleSubmit();
                  }}>
                  <Text style={{alignSelf: 'center', color: '#fff'}}>
                    Create car
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

export default CreateCar;
