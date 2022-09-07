import React, {useEffect} from 'react';
import {SafeAreaView, View, Text, Image} from 'react-native';
import {useDispatch} from 'react-redux';
import {theme} from '../../assets/constants/theme';
import {homeScreenData} from '../../redux/actions/home';
import mobileAds from 'react-native-google-mobile-ads';

const Splash = ({navigation}) => {
  const dispatch = useDispatch();
  useEffect(() => {
    setTimeout(() => {
      mobileAds()
        .initialize()
        .then(adapterStatuses => {
          // Initialization complete!
          console.log('adapterStatuses');
          console.log(adapterStatuses);
          navigation.replace('Home');
        });
    }, 2000);
  }, []);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: theme.color.primary,
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <Image
        resizeMode="contain"
        source={require('../../assets/images/logo.png')}
        style={{width: '90%', width: 300}}></Image>
    </View>
  );
};

export default Splash;
