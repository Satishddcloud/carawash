import React, {useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {RadioButton} from 'react-native-paper';
import {useNavigation, useRoute} from '@react-navigation/native';
import {COLORS} from '../Constants/Color';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { getJwtToken } from '../Constants/AsyncStorageHelper';
import Loader from '../Components/Loader';
import { load } from 'react-native-globalize';
import { API_BASE_URL } from '../api/ApiClient';

const Payments = () => {
  const route=useRoute()
  const {item}=route.params;
  const navigation = useNavigation();
  const [paymentMethod, setPaymentMethod] = useState('');
  const [loading,setLoading]=useState(false)
  // console.log('paymentMethod',paymentMethod,item)

  const handlePaymentMethodChange = value => {
    setPaymentMethod(value);
  };

  const createOrder=async()=>{
    const time = item && item.slot_time.substring(0,2)
    // console.log(time,paymentMethod)
    const token = await getJwtToken();
    setLoading(true);
    const myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');
    myHeaders.append('Authorization', `Bearer ${token}`);

    const raw = JSON.stringify({
      "car_plan_id": item.car_plan_id,
      "slot_date": `${item.slot_date}`,
      "slot_time": parseInt(time),
      "car_number": `${item.car_number}`,
      "price": item.price,
      "payment_method": `${paymentMethod}`,
      "state_id": item.state_id,
      "city_id": item.city_id,
      "area_id": item.area_id,
      "location_id": item.location_id,
      "pincode":parseInt(item.pincode),
      "address":`${item.address}`,
      "ref_number":"ugiyh221",
      "payment_status":200
    });
    
    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow"
    };
    console.log(raw)
    fetch(`${API_BASE_URL}/api/create-oder`, requestOptions)
      .then((response) => response.text())
      .then((result) => {
        const res = JSON.parse(result)
        console.log(res)
        if(res && res.status == true){
          alert(res.message)
          navigation.navigate('MyOrders')
        }
        setLoading(false);
      })
      .catch(error => {
        console.error(error);
        setLoading(false);
      });
  }

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
            fontSize: 20,
            marginLeft: 15,
            bottom: 5,
            fontWeight: 'bold',
          }}>
          Payment
        </Text>
      </View>
      <View style={{flex: 1, justifyContent: 'space-between', marginTop: 8}}>
        <RadioButton.Group
          onValueChange={handlePaymentMethodChange}
          value={paymentMethod}>
          <PaymentOption
            value="upi"
            label="UPI"
            icon="bank"
            paymentMethod={paymentMethod}
          />
          <PaymentOption
            value="card"
            label="Card"
            icon="credit-card-outline"
            paymentMethod={paymentMethod}
          />
          <PaymentOption
            value="Netbanking"
            label="Net Banking"
            icon="bank-outline"
            paymentMethod={paymentMethod}
          />
          <PaymentOption
            value="wallet"
            label="Wallet"
            icon="wallet-outline"
            paymentMethod={paymentMethod}
          />
        </RadioButton.Group>
      </View>
      <View style={{marginBottom:'8%'}}>
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          if(paymentMethod != ''){
               createOrder()
          }else{
            alert('Please select Payment Method')
          }
        }}>
        <Text style={styles.text}>Pay Now</Text>
      </TouchableOpacity>
      </View>
    </View>
  );
};

const PaymentOption = ({value, label, icon, paymentMethod}) => {
  return (
    <View style={styles.radioButtonContainer}>
      <View style={{flexDirection: 'row', right: '15%'}}>
        <RadioButton value={value} />
        <Text style={{marginTop: 8}}>{label}</Text>
      </View>
      <MaterialCommunityIcons
        name={icon}
        size={20}
        color={COLORS.blue}
        style={styles.icon}
      />
      <AntDesign name="right" size={20} color={COLORS.blue} />
    </View>
  );
};

export default Payments;

const styles = StyleSheet.create({
  radioButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    borderWidth: 1,
    borderColor: COLORS.blue,
    borderRadius: 5,
    marginHorizontal: 20,
    marginTop: '5%',
    padding: 10,
  },
  icon: {
    marginRight: 10,
  },
  button: {
    backgroundColor: COLORS.blue,
    paddingVertical: 12,
    marginHorizontal: 50,
    borderRadius: 25,
  },
  text: {
    color: COLORS.white,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign:'center'
  },
});
