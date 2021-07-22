import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Create from '../screens/CreateUser';
import Login from '../screens/Login';

const LoginStack = createStackNavigator();

export const LoginStackScreen = () => {
  return (
    <LoginStack.Navigator headerMode="none">
      <LoginStack.Screen name="Login" component={Login} />
      <LoginStack.Screen name="Create" component={Create} />
    </LoginStack.Navigator>
  );
};
