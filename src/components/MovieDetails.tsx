import React, { useContext } from 'react'
import { FlatList, Text, View } from 'react-native'
import Icon  from 'react-native-vector-icons/Ionicons'
import { Cast } from '../interfaces/credits.interface'
import { MovieDetail } from '../interfaces/movie.interface'

import currencyFormatter from 'currency-formatter';
import { CastItem } from './CastItem'
import { appTheme } from '../themes/appTheme'
import { ThemeModeContext } from '../context/ThemeModeContext'

interface Props{
    movieFull: MovieDetail,
    cast: Cast[]
}

export const MovieDetails = ( { movieFull, cast }:Props) => {

    const { theme } = useContext(ThemeModeContext);

    return (
        <View>
            {/* Detalles */}
            <View style={{marginHorizontal: 20, marginTop: 20}}>
                <View style={{flexDirection: 'row', alignItems:'center'}}>
                    <Icon
                        name='star-outline'
                        color={ theme.colors.text }
                        size={ 30 }
                    />
                    <Text style={{ ...appTheme.sectionTitle, color: theme.colors.text }}> { movieFull.vote_average }</Text>
                    <Text style={{...appTheme.sectionSubTitle, color: theme.colors.text}}> - { movieFull.genres.map( g => g.name ).join(', ') }</Text>
                </View>

                {/* Sinopsis */}
                <View>
                    <Text style={{...appTheme.sectionTitle, color: theme.colors.text, marginTop: 10}}>Sinópsis</Text>
                    <Text style={{...appTheme.sectionText, color: theme.colors.text, marginTop: 10}}>{movieFull.overview}</Text>
                </View>

                {/* Presupuesto */}
                <View>
                    <Text style={{...appTheme.sectionSubTitle, color: theme.colors.text, marginTop: 10}}>Presupuesto</Text>
                    <Text style={{...appTheme.sectionText, color: theme.colors.text, marginTop: 10}}>
                        { currencyFormatter.format( movieFull.budget, {code: 'USD'} )}
                    </Text>
                    <Text style={{...appTheme.sectionSubTitle, color: theme.colors.text, marginTop: 10}}>Ingresos</Text>
                    <Text style={{...appTheme.sectionText, color: theme.colors.text, marginTop: 10}}>
                        { currencyFormatter.format( movieFull.revenue, {code: 'USD'} )}
                    </Text>
                </View>

            </View>

            {/* Casting */}
            <View>
                <Text style={{...appTheme.sectionTitle, color: theme.colors.text, marginVertical: 10, marginHorizontal: 20, marginTop: 20}}>
                    Reparto</Text>
                <FlatList
                    horizontal={true}
                    showsHorizontalScrollIndicator = { false }
                    data={cast}
                    keyExtractor={ (item) => item.id.toString()}
                    renderItem={ ({ item }) => <CastItem actor={item} />}
                />
            </View>
        </View>
    )
}
