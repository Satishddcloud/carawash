import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react';
import { COLORS } from '../Constants/Color';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation, useRoute } from '@react-navigation/native';
import DateTimePicker from '@react-native-community/datetimepicker';
import DatePicker from 'react-native-date-picker'

const DateTime = () => {
  const route = useRoute();
  const {services}= route.params
  const navigation = useNavigation();
  const [date, setDate] = useState(new Date());
  const [time,setTime]=useState(new Date())
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [open, setOpen] = useState(false)

  const onChangeDate = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowDatePicker(Platform.OS === 'ios');
    setDate(currentDate);
  };

  const onChangeTime = (event, selectedTime) => {
    const currentTime = selectedTime || time;
    setShowTimePicker(Platform.OS === 'ios');
    setTime(currentTime)
    // Handle time change as needed
  };

  const currentFloatTime =time && time.toLocaleTimeString().substring(0, 2);
  console.log(currentFloatTime)

  const filteredData = services.filter(service => {
    return (currentFloatTime >= service.from_time && currentFloatTime <= service.to_time) || (currentFloatTime >= (service.plan && service.plan.from_time) && currentFloatTime <= (service.plan && service.plan.to_time));
  });

  console.log('filteredData',filteredData)

  return (
    <View style={{ flex: 1, backgroundColor: COLORS.white }}>
      <View style={{ flexDirection: 'row', marginTop: '5%', marginLeft: '5%' }}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <AntDesign name="arrowleft" size={20} style={{ fontWeight: 'bold' }} color={COLORS.blue} />
        </TouchableOpacity>
        <Text style={{ color: COLORS.blue, fontSize: 20, marginLeft: 15, bottom: 5, fontWeight: 'bold' }}>Select Date & Time</Text>
      </View>

      <View style={styles.container}>
        {/* <TouchableOpacity onPress={() => setOpen(true)} style={styles.button}>
          <Text style={styles.buttonText}>Select Date</Text>
        </TouchableOpacity> */}
        <Text style={{alignSelf:'center',fontSize:20}}>Select Date</Text>
        <Text style={styles.dateText}>Date: {date.toLocaleDateString()}</Text>
 
        {/* {showDatePicker && (
          <DateTimePicker
            testID="datePicker"
            value={date}
            mode="date"
            is24Hour={true}
            display="default"
            onChange={onChangeDate}
          />
        )} */}
        <DatePicker
        // modal
        mode='date'
        // open={open}
        date={date}
        onDateChange={(date) => {
          // setOpen(false)
          setDate(date)
        }}
        // onCancel={() => {
        //   setOpen(false)
        // }}
      />

        {/* <TouchableOpacity onPress={() => setShowTimePicker(true)} style={[styles.button, { marginTop: '5%' }]}>
          <Text style={styles.buttonText}>Select Time</Text>
        </TouchableOpacity> */}
        <Text style={{alignSelf:'center',fontSize:20}}>Select Time</Text>
        <Text style={styles.dateText}>Time: {time.toLocaleTimeString()}</Text>

        {/* {showTimePicker && (
          <DateTimePicker
            testID="timePicker"
            value={time}
            mode="time"
            is24Hour={true}
            display="default"
            onChange={onChangeTime}
          />
        )} */}

    <DatePicker
        // modal
        mode='time'
        // open={open}
        date={time}
        onDateChange={(time) => {
          // setOpen(false)
          setTime(time)
        }}
        // onCancel={() => {
        //   setOpen(false)
        // }}
        locale="en"
        is24hourSource="locale"
        // minuteInterval={1}
        // secondInterval={1}
      />

        <TouchableOpacity style={styles.proceedButton} onPress={()=>{
           if(filteredData.length > 0){
            navigation.navigate('Services',{avaliableServices:filteredData})
           }else{
            alert('This time services are not available')
           }

          }}>
          <Text style={styles.proceedButtonText}>Avaliable Services</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default DateTime;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
    alignItems: 'center',
  },
  button: {
    backgroundColor: COLORS.blue,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  buttonText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: 'bold',
  },
  dateText: {
    color: COLORS.blue,
    fontSize: 20,
    marginTop: 10,
  },
  proceedButton: {
    backgroundColor: COLORS.blue,
    marginTop: 'auto',
    marginBottom: 20,
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  proceedButtonText: {
    color: COLORS.white,
    fontSize: 18,
    fontWeight: 'bold',
  },
});
