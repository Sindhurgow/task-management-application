import {Route, Routes, BrowserRouter} from 'react-router-dom'

import Home from './pages/home';
import Add from './pages/add';
import EditWrapper from './pages/editwrap';
import './App.css';

const App = () => (
    <BrowserRouter>
        <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/add" element={<Add />} />
            <Route exact path="/edit/:id" element={<EditWrapper />} />
        </Routes>
    </BrowserRouter>
)

export default App;
