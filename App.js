import React, {useState} from 'react';
import AuthStack from './src/navigation/AuthStack';
import store from './src/redux/store';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {persistStore} from 'redux-persist';
import 'react-native-gesture-handler';
import {isLoggedIn} from './src/utils/isLoggedIn';

let persistor = persistStore(store);

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <AuthStack />
      </PersistGate>
    </Provider>
  );
};

export default App;
