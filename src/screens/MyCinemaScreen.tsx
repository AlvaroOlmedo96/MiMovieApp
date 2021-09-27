import React, { useContext } from 'react'
import { ActivityIndicator, Button, Image, ScrollView, Text, TouchableOpacity, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { ThemeModeContext } from '../context/ThemeModeContext';
import { useMyCinema } from '../hooks/useMyCinema';

import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParams } from '../navigators/StackNavigator';
import Icon from 'react-native-vector-icons/Ionicons';
import { HorizontalSliderMyCinema } from '../components/HorizontalSliderMyCinema';


interface Props extends StackScreenProps<RootStackParams, 'MyCinemaScreen'>{}

export const MyCinemaScreen = ({ navigation }:Props) => {

    const { top } = useSafeAreaInsets();
    const { theme } = useContext(ThemeModeContext);

    const { mcMovies, isLoading } = useMyCinema();


    return (
        <ScrollView style={{ flex: 1, backgroundColor: '#141414'}}>
                <View style={{flexDirection: 'row', alignItems: 'center', marginHorizontal: 10, marginTop: top + 20}}>
                    <TouchableOpacity
                        onPress={ () => navigation.pop()}>
                            <Icon 
                                name='arrow-back'
                                size={ 25 }
                                style={{ color: 'white'}}
                            />
                    </TouchableOpacity>
                </View>

                <View style={{flex: 1, alignItems: 'center'}}>
                    <Image 
                            source={{ uri: 'http://192.168.1.38:8080/assets/img/logo.png'}}
                            style={{
                                width: '35%',
                                height: 35
                            }}
                    />
                </View>

                {
                    isLoading &&
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', marginVertical: 20}}>
                        <ActivityIndicator color='white' size={ 40 }></ActivityIndicator>
                    </View>
                }

                {
                    !isLoading && 
                    <View>
                        <HorizontalSliderMyCinema sectionTitle={'Películas'} dataList={mcMovies} /> 
                        <HorizontalSliderMyCinema sectionTitle={'Series'} dataList={mcMovies} />
                    </View>
                }

        </ScrollView>
    )
}
