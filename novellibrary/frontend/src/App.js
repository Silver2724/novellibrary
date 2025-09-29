import React, { useEffect, useState} from 'react';
import { searchNovels, getLibrary, saveNovel, deleteNovel} from './api';
import NavBar from './components/NavBar';
import Home from './components/Home';
import Search from './components/Search';
import SearchBar from './components/SearchBar';
import Library from './components/Library';
import { Route, Routes } from 'react-router-dom';
import Login from './components/Login';

export default function App() {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);
    const [library, setLibrary] = useState([]);
    const [userId, setUserId] = useState(null);

    <Login onLogin={(id) => setUserId(id)} />

    useEffect(() => { refreshLibrary(); }, []);

    async function refreshLibrary() {
        const lib = await getLibrary();
        setLibrary(lib);        
    }

    async function handleSearch(q) {
        setQuery(q);
        if(!q) {
            setResults([]);
            return;
        }
        const r = await searchNovels(q);
        setResults(r);
    }

    async function handleSave(id) {
        await saveNovel(id);
        await refreshLibrary();        
    }

    async function handleDelete(id) {
        await deleteNovel(id);
        await refreshLibrary();        
    }

    return (
        <div>
            <NavBar />
            <div className='contained'>
                <Routes>
                    <Route path='/' element={<Home />} />
                    <Route path='/library' element={<Library />}/>
                    <Route path='/search' element={<Search />}/>
                </Routes>
            </div>          
        </div>
    );
}