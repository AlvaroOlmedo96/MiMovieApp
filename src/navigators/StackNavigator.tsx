import React, { useContext } from 'react';
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import { HomeScreen } from '../screens/HomeScreen';
import { DetailScreen } from '../screens/DetailScreen';
import { Movie } from '../interfaces/movie.interface';
import { SettingsScreen } from '../screens/SettingsScreen';
import { NavigationContainer } from '@react-navigation/native';
import { ThemeModeContext } from '../context/ThemeModeContext';
import { View } from 'react-native';
import { MyCinemaScreen } from '../screens/MyCinemaScreen';
import { VideoScreen } from '../screens/VideoScreen';
import { McMovie } from '../interfaces/mcMovies.interface';

export type RootStackParams = {
    HomeScreen: undefined,
    DetailScreen: Movie,
    SettingsScreen: undefined,
    MyCinemaScreen: undefined,
    VideoScreen: McMovie,
}

const Stack = createStackNavigator<RootStackParams>();

export const StackNavigator = () => {

  const { theme } = useContext( ThemeModeContext );

  return (
    <View style={{backgroundColor: theme.colors.background, flex: 1}}>
      <NavigationContainer theme={ theme }>
        <Stack.Navigator initialRouteName="HomeScreen" screenOptions={{
          headerShown: false,
          ...TransitionPresets.SlideFromRightIOS
        }}>
          <Stack.Screen name="HomeScreen" component={HomeScreen} />
          <Stack.Screen name="DetailScreen" component={DetailScreen} />
          <Stack.Screen name="SettingsScreen" component={SettingsScreen} />
          <Stack.Screen name="MyCinemaScreen" component={MyCinemaScreen} />
          <Stack.Screen name="VideoScreen" component={VideoScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </View>
    
  );
}