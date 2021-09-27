import { useTheme } from '@react-navigation/native'
import React, { useContext } from 'react'
import { FlatList, Image, Text, TouchableOpacity, View } from 'react-native'
import { ThemeModeContext } from '../context/ThemeModeContext'
import { McMovie } from '../interfaces/mcMovies.interface'
import { Movie } from '../interfaces/movie.interface'
import { MovieCardMyCinema } from './MovieCardMyCinema'

interface Props{
    sectionTitle?: string,
    dataList: McMovie[],
}

export const HorizontalSliderMyCinema = ({ sectionTitle, dataList }: Props) => {

    const { theme } = useContext( ThemeModeContext );

    return (
        <View>

            {
                sectionTitle && <Text style={{ 
                    fontSize: 24, fontWeight: 'bold', marginVertical: 20, marginLeft: 7,
                    color: 'white',
                    }}>{sectionTitle}</Text>
            }
            
            <FlatList 
                data={ dataList }
                renderItem={ ({ item }) => 
                    <MovieCardMyCinema data={item} width={ 100 } height={ 170 } />
                }
                keyExtractor={ (item) => item.title }
                horizontal={true}
                showsHorizontalScrollIndicator = { false }
            />
            
        </View>
    )
}
