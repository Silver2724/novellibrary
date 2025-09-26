import React, {useState} from "react";

export default function SearchBar({ onSearch }) {
    const [q, setQ] = useState('');

    function submit(e) {
        e.preventDefault();
        if(q.trim()) {
            onSearch(q);
        }
    }

    return (
        <form onSubmit={submit} style={{display: 'flex', gap: 8, marginBottom: 12}}>
            <input 
                value={q} 
                onChange={e => setQ(e.target.value)} 
                placeholder="Search by title or author....." 
                style={{flex: 1, padding:8}}
            />
            <button type="submit">Search</button>
        </form>
        // <div>
        //     <input type="text" id="search" placeholder="Search by title or author...." />
        //     <button onClick={() => {
        //         const query = document.getElementById("search").ariaValueMax;
        //         onSearch(query);
        //     }}>Search</button>
        // </div>
    );
}