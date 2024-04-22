import React from 'react';
import { View, Text,Image,TouchableOpacity, FlatList } from 'react-native';
import { COLORS } from '../Constants/Color';

const Completed = () => {

    const data = [
        {id:1,image:require('../assets/service.png'),name:'Basic Service',amount:'2,599',time :"45 min"},
        {id:2,image:require('../assets/service.png'),name:'Basic Service',amount:'2,599',time :"45 min"},
        
      ]

      const Item = ({item}) =>{
        return(
          <View style={{margin:10,backgroundColor:'#FFFFFF',borderRadius:10,flex:1}}>
            <TouchableOpacity onPress={()=>{
            
            }}>
                <View style={{backgroundColor:'lightgrey',borderRadius:20,width:150,margin:10,padding:3,}}>
                    <Text style={{alignSelf:'center',color:COLORS.black}}>Order Completed</Text>
                </View>
            <View  style={{flexDirection:'row',flex:1}}>
                <Image
              source={item.image}
               style={{width:100,height:100,margin:5,alignSelf:'center',borderRadius:10}}
               />
               <View>
               <View style={{backgroundColor:'lightgrey',borderRadius:10,margin:10,padding:5}}>
                    <Text style={{alignSelf:'center',color:COLORS.black}}>Pressure Car Wash</Text>
                </View>
                <Text style={{color:COLORS.black,fontWeight:'bold',alignSelf:'center'}}>{item.name}</Text>
                <Text style={{color:COLORS.black,alignSelf:'center'}}>{item.time}</Text>
               </View>
                </View>
            <View style={{flexDirection:'row',justifyContent:'space-evenly'}}>
                   <View>
                    <Text>OrderId</Text>
                    <Text style={{color:COLORS.black}}>#Cd485dd</Text>
                   </View>
                   <View>
                    <Text>Order date</Text>
                    <Text style={{color:COLORS.black}}>24 Dec, 2024</Text>
                   </View>
                   <View>
                    <Text>Total Amount</Text>
                    <Text style={{color:COLORS.black}}> ₹ 1500/-</Text>
                   </View>
            </View>
            <View style={{flexDirection:'row',justifyContent:'space-between',margin:10}}>
                <TouchableOpacity style={{backgroundColor:'lightgrey',alignSelf:'center',borderRadius:20,padding:10}}>
                    <Text style={{alignSelf:'center',color:COLORS.blue}}>Leave Review</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{alignSelf:'center',borderRadius:20,padding:10,borderWidth:1,borderColor:COLORS.black}}>
                    <Text style={{alignSelf:'center',color:COLORS.black}}>E- Receipt</Text>
                </TouchableOpacity>
                </View>
           </TouchableOpacity>
          </View>
        )
      }

  return (
    <View style={{flex:1}}>
       <FlatList
       data={data || []}
       renderItem={Item}
       keyExtractor={item => item.id}
       />
    </View>
  );
}

export default Completed;
