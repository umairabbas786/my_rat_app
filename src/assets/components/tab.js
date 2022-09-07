import React from 'react';
import {View, Text, TextInput} from 'react-native';

export const Tab = ({render, title = 'Title'}) => {
  return (
    <View
      style={{
        height: 50,
        width: '95%',
        backgroundColor: 'white',
        alignSelf: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 20,
      }}>
      <View style={{width: '55%', justifyContent: 'center'}}>
        <Text style={{fontWeight: 'bold', marginLeft: 20, color: 'black'}}>
          {title}
        </Text>
      </View>
      <View
        style={{width: '45%', justifyContent: 'center', alignItems: 'center'}}>
        {render()}
      </View>
    </View>
  );
};
