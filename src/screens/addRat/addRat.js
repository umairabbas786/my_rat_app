import {Icon} from '@rneui/base';
import React, {useRef, useState} from 'react';
import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Platform,
  Modal,
  FlatList,
} from 'react-native';
import {Header} from '../../assets/components/header';
import {Tab} from '../../assets/components/tab';
import {theme} from '../../assets/constants/theme';
import ImagePicker from 'react-native-image-crop-picker';
import styles from './styles';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import {useToast} from 'react-native-toast-notifications';
import moment from 'moment';
import {useDispatch, useSelector} from 'react-redux';
import Video from 'react-native-video';
import {
  addRat,
  homeLoad,
  homeScreenData,
  selectImage,
} from '../../redux/actions/home';
import {Loading} from '../../assets/components/Loading';
import Notification from '../../assets/components/notification';
import NotificationIos from '../../assets/components/notificationIos';

const AddRat = ({navigation}) => {
  const [name, setName] = useState('');
  const [dob, setDob] = useState('Select Date');
  const [dateJoined, setDateJoined] = useState('Select Date');
  const [gender, setGender] = useState('male');
  const [breed, setBreed] = useState('');
  const [color, setColor] = useState('');
  const [medicalHistory, setMedicalHistory] = useState('Enter Medical History');
  const [vetAppoint, setVetAppoint] = useState('Select Date');
  const [showvetAppoint, setShowVetAppoint] = useState('Select Date');
  const [reminder, setReminder] = useState('Select Date');
  const [showreminder, setShowReminder] = useState('Select Date');
  const [image, setImage] = useState([]);
  const [datetype, setDatType] = useState('');
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [modal, setModal] = useState(false);

  const [main, setMain] = useState(0);
  const [mainImage, setMainImage] = useState('');
  const [mode, setMode] = useState('date');

  const toast = useToast();
  const videoRef = useRef();

  const openGallery = () => {
    ImagePicker.openPicker({
      multiple: true,
      mediaType: 'any',
    }).then(imag => {
      const arr = image;
      imag.map(item => {
        return arr.push(item);
      });
      setImage(arr);
      console.log(image);
      dispatch(selectImage(arr));
      setMainImage(image[0]);
    });
  };
  const dispatch = useDispatch();

  const {homeData, homeLoading} = useSelector(state => state.home);
  const handleNav = () => {
    const reminderId = homeData.length === 0 ? 1 : homeData.length * 2 + 1;
    const AppointmentId = homeData.length === 0 ? 2 : homeData.length * 2 + 2;

    if (
      name === '' ||
      // dob === 'Select Date' ||
      // dateJoined === 'Select Date' ||
      // showreminder === 'Select Date' ||
      // showvetAppoint === 'Select Date' ||
      gender === '' ||
      breed === '' ||
      color === '' ||
      image.length === 0
    ) {
      toast.show('Please fill all fields.', {
        animationType: 'zoom-in',
        type: 'danger',
      });
    } else {
      dispatch(homeLoad(true));
      console.log(image);
      const data = [
        ...homeData,
        {
          key: Math.random(),
          name: name,
          dob: dob === 'Select Date' ? 'None' : dob,
          dateJoined: dateJoined === 'Select Date' ? 'None' : dateJoined,
          gender: gender,
          breed: breed,
          color: color,
          image: image,
          medicalHistory:
            medicalHistory === 'Enter Medical History'
              ? 'No Medical History'
              : medicalHistory,
          mainImage: mainImage,
          main: main,
          vetAppoint: vetAppoint === 'Select Date' ? 'None' : vetAppoint,
          reminder: reminder === 'Select Date' ? 'None' : reminder,
          showvetAppoint:
            showvetAppoint === 'Select Date' ? 'None' : showvetAppoint,
          showreminder: showreminder === 'Select Date' ? 'None' : showreminder,
          reminderId: reminderId,
          AppointmentId: AppointmentId,
        },
      ];
      dispatch(homeScreenData(data));

      // var formdata = new FormData();
      // formdata.append('__api_key__', 'no key');
      // formdata.append('name', name);
      // formdata.append('date_of_birth', dob);
      // formdata.append('date_joined', dateJoined);
      // formdata.append('gender', gender);
      // formdata.append('breed', breed);
      // formdata.append('color', color);
      // formdata.append('medical_history', medicalHistory);
      // // formdata.append('gallery[]', fileInput.files[0], 'Image 1.png');

      // for (var i = 0; i < image.length; i++) {
      //   const photo = image[i];
      //   formdata.append('gallery[]', {
      //     name:
      //       Platform.OS === 'ios'
      //         ? photo.sourceURL.substring(photo.sourceURL.lastIndexOf('/') + 1)
      //         : photo.path.substring(photo.path.lastIndexOf('/') + 1),
      //     type: photo.mime,
      //     uri:
      //       Platform.OS === 'ios'
      //         ? photo.sourceURL.replace('file://', '')
      //         : photo.path,
      //   });
      // }
      // console.log(formdata);
      // dispatch(addRat(formdata, success, error));
      // dispatch(homeScreenData(data));
      reminder !== 'Select Date' &&
        setNotification(
          'Medication Reminder',
          `Medication reminder for ${name}`,
          reminder,
          reminderId.toString(),
        );
      vetAppoint !== 'Select Date' &&
        setNotification(
          'Vet Appointment',
          `You have Vet Appointment for ${name}`,
          vetAppoint,
          AppointmentId.toString(),
        );
    }
  };
  const success = val => {
    navigation.navigate('Home');
    console.log(val);
  };

  const error = val => {
    console.log(val);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = date => {
    console.log('date');
    console.log(date);
    datetype === 'dob'
      ? setDob(moment(date).format('DD-MM-YYYY'))
      : datetype === 'Vet'
      ? (setShowVetAppoint(moment(date).format('lll')), setVetAppoint(date))
      : datetype === 'reminder'
      ? (setShowReminder(moment(date).format('lll')), setReminder(date))
      : setDateJoined(moment(date).format('DD-MM-YYYY'));

    hideDatePicker();
  };

  const setNotification = (title, message, date, id) => {
    console.log('..........');
    console.log(date);
    Platform.OS === 'ios'
      ? NotificationIos.schduleNotification(title, message, date, id)
      : Notification.schduleNotification(title, message, date, id);
    navigation.navigate('Home');
  };

  const renderItem = ({item}) => {
    return (
      <TouchableOpacity
        style={styles.iconCont}
        onPress={() => {
          openGallery();
        }}>
        <Image
          style={{width: '100%', height: '100%', borderRadius: 20}}
          source={
            image === ''
              ? require('../../assets/images/image.png')
              : {
                  uri: Platform.OS === 'ios' ? item.sourceURL : item.path,
                }
          }
        />
      </TouchableOpacity>
    );
  };

  return (
    <View style={{flex: 1, backgroundColor: theme.color.primary}}>
      <ScrollView>
        <Header type="second" navigation={navigation} />
        <Tab
          title="Rat Name *"
          render={() => {
            return (
              <TextInput
                style={styles.textInput}
                placeholder="Enter Rat Name"
                onChangeText={val => {
                  setName(val);
                }}
                placeholderTextColor={'#989898'}></TextInput>
            );
          }}
        />
        <Tab
          title="Date of birth"
          render={() => {
            return (
              <View style={styles.dateJoined}>
                <Text style={{color: '#989898'}}>{dob}</Text>

                <Icon
                  name="calendar-alt"
                  type="font-awesome-5"
                  size={20}
                  color={'#989898'}
                  onPress={() => {
                    setDatType('dob');
                    setMode('date');
                    setDatePickerVisibility(true);
                  }}
                />
              </View>
            );
          }}
        />
        <Tab
          title="Date joined my mischief"
          render={() => {
            return (
              <View style={styles.dateJoined}>
                <Text style={{color: '#989898'}}>{dateJoined}</Text>

                <Icon
                  name="calendar-alt"
                  type="font-awesome-5"
                  size={20}
                  color={'#989898'}
                  onPress={() => {
                    setMode('date');
                    setDatType('joined');
                    setDatePickerVisibility(true);
                  }}
                />
              </View>
            );
          }}
        />
        <Tab
          title="Gender *"
          render={() => {
            return (
              <View style={styles.genderCont}>
                <TouchableOpacity
                  onPress={() => {
                    setGender('male');
                  }}
                  style={[
                    styles.buttonCont,
                    {
                      backgroundColor:
                        gender === 'male' ? theme.color.primary : 'white',
                    },
                  ]}>
                  <Icon
                    name="male-symbol"
                    type="foundation"
                    size={20}
                    color={gender !== 'male' ? theme.color.primary : 'white'}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    setGender('female');
                  }}
                  style={[
                    styles.buttonCont,
                    {
                      backgroundColor:
                        gender === 'female' ? theme.color.primary : 'white',
                    },
                  ]}>
                  <Icon
                    name="female-symbol"
                    type="foundation"
                    size={20}
                    color={gender === 'male' ? theme.color.primary : 'white'}
                  />
                </TouchableOpacity>
              </View>
            );
          }}
        />
        <Tab
          title="Type *"
          render={() => {
            return (
              <TextInput
                style={styles.textInput}
                placeholder="Fancy"
                placeholderTextColor={'#989898'}
                onChangeText={val => {
                  setBreed(val);
                }}
              />
            );
          }}
        />
        <Tab
          title="Color *"
          render={() => {
            return (
              <TextInput
                style={styles.textInput}
                placeholder="Albino"
                placeholderTextColor={'#989898'}
                onChangeText={val => {
                  setColor(val);
                }}
              />
            );
          }}
        />
        <Tab
          title="Medical History"
          render={() => {
            return (
              <View style={styles.schduleDateCont}>
                <Text
                  style={{color: '#989898', width: '90%'}}
                  numberOfLines={2}>
                  {medicalHistory}
                </Text>

                <Icon
                  name="edit"
                  type="ant-design"
                  size={20}
                  color={theme.color.primary}
                  onPress={() => {
                    setModal(true);
                  }}
                />
              </View>
            );
          }}
        />
        <Tab
          title="Vet Appointment"
          render={() => {
            return (
              <View style={styles.dateJoined}>
                <Text style={{color: '#989898', width: '90%'}}>
                  {showvetAppoint}
                </Text>

                <Icon
                  name="calendar-alt"
                  type="font-awesome-5"
                  size={20}
                  color={'#989898'}
                  onPress={() => {
                    setDatType('Vet');
                    setMode('datetime');
                    setDatePickerVisibility(true);
                  }}
                />
              </View>
            );
          }}
        />
        <Tab
          title="Medication Reminder"
          render={() => {
            return (
              <View style={styles.dateJoined}>
                <Text style={{color: '#989898', width: '90%'}}>
                  {showreminder}
                </Text>

                <Icon
                  name="calendar-alt"
                  type="font-awesome-5"
                  size={20}
                  color={'#989898'}
                  onPress={() => {
                    setDatType('reminder');
                    setMode('datetime');
                    setDatePickerVisibility(true);
                  }}
                />
              </View>
            );
          }}
        />
        <View style={{width: '95%', alignSelf: 'center', marginTop: 20}}>
          <Text style={{fontSize: 30, color: 'white'}}>
            Gallery <Text style={{fontSize: 12, bottom: 20}}>(Required)</Text>
          </Text>
          <ScrollView
            horizontal={true}
            contentContainerStyle={styles.addCont}
            showsHorizontalScrollIndicator={false}>
            {/* <FlatList
                style={{height: 100}}
                renderItem={renderItem}
                data={image}
                horizontal={true}
              /> */}
            {image.map((item, indexx) => {
              return (
                <View>
                  <View
                    style={{
                      justifyContent: 'space-between',
                      flexDirection: 'row',
                      width: 75,
                      alignSelf: 'center',
                      marginBottom: 4,
                    }}>
                    <Icon
                      name="close"
                      size={15}
                      style={{
                        backgroundColor: 'white',
                        borderRadius: 100,
                        zIndex: 99,
                        alignSelf: 'flex-end',
                        marginRight: 13,
                      }}
                      onPress={() => {
                        console.log(image);
                        // const del = image.remove(indexx);
                        let arr = image.filter(
                          (item, index) => indexx !== index,
                        );
                        setImage(arr);
                      }}
                    />
                    {main === indexx && (
                      <Text
                        style={{
                          backgroundColor: 'white',
                          paddingHorizontal: 5,
                          borderRadius: 50,
                          color: 'black',
                        }}>
                        Main
                      </Text>
                    )}
                  </View>
                  <TouchableOpacity
                    style={styles.iconCont}
                    onPress={() => {
                      setMain(indexx);
                      setMainImage(item);
                    }}>
                    {(
                      Platform.OS === 'ios'
                        ? item.sourceURL.includes('MP4')
                        : item.path.includes('mp4')
                    ) ? (
                      <Video
                        style={{
                          width: '100%',
                          height: '100%',
                          borderRadius: 20,
                        }}
                        source={{
                          uri:
                            Platform.OS === 'ios' ? item.sourceURL : item.path,
                        }} // Can be a URL or a local file.
                        ref={videoRef}
                        paused={true}
                        muted={true}
                        // Store reference
                        //onBuffer={this.onBuffer} // Callback when remote video is buffering
                        //  onError={this.videoError} // Callback when video cannot be loaded
                        // style={styles.backgroundVideo}
                      />
                    ) : (
                      <Image
                        style={{
                          width: '100%',
                          height: '100%',
                          borderRadius: 20,
                        }}
                        source={
                          (
                            Platform.OS === 'ios'
                              ? item.sourceURL === 0
                              : item.path === 0
                          )
                            ? require('../../assets/images/image.png')
                            : {
                                uri:
                                  Platform.OS === 'ios'
                                    ? item.sourceURL
                                    : item.path,
                              }
                        }
                      />
                    )}

                    {/* <Image
                      style={{width: '100%', height: '100%', borderRadius: 20}}
                      source={
                        image === ''
                          ? require('../../assets/images/image.png')
                          : {
                              uri:
                                Platform.OS === 'ios'
                                  ? item.sourceURL
                                  : item.path,
                            }
                      }
                    /> */}
                  </TouchableOpacity>
                </View>
              );
            })}
            <View style={styles.addCont}>
              <TouchableOpacity
                style={styles.iconCont}
                onPress={() => {
                  openGallery();
                }}>
                <Icon name="plus" type="entypo" size={45} color="white" />
              </TouchableOpacity>
              <Text style={{color: 'white', fontWeight: 'bold', marginTop: 5}}>
                Add Media
              </Text>
            </View>
          </ScrollView>
        </View>
        <DateTimePickerModal
          isVisible={isDatePickerVisible}
          mode={mode}
          onConfirm={handleConfirm}
          onCancel={hideDatePicker}
        />
        <Modal
          style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}
          transparent={true}
          visible={modal}>
          <View
            style={{
              backgroundColor: 'transparent',
              alignItems: 'center',
              justifyContent: 'center',
              width: '95%',
              height: '100%',
              alignSelf: 'center',
            }}>
            <View
              style={{
                width: '100%',
                backgroundColor: 'white',
                flexDirection: 'row',
                justifyContent: 'space-between',
                paddingHorizontal: 20,
                paddingVertical: 15,
                borderBottomWidth: 1,
                borderTopLeftRadius: 20,
                borderTopRightRadius: 20,
              }}>
              <Text style={{fontWeight: 'bold', color: 'black'}}>
                Medical History
              </Text>
              <Icon
                onPress={() => {
                  setModal(false);
                  console.log('hello');
                }}
                name={'close'}
              />
            </View>
            <TextInput
              style={{
                backgroundColor: 'white',
                borderBottomLeftRadius: 20,
                borderBottomRightRadius: 20,
                width: '100%',
                height: '80%',
                padding: 20,
                textAlignVertical: 'top',
                color: 'black',
              }}
              placeholder={'Enter the medical history'}
              multiline={true}
              // underlineColorAndroid={'black'}
              onChangeText={val => {
                setMedicalHistory(val);
              }}
              value={medicalHistory}
            />
          </View>
        </Modal>
        <View
          style={{
            width: '90%',
            alignSelf: 'center',
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom: 20,
            justifyContent: 'flex-end',
            marginVertical: 10,
          }}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              handleNav();
            }}>
            <Text style={{color: 'black'}}>Save</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      <Loading visible={homeLoading} />
    </View>
  );
};
export default AddRat;
