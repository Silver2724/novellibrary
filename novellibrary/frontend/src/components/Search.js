import { useEffect, useState } from "react";
import SearchBar from "./SearchBar";
import SearchResults from "./SearchResults";
import "./Search.css";

export default function Search() {
    const[results, setResults] = useState([]);
    const[library, setLibrary] = useState([]);

    const handleSearch = async (query) => {
        //call backend APi here
        try {
            const res = await fetch(`http://localhost:8080/api/search?q=${encodeURIComponent(query)}`);
            const data = await res.json();
            setResults(data);
        } catch (err) {
            console.error("Search failed: ", err)
        }
    };

    const handleSave = async (novel) => {
        try {
            const res = await fetch(`http://localhost:8080/api/novels/#{userId}`, {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(novel),
            });

            if(!res.ok) {
                throw new Error("Failed to save novel.");
            }

            const saved = await res.json();
            console.log("Saved to library: ", saved);

            alert(`Saved "${saved.title}" to your library!`);

            setLibrary((prev) => {
                if(prev.find((n) => n.title === novel.title && n.author === novel.author)) {
                    return prev;
                }
                return [...prev, novel];
            });
        } catch (err) {
            console.error("Save failed: ", err);
            alert(`Failed to save novel. Please try again.`);
        }
    
        console.log("Saving novel: ", novel);
    };

    return (
        <div>
            <h1 className="title">Search Novels</h1>
            <SearchBar onSearch={handleSearch}/>
            <SearchResults results={results} onSave={handleSave}/>          
        </div>    
    );
}