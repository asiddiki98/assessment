import React from 'react';
import ReactDOM from 'react-dom';
import Root from './components/root';
import configureStore from './store';
import jwt_decode from 'jwt-decode';
import { setAuthToken } from './util/session_api_util';
import { logout } from './actions/session_actions';
import axios from 'axios';
import "./cssReset.css"

document.addEventListener('DOMContentLoaded', () => {
  let store;

  if (localStorage.jwtToken) {
    setAuthToken(localStorage.jwtToken);
    const decodedUser = jwt_decode(localStorage.jwtToken);
    let user;
    if (decodedUser?.iss === "accounts.google.com"){
      user = {
        id: decodedUser.sub,
        firstname: decodedUser.given_name,
        lastname: decodedUser.family_name,
        email: decodedUser.email,
      }
    } else {
      user = decodedUser
    }
    const preloadedState = { session: { isAuthenticated: true, user: user } };
    store = configureStore(preloadedState);
    const currentTime = Date.now() / 1000;

    if (decodedUser.exp < currentTime) {
      store.dispatch(logout());
      window.location.href = '/';
    }

  } else {
    store = configureStore({});
  }

  window.axios = axios
  const root = document.getElementById('root');
  ReactDOM.render(<Root store={store} />, root);
});