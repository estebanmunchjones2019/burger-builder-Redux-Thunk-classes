import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://myburger-6cf58.firebaseio.com/'
});

export default instance;