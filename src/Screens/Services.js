import { useNavigation, useRoute } from '@react-navigation/native';
import React, { useRef, useState } from 'react';
import { View, Text,ImageBackground,FlatList,TouchableOpacity,StyleSheet,Image, ScrollView } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons'
import AntDesign from 'react-native-vector-icons/AntDesign'
import { COLORS } from '../Constants/Color';
import RBSheet from 'react-native-raw-bottom-sheet';
import Entypo from 'react-native-vector-icons/Entypo'

const Services = () => {
   const route = useRoute()
   const {avaliableServices} = route.params;
   const navigation = useNavigation()
   const refRBSheet = useRef();
   const [details,setDetails]=useState('')
//   console.log(avaliableServices)

const data = [
    {id:1,image:require('../assets/service.png'),name:'Basic Service',amount:'2,599',time :"45 min"},
    {id:2,image:require('../assets/service.png'),name:'Basic Service',amount:'2,599',time :"45 min"},
    {id:3,image:require('../assets/service.png'),name:'Basic Service',amount:'2,599',time :"45 min"},
    {id:4,image:require('../assets/service.png'),name:'Basic Service',amount:'2,599',time :"45 min"},
  ]

  function stripHtml(str) {
    return str.replace(/<\/?[^>]+(>|$)/g, "");
  }
  
  const Item = ({item}) =>{
    return(
      <View style={{margin:10,backgroundColor:'#FFFFFF',borderRadius:10,flex:1}}>
        <TouchableOpacity onPress={()=>{
        
        }}
       style={{flexDirection:'row',flex:1,justifyContent:'space-between'}}>
         <View style={{}}>
            <Image
           source={{uri: item.image || item.car_image}}
           style={{width:150,height:80,margin:10,alignSelf:'center',borderRadius:5}}
           />
     
        </View>
        <View style={{padding:5,alignSelf:'center'}}>
        <Text style={{color:COLORS.black,fontWeight:'bold',margin:5,width:150}}>{item.name || (item.plan && item.plan.name)}</Text>
        
        <TouchableOpacity style={{margin:5,borderWidth:0.5,borderRadius:20,borderColor:COLORS.black,width:100,marginLeft:10,padding:5,alignSelf:'center'}}
        onPress={()=>{
            refRBSheet.current.open()
            setDetails(item)
        }}>
          <Text style={{alignSelf:'center',color:COLORS.orange}}>View Details</Text>
        </TouchableOpacity>
        </View>
       
        </TouchableOpacity>
      </View>
    )
  }



  return (
    <View style={{flex:1}}>
   
        <View style={{flexDirection:'row',justifyContent:'space-between'}}>
        <TouchableOpacity onPress={()=>{
                navigation.goBack()
              }}>
              <Ionicons name="arrow-back-outline" size={15} 
              style={{margin: 10,color:COLORS.black,backgroundColor:COLORS.white,borderRadius:100,padding:10}} />
               </TouchableOpacity> 
               <TouchableOpacity onPress={()=>{
                navigation.navigate('')
              }}
              style={{backgroundColor:COLORS.white,borderRadius:10,margin:10,flexDirection:'row',padding:3}}>
              <AntDesign name="sharealt" size={15} style={{alignSelf:'center',color:COLORS.black}}/>
              <Text style={{alignSelf:'center',marginLeft:10,color:COLORS.black}}>Share</Text>
               </TouchableOpacity> 
        </View>
      <View style={{flex:1,marginBottom:40}}>
        <Text style={{margin:10,color:COLORS.black,fontSize:17}}>Choose Services</Text>
        <View style={{}}>
           <FlatList
           data={avaliableServices || []}
           renderItem={Item}
           keyExtractor={item => item.service_id}
           />
        </View>
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
        height={400}
        >
        <ScrollView style={{flex:1}}>

        <TouchableOpacity style={{}}
            onPress={()=>{
                refRBSheet.current.close()
            }}>
              <Entypo
              name={'cross'}
              size={30}
              style={{alignSelf:'flex-end',margin:5,marginRight:20,color:COLORS.black}}
              />
            </TouchableOpacity>
           <View style={{padding:5}}>

            <Text style={{color:COLORS.black,fontWeight:'bold',margin:5,fontSize:20}}>{details.name || (details.plan && details.plan.name)}</Text>
       
       <View style={{ width: '95%',height: 2, backgroundColor: 'lightgrey',alignSelf: 'center',margin: 10,}}/>

       <View style={{padding:5,}}>
        <Text style={{color:COLORS.black,marginLeft:10,fontWeight:'bold'}}>Description</Text>
       <Text style={{marginLeft:10,color:COLORS.black}}>{ (details.description && details.description.replace(/<\/?[^>]+(>|$)/g, "")) ||  (details.plan && details.plan.description.replace(/<\/?[^>]+(>|$)/g, ""))}</Text>
     
       </View>

         </View>

         <View style={{flex:1,marginTop:50}}>
         <TouchableOpacity style={{padding:15,borderRadius:20,alignSelf:'center',backgroundColor:COLORS.blue,width:300}}
         onPress={()=>{
          navigation.navigate('AddtoCart')
          refRBSheet.current.close()
         }}>
          <Text style={{alignSelf:'center',color:COLORS.white}}>Add to cart</Text>
         </TouchableOpacity>
         </View>
        
        </ScrollView>
      </RBSheet>
    </View>
  );
}
const styles = StyleSheet.create({
    dot: {
        width: 5,
        height: 5,
        borderRadius: 10, // Make it a circle
        backgroundColor: COLORS.black, // Customize dot color as needed
        alignSelf:'center', // Add space between dot and text
        marginLeft:10 , 
        marginRight:5
    },
    dot1: {
        width: 3,
        height: 3,
        borderRadius: 10, // Make it a circle
        backgroundColor: COLORS.black, // Customize dot color as needed
        alignSelf:'center', // Add space between dot and text
        marginLeft:10 , 
        marginRight:5
    },
    
})
export default Services;
