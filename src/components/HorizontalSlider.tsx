import { useTheme } from '@react-navigation/native'
import React, { useContext } from 'react'
import { FlatList, Text, View } from 'react-native'
import { ThemeModeContext } from '../context/ThemeModeContext'
import { Movie } from '../interfaces/movie.interface'
import { MovieCard } from './MovieCard'

interface Props{
    sectionTitle?: string,
    movies: Movie[],
}

export const HorizontalSlider = ({ sectionTitle, movies }: Props) => {

    //const { colors } = useTheme();
    const { theme } = useContext( ThemeModeContext );

    return (
        <View style={{ height: ( sectionTitle ) ? 240 : 220}}>

            {
                sectionTitle && <Text style={{ 
                    fontSize: 24, fontWeight: 'bold', marginVertical: 8, marginLeft: 7,
                    color: theme.colors.text,
                    }}>{sectionTitle}</Text>
            }
            
            <FlatList 
                data={ movies }
                renderItem={ ({ item }) => 
                    <MovieCard movie={item} width={ 120 } height={ 180 } />
                }
                keyExtractor={ (item) => item.id.toString() }
                horizontal={true}
                showsHorizontalScrollIndicator = { false }
            />
        </View>
    )
}
