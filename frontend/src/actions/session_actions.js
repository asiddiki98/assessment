import * as APIUtil from '../util/session_api_util';
import jwt_decode from 'jwt-decode';

export const RECEIVE_CURRENT_USER = "RECEIVE_CURRENT_USER";
export const RECEIVE_SESSION_ERRORS = "RECEIVE_SESSION_ERRORS";
export const RECEIVE_USER_LOGOUT = "RECEIVE_USER_LOGOUT";
export const RECEIVE_USER_NOTES = "RECEIVE_USER_NOTES";
export const RECEIVE_USER_NOTE = "RECEIVE_USER_NOTE";

export const receiveCurrentUser = currentUser => ({
    type: RECEIVE_CURRENT_USER,
    currentUser
});

export const receiveUserNotes = userNotes => ({
    type: RECEIVE_USER_NOTES,
    userNotes
})
export const receiveUserNote = userNote => ({
    type: RECEIVE_USER_NOTE,
    userNote
})

export const receiveErrors = errors => ({
    type: RECEIVE_SESSION_ERRORS,
    errors
});

export const logoutUser = () => ({
    type: RECEIVE_USER_LOGOUT
});


export const signup = user => dispatch => (
    APIUtil.signup(user).then(res => {
        const { token } = res.data;
        // debugger
        localStorage.setItem('jwtToken', token);
        APIUtil.setAuthToken(token);
        const decoded = jwt_decode(token);
        dispatch(receiveCurrentUser(decoded))
    },
        err => (
            dispatch(receiveErrors(err.response.data))
        ))
);

export const login = user => dispatch => (
    APIUtil.login(user).then(res => {
        const { token } = res.data;
        localStorage.setItem('jwtToken', token);
        APIUtil.setAuthToken(token);
        const decoded = jwt_decode(token);
        dispatch(receiveCurrentUser(decoded))
    }, err => (
        dispatch(receiveErrors(err.response.data))
    ))
)

export const logout = () => dispatch => {
    localStorage.removeItem('jwtToken')
    APIUtil.setAuthToken(false)
    dispatch(logoutUser())
};

export const actionGoogleLogin = user => dispatch =>{
    const token = user.tokenId
    console.log(user)
    localStorage.setItem('jwtToken', token)
    APIUtil.setAuthToken(token);
    const decoded = jwt_decode(token);

    const newUser = {
     id: decoded.sub,
     firstname: decoded.given_name,
     lastname: decoded.family_name,
     email: decoded.email,
   }
    dispatch(receiveCurrentUser(newUser))
}

export const fetchNotes = email => dispatch => {
    return (
        APIUtil.getNotes(email).then(
            res => (dispatch(receiveUserNotes(res.data))),
            err => (dispatch(receiveErrors(err.response.data)))
        )
    )
}

export const createNote = (note) => (dispatch) => {
    return (
        APIUtil.createNote(note).then(
            res => (dispatch(receiveUserNote(res.data))),
            err => (dispatch(receiveErrors(err.response.data)))
        )
    )
}
