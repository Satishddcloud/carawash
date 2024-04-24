import React, {useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {RadioButton} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';
import {COLORS} from '../Constants/Color';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const Payments = () => {
  const navigation = useNavigation();
  const [paymentMethod, setPaymentMethod] = useState('');

  const handlePaymentMethodChange = value => {
    setPaymentMethod(value);
  };

  return (
    <View style={{flex: 1}}>
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
            value="netbanking"
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
        onPress={() => navigation.navigate('SelectBrand')}>
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
