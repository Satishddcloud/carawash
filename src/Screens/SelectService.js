import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { COLORS } from '../Constants/Color';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';


const SelectService = () => {
  const navigation=useNavigation();
  return (
    <View>
        <View style={{flexDirection:'row',marginTop:'5%',marginLeft:'5%'}}>
         <TouchableOpacity onPress={()=>navigation.goBack()}>
        <AntDesign name="arrowleft" size={20} style={{fontWeight:'bold'}} color={COLORS.blue}/>
        </TouchableOpacity> 
      <Text style={{color:COLORS.blue,fontSize:20,marginLeft:15,bottom:5,fontWeight:'bold'}}>Select Service</Text>
      </View>
      <View style={{flexDirection:"row",justifyContent:'space-between'}}>
      <Text style={{color:COLORS.blue,fontSize:18,marginLeft:15,bottom:5,fontWeight:'bold',marginTop:'5%'}}>Add Another Vehicle</Text>
      <AntDesign name="pluscircle" style={{marginRight:15,marginTop:'5%'}} size={20} color={COLORS.blue}/>
      </View>
      <View style={{backgroundColor:COLORS.blue,padding:'8%',borderRadius:8,marginHorizontal:'3%',marginTop:'4%',flexDirection:'row'}}>
      <View style={{backgroundColor:COLORS.white,width:'7%',height:'25%',borderRadius:20,flexWrap:'wrap',top:'40%',position:'absolute',left:'100%'}}>
      <MaterialCommunityIcons name="delete" size={18} color={COLORS.blue} style={{alignSelf:'center',marginLeft:'9%'}}/>
      </View>
      <Image source={require('../assets/serviceImage.png')} style={{width:80,height:80,right:'30%'}} />
     <View>
      <Text style={{color:COLORS.white,fontSize:18,bottom:5,marginTop:4}}>Tata Altroz</Text>
      <Text style={{color:COLORS.white,fontSize:12,bottom:5,marginTop:4}}>Hybrid Ceramic and interior with underbody</Text>
      <Text style={{color:COLORS.white,marginTop:4}}>₹549</Text>
      </View>
      </View>
      <View style={{position:'absolute',top:650,alignSelf: 'center'}}>
        <TouchableOpacity style={{ backgroundColor:COLORS.blue,
                    borderRadius: 30,
                    padding: 15,
                    width: 300,
                    }} onPress={()=>navigation.navigate('DateTime')}>
          <Text style={{color:COLORS.white,fontWeight:'bold',textAlign:'center'}}>Select Slot</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default SelectService

const styles = StyleSheet.create({})
