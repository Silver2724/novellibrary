import { useEffect, useState } from "react";
import SearchBar from "./SearchBar";
import SearchResults from "./SearchResults";
import "./Search.css";

export default function Search() {
    const[results, setResults] = useState([]);
    const[library, setLibrary] = useState([]);

    const token = localStorage.getItem("token");

    //load user's library on mount
    useEffect(() => {
        const fetchLibrary = async () => {
            try {
                const res = await fetch("http://localhost:8080/api/novels/library", {
                    headers: {"Content-Type": "application/json", "Authorization": `Bearer ${token}`}
                });

                if(!res.ok) {
                    throw new Error(`Library fetch failed: ${res.status}`);
                }

                const data = await res.json();
                setLibrary(data);
            } catch (err) {
                console.error("Failed to fetch library: ", err);
            }
        };
        if(token) fetchLibrary();
    }, [token]);

    //search novels
    const handleSearch = async (query) => {
        try {
            const apiKey = process.env.REACT_APP_GOOGLE_BOOKS_API_KEY; // store in .env
            const res = await fetch(
            `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(query)}&maxResults=10&key=${apiKey}`
            );

            if (!res.ok) {
                throw new Error(`Search failed: ${res.status}`);
            }
            
            const data = await res.json();
            setResults(data);
            const books = data.items?.map(item => {
                const info = item.volumeInfo || {};
                return {
                    title: info.title || "untitled",
                    author: info.authors || "Unknown Author(s)",
                    description: info.description || "No description available",
                    sourceURL:info.sourceURL || info.previewLink || "",
                };
            }) || [];
            setResults(books);
        } catch (err) {
            console.error("Search failed: ", err)
        }
    };

    const handleSave = async (novel) => {
        try {
            if (!token) throw new Error("No token found, please login");

            const res = await fetch("http://localhost:8080/api/novels/library", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify(novel),
            });

            if (!res.ok) throw new Error("Failed to save novel.");

            const saved = await res.json();
            console.log("Saved to library: ", saved);

            alert(`Saved "${saved.title}" to your library!`);

        } catch (err) {
            console.error("Save failed: ", err);
            alert("Failed to save novel. Please try again.");
        }
    };


    return (
        <div>
            <h1 className="title">Search Novels</h1>
            <SearchBar onSearch={handleSearch}/>
            <SearchResults results={results} onSave={handleSave}/>          
        </div>    
    );
}