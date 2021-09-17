import { BrowserRouter, Route } from 'react-router-dom';

import { GoogleAuthContextProvider } from './contexts/GoogleAuthContext';

import { Feed } from './pages/Feed';
import { Home } from "./pages/Home";
import { Login } from "./pages/Login";
import { SignUp } from './pages/SignUp';

function App() {
    return (
        <BrowserRouter>
            <GoogleAuthContextProvider>
                <Route path="/" exact component={Home} />
                <Route path="/login" component={Login} />
                <Route path="/signup" component={SignUp} />
                <Route path="/feed" component={Feed} />
            </GoogleAuthContextProvider>
        </BrowserRouter>
    );
}

export default App;
