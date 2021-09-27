import axios from 'axios';

const movieDB = axios.create({
    baseURL: 'https://api.themoviedb.org/3',
    params: {
        api_key: '50d50f4dbec6316d1c4b43135ff8a4db',
        language: 'es-ES'
    }
});

export default movieDB;