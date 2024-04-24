import { useNavigation, useRoute } from '@react-navigation/native';
import React, { useRef } from 'react';
import { View, Text,ImageBackground,FlatList,TouchableOpacity,StyleSheet,Image } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons'
import AntDesign from 'react-native-vector-icons/AntDesign'
import { COLORS } from '../Constants/Color';
import RBSheet from 'react-native-raw-bottom-sheet';


const Services = () => {
   const route = useRoute()
   const {item} = route.params;
   const navigation = useNavigation()
   const refRBSheet = useRef();
//   console.log(item)

const data = [
    {id:1,image:require('../assets/service.png'),name:'Basic Service',amount:'2,599',time :"45 min"},
    {id:2,image:require('../assets/service.png'),name:'Basic Service',amount:'2,599',time :"45 min"},
    {id:3,image:require('../assets/service.png'),name:'Basic Service',amount:'2,599',time :"45 min"},
    {id:4,image:require('../assets/service.png'),name:'Basic Service',amount:'2,599',time :"45 min"},
  ]

  const Item = ({item}) =>{
    return(
      <View style={{margin:10,backgroundColor:'#FFFFFF',borderRadius:10,flex:1}}>
        <TouchableOpacity onPress={()=>{
        
        }}
       style={{flexDirection:'row',flex:1}}>
        <View style={{padding:5}}>
        <Text style={{color:COLORS.black,fontWeight:'bold',margin:5}}>{item.name}</Text>
        <View style={{flexDirection:'row'}}>
        <Text style={{color:COLORS.black,fontWeight:'bold',}}> ₹ {item.amount}</Text>
        <View style={styles.dot} />
        <Text style={{alignSelf:'center'}}> {item.time}</Text>
        </View>
         
        <Text style={{marginLeft:10}}>.Every 500 kms/3 Months</Text>
        <Text style={{marginLeft:10}}>.Take 4 hours</Text>
        <Text style={{marginLeft:10}}>.Shampoo  Cleaning</Text>
        <TouchableOpacity style={{margin:5,borderWidth:0.5,borderRadius:20,borderColor:COLORS.black,width:100,marginLeft:10,padding:5}}
        onPress={()=>{
            refRBSheet.current.open()
        }}>
          <Text style={{alignSelf:'center',color:COLORS.orange}}>View Details</Text>
        </TouchableOpacity>
        </View>
        <View style={{marginLeft:30}}>
            <Image
          source={item.image}
           style={{width:100,height:100,margin:10,alignSelf:'center',borderRadius:10}}
           />
        <TouchableOpacity style={{backgroundColor:COLORS.white,borderRadius:5,width:50,padding:5,alignSelf:'center',bottom:25}}>
          <Text style={{alignSelf:'center',color:COLORS.orange}}>ADD</Text>
        </TouchableOpacity>
        </View>
        </TouchableOpacity>
      </View>
    )
  }



  return (
    <View style={{flex:1}}>
        <View>
        <ImageBackground
        source={item.image}
        imageStyle={{height:200,borderBottomRightRadius:20,borderBottomLeftRadius:20,opacity:0.5,backgroundColor:'black'}}
        />
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
      <Text style={{alignSelf:'center',fontWeight:'bold',color:COLORS.white,fontSize:25,marginTop:70}}>Pressure car Wash</Text>
      </View>
      <View style={{marginTop:50,flex:1,marginBottom:40}}>
        <Text style={{margin:10,color:COLORS.black,fontSize:17}}>Choose Services</Text>
        <View style={{}}>
           <FlatList
           data={data || []}
           renderItem={Item}
           keyExtractor={item => item.id}
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
        height={730}
        >
        <View >
        <TouchableOpacity style={{}}
            onPress={()=>{
                refRBSheet.current.close()
            }}>
              <View style={{position:'absolute',zIndex:100,right:50}}>
            <Text  style={{marginLeft:15,fontSize:25}}>close</Text>
            </View>
            </TouchableOpacity>
           
        <Text style={{color:COLORS.black,fontWeight:'bold',margin:5}}>{'basic detsils'}</Text>
        <View style={{flexDirection:'row'}}>
        <Text style={{color:COLORS.black,fontWeight:'bold',}}> ₹ {'1400'}</Text>
        <View style={styles.dot} />
        <Text style={{alignSelf:'center'}}> {'5 min'}</Text>
        </View>
        </View>
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
