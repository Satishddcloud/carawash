import { useNavigation,useRoute } from '@react-navigation/native';
import React,{useState,useEffect} from 'react';
import { View, Text,TouchableOpacity,Image,FlatList } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign'
import { COLORS } from '../Constants/Color';
import { Card, Searchbar } from 'react-native-paper';
import Loader from '../Components/Loader';
import { API_BASE_URL } from '../api/ApiClient';

const SelectVechile = () => {
  const route = useRoute()
  const {cars}= route.params;
   const navigation = useNavigation()
   const [search,setSearch]=useState('')
   const [loading,setLoading]=useState(false)
  const [brands,setBarnds] = useState([])

   const Item = ({item})=>{
    return(
        <View style={{margin:5,padding:5,}}>
          <TouchableOpacity onPress={()=>{
           getServicesBycar(item.id)
          }} style={{}}>
            <Image source={{uri: item.image != null ? item.image : 'https://testmodel.co.in/carwash/uploads/cars/1713796299.jpg'}}
            style={{width:100,height:60,borderRadius:5,alignSelf:'center'}}/>
            <Text style={{alignSelf:'center',fontWeight:'bold',color:COLORS.blue}}>{item.name}</Text>
            
         </TouchableOpacity>
        </View>
    )
   }

   const getServicesBycar = async (id)=>{
    setLoading(true)
    const requestOptions = {
        method: "GET",
        redirect: "follow"
      };
      
      fetch(`${API_BASE_URL}/api/services-by-car?car=${id}`, requestOptions)
        .then((response) => response.text())
        .then((result) => {
            const res = JSON.parse(result)
             console.log(res.data)
            if(res.data && res.data.length > 0){
              const plans = res.data.map((i)=>({
                ...i,
                label:i.car,
                value:i.id
              }))
                navigation.navigate('CreateCar',{carPlans:plans})
              }
            setLoading(false)
        })
        .catch((error) => {
            console.error(error)
            setLoading(false)
        });
   }

   useEffect(()=>{
    
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
        Select Vechile
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
        Select Your car
      </Text>
      <View style={{flex:1}}>
        <FlatList
        numColumns={3}
        data={cars || []}
        renderItem={Item}
        keyExtractor={item =>item.id}
        />
      </View>
      <View style={{}}>
      <TouchableOpacity
          style={{
            backgroundColor: COLORS.blue,
            borderRadius: 30,
            padding: 15,
            width: 300,
            alignSelf: 'center',
            marginBottom:10
          }}
          onPress={() => {
            navigation.navigate('');
          }}>
          <Text style={{alignSelf: 'center',textAlign:'center',color: COLORS.white}}>
            Pay Now{' '}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default SelectVechile;
