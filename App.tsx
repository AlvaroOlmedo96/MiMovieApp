import React, { useEffect } from 'react'
import 'react-native-gesture-handler';
import { StatusBar, Text, View } from 'react-native'
import { StackNavigator } from './src/navigators/StackNavigator';
import { GradientProvider } from './src/context/GradientContext';
import { ThemeModeProvider } from './src/context/ThemeModeContext';
import Orientation from 'react-native-orientation';

const AppState = ({ children }:any) => {
  return (
    <ThemeModeProvider>
      <GradientProvider>
        { children }
      </GradientProvider>
    </ThemeModeProvider>
  )
}

// const customTheme: Theme = {
//   dark: true,
//   colors: {
//     ...DarkTheme.colors,
//     // primary: 'string',
//     //background: 'black',
//     // card: 'string',
//     //text: 'white',
//     // border: 'string',
//     // notification: 'string',
//   }
// }

const App = () => {

  useEffect(() => {
    Orientation.lockToPortrait();
  }, [])

  return (
    <AppState>
      <StatusBar backgroundColor="transparent" translucent={true} />
      <StackNavigator></StackNavigator>
    </AppState>
  )
}

export default App;
