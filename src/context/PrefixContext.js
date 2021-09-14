import { createContext } from "react";
import environmentSettings from '../environment.js'

const PrefixContext = createContext();

function PrefixContextProvider(props) {
    return(
        <PrefixContext.Provider value={{
                prefixUrl:environmentSettings.prefixUrl,
                cdnPrefixUrl:environmentSettings.cdnPrefixUrl
            }}>
            {props.children}
        </PrefixContext.Provider>
    );
}

export { PrefixContextProvider };
export default PrefixContext;
