import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {Tabs} from './Tabs';
import Login from '../screens/Login';

const Stack = createStackNavigator();

const AppStack = props => {
  const isLoged = true;
  return (
    <Stack.Navigator headerMode="none">
      {isLoged ? (
        <Stack.Screen name="Tabs" component={Tabs} />
      ) : (
        <Stack.Screen name="LogIn" component={Login} />
      )}
    </Stack.Navigator>
  );
};

export default AppStack;
