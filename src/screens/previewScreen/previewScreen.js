import {Icon} from '@rneui/base';
import React, {useEffect, useRef, useState} from 'react';
import {
  Dimensions,
  FlatList,
  Image,
  ImageBackground,
  Platform,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {Header} from '../../assets/components/header';
import {theme} from '../../assets/constants/theme';
import styles from './syles';
import Modal from 'react-native-modal';
import ImageSlider from 'react-native-image-slider';
import Video from 'react-native-video';
import VideoPlayer from 'react-native-video-controls';
import {useDispatch} from 'react-redux';
import {selectImage} from '../../redux/actions/home';
const {width, height} = Dimensions.get('window');
const PreviewScreen = ({navigation, route}) => {
  const {item} = route.params;
  const [repeat, setRepeat] = useState(false);
  const [fullScreen, setFullScreen] = useState(true);
  const [end, setEnd] = useState(false);
  const [modal, setModal] = useState(false);
  const [paused, setPaused] = useState(false);
  const [path, setPath] = useState(item.gallery);
  const [preview, setPreview] = useState('');

  const dispatch = useDispatch();
  useEffect(() => {
    getUrls();
    dispatch(selectImage(item.image));
  }, []);
  const getUrls = () => {
    const paths = item.image.map(item => {
      return Platform.OS === 'ios' ? item.sourceURL : item.path;
    });
    console.log(paths);
    setPath(paths);
  };
  console.log(preview);
  const videoRef = useRef();
  const renderItem = ({item, index}) => {
    return (
      <TouchableOpacity
        style={styles.iconCont}
        onPress={() => {
          setModal(true);
          setPreview(index);
        }}>
        {item.includes('MP4') || item.includes('mp4') ? (
          <Video
            style={{width: '100%', height: '100%', borderRadius: 20}}
            source={{uri: item}} // Can be a URL or a local file.
            ref={videoRef}
            muted={true}
            paused={true}
            // Store reference
            //onBuffer={this.onBuffer} // Callback when remote video is buffering
            //  onError={this.videoError} // Callback when video cannot be loaded
            // style={styles.backgroundVideo}
          />
        ) : (
          <Image
            style={{width: '100%', height: '100%', borderRadius: 20}}
            source={
              path.length === 0
                ? require('../../assets/images/image.png')
                : {
                    uri: item,
                  }
            }
          />
        )}
      </TouchableOpacity>
    );
  };
  console.log(path);
  const renderPreview = ({item}) => {
    return item.includes('.MP4') || item.includes('.mp4') ? (
      <View
        style={{
          width: width / 1.1,
          height: 400,
          backgroundColor: 'white',
        }}>
        <VideoPlayer
          controls={true}
          disableBack={true}
          fullscreenOrientation={'landscape'}
          fullscreenAutorotate={true}
          fullscreen={fullScreen}
          source={{uri: item}} // Can be a URL or a local file.
          style={{
            width: '100%',
            height: fullScreen ? height / 1.2 : 400,
            backgroundColor: 'white',
          }}
          // Store reference
          //onBuffer={this.onBuffer} // Callback when remote video is buffering
          //  onError={this.videoError} // Callback when video cannot be loaded
          // style={styles.backgroundVideo}
        />
        {/* <View
                  style={{
                    backgroundColor: theme.color.primary,
                    height: 35,
                    width: '10%',
                    alignSelf: 'center',
                    borderRadius: 50,
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginVertical: 4,
                  }}>
                  {!end ? (
                    <Icon
                      name={!paused ? 'pause' : 'controller-play'}
                      type={!paused ? 'ant-design' : 'entypo'}
                      color={'white'}
                      onPress={() => {
                        setPaused(!paused);
                      }}
                    />
                  ) : (
                    <Icon
                      name="refresh"
                      type="foundation"
                      color={'white'}
                      onPress={() => {
                        setRepeat(true);
                        setEnd(false);
                      }}
                    />
                  )}
                </View> */}
      </View>
    ) : (
      // <Text style={{backgroundColor: 'red', height: 30}}>jkhjk</Text>
      <Image
        style={{width: width / 1.1, height: 400, backgroundColor: '#E4E4E4'}}
        resizeMode={'contain'}
        defaultSource={require('../../assets/images/loading...png')}
        source={{
          uri: item,
        }}
      />
    );
  };

  // const previewRender = () => {
  //   return modal ? (

  //   ) : (
  //     <View />
  //   );
  // };
  return (
    <View style={styles.main}>
      <Header type="3rd" navigation={navigation} send={item} />
      <ImageBackground
        resizeMode="cover"
        defaultSource={require('../../assets/images/loading_bar.png')}
        style={styles.imageBg}
        source={{
          uri:
            Platform.OS === 'ios'
              ? item?.image[item.main].sourceURL
              : item?.image[item.main].path,
        }}>
        <Text style={styles.ratName}>{item.name}</Text>
      </ImageBackground>
      {/* <View style={{height: 250}}>
        <ImageSlider images={path} style={{}} />
      </View> */}
      <ScrollView>
        <View style={styles.topTabsCont}>
          <View style={styles.topTabs}>
            <Text style={{fontWeight: 'bold', color: 'black'}}>Gender</Text>
            <Icon
              name={item.gender === 'male' ? 'male-symbol' : 'female-symbol'}
              type="foundation"
              color={theme.color.primary}
            />
          </View>
          <View style={styles.topTabs}>
            <Text style={{fontWeight: 'bold', color: 'black'}}>Color</Text>
            <Icon
              name="circle"
              type="font-awesome"
              color={
                (item.color === 'Albino' ? 'white' : item.color) ||
                theme.color.primary
              }
            />
          </View>
        </View>

        <View style={styles.bottomTabs}>
          <Text style={{fontWeight: 'bold', color: 'black'}}>Type</Text>
          <Text style={{color: 'black'}}>{item.breed}</Text>
        </View>
        <View style={styles.bottomTabs}>
          <Text style={{fontWeight: 'bold', color: 'black'}}>
            Date Joined my mischief
          </Text>
          <Text style={{color: 'black'}}>{item.dateJoined}</Text>
        </View>
        <View style={styles.bottomTabs}>
          <Text style={{fontWeight: 'bold', color: 'black'}}>
            Date of birth
          </Text>
          <Text style={{color: 'black'}}>{item.dob}</Text>
        </View>
        <View style={styles.bottomTabs}>
          <Text style={{fontWeight: 'bold', color: 'black'}}>
            Medical History
          </Text>
          <Text style={{color: 'black'}}>{item.medicalHistory}</Text>
        </View>
        <View style={styles.bottomTabs}>
          <Text style={{fontWeight: 'bold', color: 'black'}}>
            Vet Appointment
          </Text>
          <Text style={{color: 'black'}}>{item.showvetAppoint}</Text>
        </View>
        <View style={styles.bottomTabs}>
          <Text style={{fontWeight: 'bold', color: 'black'}}>
            Medication Reminder
          </Text>
          <Text style={{color: 'black'}}>{item.showreminder}</Text>
        </View>
        <View style={{width: '95%', alignSelf: 'center', marginTop: 20}}>
          <Text style={{fontSize: 30, color: 'white'}}>
            {item.name}'s Gallery
          </Text>

          <View style={styles.addCont}>
            <FlatList
              style={{height: 100}}
              renderItem={renderItem}
              data={path}
              horizontal={true}
              keyExtractor={(index, item) => index}
            />
          </View>
        </View>

        <View style={{height: 20}}></View>
      </ScrollView>
      {modal && (
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            width: width / 1.1,
            alignSelf: 'center',
            position: 'absolute',
            top: 150,
          }}>
          <View
            style={{
              width: '100%',
              flexDirection: 'row',
              justifyContent: 'space-between',
              backgroundColor: 'white',
              paddingHorizontal: 20,
              paddingVertical: 15,
              borderBottomWidth: 1,
              borderTopLeftRadius: 20,
              borderTopRightRadius: 20,
            }}>
            <Icon
              onPress={() => {
                setModal(false);
              }}
              name={'close'}
            />
          </View>
          <FlatList
            style={{backgroundColor: 'green', height: 400, width: '100%'}}
            horizontal={true}
            initialScrollIndex={preview}
            data={path}
            renderItem={renderPreview}
          />
        </View>
      )}
    </View>
  );
};

export default PreviewScreen;
