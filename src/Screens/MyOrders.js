import {View, Text,TouchableOpacity,Image, FlatList} from 'react-native';
import React,{useState,useEffect} from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign'
import Loader from '../Components/Loader';
import { useNavigation } from '@react-navigation/native';
import { COLORS } from '../Constants/Color';
import { getJwtToken } from '../Constants/AsyncStorageHelper';
import { API_BASE_URL } from '../api/ApiClient';



const MyOrders = () => {
    const navigation = useNavigation()
    const [loading,setLoading]=useState(false)
    const [ordersList,setOrdersList]=useState([])

    const getOrders = async () => {
        const token = await getJwtToken();
        setLoading(true);
        const myHeaders = new Headers();
        myHeaders.append("Accept", "application/json");
        myHeaders.append('Authorization', `Bearer ${token}`);
    
        const requestOptions = {
          method: 'GET',
          headers: myHeaders,
          redirect: 'follow',
        };
        fetch(`${API_BASE_URL}/api/my-oders`, requestOptions)
          .then(response => response.text())
          .then(result => {
            const res = JSON.parse(result);
            console.log('cart res', res);
    
            if (res.data && res.data.length > 0) {
              setOrdersList(res.data);
              setLoading(false);
            } else {
              alert('Please Login')
              setOrdersList([]);
            }
            setLoading(false);
          })
          .catch(error => {
            console.error(error);
            setLoading(false);
          });
      };

    const Item = ({item})=>{
        return(
            <View>
                <TouchableOpacity
        style={{
          flexDirection: 'row',
          padding: 10,
          borderWidth: 1,
          borderRadius: 5,
          margin: 5,
          backgroundColor: COLORS.blue,
          justifyContent: 'space-between',
        }} onPress={()=>{
          
        }}>
        <Image
          source={{uri: item.image}}
          style={{width: 120, height: 60, borderRadius: 5, alignSelf: 'center'}}
        />

        <View style={{width: '70%'}}>
         
          <Text
            style={{
              color: COLORS.white,
              fontSize: 15,
              bottom: 5,
              marginTop: 4,
              alignSelf: 'center',
              marginRight: 20,
            }}>
          Car Plan:  {item.car_plan_name}
          </Text>
          <Text
            style={{
              color: COLORS.white,
              fontSize: 15,
              bottom: 5,
              marginTop: 4,
              alignSelf: 'center',
              marginRight: 20,
            }}>
           car Name: {item.car_name}
          </Text>
          <Text
            style={{
              color: COLORS.white,
              fontSize: 15,
              bottom: 5,
              marginTop: 4,
              alignSelf: 'center',
              marginRight: 20,
            }}>
           Amount: {item.price}
          </Text>
        </View>
      </TouchableOpacity>
            </View>
        )
    }

    useEffect(()=>{
       getOrders()
    },[])

  return (
    <View style={{flex:1}}>
        <Loader loading={loading}></Loader>
        <View style={{ flexDirection: 'row', marginTop: '5%', marginLeft: '5%' }}>
        <TouchableOpacity onPress={() => navigation.navigate('Home')}>
          <AntDesign name="arrowleft" size={20} style={{ fontWeight: 'bold',alignSelf:'center' }} color={COLORS.blue} />
        </TouchableOpacity>
        <Text style={{ color: COLORS.blue, fontSize: 20, marginLeft: 50, bottom: 5, fontWeight: 'bold',alignSelf:'center' }}>My Orders</Text>
      </View>
      <View>
           <FlatList
            data={ordersList}
            renderItem={Item}
            keyExtractor={item =>item}
           />
      </View>
     
    </View>
  );
};

export default MyOrders;
