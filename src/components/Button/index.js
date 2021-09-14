import React from 'react'

function ButtonComponent(props) {
    return (
        <>
            <button type={props.type} className={props.className}>{props.name}</button>
        </>
    )
}

export default ButtonComponent
