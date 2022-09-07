import React from 'react';
import {StyleSheet, Dimensions} from 'react-native';

const {width, height} = Dimensions.get('screen');
const styles = StyleSheet.create({
  tabCont: {
    justifyContent: 'center',
    alignItems: 'center',
    margin: 15,
  },
  iconCont: {
    width: width / 4,
    height: width / 4,
    borderWidth: 3,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    borderColor: 'white',
  },
});

export default styles;
