import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {Tabs} from './Tabs';
import {useDispatch, useSelector} from 'react-redux';
import Login from '../screens/Login';

const Stack = createStackNavigator();

const AppStack = props => {
  const user = useSelector(state => state.user.user);
  return (
    <Stack.Navigator headerMode="none">
      {user ? (
        <Stack.Screen name="Tabs" component={Tabs} />
      ) : (
        <Stack.Screen name="LogIn" component={Login} />
      )}
    </Stack.Navigator>
  );
};

export default AppStack;
