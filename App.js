import React, {useEffect, useState} from 'react';
import AuthStack from './src/navigation/AuthStack';
import store from './src/redux/store';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {persistStore} from 'redux-persist';
import 'react-native-gesture-handler';
import {isLoggedIn} from './src/utils/isLoggedIn';
import SplashScreen from 'react-native-splash-screen';
import {LogBox} from 'react-native';
let persistor = persistStore(store);

const App = () => {
  LogBox.ignoreAllLogs();
  const [token, setToken] = useState();
  const getToken = async () => {
    var data = await isLoggedIn();
    console.log(data);
    setToken(data);
    SplashScreen.hide();
  };
  useEffect(() => {
    getToken();
  }, []);
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <AuthStack token={token} />
      </PersistGate>
    </Provider>
  );
};

export default App;
