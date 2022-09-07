import React from 'react';
import {StyleSheet} from 'react-native';
import {theme} from '../../assets/constants/theme';

const styles = StyleSheet.create({
  main: {flex: 1, backgroundColor: theme.color.primary},
  imageBg: {width: '100%', height: 250, justifyContent: 'flex-end'},
  ratName: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 35,
    marginBottom: 20,
    marginLeft: 20,
  },
  topTabsCont: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '90%',
    alignSelf: 'center',
    marginTop: 20,
  },
  topTabs: {
    width: 125,
    height: 100,
    backgroundColor: 'white',
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 20,
  },
  bottomTabs: {
    backgroundColor: 'white',
    width: '90%',
    alignSelf: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    height: 50,
    marginTop: 20,
    borderRadius: 10,
    flexDirection: 'row',
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
});
export default styles;
