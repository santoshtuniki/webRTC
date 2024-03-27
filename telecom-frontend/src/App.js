// module imports
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';

// css imports
import './App.css';

// util imports
import socketConnection from './utils/socketConnection';

// component imports
import MainVideoPage from './videoComponents/MainVideoPage';

const Home = () => <h1>Hello, Home page</h1>

const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route exact path='/' Component={Home} />
                <Route path='/join-video' Component={MainVideoPage} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
