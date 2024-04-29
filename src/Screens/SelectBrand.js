import { useNavigation } from '@react-navigation/native';
import React,{useState,useEffect} from 'react';
import { View, Text,TouchableOpacity,Image,FlatList } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign'
import { COLORS } from '../Constants/Color';
import { Card, Searchbar } from 'react-native-paper';
import Loader from '../Components/Loader';
import { API_BASE_URL } from '../api/ApiClient';

const SelectBrand = () => {
    const navigation = useNavigation()
    const [search,setSearch]=useState('')
    const [loading,setLoading]=useState(false)
   const [brands,setBarnds] = useState([])
 
    const Item = ({item})=>{
     return(
         <View style={{margin:10,padding:10,borderRadius:10,borderWidth:1,borderColor:COLORS.blue}}>
           <TouchableOpacity onPress={()=>{
            getCars(item.id)
              
           }} style={{flexDirection:'row',justifyContent:'space-between',}}>
             <Image source={{uri:item.image}}
             style={{width:70,height:50,borderRadius:5,alignSelf:'center'}}/>
             <Text style={{alignSelf:'center',fontWeight:'bold',color:COLORS.blue}}>{item.name}</Text>
             <AntDesign
                 name="right"
                 size={15}
                 style={{
                  alignSelf:'center'
                 }}
               />
          </TouchableOpacity>
         </View>
     )
    }
 
    const getBrands = async ()=>{
     setLoading(true)
     const requestOptions = {
         method: "GET",
         redirect: "follow"
       };
       
       fetch(`${API_BASE_URL}/api/brands`, requestOptions)
         .then((response) => response.text())
         .then((result) => {
             const res = JSON.parse(result)
              console.log(res.data)
             if(res.data && res.data.length > 0){
                 setBarnds(res.data)
               }
             setLoading(false)
         })
         .catch((error) => {
             console.error(error)
             setLoading(false)
         });
    }

    const getCars = async (id)=>{
      setLoading(true)
      const requestOptions = {
          method: "GET",
          redirect: "follow"
        };
        
        fetch(`${API_BASE_URL}/api/cars?brand=${id}`, requestOptions)
          .then((response) => response.text())
          .then((result) => {
              const res = JSON.parse(result)
               console.log(res.data)
              if(res.data && res.data.length > 0){
                navigation.navigate('SelectVechile',{cars:res.data})
                }else{
                  alert('No cars')
                }
              setLoading(false)
          })
          .catch((error) => {
              console.error(error)
              setLoading(false)
          });
     }

 
    useEffect(()=>{
     getBrands()
    },[])
 
   return (
     <View style={{flex: 1}}>
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
         Select Brand
       </Text>
     </View>
      <View>
      <Searchbar
       placeholder=""
       onChangeText={text => setSearch(text)}
       value={search}
       inputStyle={{alignSelf:'center',height:30,}}
       style={{borderRadius:10,backgroundColor:'lightgrey',width:300,height:50,alignSelf:'center',margin:10}}
     />
      </View>
      <Text
         style={{
           color: COLORS.blue,
           marginLeft: 20,margin:10,fontWeight:'bold'
         }}>
         Select Your Band
       </Text>
       <View style={{flex:1}}>
         <FlatList
         data={brands || []}
         renderItem={Item}
         keyExtractor={item =>item.id}
         />
       </View>
     </View>
   );
 }

export default SelectBrand;
