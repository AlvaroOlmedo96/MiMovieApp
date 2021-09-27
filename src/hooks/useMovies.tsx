import React, { useEffect, useState } from 'react'
import movieDB from '../api/movieDB';
import { Movie, MovieDBMoviesResponse } from '../interfaces/movie.interface';

interface MoviesState{
    nowPlaying: Movie[],
    popular: Movie[],
    topRated: Movie[],
    upcoming: Movie[]
}

export const useMovies = () => {
    
    const [isLoading, setIsLoading] = useState(true);
    const [moviesState, setMoviesState] = useState<MoviesState>({
        nowPlaying: [],
        popular: [],
        topRated: [],
        upcoming: []
    });

    //En cartelera (now playing)
    const getMovies = async () => {
        const nowPlayingPromise = movieDB.get<MovieDBMoviesResponse>('/movie/now_playing');
        const popularPromise = movieDB.get<MovieDBMoviesResponse>('/movie/popular');
        const topRatedPromise = movieDB.get<MovieDBMoviesResponse>('/movie/top_rated');
        const upcomingPromise = movieDB.get<MovieDBMoviesResponse>('/movie/upcoming');

        const responses = await Promise.all([ 
            nowPlayingPromise, 
            popularPromise, 
            topRatedPromise, 
            upcomingPromise]);
        
        setMoviesState({
            nowPlaying: responses[0].data.results,
            popular: responses[1].data.results,
            topRated: responses[2].data.results,
            upcoming: responses[3].data.results
        });

        setIsLoading(false);

    }

    useEffect(() => {
        
        getMovies();

    }, []);

    return {
        isLoading,
        ...moviesState
    }
}
