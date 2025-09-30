import { useEffect, useState } from "react";
import SearchBar from "./SearchBar";
import SearchResults from "./SearchResults";
import "./Search.css";

// export default function Search() {
//     const[results, setResults] = useState([]);
//     const[library, setLibrary] = useState([]);
//     //const [query, setQuery] = useState("");
//     //const user = JSON.parse(localStorage.getItem("user")); 

//     // const handleSearch = async (query) => {
//     //     //call backend APi here
//     //     try {
//     //         if(!user) {
//     //             alert("Please log in to search your library.");
//     //             return;
//     //         }

//     //         const res = await fetch(`http://localhost:8080/api/search?q=${encodeURIComponent(query)}`);
//     //         const data = await res.json();
//     //         setResults(data);
//     //     } catch (err) {
//     //         console.error("Search failed: ", err);
//     //     }
//     // };

//     const handleSearch = async (query) => {
//         //call backend APi here
//         try {
//             const res = await fetch(`http://localhost:8080/api/search?q=${encodeURIComponent(query)}`);
//             const data = await res.json();
//             setResults(data);
//         } catch (err) {
//             console.error("Search failed: ", err)
//         }
//     };

//     // const handleAdd = async (novel) => {
//     //     try {
//     //         if(!user) {
//     //         alert("Please log in to add books");
//     //             return;
//     //         }

//     //         const res = await fetch(`http://localhost:8080/api/novels/${user.email}/add`, {
//     //             method: "POST",
//     //             headers: { "Content-Type": "application-json"},
//     //             body: JSON.stringify(novel)
//     //         });

//     //         if(!res.ok) throw new Error("Failed to add book.");
//     //         const saved = await res.json();
//     //         alert(`"${saved.title}" has been added to your library!`);

//     //         setLibrary((prev) => [...prev, saved]);
//     //     } catch (err) {
//     //         console.error("Add failed: ", err);
//     //         alert("Failed to add book. Please try again.");
//     //     }
//     // }

//     const handleSave = async (novel) => {
//         try {
//             const res = await fetch(`http://localhost:8080/api/novels/#{userId}`, {
//                 method: "POST",
//                 headers: {"Content-Type": "application/json"},
//                 body: JSON.stringify(novel),
//             });

//             if(!res.ok) {
//                 throw new Error("Failed to save novel.");
//             }

//             const saved = await res.json();
//             console.log("Saved to library: ", saved);

//             alert(`Saved "${saved.title}" to your library!`);

//             setLibrary((prev) => {
//                 if(prev.find((n) => n.title === novel.title && n.author === novel.author)) {
//                     return prev;
//                 }
//                 return [...prev, novel];
//             });
//         } catch (err) {
//             console.error("Save failed: ", err);
//             alert(`Failed to save novel. Please try again.`);
//         }
    
//         console.log("Saving novel: ", novel);
//     };

//     return (
//         <div>
//             <h1 className="title">Search Novels</h1>
//             <SearchBar onSearch={handleSearch} query={query} setQuery={setQuery}/>
//             <SearchResults results={results} onSave={handleSave}/>          
//         </div>
//         // <div>
//         //     <h2>Search</h2>
//         //         <input
//         //         type="text"
//         //         placeholder="Search by title"
//         //         value={query}
//         //         onChange={(e) => setQuery(e.target.value)}
//         //     />
//         //     <button onClick={handleSearch}>Search</button>

//         //     <ul>
//         //         {results.map((novel) => (
//         //         <li key={novel.id}>
//         //             {novel.title} by {novel.author}
//         //             <button onClick={() => handleAdd(novel)}>Add</button>
//         //         </li>
//         //         ))}
//         //     </ul>
//         // </div> 
//     );
// }

export default function Search() {
    const[results, setResults] = useState([]);
    const[library, setLibrary] = useState([]);

    const handleSearch = async (query) => {
        //call backend APi here
        try {
            const res = await fetch(`http://localhost:8080/api/search?q=${encodeURIComponent(query)}`, 
            {
                method: "GET",
                headers: {"Authorization": `Bearer ${localStorage.getItem("token")}`}
            }       
            );

            if (!res.ok) {
                throw new Error(`Search failed: ${res.status}`);
            }
            
            const data = await res.json();
            setResults(data);
        } catch (err) {
            console.error("Search failed: ", err)
        }
    };

    const handleSave = async (novel) => {
        try {
            const res = await fetch(`http://localhost:8080/api/novels`, {
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