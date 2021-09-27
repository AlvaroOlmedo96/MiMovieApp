import React, { useContext, useEffect } from 'react'
import { View, ActivityIndicator, Dimensions, ScrollView } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { MovieCard } from '../components/MovieCard';
import { useMovies } from '../hooks/useMovies';

import Carousel from 'react-native-snap-carousel';
import { HorizontalSlider } from '../components/HorizontalSlider';
import { GradientBackground } from '../components/GradientBackground';
import { getImageColors } from '../helpers/getColors';
import { GradientContext } from '../context/GradientContext';
import { NavbarTop } from '../components/NavbarTop';
import { ThemeModeContext } from '../context/ThemeModeContext';

import SplashScreen from 'react-native-splash-screen'

const { width } = Dimensions.get('window');

export const HomeScreen = () => {

    const { top } = useSafeAreaInsets();

    const { isLoading, nowPlaying, popular, topRated, upcoming } = useMovies();

    const { setMainColors } = useContext(GradientContext);

    const { theme } = useContext(ThemeModeContext);

    const getPosterColors = async ( index: number ) => {
        const movie = nowPlaying[index];
        const posterPath = `https://image.tmdb.org/t/p/w500${ movie.poster_path }`;

        const [ primary = 'green', secondary = 'orange' ] = await getImageColors(posterPath);
        setMainColors({ primary, secondary });
    }

    useEffect(() => {
        SplashScreen.hide();
        if ( nowPlaying.length > 0 ){
            getPosterColors(0);
        }
    }, [nowPlaying]);

    if( isLoading ){
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                <ActivityIndicator color={theme.colors.text} size={40}></ActivityIndicator>
            </View>
        )
    }

    return (
        <GradientBackground>
            <View style={{ marginTop: top}}>
                <NavbarTop />
            </View>
            <ScrollView>
                <View style={{ marginTop: top}}>
                
                {/* Carousel Principal */}
                <View style={{ height: 440}}>
                    <Carousel 
                        data={ nowPlaying }
                        renderItem={ ({ item }) => <MovieCard movie={ item }/> }
                        sliderWidth={ width }
                        itemWidth={ 275 }
                        inactiveSlideOpacity={0.9}
                        onSnapToItem={ (index) => getPosterColors( index ) }
                    />
                </View>

                {/* En cartelera, Populares, TopRated, Upconming */}
                <HorizontalSlider sectionTitle={'En cartelera'} movies={ nowPlaying } />
                <HorizontalSlider sectionTitle={'Las más populares'} movies={ popular } />
                <HorizontalSlider sectionTitle={'Las más valoradas'} movies={ topRated } />
                <HorizontalSlider sectionTitle={'Proximamente'} movies={ upcoming } />

            </View>
            </ScrollView>
        </GradientBackground>
    )
}
