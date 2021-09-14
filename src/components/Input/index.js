import React from 'react'

function InputComponent(props) {
    return (
        <>
        <div className="inputcomponent">
            <div className="inputgroup">
                {props.icon}
                <input placeholder={props.placeholder}
                    id={props.id}
                    readOnly={props.readOnly}
                    disabled={props.disabled}
                    type={props.type}
                    defaultValue={props.defaultValue}
                    name={props.name}
                    ref={props.initRef}
                    onChange={props.onChangeHandler}
                    className={(props.className!==undefined)? props.className + ' inputfield':' inputfield'}/>
            </div>
            <div className="validationError">{props.validationError}</div>
        </div>
        </>
    )
}

export default InputComponent
