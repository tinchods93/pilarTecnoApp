import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import AppStack from '../routes/app';

const App = () => {
  return (
    <NavigationContainer>
      <AppStack />
    </NavigationContainer>
  );
};

export default App;
