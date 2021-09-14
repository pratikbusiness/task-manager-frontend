import React from 'react'
import Header from '../templates/Header.js'
import Footer from '../templates/Footer.js'

function MainLayout(props) {
    return (
        <>
            <Header></Header>
                {props.children}
            <Footer></Footer>
        </>
    )
}

export default MainLayout