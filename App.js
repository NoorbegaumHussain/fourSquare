import { View, Text } from 'react-native'
import React from 'react'
import LoginScreen from './src/screens/LoginScreen'
import AuthStack from './src/navigation/AuthStack';
import HomeTab from './src/navigation/HomeTab';
const App = () => {
  return (
    <AuthStack/>
  )
}

export default App