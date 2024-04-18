import React, { Component } from 'react';
import {
    View, Text, StyleSheet, TextInput,
} from 'react-native';

import RNPickerSelect from 'react-native-picker-select';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { Platform } from 'react-native';


const AppDropDown = (props) => {
    let { value, changeText, containerStyle, textFiledStyle, viewStyle,
        multiline, inputStyle, keyboardType, maxLength, inputContainerStyle, label,
        items, placeholder, error, disabled
    } = props;
    items = items.map((item, index) => {
        return {
            ...item,
            key: index + 1
        }
    })
    return (<>
        <View style={[{
            padding: 20,
            paddingVertical: 10,
        }, { ...containerStyle },]}>
            {label && <Text style={{
                fontSize:20,
                padding:5,
                color: 'black',
                fontWeight:'bold',
                marginVertical:4
            }}>{label}</Text>}

            <View style={[{ ...styles.viewStyle }, { ...viewStyle }]}>
                <RNPickerSelect
                    onValueChange={(value) => changeText(value)}
                    items={items}
                    style={{
                        inputIOS: {
                            fontSize: 18,
                            color: 'black',
                            margin:10,
                            alignItems: 'center'

                        },
                        inputAndroid: {
                            fontSize: 18,
                            color: 'black',
                            alignItems: 'center',
                            justifyContent: 'center'

                        },
                    }}
                    Icon={() => <Icon
                        //  name="sort-down"
                     color={'gray'} size={20}
                        style={{
                            marginTop: Platform.OS == "android" ? 10 : 0
                        }}
                    />}
                    //placeholder={placeholder}
                    placeholder={{ label: placeholder, value: placeholder }}
                    value={value}
                    disabled={disabled ? disabled : false}
                />
            </View>
        </View>
        {error && <Text style={{
            marginLeft:24,
            fontSize:18,
            color: 'red',
            alignSelf: 'flex-start',
            marginVertical: 6
        }}>* {error}</Text>}

    </>
    );
}

// 
const styles = StyleSheet.create({
    textFiledStyle: {
        height: '100%',
        //width: '100%',
        //padding: 10,
        paddingLeft: 20,
        paddingRight:10,
    },
    viewStyle: {
        height:44,
        // width: '100%',
        borderRadius: 22,
        backgroundColor: 'white',
        shadowColor: 'gray',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 1.84,
        elevation: 5,
    },
});


export default AppDropDown;
