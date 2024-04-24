import {View, Text, TextInput, TouchableOpacity, Image, ScrollView} from 'react-native';
import React, {useState, memo} from 'react';
import api from '../api';
import IntlProvider from '../Constants/IntlProvider';
import {withGlobalize} from 'react-native-globalize';
import Loader from '../Components/Loader';
import * as yup from 'yup';
import {Formik} from 'formik';
import {COLORS} from '../Constants/Color';
import {useNavigation} from '@react-navigation/native';
import AntDesign from 'react-native-vector-icons/AntDesign'

export const ResetFormInitialValues = props => ({
  // oldPassword: '',
  newPassword: '',
  confirmPassword: '',

});

export const ResetFormValidator = () => {
  return yup.object().shape({
    // oldPassword: yup.string().required('old password is Required'),
    newPassword: yup.string().required('new password Required'),
    confirmPassword: yup.string().required('confirm password Required'),
  });
};

const ResetPassword = withGlobalize(
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
            Set a new password
          </Text>
          <Text style={{color: COLORS.lgrey, margin: 5}}>
         create a new password. Ensure it differs from previous one for security
          </Text>
        
        </View>
        <ScrollView>
        <Formik
          initialValues={ResetFormInitialValues(props)}
          // validationSchema={ResetFormValidator}
          onSubmit={(values, {resetForm}) => {
            console.log(values);
            navigation.navigate('Login');
            // Register(values, resetForm());
          }}>
          {({
            values,
            handleChange,
            setFieldValue,
            errors,
            touched,
            setFieldTouched,
            isValid,
            handleSubmit,
          }) => (
            <>
              <View
                style={{
                  alignSelf: 'center',
                  flex: 1,
                  marginBottom:20,marginTop:20
                }}>

                   {/* <Text style={{color:COLORS.black,padding:10}}>Old Password</Text>
                    <TextInput
                      value={values.oldPassword}
                      placeholder="Enter old password"
                      onChangeText={text => {
                        setFieldValue('email', text);
                      }}
                      style={{borderRadius:10,borderWidth:1,borderColor:'#C1C1C1',margin:5,width:300}}
                    /> */}
                  <Text style={{color:COLORS.black,padding:10,fontWeight:'bold'}}> Password </Text>
                    <TextInput
                      value={values.newPassword}
                      placeholder="Enter new password"
                      onChangeText={text => {
                        setFieldValue('mobile', text);
                      }}
                      style={{borderRadius:10,borderWidth:1,borderColor:'#C1C1C1',margin:5,width:300}}
                    />
                   <Text style={{color:COLORS.black,padding:10,fontWeight:'bold'}}>Confirm Password</Text>
                    <TextInput
                      value={values.confirmPassword}
                      placeholder="Enter confirm password"
                      onChangeText={text => {
                        setFieldValue('password', text);
                      }}
                      style={{borderRadius:10,borderWidth:1,borderColor:'#C1C1C1',margin:5,width:300}}
                    />
                   
                  <TouchableOpacity
                    style={{
                      backgroundColor:COLORS.blue,
                      borderRadius: 30,
                      padding: 15,
                      width: 300,
                      alignSelf: 'center',
                      marginTop: 20,
                    }}
                    onPress={() => {
                      handleSubmit();
                    }}>
                    <Text style={{alignSelf: 'center', color: COLORS.white}}>
                      Update Passowrd
                    </Text>
                  </TouchableOpacity>
              </View>
            </>
          )}
        </Formik>
        </ScrollView>
      </View>
    );
  }),
);

export default ResetPassword;
