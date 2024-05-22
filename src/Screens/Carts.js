import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  Image,
  Alert,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {COLORS} from '../Constants/Color';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import Loader from '../Components/Loader';
import {API_BASE_URL} from '../api/ApiClient';
import {getJwtToken} from '../Constants/AsyncStorageHelper';
import {useSelector} from 'react-redux';

const Carts = () => {
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const [loading, setLoading] = useState(false);
  const [cartList, setCartList] = useState([]);
  const loginStatus = useSelector(state => state.User.login_status);
  console.log('loginStatus', loginStatus);

  const getCartList = async () => {
    const token = await getJwtToken();
    setLoading(true);
    const myHeaders = new Headers();
    myHeaders.append('Authorization', `Bearer ${token}`);

    const requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow',
    };
    fetch(`${API_BASE_URL}/api/cart`, requestOptions)
      .then(response => response.text())
      .then(result => {
        const res = JSON.parse(result);
        console.log('cart res', res);

        if (res.data && res.data.length > 0) {
          setCartList(res.data);
          setLoading(false);
        } else {
          setCartList([]);
        }
        setLoading(false);
      })
      .catch(error => {
        console.error(error);
        setLoading(false);
      });
  };

  const deleteCart = async id => {
    const token = await getJwtToken();
    setLoading(true);
    const myHeaders = new Headers();
    myHeaders.append('Authorization', `Bearer ${token}`);

    const requestOptions = {
      method: 'POST',
      headers: myHeaders,
      redirect: 'follow',
    };
    fetch(`${API_BASE_URL}/api/delete-cart?cart_id=${id}`, requestOptions)
      .then(response => response.text())
      .then(result => {
        const res = JSON.parse(result);
        console.log(res);
        if (res && res.status == true) {
          alert(res.message);
          getCartList();
        }

        setLoading(false);
      })
      .catch(error => {
        console.error(error);
        setLoading(false);
      });
  };

  useEffect(() => {
    getCartList();
  }, [isFocused]);

  const Item = ({item}) => {
    return (
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
          navigation.navigate('Payments',{item:item})
        }}>
        <Image
          source={{uri: item.image}}
          style={{width: 120, height: 60, borderRadius: 5, alignSelf: 'center'}}
        />

        <View style={{width: '50%'}}>
          <TouchableOpacity
            onPress={() => {
              Alert.alert('Delete', `Are you delete from cart ?`, [
                {
                  text: 'Cancel',
                  onPress: () => console.log('Cancel Pressed'),
                  style: 'cancel',
                },
                {
                  text: 'OK',
                  onPress: () => {
                    deleteCart(item.cart_id);
                  },
                },
              ]);
            }}>
            <AntDesign
              name="delete"
              color={'white'}
              size={20}
              style={{margin: 5, alignSelf: 'flex-end'}}
            />
          </TouchableOpacity>
          <Text
            style={{
              color: COLORS.white,
              fontSize: 15,
              bottom: 5,
              marginTop: 4,
              alignSelf: 'center',
              marginRight: 20,
            }}>
          Car Plan : {item.car_plan_name}
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
           Car Name: {item.car_name}
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
           Amount : {item.price}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={{flex: 1}}>
      <Loader loading={loading}></Loader>
      {/* <View style={{ flexDirection: 'row', marginTop: '5%', marginLeft: '5%' }}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <AntDesign name="arrowleft" size={20} style={{ fontWeight: 'bold',alignSelf:'center' }} color={COLORS.blue} />
        </TouchableOpacity>
        <Text style={{ color: COLORS.blue, fontSize: 20, marginLeft: 20, bottom: 5, fontWeight: 'bold',alignSelf:'center' }}>My Cart</Text>
      </View> */}
      <Text
        style={{
          color: COLORS.blue,
          fontSize: 20,
          fontWeight: 'bold',
          alignSelf: 'center',
          margin: 10,
        }}>
        My Cart
      </Text>
      {!loginStatus && (
        <Text
          style={{
            alignSlef: 'center',
            fontWeight: 'bold',
            fontSize: 20,
            margin: 20,
          }}>
          Please Login ..
        </Text>
      )}
      <View>
        {cartList.length > 0 ? (
          <FlatList
            data={cartList}
            renderItem={Item}
            keyExtractor={item => item.cart_id}
          />
        ) : (
          <Text
            style={{
              alignSlef: 'center',
              fontWeight: 'bold',
              fontSize: 20,
              margin: 20,
            }}>
            No data added in Carts
          </Text>
        )}
      </View>
    </View>
  );
};

export default Carts;

const styles = StyleSheet.create({});
