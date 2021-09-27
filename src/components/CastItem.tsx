import React, { useContext } from 'react'
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { ThemeModeContext } from '../context/ThemeModeContext';
import { Cast } from '../interfaces/credits.interface'

interface Props{
    actor: Cast
}

export const CastItem = ( {actor}: Props) => {

    const posterPath = `https://image.tmdb.org/t/p/w500${ actor.profile_path }`;

    const { theme } = useContext(ThemeModeContext);

    return (
        <TouchableOpacity style={{...cardStyle.column, shadowColor: theme.colors.text}} activeOpacity={0.85}>
            {
                actor.profile_path && 
                <Image 
                    source={{ uri: posterPath}}
                    style={{ width: 100, height: 100, borderTopLeftRadius: 15, borderBottomLeftRadius: 15}}
                />
            }

            <View style={{ marginLeft: 5, flex:1}}>
                <Text style={{ fontWeight:'bold', fontSize: 18}}>{actor.name}</Text>
                <Text style={{ fontSize: 16}}>{actor.character}</Text>
            </View>
            
        </TouchableOpacity>
    )
}

const cardStyle = StyleSheet.create({
    column:{
        backgroundColor: 'white',
        borderRadius: 15,
        flex: 1,
        flexDirection: 'row',
        width: 300,
        height: 100,
        alignItems: 'center',
        marginHorizontal: 5,
        marginTop: 0,
        marginBottom: 25,

        elevation: 10,
        shadowOffset:{
            width: 0.3,
            height: 7
        },
        shadowOpacity: 0.3,
        shadowRadius: 7,
    },
    border:{
        borderRadius: 15,
    }
})
