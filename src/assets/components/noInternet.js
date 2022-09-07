import React, {useEffect, useState} from 'react';
import {StyleSheet, View, Image, Animated, Text} from 'react-native';
import Button from './button';
import {useDispatch} from 'react-redux';
import {connectionCheck} from '../../redux/actions/home';
import {isConnectedToInternet} from '../constants/constants';

export const NoInternet = ({visible}) => {
  const dispatch = useDispatch();
  return (
    <View style={visible ? loader.centering : loader.hideIndicator}>
      <Image
        style={{width: 80, height: 140}}
        resizeMode={'contain'}
        source={require('../images/signal.png')}
      />
      <Text
        style={{
          fontSize: 22,
          fontWeight: 'bold',
          color: 'balck',
        }}>
        No Connection
      </Text>
      <Text
        style={{
          fontSize: 16,
          fontWeight: '400',
          color: 'balck',
          textAlign: 'center',
          marginTop: 10,
        }}>
        You are not connected to internet,{'\n'} Make sure wifi is on, Airplane
        mode is off{'\n'} and try again
      </Text>
      <Button
        title={'Retry'}
        onPress={() => {
          const net = isConnectedToInternet();
          console.log('.............', net, '............');
          isConnectedToInternet().then(onResolved => {
            // Some task on success
            if (onResolved) {
              dispatch(connectionCheck(true));
            } else {
              dispatch(connectionCheck(false));
            }
          });
        }}
      />
    </View>
  );
};

const loader = StyleSheet.create({
  centering: {
    flex: 1,
    backgroundColor: 'white',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 10,
    alignItems: 'center',
    justifyContent: 'center',
    opacity: 0.99,
  },
  hideIndicator: {
    top: -100,
    opacity: 0,
    position: 'absolute',
  },
});
