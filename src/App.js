import Routes from './routes/index.js'
import './App.css';

//Context
import {PrefixContextProvider} from "./context/PrefixContext.js";
import {AuthContextProvider} from "./context/AuthContext.js";

function App() {
  return (
    <>
      <AuthContextProvider>
        <PrefixContextProvider>
          <Routes/>
        </PrefixContextProvider>
      </AuthContextProvider>
    </>
  );
}

export default App;
