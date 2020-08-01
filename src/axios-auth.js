import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://identitytoolkit.googleapis.com/v1/'
});

axios.interceptors.response.use(
    function(response) {
        // response data
        return response;
    },
    function(error) {
        // <-- this should now trigger correctly
        // response error
        return Promise.reject(error.response); // transform response.response -> response
    }
);

export default instance;