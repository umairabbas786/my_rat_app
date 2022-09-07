import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {useDispatch, useSelector} from 'react-redux';
import Splash from '../screens/Splash/splash';
import Home from '../screens/home/home';
import AddRat from '../screens/addRat/addRat';
import PreviewScreen from '../screens/previewScreen/previewScreen';
import EditRat from '../screens/editScreen/editScreen';

const MainNav = () => {
  const Stack = createNativeStackNavigator();
  const dispatch = useDispatch();

  useEffect(() => {}, []);

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Splash"
        screenOptions={{headerShown: false}}>
        <Stack.Screen name="Splash" component={Splash} />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="AddRat" component={AddRat} />
        <Stack.Screen name="PreviewScreen" component={PreviewScreen} />
        <Stack.Screen name="EditRat" component={EditRat} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MainNav;
