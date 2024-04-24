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
import {useNavigation} from '@react-navigation/native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import OTPInputView from '@twotalltotems/react-native-otp-input';

const OtpForMail = withGlobalize(
  memo(props => {
    const [loading, setLoading] = useState(false);
    const intl = IntlProvider(props);
    const navigation = useNavigation();
    const [otp, setOtp] = useState('');

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
          <Text style={{color: COLORS.lgrey, margin: 5}}>
            We sent a reset link to
          </Text>
          <Text style={{color: COLORS.medBlack, left: '41%', bottom: 25}}>
            contact@dscode...com
          </Text>
          <Text style={{color: COLORS.lgrey, marginLeft: 5}}>
            enter 5 digit code that mentioned in the email
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
            navigation.navigate('AddtoCart');
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
          <Text style={{color: COLORS.lgrey, margin: 10}}>
            Haven’t got the email yet?
          </Text>
          <Text style={{color: COLORS.blue, marginTop: 10}}>Resend email</Text>
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
  },
});
export default OtpForMail;
