import React, {useEffect, useState} from 'react';
import {StyleSheet, View, Image, Text} from 'react-native';
import * as Animatable from 'react-native-animatable';

export const Loading = ({visible}) => {
  const [set, set1] = useState(false);
  return (
    <View style={visible ? loader.centering : loader.hideIndicator}>
      <Animatable.View
        style={{
          width: '100%',
          alignItems: 'center',
          flexDirection: 'row',
          justifyContent: 'center',
        }}>
        <Animatable.Image
          style={{width: 80, height: 140}}
          resizeMode={'contain'}
          animation={'shake'}
          iterationCount={2}
          source={require('./../images/loading.png')}
        />
      </Animatable.View>
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
