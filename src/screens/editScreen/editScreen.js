import {Icon} from '@rneui/base';
import React, {useEffect, useRef, useState} from 'react';
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
import {
  deleteRat,
  editRat,
  homeLoad,
  homeScreenData,
  selectImage,
} from '../../redux/actions/home';
import Video from 'react-native-video';
import {Loading} from '../../assets/components/Loading';
import Notification from '../../assets/components/notification';
import NotificationIos from '../../assets/components/notificationIos';

const EditRat = ({navigation, route}) => {
  const {item} = route.params;
  const [name, setName] = useState(item.name);
  const [dob, setDob] = useState(item.dob);
  const [dateJoined, setDateJoined] = useState(item.dateJoined);
  const [gender, setGender] = useState(item.gender);
  const [breed, setBreed] = useState(item.breed);
  const [color, setColor] = useState(item.color);
  const [image, setImage] = useState(item.image);
  const [datetype, setDatType] = useState('');
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [modal, setModal] = useState(false);
  const [medicalHistory, setMedicalHistory] = useState(item.medicalHistory);
  const [vetAppoint, setVetAppoint] = useState(item.vetAppoint);
  const [showvetAppoint, setShowVetAppoint] = useState(item.showvetAppoint);
  const [reminder, setReminder] = useState(item.reminder);
  const [showreminder, setShowReminder] = useState(item.showreminder);
  const [main, setMain] = useState(item.main);
  const [mainImage, setMainImage] = useState(item.mainImage);
  const [mode, setMode] = useState('date');

  const toast = useToast();
  console.log(item);
  useEffect(() => {
    Notification.getNotification();
    dispatch(selectImage(item.image));
    dispatch(homeLoad(false));
  }, []);

  const openGallery = () => {
    ImagePicker.openPicker({
      multiple: true,
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
  const videoRef = useRef();

  const {homeData, selectedImage, homeLoading} = useSelector(
    state => state.home,
  );
  const handleNav = () => {
    if (
      name === '' ||
      // dob === '' ||
      // dateJoined === '' ||
      gender === '' ||
      breed === '' ||
      color === '' ||
      image === ''
    ) {
      toast.show('Please fill all fields.', {
        animationType: 'zoom-in',
        type: 'danger',
      });
    } else if (selectedImage.length > 7) {
      toast.show('You can upload only 7 Images.', {
        animationType: 'zoom-in',
        type: 'danger',
      });
    } else {
      const arr = homeData.map(val => {
        if (val.key !== item.key) {
          return val;
        } else {
          return {
            ...val,
            key: Math.random(),
            name: name,
            dob: dob,
            dateJoined: dateJoined,
            gender: gender,
            breed: breed,
            color: color,
            image: image,
            medicalHistory: medicalHistory,
            mainImage: mainImage,
            main: main,
            vetAppoint: vetAppoint,
            reminder: reminder,
            showvetAppoint: showvetAppoint,
            showreminder: showreminder,
            reminderId: item.reminderId,
            AppointmentId: item.AppointmentId,
          };
        }
      });
      dispatch(homeLoad(true));

      dispatch(homeScreenData(arr));
      // var formdata = new FormData();
      // formdata.append('__api_key__', 'no key');
      // formdata.append('rat_uid', item.uid);
      // formdata.append('name', name);
      // formdata.append('date_of_birth', dob);
      // formdata.append('date_joined', dateJoined);
      // formdata.append('gender', gender);
      // formdata.append('breed', breed);
      // formdata.append('color', color);
      // formdata.append('medical_history', medicalHistory);
      // // formdata.append('gallery[]', fileInput.files[0], 'Image 1.png');

      // for (var i = 0; i < selectedImage.length; i++) {
      //   const photo = selectedImage[i];
      //   const type = photo.includes('mp4')
      //     ? `video/${photo
      //         .substring(photo.lastIndexOf('/') + 1)
      //         .split('.')
      //         .pop()}`
      //     : `image/${photo
      //         .substring(photo.lastIndexOf('/') + 1)
      //         .split('.')
      //         .pop()}`;

      //   formdata.append('gallery[]', {
      //     name:
      //       Platform.OS === 'ios'
      //         ? photo.substring(photo.lastIndexOf('/') + 1)
      //         : photo.substring(photo.lastIndexOf('/') + 1),
      //     type: type,
      //     uri: Platform.OS === 'ios' ? photo.replace('file://', '') : photo,
      //   });
      // }
      // console.log(formdata);
      // dispatch(editRat(formdata, success, error));
      setNotification(
        'Medication Reminder',
        `Medication reminder for ${name}`,
        new Date(reminder),
        item.reminderId,
      );
      setNotification(
        'Vet Appointment',
        `You have Vet Appointment for ${name}`,
        new Date(vetAppoint),
        item.AppointmentId,
      );
    }
  };
  const success = val => {
    console.log(val);
    navigation.navigate('Home');
  };
  const error = val => {
    console.log(val);
  };
  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };
  const handleDelete = () => {
    dispatch(homeLoad(true));
    // var formdata = new FormData();
    // formdata.append('__api_key__', 'no key');
    // formdata.append('rat_uid', item.uid);
    // dispatch(deleteRat(formdata, successDel, errorDel));
    let arr = homeData.filter((ite, index) => item.key !== ite.key);
    dispatch(homeScreenData(arr));
    Notification.delNotification(item.reminderId);
    Notification.delNotification(item.AppointmentId);
    navigation.navigate('Home');
  };

  const setNotification = (title, message, date, id) => {
    console.log('..........');
    dispatch(homeLoad(false));
    console.log(date);
    Platform.OS === 'ios'
      ? NotificationIos.schduleNotification(title, message, date, id)
      : Notification.schduleNotification(title, message, date, id);
    navigation.navigate('Home');
  };

  const handleConfirm = date => {
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
  const successDel = val => {
    console.log(val);
    navigation.navigate('Home');
  };

  const errorDel = val => {
    console.log(val);
  };
  // const renderItem = item => {
  //   return (

  //   );
  // };
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
                value={name}
                placeholderTextColor={'#989898'}></TextInput>
            );
          }}
        />
        <Tab
          title="Date of birth"
          render={() => {
            return (
              <View style={styles.dob}>
                <Text style={{color: '#989898'}}>{dob}</Text>

                <Icon
                  name="calendar-alt"
                  type="font-awesome-5"
                  size={20}
                  color={'#989898'}
                  onPress={() => {
                    setDatType('dob');
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
                <Text style={{color: '#989898'}}> {dateJoined}</Text>

                <Icon
                  name="calendar-alt"
                  type="font-awesome-5"
                  size={20}
                  color={'#989898'}
                  onPress={() => {
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
                value={breed}
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
                value={color}
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
          <Text style={{fontSize: 30, color: 'white'}}>Gallery (Required)</Text>

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
            {selectedImage.map((item, indexx) => {
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
                        dispatch(selectImage(arr));
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
                        muted={true}
                        paused={true}
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
                          item === 0
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
              <Icon
                name="close"
                size={15}
                style={{
                  backgroundColor: 'transparent',
                  borderRadius: 100,
                  zIndex: 99,
                  alignSelf: 'flex-end',
                  marginRight: 13,
                }}
                color="transparent"
              />
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
              <Text style={{fontWeight: 'bold'}}>Medical History</Text>
              <Icon
                onPress={() => {
                  setModal(false);
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
              }}
              placeholder={'Enter the medical history'}
              multiline={true}
              underlineColorAndroid={'black'}
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
            justifyContent: 'space-between',
            marginBottom: 20,
          }}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              handleDelete();
            }}>
            <Text style={{color: 'black'}}>Delete</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button1}
            onPress={() => {
              handleNav();
            }}>
            <Text style={{color: 'black'}}>Update</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      <Loading visible={homeLoading} />
    </View>
  );
};
export default EditRat;
