import 'react-native-gesture-handler';
import React, {useEffect, useState} from 'react';
import {
  Platform,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import AuthRoute from './src/routes/AuthRoute';
import {FormattedProvider, GlobalizeProvider} from 'react-native-globalize';
// import VersionCheck from 'react-native-version-check';
import metadata from './src/locales';
import {COLORS} from './src/Constants/Color';
import {getUserProfileInfo} from './src/Constants/AsyncStorageHelper';
// import crashlytics from '@react-native-firebase/crashlytics';
import {setuser} from './src/Redux/reducer/User';
import {useDispatch} from 'react-redux';

const AppStatusBar = ({backgroundColor, ...props}) => {
  if (Platform.OS == 'ios') {
    return (
      <View style={[styles.statusBar, backgroundColor]}>
        <StatusBar backgroundColor={backgroundColor} {...props} />
      </View>
    );
  } else {
    return <StatusBar backgroundColor={backgroundColor} {...props} />;
  }
};

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';
  const dispatch = useDispatch();

  const [locale, setLocale] = useState();

  const setUpLocale = async () => {
    const locale = await metadata.locale();
    setLocale(locale);
  };
  const checkUser = async () => {
    let account = await getUserProfileInfo();
    //  console.log(account);
    if (account) {
      console.log('account', account);
      // console.log("account");
      dispatch(setuser(account));
    } else {
      // console.log("no no");
    }
  };

  // const checkVersion = async () => {
  //   const update = await VersionCheck.needUpdate();
  //   console.log('updates', update)
  //   try {
  //     if (update.isNeeded) {
  //       Alert.alert(
  //         'Update Available',
  //         'A new version of the app is available. Please update to continue using the app.',
  //         [
  //           {
  //             text: 'Update Now',
  //             onPress: () => {
  //               // Open Play Store for the user to update the app
  //               Linking.openURL(update.storeUrl);
  //             },
  //           },
  //         ],
  //         { cancelable: false }
  //       );
  //     }
  //   }
  //   catch (error) {
  //     console.error('Error checking for updates:', error);
  //   }
  // }
  // useEffect(() => {
  //   checkVersion()
  // }, [])
  useEffect(() => {
    checkUser();
    // crashlytics().log('App started');
    setUpLocale();
  }, []);

  // useEffect(() => {
  //   const unsubscribe = NetInfo.addEventListener(state => {
  //     setIsConnected(state.isConnected);
  //   });

  //   // Clean up the subscription when the component unmounts
  //   return () => unsubscribe();
  // }, []);

  return (
    <>
      <SafeAreaView style={styles.topSafeArea} />
      <SafeAreaView style={[{flex: 1}, {...styles.bottomSafeArea}]}>
        <AppStatusBar backgroundColor={COLORS.blue} barStyle="light-content" />
        <FormattedProvider
          locale={locale}
          currency={metadata.currency()}
          messages={metadata.messages()}
          skeleton={metadata.dateformat}>
          <GlobalizeProvider locale={locale} currency={metadata.currency()}>
            {/* <View style={{flex:1}}>
                {!isConnected && <NoInternet visible={!isConnected} /> } */}
            <AuthRoute />
            {/* </View> */}
          </GlobalizeProvider>
        </FormattedProvider>
      </SafeAreaView>
    </>
  );
};

const BAR_HEIGHT = StatusBar.currentHeight;
const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  topSafeArea: {
    flex: 0,
    backgroundColor: '#000000',
  },
  bottomSafeArea: {
    flex: 1,
    backgroundColor: 'white',
  },
  statusBar: {
    height: BAR_HEIGHT,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
