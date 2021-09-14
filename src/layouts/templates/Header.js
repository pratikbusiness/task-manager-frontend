import React,{useState,useEffect,useContext} from 'react'
import {Link} from 'react-router-dom'
import {IconContext} from 'react-icons'
import {FaBars} from 'react-icons/fa'
import {AiFillCloseCircle} from 'react-icons/ai'
import AuthContext from "../../context/AuthContext.js";
import PrefixContext from "../../context/PrefixContext.js";


function LoggedOutNavTabs(props){
    return (<>
        <Link onClick={props.closeSidebar} to="/login" className={(props.href === 'login' || props.href === '')?'active':''}>Login</Link>
        <Link onClick={props.closeSidebar} to="/signup" className="btn-primary p-0 py-2 px-3 mx-3 text-light">Signup</Link>
    </>)
}

function LoggedInNavTabs(props){
    const AuthContextData = useContext(AuthContext);
    return (<>
        <Link onClick={props.closeSidebar} to="/task-manager" className={'mx-3'+((props.href === 'task-manager')?' active':'')}>Task Manager</Link>
        <p href="#" onClick={()=>AuthContextData.manualLogout()} className="cursor-pointer d-inline-block m-0 p-0 py-2 px-3 mx-3" style={{padding:'20px'}}>Logout</p>
    </>);
}

function Header() {

    let AuthContextData = useContext(AuthContext);
    const PrefixContextData = useContext(PrefixContext);

    const [href, sethref] = useState(null);
    const [sidebarStatus, setsidebarStatus] = useState(false);
    const closeSidebar = () => setsidebarStatus(false);
    const headerStylingonScroll = () => {
        let header = document.getElementById('header');
        if(header !== undefined && header !== null)
        {
            if (window.scrollY > 20) {
                header.classList.add('header-scrolled');
            } else {
                header.classList.remove('header-scrolled');
            }
        }
    }

    const addEventListeners = () =>{
        window.addEventListener('scroll',headerStylingonScroll);
    }

    const getHref = () => {
        sethref(window.location.href.split('/')[3]);
    }

    useEffect(() => {
        addEventListeners();
        headerStylingonScroll();
        getHref();
    })

    const toggleSidebar = () => {
        if(sidebarStatus === false)
        {
            setsidebarStatus(true)
        }
        else{
            setsidebarStatus(false)
        }
    }

    return (
    <>
        <header id="header">
            <div className="container d-flex justify-content-between">
                <Link to="/">
                    <img src={PrefixContextData.cdnPrefixUrl+'logo_ofMSo65Kq.png'} id="header-img" alt="Devbytes"/>
                </Link>
                <div className="sidebarToggler d-none" style={{margin:'auto 20px'}} onClick={()=>toggleSidebar()}>
                    <IconContext.Provider value={{size:'20px'}}>
                        {sidebarStatus === false ? <FaBars/> : <AiFillCloseCircle/>}
                    </IconContext.Provider>
                </div>
                <div className={(sidebarStatus === true) ? "my-auto nav-tabs-container show":"my-auto nav-tabs-container" }>
                    {AuthContextData.loginStatus === 'LOGGED_IN' && <LoggedInNavTabs closeSidebar={closeSidebar} href={href}/> }
                    {AuthContextData.loginStatus === 'LOGGED_OUT' && <LoggedOutNavTabs closeSidebar={closeSidebar} href={href}/> }
                    {AuthContextData.loginStatus === undefined && <LoggedOutNavTabs closeSidebar={closeSidebar} href={href}/> }
                </div>
            </div>
        </header>
    </>
    )
}

export default Header
