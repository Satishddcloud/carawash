import AsyncStorage from '@react-native-community/async-storage';

const LANGUAGE_PREF = 'language_pref';
const USER_ID = 'userId';
const LOGIN_DATA = 'loginData';
const JWT_TOKEN = 'jwtToken';
const MOBILE_NUMBER = 'mobile_number';
const CAR_DATA = 'CarData';
const LOCATION_DATA = 'location_data'

export const saveLanguagePref = async language => {
  await AsyncStorage.setItem(LANGUAGE_PREF, language);
};

export const getLanguagePref = async () => {
  const language = await AsyncStorage.getItem(LANGUAGE_PREF);
  if (language) {
    return language;
  } else {
    return 'en';
  }
};

export const saveUserProfileInfo = async userInfo => {
  await AsyncStorage.setItem(LOGIN_DATA, JSON.stringify(userInfo));
};

export const getUserProfileInfo = async () => {
  const userProfileInfo = await AsyncStorage.getItem(LOGIN_DATA);
  return JSON.parse(userProfileInfo);
};

export const saveUserId = async userId => {
  await AsyncStorage.setItem(USER_ID, userId ? `${userId}` : '');
};
export const getUserId = async () => {
  return await AsyncStorage.getItem(USER_ID);
};
export const getJwtToken = async () => {
  return await AsyncStorage.getItem(JWT_TOKEN);
};

export const setJwtToken = async jwtToken => {
  await AsyncStorage.setItem(JWT_TOKEN, `${jwtToken}`);
};
export const saveMobileNumber = async mobile_number => {
  await AsyncStorage.setItem(MOBILE_NUMBER, mobile_number);
};
export const getMobileNumber = async () => {
  return await AsyncStorage.getItem(MOBILE_NUMBER);
};
export const saveCarData = async carInfo => {
  await AsyncStorage.setItem(CAR_DATA, JSON.stringify(carInfo));
};
export const getCarData = async () => {
  const userCarInfo = await AsyncStorage.getItem(CAR_DATA);
  return JSON.parse(userCarInfo);
};
export const saveLocationData = async locationInfo => {
  await AsyncStorage.setItem(LOCATION_DATA, JSON.stringify(locationInfo));
};
export const getLocationData = async () => {
  const userLocationInfo = await AsyncStorage.getItem(LOCATION_DATA);
  return JSON.parse(userLocationInfo);
};

