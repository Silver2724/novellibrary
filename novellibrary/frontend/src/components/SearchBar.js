import React, {useState} from "react";
import "./SearchBar.css";

//SearchBar is a controlled input component 
//handles user input and triggers a search when form is submitted
export default function SearchBar({ onSearch }) {
    const [q, setQ] = useState(''); //local state to store search text

    //called when form is submitted
    const handleSubmit = (e) => {
        e.preventDefault(); //prevent page reload
        if(q.trim()) {
            onSearch(q); //call parent function passed as a prop
        }
    }

    return (
        <form className="submitting" onSubmit={handleSubmit}>
            {/* Input field where user types search query */}
            <input
                className="searchQuery" 
                value={q} 
                onChange={e => setQ(e.target.value)} 
                placeholder="Search by title or author....." 
            />
            <button type="submit">Search</button>
        </form>
    );
}