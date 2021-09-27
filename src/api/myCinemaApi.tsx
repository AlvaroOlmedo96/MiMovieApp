import axios from 'axios';

const myCinemaApi = axios.create({
    baseURL: 'http://192.168.1.38:3000',
});

export default myCinemaApi;