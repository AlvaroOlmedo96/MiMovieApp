import { useNavigation } from '@react-navigation/core';
import React from 'react'
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native'
import { Movie } from '../interfaces/movie.interface'

interface Props{
    movie: Movie;
    height?: number;
    width?: number;
}

export const MovieCard = ( { movie, height = 420, width = 275 }: Props) => {

    const posterPath = `https://image.tmdb.org/t/p/w500${ movie.poster_path }`;

    const navigation = useNavigation();
    
    return (
        <TouchableOpacity 
        onPress= { () => navigation.navigate('DetailScreen', movie)}
        activeOpacity= {0.8}
        style={{ 
            height, width, 
            marginHorizontal: 2, 
            paddingBottom: 20, 
            paddingHorizontal: 2
        }}>
            <View style={cardStyle.image_container}>
                <Image
                    source={{uri: posterPath}}
                    style={cardStyle.image}
                />
            </View>
        </TouchableOpacity>
    )
}

const cardStyle = StyleSheet.create({
    image_container:{
        flex: 1,
        borderRadius: 5,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 4
        },
        shadowOpacity: 0.3,
        shadowRadius: 7,

        elevation: 10
    },
    image: {
        flex: 1,
        borderRadius: 5,

    }
})
