import React, { createContext, useReducer, useContext } from 'react';
import axios from 'axios';
const AuthContext = createContext();

const initialState = {
    token: localStorage.getItem('token'),
    isAuthenticated: null,
    user: null,
    loading: true,
    error: null,
};

const authReducer = (state, action) => {
    switch (action.type) {
        case 'USER_LOADED':
            return {
                ...state,
                isAuthenticated: true,
                loading: false,
                user: action.payload,
            };
        case 'REGISTER_SUCCESS':
        case 'LOGIN_SUCCESS':
            localStorage.setItem('token', action.payload.token);
            return {
                ...state,
                ...action.payload,
                isAuthenticated: true,
                loading: false,
            };
        case 'AUTH_ERROR':
        case 'LOGIN_FAIL':
        case 'LOGOUT':
        case 'REGISTER_FAIL':
            localStorage.removeItem('token');
            return {
                ...state,
                token: null,
                isAuthenticated: false,
                loading: false,
                user: null,
                error: action.payload,
            };
        default:
            return state;
    }
};

export const AuthProvider = ({ children }) => {
    const [state, dispatch] = useReducer(authReducer, initialState);

    const register = async (formData) => {
        try {
            const res = await axios.post('http://localhost:5000/api/users/signup', formData);
            dispatch({ type: 'REGISTER_SUCCESS', payload: res.data });
            return res;
            // loadUser();
        } catch (err) {
            console.log("error ::", err);
            dispatch({
                type: 'REGISTER_FAIL', payload: err.response.data.Error
            });
            return err;
        }
    };

    const login = async (formData) => {
        try {
            const res = await axios.post('http://localhost:5000/api/users/signing', formData);
            dispatch({ type: 'LOGIN_SUCCESS', payload: res.data });
            // loadUser();
            return res;
        } catch (err) {
            dispatch({ type: 'LOGIN_FAIL', payload: err.response.data.msg });
            return err;
        }
    };

    const logout = () => dispatch({ type: 'LOGOUT' });

    return (
        <AuthContext.Provider
            value={{
                ...state,
                register,
                login,
                logout,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

// Define useAuth hook to consume AuthContext
export const useAuth = () => useContext(AuthContext);

export default AuthContext;
