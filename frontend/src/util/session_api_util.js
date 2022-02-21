import axios from 'axios';

export const setAuthToken = token => {
    if (token) {
        axios.defaults.headers.common['Authorization'] = token;
    } else {
        delete axios.defaults.headers.common['Authorization'];
    }
};

export const signup = (userData) => {
    return axios.post('/api/users/register', userData);
};

export const login = (userData) => {
    return axios.post('/api/users/login', userData);
};

export const createNote = (note) => {
    return axios.post('/api/notes', note)
}

export const getNotes = (creator) => {
    return axios.get(`/api/notes/${creator}`, )
}