import { useState, useEffect } from "react";
import "./Library.css";

export default function Library() {
    const [library, setLibrary] = useState([]);
    const [error, setError] = useState(null);

    const token = localStorage.getItem("token");

    // fetch library on load
    useEffect(() => {
        const fetchLibrary = async () => {
        try {
            const res = await fetch("http://localhost:8080/api/novels", {
                headers: {"Authorization": `Bearer ${token}`}
            });
            if (!res.ok) throw new Error("Failed to load library");

            const data = await res.json();
            setLibrary(data);
            setError(null);
        } catch (err) {
            console.error("Fetch library failed:", err);
            setError("❌ Could not load library");
        }
    };
    if(token) fetchLibrary();
    }, [token]);

    

    const handleRemove = async (id) => {
        try {
            const res = await fetch(`http://localhost:8080/api/novels/${id}`, {
                method: "DELETE",
                headers: {"Authorization": `Bearer ${token}`}
            });
            if (!res.ok) throw new Error("Failed to delete novel");

            // update local state after successful delete
            setLibrary(prev => prev.filter(n => n.id !== id));
            setError(null);
        } catch (err) {
            console.error("Delete failed:", err);
            setError("Failed to remove novel");
        }
    };

    return (
        <div>
            <h1 className="title">Your Library</h1>
            {error && <p style={{ color: "red" }}>{error}</p>}
            {library.length === 0 ? (
                <p>No books saved yet.</p>
            ) : (
                <ul style={{ listStyle: "none", padding: 0 }}>
                    {library.map((book) => (
                        <li key={book.id} style={{ padding: 8, borderBottom: "1px solid #ddd" }}>
                            <strong>{book.title}</strong> - <em>{book.author}</em>
                            <div style={{ marginTop: 6 }}>
                                <small>{book.description}</small>
                                <p></p>
                                <small>Link to Book: <a href={book.sourceURL} target="_blank" rel="noreferrer">{book.title}</a></small>
                            </div>
                            <div style={{ marginTop: 8 }}>
                                <button onClick={() => handleRemove(book.id)}>
                                    Remove
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

    
            /* <h2>Your Private Library</h2>
            <ul style={{listStyle: 'none', padding: 0}}>
                {novels.map(n => (
                    <li key={n.id} style={{padding: 8, borderBottom: '1px solid #eee'}}>
                        <div style={{display:'flex', justifyContent:'space-between',alignItems:'center'}}>
                            <div>
                                <strong>{n.title}</strong> - <em>{n.author}</em>
                                <div><small>{n.description?.slice(0, 200)}</small></div>
                                {n.sourceUrl ? <div><a href={n.sourceUrl} target="_blank" rel="noreferrer">Source</a></div> : null}
                                <div><small>Added: {new Date(n.addedAt).toLocaleString()}</small></div>
                            </div>
                            <div>
                                <button onClick={ () => onDelete(n.id)}>Delete</button>
                            </div>
                        </div>
                    </li>
                ))}
            </ul> */