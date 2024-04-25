import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {COLORS} from '../Constants/Color';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useNavigation} from '@react-navigation/native';
import RBSheet from 'react-native-raw-bottom-sheet';
import {Checkbox} from 'react-native-paper';

const TermsAndConditions = () => {
  const navigation = useNavigation();
  const refRBSheet = useRef();
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    refRBSheet.current.open();
  }, []);
  const handlePress = () => {
    if (checked) {
      navigation.navigate('DateTime');
      refRBSheet.current.close();
    } else {
      // Show a message or handle the case when terms are not accepted
    }
  };

  return (
    <View>
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
          Select Service
        </Text>
      </View>
      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <Text
          style={{
            color: COLORS.blue,
            fontSize: 18,
            marginLeft: 15,
            bottom: 5,
            fontWeight: 'bold',
            marginTop: '5%',
          }}>
          Add Another Vehicle
        </Text>
        <AntDesign
          name="pluscircle"
          style={{marginRight: 15, marginTop: '5%'}}
          size={20}
          color={COLORS.blue}
        />
      </View>
      <TouchableOpacity
        style={{
          backgroundColor: COLORS.blue,
          padding: '8%',
          borderRadius: 8,
          marginHorizontal: '3%',
          marginTop: '4%',
          flexDirection: 'row',
        }}
        onPress={() => {}}>
        <View
          style={{
            backgroundColor: COLORS.white,
            width: '7%',
            height: '25%',
            borderRadius: 20,
            flexWrap: 'wrap',
            top: '40%',
            position: 'absolute',
            left: '100%',
          }}>
          <MaterialCommunityIcons
            name="delete"
            size={18}
            color={COLORS.blue}
            style={{alignSelf: 'center', marginLeft: '9%'}}
          />
        </View>
        <Image
          source={require('../assets/serviceImage.png')}
          style={{width: 80, height: 80, right: '30%'}}
        />
        <View>
          <Text
            style={{
              color: COLORS.white,
              fontSize: 18,
              bottom: 5,
              marginTop: 4,
            }}>
            Tata Altroz
          </Text>
          <Text
            style={{
              color: COLORS.white,
              fontSize: 12,
              bottom: 5,
              marginTop: 4,
            }}>
            Hybrid Ceramic and interior with underbody
          </Text>
          <Text style={{color: COLORS.white, marginTop: 4}}>₹549</Text>
        </View>
      </TouchableOpacity>
      <RBSheet
        ref={refRBSheet}
        closeOnDragDown={true}
        closeOnPressMask={true}
        height={400}
        customStyles={{
          container: {
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            paddingHorizontal: 20,
          },
        }}>
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          <Image
            source={require('../assets/logo.png')}
            style={{width: 120, height: 50, bottom: 60}}
          />
          <Text
            style={{
              fontSize: 22,
              fontWeight: 'bold',
              color: COLORS.blue,
              bottom: 50,
            }}>
            Terms of Service
          </Text>
          <View style={{bottom: '6%'}}>
            <Text
              style={{
                fontSize: 13,
              }}>{`\u2022 ${'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'}`}</Text>
            <Text
              style={{
                fontSize: 13,
              }}>{`\u2022 ${'Vivamus ultricies metus sed mi placerat semper.'}`}</Text>
            <Text
              style={{
                fontSize: 13,
              }}>{`\u2022 ${'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'}`}</Text>
            <Text
              style={{
                fontSize: 13,
              }}>{`\u2022 ${'Vivamus ultricies metus sed mi placerat semper.'}`}</Text>
            <View style={{flexDirection: 'row', marginTop: 20, right: 7}}>
              <Checkbox
                status={checked ? 'checked' : 'unchecked'}
                onPress={() => setChecked(!checked)}
                color={COLORS.blue}
              />
              <Text style={{fontSize: 13, marginTop: 8}}>
                I accept the terms and conditions
              </Text>
            </View>
          </View>
          <TouchableOpacity
            style={{
              backgroundColor: !checked ? COLORS.medgrey : COLORS.blue,
              paddingVertical: 12,
              paddingHorizontal: 50,
              borderRadius: 25,
            }}
            onPress={() => handlePress()}>
            <Text style={styles.TermsandConditionsText}>Agree & Proceed</Text>
          </TouchableOpacity>
        </View>
      </RBSheet>
    </View>
  );
};

export default TermsAndConditions;

const styles = StyleSheet.create({
  TermsAndConditionsButton: {
    backgroundColor: COLORS.blue,
    paddingVertical: 12,
    paddingHorizontal: 50,
    borderRadius: 25,
  },
  TermsandConditionsText: {
    color: COLORS.white,
    fontSize: 18,
    fontWeight: 'bold',
  },
});
