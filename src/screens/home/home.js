import {useFocusEffect} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  Image,
  FlatList,
  ScrollView,
  TouchableOpacity,
  Platform,
} from 'react-native';
import {Icon} from 'react-native-elements';
import {useDispatch, useSelector} from 'react-redux';
import {Header} from '../../assets/components/header';
import {Loading} from '../../assets/components/Loading';
import {theme} from '../../assets/constants/theme';
import {getData, homeLoad, homeScreenData} from '../../redux/actions/home';
import styles from './style';
import {
  AppOpenAd,
  useInterstitialAd,
  BannerAd,
  TestIds,
  BannerAdSize,
  InterstitialAd,
  AdEventType,
} from 'react-native-google-mobile-ads';
import NotificationIos from '../../assets/components/notificationIos';
import Notification from '../../assets/components/notification';
const adUnitId = __DEV__
  ? TestIds.INTERSTITIAL
  : 'ca-app-pub-5169010174450677/9945741118';

const adUnitIdd = __DEV__
  ? TestIds.BANNER
  : 'ca-app-pub-5169010174450677/7095112535';

const appOpenAd = AppOpenAd.createForAdRequest(adUnitId, {
  requestNonPersonalizedAdsOnly: true,
  keywords: ['fashion', 'clothing'],
});

const interstitial = InterstitialAd.createForAdRequest(adUnitId, {
  requestNonPersonalizedAdsOnly: true,
  keywords: ['fashion', 'clothing'],
});

const Home = ({navigation}) => {
  const {isLoaded, isClosed, load, show} = useInterstitialAd(
    TestIds.Interstitial,
    {
      requestNonPersonalizedAdsOnly: true,
    },
  );
  const {homeData, homeLoading} = useSelector(state => state.home);
  const [loaded, setLoaded] = useState(false);
  const [adLoad, setAdLoad] = useState(0);
  const [loadedInter, setLoadedInter] = useState(false);

  const dispatch = useDispatch();

  useFocusEffect(
    React.useCallback(() => {
      setLoaded(false);
      Platform.OS === 'ios'
        ? NotificationIos.getNotification()
        : Notification.getNotification();
      fetchRats();
      load();
      // Start loading the interstitial straight away
      appOpenAd.load();

      const unsubscribe = interstitial.addAdEventListener(
        AdEventType.LOADED,
        () => {
          setLoaded(true);
        },
        AdEventType.CLOSED,
        () => {
          setLoaded(false);
          setAdLoad(adLoad + 1);
        },
      );

      // Start loading the interstitial straight away
      interstitial.load();

      // Unsubscribe from events on unmount
      return unsubscribe;
      // Unsubscribe from events on unmount
    }, [load, isClosed, navigation]),
  );

  useEffect(() => {
    fetchRats();
    load();
  }, [load]);

  const fetchRats = () => {
    // AppOpenAd.createForAdRequest(TestIds.APP_OPEN);

    // InterstitialAd.createForAdRequest(TestIds.INTERSTITIAL);

    // RewardedAd.createForAdRequest(TestIds.REWARDED);

    dispatch(homeLoad(false));
    var formdata = new FormData();
    formdata.append('__api_key__', 'no key');

    // dispatch(getData(formdata, success, error));
  };
  const success = val => {
    console.log(val);
  };

  const error = val => {
    console.log(val);
  };
  // const adUnitId = __DEV__
  //   ? TestIds.INTERSTITIAL
  //   : 'ca-app-pub-5169010174450677~9210139982';

  // const interstitial = InterstitialAd.createForAdRequest(adUnitId, {
  //   requestNonPersonalizedAdsOnly: true,
  //   keywords: ['fashion', 'clothing'],
  // });
  console.log(loaded);
  console.log(adLoad);
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: theme.color.primary}}>
      <Header />

      <View
        style={{
          alignItems: 'center',
          position: 'absolute',
          bottom: 1,
          alignSelf: 'center',
          width: '100%',
        }}>
        <BannerAd
          unitId={adUnitIdd}
          size={BannerAdSize.FULL_BANNER}
          requestOptions={{
            requestNonPersonalizedAdsOnly: true,
          }}
        />
      </View>
      <ScrollView
        contentContainerStyle={{
          flexDirection: 'row',
          flexWrap: 'wrap',
        }}>
        {homeData?.map(item => {
          return (
            <TouchableOpacity
              style={styles.tabCont}
              onPress={() => {
                show();
                if (loaded === true && adLoad === 0) {
                  interstitial.show();
                  navigation.navigate('PreviewScreen', {
                    item: item,
                  });
                } else {
                  navigation.navigate('PreviewScreen', {
                    item: item,
                  });
                }
              }}>
              <View style={styles.iconCont}>
                <Image
                  style={{width: '100%', height: '100%', borderRadius: 20}}
                  source={
                    item
                      ? {
                          uri:
                            Platform.OS === 'ios'
                              ? item?.image[item.main].sourceURL
                              : item?.image[item.main].path,
                        }
                      : require('../../assets/images/2.png')
                  }
                  loadingIndicatorSource={require('../../assets/images/loading_bar.png')}
                  // defaultSource={require('../../assets/images/loading_bar.png')}
                />
              </View>
              <Text style={{color: 'white', fontWeight: 'bold', marginTop: 5}}>
                {item.name}
              </Text>
            </TouchableOpacity>
          );
        })}
        <View
          style={{justifyContent: 'center', alignItems: 'center', margin: 15}}>
          <TouchableOpacity
            style={styles.iconCont}
            onPress={() => {
              navigation.navigate('AddRat');
            }}>
            <Icon name="plus" type="entypo" size={45} color="white" />
          </TouchableOpacity>
          <Text style={{color: 'white', fontWeight: 'bold', marginTop: 5}}>
            RAT NAME
          </Text>
        </View>
      </ScrollView>
      <View style={{height: 50}}></View>
      <Loading visible={homeLoading} />
    </SafeAreaView>
  );
};

export default Home;
