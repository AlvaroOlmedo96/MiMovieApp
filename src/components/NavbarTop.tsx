

import { useNavigation } from '@react-navigation/core'
import React from 'react'
import { TouchableOpacity, View } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import { appTheme } from '../themes/appTheme'

export const NavbarTop = () => {

    const navigation = useNavigation();

    return (
        <View style={appTheme.navbarTop}>
            <TouchableOpacity>
                <Icon
                    name='tv'
                    size={ 30 }
                    color= 'white'
                    style={{ marginHorizontal: 10 }}
                    onPress={ () => navigation.navigate('MyCinemaScreen')}
                />
            </TouchableOpacity>
            <TouchableOpacity>
                <Icon
                    name='search'
                    size={ 30 }
                    color= 'white'
                    style={{ marginHorizontal: 10 }}
                />
            </TouchableOpacity>
            <TouchableOpacity>
                <Icon
                    name='settings'
                    size={ 30 }
                    color= 'white'
                    style={{ marginHorizontal: 10 }}
                    onPress={ () => navigation.navigate('SettingsScreen')}
                />
            </TouchableOpacity>
        </View>
    )
}
