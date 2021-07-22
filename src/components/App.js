import React, {useState, useEffect, navigationRef} from 'react';
import {Provider} from 'react-redux';
import {store} from '../store';
import {NavigationContainer} from '@react-navigation/native';
import AppStack from '../routes/app';
import auth from '@react-native-firebase/auth';
import {useDispatch} from 'react-redux';
import {actions} from '../store';

const App = () => {
  return (
    <Provider store={store}>
      <AppWrapped />
    </Provider>
  );
};

const AppWrapped = () => {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();
  const dispatch = useDispatch();
  // Handle user state changes
  async function onAuthStateChanged(user) {
    if (user) {
      setUser(user);
    } else {
      dispatch(actions.user.setUser(null));
    }
    if (initializing) setInitializing(false);
  }
  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);
  if (initializing) {
    return null;
  }
  return (
    <NavigationContainer ref={navigationRef}>
      <AppStack />
    </NavigationContainer>
  );
};

export default App;
