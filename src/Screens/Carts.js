import {StyleSheet, Text, View,TouchableOpacity, FlatList} from 'react-native';
import React,{useState,useEffect} from 'react';
import { COLORS } from '../Constants/Color';
import AntDesign from 'react-native-vector-icons/AntDesign'
import { useNavigation } from '@react-navigation/native';
import Loader from '../Components/Loader';
import { API_BASE_URL } from '../api/ApiClient';
import { getJwtToken } from '../Constants/AsyncStorageHelper';

const Carts = () => {
   const navigation = useNavigation()
   const[loading,setLoading]= useState(false)
   const [cartList,setCartList]=useState([])

   const getCartList = async ()=>{
    const token= await getJwtToken()
    console.log('token',token)
   
    setLoading(true)
    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${token}`);
     
    const requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow"
    };
    fetch(`${API_BASE_URL}/api/cart`, requestOptions)
  .then((response) => response.text())
  .then((result) =>{ 
    const res = JSON.parse(result)
    console.log(res)

    if(res.data && res.data.length > 0){
        setCartList(res.data)
        setLoading(false)
    }
     setLoading(false)
  })
  .catch((error) =>{
     console.error(error)
     setLoading(false)
    });
 
   }

   useEffect(()=>{
    getCartList()
   },[])

     const Item = ({item})=>{
      return(
        <View>

        </View>
      )
     }


  return (
    <View style={{flex:1}}>
      <Loader loading={loading}></Loader>
         {/* <View style={{ flexDirection: 'row', marginTop: '5%', marginLeft: '5%' }}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <AntDesign name="arrowleft" size={20} style={{ fontWeight: 'bold',alignSelf:'center' }} color={COLORS.blue} />
        </TouchableOpacity>
        <Text style={{ color: COLORS.blue, fontSize: 20, marginLeft: 20, bottom: 5, fontWeight: 'bold',alignSelf:'center' }}>My Cart</Text>
      </View> */}
       <Text style={{ color: COLORS.blue, fontSize: 20, fontWeight: 'bold',alignSelf:'center',margin:10 }}>My Cart</Text>
      <View>
        {cartList.length > 0 ?(
        <FlatList
        data={cartList}
        renderItem={Item}
        keyExtractor={item =>item.cart_id}
        />
        ):(
          <Text style={{alignSlef:'center',fontWeight:'bold',fontSize:20,margin:20}}>No data added in Carts</Text>
        )}
      </View>
    </View>
  );
};

export default Carts;

const styles = StyleSheet.create({});
