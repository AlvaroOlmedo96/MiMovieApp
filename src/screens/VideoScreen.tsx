import { StackScreenProps } from '@react-navigation/stack';
import React, { useContext, useEffect, useState } from 'react'
import { ActivityIndicator, BackHandler, Dimensions, Text, TouchableOpacity, View } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';

import Video from 'react-native-video';
import Orientation from 'react-native-orientation';
import { ThemeModeContext } from '../context/ThemeModeContext';
import { getStreamVideo } from '../hooks/useMyCinema';
import { RootStackParams } from '../navigators/StackNavigator';
import { appTheme } from '../themes/appTheme';

interface Props extends StackScreenProps<RootStackParams, 'VideoScreen'>{}

export const VideoScreen = ({ navigation, route }:Props) => {

    const params = route.params;
    console.log(params);

    const { top } = useSafeAreaInsets();
    const { theme } = useContext(ThemeModeContext);

    const [videoLoad, setVideoLoad] = useState(true)

    const { video, isVideoLoading } = getStreamVideo(params.title);

    useEffect(() => {
        console.log("====APP.tsx===", route.name);
        Orientation.lockToLandscapeRight();
        BackHandler.addEventListener('hardwareBackPress', isBackButtonDevicePress);
        navigation.addListener('gestureEnd', isBackButtonDevicePress);
    }, []);

    const isBackButtonDevicePress = () => {
        Orientation.lockToPortrait();
        navigation.pop();
        return true;
    }

    return (
        <View style={{ flex: 1, backgroundColor: '#141414'}}>

                <TouchableOpacity style={appTheme.backButton}
                    onPress={ () => {navigation.pop(); Orientation.lockToPortrait();}}>
                        <Icon 
                            name='arrow-back'
                            size={ 35 }
                            style={{ color: 'white'}}
                        />
                </TouchableOpacity>

            {
                videoLoad && 
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', alignContent: 'center'}}>
                    <Text style={{...appTheme.sectionTitle, color: 'white', marginVertical: 20 }}>{params.title.replace(/_/g, ' ').toUpperCase() }</Text>
                    <Text style={{...appTheme.sectionSubTitle, color: 'white' }}>Cargando video...</Text>
                    <ActivityIndicator color='white' size={ 40 }></ActivityIndicator>
                </View>
            }

           {
               !isVideoLoading && 
               <View style={{ flex: 1, width: '100%',height: '100%'}}>
                   <Video 
                        style={{
                            width: Dimensions.get("screen").width,
                            height: Dimensions.get("screen").height}}
                        source={{ uri: video }}
                        controls={true}
                        fullscreen={true}
                        resizeMode='contain'
                        onLoad={ () => setVideoLoad(false) }
                    />
               </View>
           } 
        </View>
    )
}
