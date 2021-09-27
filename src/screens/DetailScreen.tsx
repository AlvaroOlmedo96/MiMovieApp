import { StackScreenProps } from '@react-navigation/stack'
import React, { useContext } from 'react'
import { ActivityIndicator, Dimensions, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { RootStackParams } from '../navigators/StackNavigator'; 

import Icon from 'react-native-vector-icons/Ionicons';
import { useMovieDetails } from '../hooks/useMovieDetails';
import { MovieDetails } from '../components/MovieDetails';
import { GradientBackground } from '../components/GradientBackground';
import { ThemeModeContext } from '../context/ThemeModeContext';
import { appTheme } from '../themes/appTheme';

const screenHeight = Dimensions.get('screen').height;

interface Props extends StackScreenProps<RootStackParams, 'DetailScreen'>{}

export const DetailScreen = ( {navigation, route}: Props) => {
    
    const movie = route.params;
    const posterPath = `https://image.tmdb.org/t/p/w500${ movie.poster_path }`;

    const movieDetail  = useMovieDetails(movie.id);

    const { theme } = useContext(ThemeModeContext);

    return (

        <GradientBackground>
            <ScrollView>
                <View style={ cardStyle.image_container}>
                    <View style={ cardStyle.imageBorder}>
                        <Image
                            source={{uri: posterPath}}
                            style={ cardStyle.image }
                        />
                    </View>
                </View>

                <View style={ cardStyle.marginContainer}>
                    <Text style={{...cardStyle.title, color: theme.colors.text}}>{movie.title}</Text>
                </View>

                <View>
                    {
                        movieDetail.isLoading ? <ActivityIndicator size={35} />
                            : <MovieDetails movieFull={movieDetail.movieFull} cast={movieDetail.cast} />
                    }
                </View>

                {/* Boton para cerrar/ir atras */}
                <TouchableOpacity style={{...appTheme.backButton}}
                onPress={ () => navigation.pop()}>
                    <Icon 
                        name='arrow-back-outline'
                        size={55}
                        color= 'white'
                    />
                </TouchableOpacity>

            </ScrollView>
        </GradientBackground>

    )
}

const cardStyle = StyleSheet.create({
    image_container:{
        width: '100%',
        height: screenHeight * 0.7,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 4
        },
        shadowOpacity: 0.3,
        shadowRadius: 7,
        elevation: 10,
        borderBottomEndRadius: 35,
        borderBottomStartRadius: 35
    },
    image: {
        flex: 1,
    },
    imageBorder:{
        flex:1,
        overflow: 'hidden',
        borderBottomEndRadius: 35,
        borderBottomStartRadius: 35
    },
    marginContainer:{
        marginHorizontal: 20,
        marginTop: 20
    },
    title:{
        fontSize: 20,
        fontWeight: 'bold',
        color: 'white'
    }
})
