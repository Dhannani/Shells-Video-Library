import { createContext, useReducer } from 'react';

export const AuthContext = createContext({
    isLoggedIn: false,
    token: null,
    login: () => {},
    logout: () => {},
    sEmail: () => {},
    sId: () => {},
    email: null,
    id: null
});