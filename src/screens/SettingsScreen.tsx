import { StackScreenProps } from '@react-navigation/stack'
import React, { useContext, useState } from 'react'
import { Button, Switch, Text, TouchableOpacity, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import Icon from 'react-native-vector-icons/Ionicons'
import { GradientBackground } from '../components/GradientBackground'
import { ThemeModeContext } from '../context/ThemeModeContext'
import { RootStackParams } from '../navigators/StackNavigator'
import { appTheme } from '../themes/appTheme'

interface Props extends StackScreenProps<RootStackParams, 'SettingsScreen'>{}

export const SettingsScreen = ( { navigation }:Props ) => {

    const { top } = useSafeAreaInsets();

    const { theme, setDarkMode, setLightMode} = useContext(ThemeModeContext);



    const toggleSwitch = () => {
        theme.dark = !theme.dark;
        if( theme.dark ) { setDarkMode(); }else{ setLightMode(); }
        console.log( "Theme", theme.currentTheme );
    };

    return (
        <View style={{ marginTop: top + 20, marginHorizontal: 10 }}>

            <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <TouchableOpacity
                    onPress={ () => navigation.pop()}>
                        <Icon 
                            name='arrow-back'
                            size={ 25 }
                            style={{ color: theme.colors.text}}
                        />
                </TouchableOpacity>
                <Text style={{...appTheme.sectionTitle, color: theme.colors.text, marginLeft: 20}}>Ajustes</Text>
            </View>


            <View style={{marginTop: 20}}>
                <Text style={{...appTheme.sectionSubTitle, color: theme.colors.text}}>Pantalla</Text>
                <View style={{ marginVertical: 20, flexDirection: 'row', marginHorizontal: 15}}>
                    <Text style={{...appTheme.sectionText, color: theme.colors.text}}>Modo oscuro</Text>
                    <View style={{flex: 1}}></View>
                    <Switch
                        trackColor={{ false: "#767577", true: "#81b0ff" }}
                        thumbColor={theme.dark ? "blue" : "#f4f3f4"}
                        ios_backgroundColor="#3e3e3e"
                        onValueChange={toggleSwitch}
                        value={theme.dark}
                        style={{ transform: [{ scaleX: 1.3 }, { scaleY: 1.3 }] }}
                    />
                </View>
            </View>

        </View>
    )
}
