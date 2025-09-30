import React, { useEffect, useState} from 'react';
import NavBar from './components/NavBar';
import Home from './components/Home';
import Search from './components/Search';
import Library from './components/Library';
import { Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import Account from './components/Account';
import ResetPassword from './components/ResetPassword';

export default function App() {
    const [query, setQuery] = useState('');
    //const [results, setResults] = useState([]);
    //const [library, setLibrary] = useState([]);
    const [user, setUser] = useState(null);

    useEffect(() => { 
        const stored = localStorage.getItem("user");
        if (stored) setUser(JSON.parse(stored));
     }, []
    );

    return (
        <div>
            <NavBar user={user} setUser={setUser}/>
            <div className='contained'>
                <Routes>
                    <Route path='/' element={<Home />} />
                    <Route path='/search' element={<Search />}/>
                    <Route path='/library' element={<Library />} />
                    <Route path='/login' element={<Login setUser={setUser} />} />
                    <Route path='/register' element={<Register />}/>
                    <Route path='/account' element={<Account user={user} />} />
                    <Route path='/reset-password' element={<ResetPassword />} />
                </Routes>
            </div>          
        </div>
    );
}