import { useState,createContext,useEffect } from "react";
import axios from 'axios';
import environmentSettings from '../environment.js'

const AuthContext = createContext();

function AuthContextProvider(props) {
    
    const [login, setlogin] = useState()
    const setLoggedIn = () => {
        setlogin('LOGGED_IN');
        setHeaders();
    }
    const setLoggedOut = () => {
        setlogin('LOGGED_OUT');
    }
    const logout = () => {
        localStorage.removeItem('auth-token');
        alert('Login Session Expired. Please login again');
        setlogin('LOGGED_OUT');
    }
    const manualLogout = () =>{
        localStorage.removeItem('auth-token');
        setlogin('LOGGED_OUT');
    }
    const checkLoginStatus = () => {
        if(localStorage.getItem('auth-token') === null){
            setlogin('LOGGED_OUT');
        }
        else{
            setHeaders();
            axios.get(environmentSettings.prefixUrl + 'user/verify')
            .then(response => {
                if(response.status === 200){
                    setlogin('LOGGED_IN');
                }
                else{
                    setlogin('LOGGED_OUT');
                }
            })
            .catch(error => {
                setlogin('LOGGED_OUT');
            });
        }
    }
    
    const setHeaders = () => {
        let token = localStorage.getItem('auth-token');
        axios.defaults.headers.common['authorization'] = token;
    }

    useEffect(checkLoginStatus,[])

    return(
        <AuthContext.Provider value={{loginStatus:login, logout, setLoggedIn, setLoggedOut, checkLoginStatus, manualLogout }}>
            {props.children}
        </AuthContext.Provider>
    );
}

export { AuthContextProvider };
export default AuthContext;