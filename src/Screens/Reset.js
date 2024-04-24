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

const Reset = withGlobalize(
  memo(props => {
    const [loading, setLoading] = useState(false);
    const intl = IntlProvider(props);
    const navigation = useNavigation();

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
              right:8,
            }}>
            <TouchableOpacity
              onPress={() => {
                navigation.goBack();
              }}>
              <AntDesign
                name="left"
                size={15}
                style={{
                  margin: 10,
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
            Password Reset
          </Text>
          <Text style={{color: COLORS.lgrey, margin: 5}}>
          Your password has been successfully reset. click confirm to set a new password
          </Text>
        
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
            navigation.navigate('Profile');
          }}>
          <Text style={{alignSelf: 'center',textAlign:'center',color: COLORS.white}}>
            confirm{' '}
          </Text>
        </TouchableOpacity>
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
export default Reset;
