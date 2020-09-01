import 'react-native-gesture-handler';
import * as React from 'react'
import {View} from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import Login from '../screens/Login'
import Home from '../screens/Home'
import Profile from '../screens/Profile';
import blue from '../utils/Constants'
const Stack = createStackNavigator();

const AppNavigator=() => {
  const defaultStack = () => {
    return (

      <Stack.Navigator
      initialRouteName='Login'
        screenOptions={{
          gestureEnabled: true,
          headerTintColor: 'white',
          headerStyle: { backgroundColor: blue },
          headerTitleStyle: {
            color: 'white'
        }
        }}>
        <Stack.Screen name={'Login'}
        options={{headerShown: false}}
        component={Login} />

        <Stack.Screen name={'Home'} component={Home}/>
        <Stack.Screen name={'Profile'} component={Profile}/>
      </Stack.Navigator>
    );
  };

  return (
    <View style={{height: '100%', width: '100%'}}>
      <NavigationContainer>
         {defaultStack()}
      </NavigationContainer>
    </View>
  );
}

export default AppNavigator;
