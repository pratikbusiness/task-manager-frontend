import React,{useEffect,useContext} from 'react';
import Header from '../templates/Header.js';
import Footer from '../templates/Footer.js';
import { Redirect } from 'react-router';
import AuthContext from '../../context/AuthContext.js';

function ProtectedLayout(props) {

    const AuthContextData = useContext(AuthContext);
    useEffect(() => {
        AuthContextData.checkLoginStatus();
    })
    
    return (
        <>
            {AuthContextData.loginStatus === 'LOGGED_IN' && <>
                <Header></Header>
                    {props.children}
                <Footer></Footer>
            </>}
            {AuthContextData.loginStatus === 'LOGGED_OUT' && <Redirect to="/" />}
        </>
    )
}

export default ProtectedLayout