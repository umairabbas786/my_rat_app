import React from 'react';
import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  dob: {
    width: '85%',
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignSelf: 'flex-start',
  },
  dateJoined: {
    width: '85%',
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignSelf: 'flex-start',
    alignItems: 'center',
  },
  genderCont: {
    width: '85%',
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignSelf: 'flex-start',
  },
  buttonCont: {
    paddingHorizontal: 8,
    paddingVertical: 5,
    borderRadius: 5,
    shadowOffset: {width: 0, height: 2},
    shadowColor: '#000',
    shadowOpacity: 0.2,
  },
  textInput: {
    width: '90%',
    height: '100%',
    alignSelf: 'flex-start',
    color: 'black',
  },
  schduleDateCont: {
    width: '90%',
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignSelf: 'flex-start',
    alignItems: 'center',
  },
  addCont: {
    justifyContent: 'center',
    alignItems: 'center',
    margin: 15,
    alignSelf: 'flex-start',
    height: 120,
  },
  iconCont: {
    width: 80,
    height: 80,
    borderWidth: 3,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    borderColor: 'white',
    marginRight: 10,
  },
  button1: {
    height: 40,
    paddingHorizontal: 20,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    width: 120,
    borderRadius: 20,
  },
  button: {
    height: 40,
    paddingHorizontal: 20,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    width: 120,
    borderRadius: 20,
  },
});

export default styles;
