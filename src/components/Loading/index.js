import React,{useContext} from 'react'
import PrefixContext from "../../context/PrefixContext.js";

function LoadingComponent(props) {
    
    const PrefixContextData = useContext(PrefixContext);
    const LoadingImage = PrefixContextData.cdnPrefixUrl+'loading_SW3TkZSZj.gif';
    let clasNames = 'd-flex flex-column justify-content-center'
    clasNames += (props.size!=='small') ? ' new-section page-heading-margin' : '';
    return (
        <>
            <div className={clasNames}>
                <div className="text-center">
                    {props.type === "withImage" && <img style={{width:'25%',maxWidth:'70px'}} src={LoadingImage} alt="Loading"/>}
                    <p className="my-auto">{(props.label === undefined)?'Loading':props.label+' ...'}</p>
                </div>
            </div>
        </>
    )
}

export default LoadingComponent
