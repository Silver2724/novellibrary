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
            const token = localStorage.getItem("token");
            if (!token) return;

            const res = await fetch("http://localhost:8080/api/novels/library", {
                headers: { "Authorization": `Bearer ${token}` }
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

    fetchLibrary();
    }, []);

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