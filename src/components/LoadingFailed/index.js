import React,{useContext} from 'react'
import PrefixContext from "../../context/PrefixContext.js";

function LoadingFailed(props) {
    
    const PrefixContextData = useContext(PrefixContext);
    const LoadingImage = PrefixContextData.cdnPrefixUrl+'loadingerror_uTCML9RVz.svg';

    return (
        <>
            <div className="d-flex flex-column mt-3 mt-md-4 justify-content-center">
                <div className="text-center">
                    {props.type === "withImage" && <img style={{width:'25%',maxWidth:'400px'}} src={LoadingImage} alt="Loading"/>}
                    <h6 className="mt-3 mt-md-4">{(props.label === undefined) ? 'Loading failed please refresh the page.': props.label} </h6>
                </div>
            </div>
        </>
    )
}

export default LoadingFailed
