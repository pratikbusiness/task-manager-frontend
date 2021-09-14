import React,{ useContext } from 'react'
import AuthContext from "../context/AuthContext.js";
import {BrowserRouter as Router,Route,Switch,Redirect} from 'react-router-dom'

import MainLayout from '../layouts/MainLayout/index.js'
import ProtectedLayout from '../layouts/ProtectedLayout/index.js'

import Loading from '../components/Loading/index.js'

import TaskManager from '../pages/TaskManager/index.js'
import Signup from '../pages/Signup/index.js'
import Login from '../pages/Login/index.js'
import NotFound from '../pages/NotFound/index.js'

function RouterWrapper() {

    let AuthContextData = useContext(AuthContext);

    return (
        <Router>
            <Switch>
                {/* Loggged In Only Routes */}
                <Route exact path="/task-manager">
                    {AuthContextData.loginStatus === undefined && <MainLayout><Loading type="withImage"/></MainLayout>}
                    {AuthContextData.loginStatus === 'LOGGED_IN' && <ProtectedLayout><TaskManager/></ProtectedLayout>}
                    {AuthContextData.loginStatus === 'LOGGED_OUT' && <Redirect to="/login"/>}
                </Route>
                {/* Loggged Out Only Routes */}
                <Route exact path="/signup">
                    {AuthContextData.loginStatus === undefined && <MainLayout><Loading type="withImage"/></MainLayout>}
                    {AuthContextData.loginStatus === 'LOGGED_OUT' && <MainLayout><Signup/></MainLayout>}
                    {AuthContextData.loginStatus === 'LOGGED_IN' && <Redirect to="/task-manager"/>}
                </Route>
                <Route exact path="/login">
                    {AuthContextData.loginStatus === undefined && <MainLayout><Loading type="withImage"/></MainLayout>}
                    {AuthContextData.loginStatus === 'LOGGED_OUT' && <MainLayout><Login/></MainLayout>}
                    {AuthContextData.loginStatus === 'LOGGED_IN' && <Redirect to="/task-manager"/>}
                </Route>
                <Route exact path="/">
                    {AuthContextData.loginStatus === undefined && <MainLayout><Loading type="withImage"/></MainLayout>}
                    {AuthContextData.loginStatus === 'LOGGED_OUT' && <MainLayout><Login/></MainLayout>}
                    {AuthContextData.loginStatus === 'LOGGED_IN' && <Redirect to="/task-manager"/>}
                </Route>
                <Route>
                    <MainLayout>
                        <NotFound/>
                    </MainLayout>
                </Route>
          </Switch>
        </Router>
    )
}

export default RouterWrapper
