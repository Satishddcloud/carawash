import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
  StyleSheet,
} from 'react-native';
import React, {useState, memo} from 'react';
import IntlProvider from '../Constants/IntlProvider';
import {withGlobalize} from 'react-native-globalize';
import Loader from '../Components/Loader';
import {COLORS} from '../Constants/Color';
import {useNavigation, useRoute} from '@react-navigation/native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import OTPInputView from '@twotalltotems/react-native-otp-input';
import { API_BASE_URL } from '../api/ApiClient';

const OtpForMail = withGlobalize(
  memo(props => {
    const route = useRoute()
    const {email}= route.params
    const [loading, setLoading] = useState(false);
    const intl = IntlProvider(props);
    const navigation = useNavigation();
    const [otp, setOtp] = useState('');

    const ValidateOtp = async ()=>{
      setLoading(true)
      const myHeaders = new Headers();
     myHeaders.append("Accept", "application/json");
     myHeaders.append("Content-Type", "application/json");

     const raw = JSON.stringify({
        "otp":`${otp}`,
       "email":`${email}`
     });
     
     const requestOptions = {
       method: "POST",
       headers: myHeaders,
       body: raw,
       redirect: "follow"
     };
     fetch(`${API_BASE_URL}/api/validate-otp`, requestOptions)
       .then((response) => response.text())
        .then((result) => {
         const res= JSON.parse(result)
         console.log(res,res.status)
         if(res && res.status == true){
           alert(res.message)
           navigation.navigate('Reset',{email:email});
         }else{
           alert(res.message)
         }
         
         setLoading(false)
       })
        .catch((error) =>{ 
         console.error(error)
         setLoading(false)
       });
}

    return (
      <View style={{flex: 1, backgroundColor: 'white'}}>
        <Loader loading={loading}></Loader>
        <View
          style={{
            backgroundColor: COLORS.white,
            padding: 10,
            borderBottomRightRadius: 10,
            borderBottomLeftRadius: 10,
          }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              margin: 10,
            }}>
            <TouchableOpacity
              onPress={() => {
                navigation.goBack();
              }}>
              <AntDesign
                name="left"
                size={15}
                style={{
                  right:8 ,
                  color: COLORS.medBlack,
                  backgroundColor: COLORS.medgrey,
                  borderRadius: 100,
                  padding: 10,
                }}
              />
            </TouchableOpacity>
          </View>
          <Text
            style={{
              fontSize: 20,
              fontWeight: 'bold',
              color: COLORS.medBlack,
              margin: 5,
            }}>
            Check Your Mail
          </Text>
          
          <Text style={{color: COLORS.black, marginLeft: 5}}>
            enter 6 digit code that mentioned in the email
          </Text>
        </View>
        <View>
          <View style={{alignSelf: 'center', marginTop: 10}}>
            <OTPInputView
              style={{
                width: '90%',
                height: 100,
                alignSelf: 'center',
                padding: 10,
              }}
              pinCount={6}
              code={otp} //You can supply this prop or not. The component will be used as a controlled / uncontrolled component respectively.
              onCodeChanged={code => {
                setOtp(code);
              }}
              autoFocusOnLoad
              codeInputFieldStyle={styles.underlineStyleBase}
              onCodeFilled={code => {
                console.log(`Code is ${code}, you are good to go!`);
              }}
            />
          </View>
        </View>

        <TouchableOpacity
          style={{
            backgroundColor: COLORS.blue,
            borderRadius: 30,
            padding: 15,
            width: 300,
            alignSelf: 'center',
            marginTop: 20,
          }}
          onPress={() => {
            ValidateOtp()
          }}>
          <Text style={{alignSelf: 'center', color: COLORS.white}}>
            Verify Code{' '}
          </Text>
        </TouchableOpacity>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            marginTop: 4,
          }}>
          <Text style={{color: COLORS.black, margin: 10}}>
            Haven’t got the email yet?
          </Text>
          <TouchableOpacity  onPress={() => {
            navigation.goBack()
          }}>
          <Text style={{color: COLORS.blue, marginTop: 10,fontWeight:'bold'}}>Resend email</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }),
);
const styles = StyleSheet.create({
  underlineStyleBase: {
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: COLORS.white,
    borderColor: COLORS.blue,
    fontWeight: 'bold',
    padding: 10,
    alignSelf: 'center',
    color: 'black',
  },
});
export default OtpForMail;
