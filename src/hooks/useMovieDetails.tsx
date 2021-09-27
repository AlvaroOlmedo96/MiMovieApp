import React, { useEffect, useState } from 'react'
import movieDB from '../api/movieDB';
import { Cast, CreditsResponse } from '../interfaces/credits.interface';
import { MovieDetail } from '../interfaces/movie.interface';

interface MovieDetails{
    isLoading: boolean,
    movieFull?: MovieDetail,
    cast: Cast[],
}

export const useMovieDetails = ( movieId: number) => {
    
    const [movieState, setMovieState] = useState<MovieDetails>({
        isLoading: true,
        movieFull: undefined,
        cast: []
    });

    const getMovieDetails = async () => {
        const movieDetailPromise = await movieDB.get<MovieDetail>(`/movie/${movieId}`);
        const castsPromise = await movieDB.get<CreditsResponse>(`/movie/${movieId}/credits`);
        
        const [ movieDetailPromiseResp, castsPromiseResp ] = await Promise.all([
            movieDetailPromise, 
            castsPromise 
        ]);

        setMovieState({
            isLoading: false,
            movieFull: movieDetailPromiseResp.data,
            cast: castsPromiseResp.data.cast
        });
        
    }

    useEffect(() => {
        
        getMovieDetails();

    }, []);

    return (
        movieState
    )
}
