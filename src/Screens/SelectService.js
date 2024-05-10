import { Image, StyleSheet, Text, TouchableOpacity, View,FlatList } from 'react-native'
import React from 'react'
import { COLORS } from '../Constants/Color';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import Loader from '../Components/Loader';
import { API_BASE_URL } from '../api/ApiClient';
import DeviceInfo from 'react-native-device-info';
import { useEffect } from 'react';
import { saveCarData } from '../Constants/AsyncStorageHelper';


const SelectService = () => {
  const navigation=useNavigation();
  const isFocused = useIsFocused()
  const [loading,setLoading] = useState(false)
  const [customerCars,setCustomerCars]=useState([])

  const getCustomerCars = async ()=>{
    const deviceId =await DeviceInfo.getUniqueId();
    console.log(deviceId)
     setLoading(true)
     const myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

const requestOptions = {
  method: "GET",
  headers: myHeaders,
  redirect: "follow"
};

fetch(`${API_BASE_URL}/api/get-customer-selected-car?device_id=${deviceId}`, requestOptions)
  .then((response) => response.text())
  .then((result) => {
    const res = JSON.parse(result)
    console.log(result)
    if(res.data && res.data.length > 0){
      setCustomerCars(res.data)
      setLoading(false)
    }
    setLoading(false)
  })
  .catch((error) => {
    console.error(error)
    setLoading(false)
  });
  }

  useEffect(()=>{
    getCustomerCars()
  },[isFocused])

  const Item = ({item})=>{
    return(
      <TouchableOpacity style={{backgroundColor:COLORS.blue,margin:10,padding:10,borderRadius:10,flexDirection:'row',justifyContent:'space-between'}}
      onPress={async()=>{
        await saveCarData(item)
        navigation.navigate('Home')
      }}>
      
      <Image source={{uri:item.car_image}} style={{width:150,height:80,borderRadius:5,alignSelf:'center'}} />

      <Text style={{color:COLORS.white,fontSize:18,bottom:5,marginTop:4,alignSelf:'center',marginRight:20}}>{item.car && item.car.name}</Text>

 
      </TouchableOpacity>
    )
  }

  return (
    <View style={{flex:1}}>
      <Loader loading={loading}></Loader>
        <View style={{flexDirection:'row',marginTop:'5%',marginLeft:'5%'}}>
         <TouchableOpacity onPress={()=>navigation.goBack()}>
        <AntDesign name="arrowleft" size={20} style={{fontWeight:'bold'}} color={COLORS.blue}/>
        </TouchableOpacity> 
      <Text style={{color:COLORS.blue,fontSize:20,marginLeft:15,bottom:5,fontWeight:'bold'}}>Select Car</Text>
      </View>
      <View style={{flexDirection:"row",justifyContent:'space-between'}}>
      <Text style={{color:COLORS.blue,fontSize:18,marginLeft:15,bottom:5,fontWeight:'bold',marginTop:'5%'}}>Add Another Vehicle</Text>
     <TouchableOpacity onPress={()=>{
      navigation.navigate('SelectBrand')
     }} style={{alignSelf:'center'}}>
      <AntDesign name="pluscircle" style={{marginRight:15,marginTop:'5%'}} size={20} color={COLORS.blue}/>
      </TouchableOpacity>
      </View>
      <View style={{flex:1}}>
        <FlatList
        data= {customerCars|| []}
        renderItem={Item}
        keyExtrator = {item =>item.selected_car_id}  
        />
      </View>
      {/* <View style={{position:'absolute',top:600,alignSelf: 'center'}}>
        <TouchableOpacity style={{ backgroundColor:COLORS.blue,
                    borderRadius: 30,
                    padding: 15,
                    width: 300,
                    }} onPress={()=>navigation.navigate('TermsAndConditions')}>
          <Text style={{color:COLORS.white,fontWeight:'bold',textAlign:'center'}}>Select Slot</Text>
        </TouchableOpacity>
      </View> */}
    </View>
  )
}

export default SelectService

const styles = StyleSheet.create({})
