import React from 'react';
import {View, Image, Text, TouchableOpacity} from 'react-native';
import {Icon} from 'react-native-elements';
import {theme} from '../constants/theme';

export const Header = ({type = 'first', onPress, navigation, send}) => {
  return type === 'first' ? (
    <View
      style={{
        width: '100%',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderColor: 'white',
        height: 50,
        justifyContent: 'center',
      }}>
      <Image
        style={{height: 35}}
        resizeMode={'contain'}
        source={require('../../assets/images/headerLogo.png')}
      />
    </View>
  ) : (
    <View
      style={{
        width: '100%',
        alignItems: 'center',
        borderBottomWidth: 1,
        paddingBottom: 10,
        borderColor: 'white',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 15,
        height: 50,
      }}>
      <Icon
        name="chevron-left"
        type="entypo"
        color={'white'}
        onPress={() => {
          navigation.goBack();
        }}
        size={30}
      />
      <Image
        style={{height: 30}}
        resizeMode={'contain'}
        source={require('../../assets/images/headText.png')}
      />
      {type !== 'first' && type !== '3rd' ? (
        <Icon
          name="chevron-left"
          type="entypo"
          color={'transparent'}
          onPress={() => {
            navigation.goBack();
          }}
          size={30}
        />
      ) : (
        <TouchableOpacity
          style={{
            alignItems: 'center',
            flexDirection: 'row',
            justifyContent: 'flex-end',
            alignSelf: 'flex-end',
            backgroundColor: 'white',
            padding: 5,
            borderRadius: 10,
          }}
          onPress={() => {
            navigation.navigate('EditRat', {
              item: send,
            });
          }}>
          <Icon
            name="edit"
            type="feather"
            color={theme.color.primary}
            size={20}
          />
        </TouchableOpacity>
      )}
    </View>
  );
};
