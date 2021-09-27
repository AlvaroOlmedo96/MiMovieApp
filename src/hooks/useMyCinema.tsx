import React, { useEffect, useState } from 'react'
import myCinemaApi from '../api/myCinemaApi'
import { McMovie } from '../interfaces/mcMovies.interface';

export const useMyCinema = () => {

    const [mcMovies, setMcMovies] = useState<McMovie[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    
    const getMcMovies = async () => {
        const myMovies = await (await myCinemaApi.get<string[]>('/movies')).data;

        let moviesList:McMovie[] = [];

        for await ( var movie of myMovies){
            let path = (await myCinemaApi.get<string[]>(`/movieCover/${movie}`)).data;
            moviesList.push({
                title: movie,
                poster_path: path[0]
            });
        }
        setMcMovies(moviesList);
        setIsLoading( false );

    }

    useEffect(() => {
        getMcMovies();
    }, [])

    return {
        mcMovies,
        isLoading
    }
}

export const getStreamVideo = (title: string) => {

    const [video, setVideo] = useState('');
    const [isVideoLoading, setIsVideoLoading] = useState(true);

    const streamVideo = async () => {
        console.log("PELICULA SELECCIONADA", title);

        const url = await (await myCinemaApi.get(`/movie/${title}`)).data.url;
        console.log("=====URL=======", url);
        const finalUrl = `http://192.168.1.38:3000/streamMovie?path=${url}`;
        setVideo(finalUrl);
        setIsVideoLoading(false);
    }

    useEffect(() => {
        streamVideo();
    }, [])


    return {
        video,
        isVideoLoading
    };
}
