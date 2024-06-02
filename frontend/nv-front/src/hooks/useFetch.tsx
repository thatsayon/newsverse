import axios, { AxiosInstance } from 'axios';

const axiosFetch: AxiosInstance = axios.create({
    baseURL: 'http://127.0.0.1:8000',
    withCredentials: true
});

function useFetch(): AxiosInstance {
    return axiosFetch;
}

export default useFetch;
