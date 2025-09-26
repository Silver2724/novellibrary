import React from "react";

export default function SearchResults({ results = [], onSave }) {
    if(!results.length) return <div>No Results</div>

    return (
        <div>
            <h2>Search Results</h2>
            <ul style={{listStyle: 'none', padding: 0}}>
                {results.map((r, idx) => (
                    <li key={idx} style={{padding: 8, borderBottom: '1px solid #ddd'}}>
                        <strong>{r.title}</strong> - <em>{r.author}</em>
                        <div style={{marginTop: 6}}>
                            <small>{r.description?.slice(0, 200)}</small>
                        </div>
                        <div style={{marginTop: 8}}>
                            <button onClick={ () => onSave({
                                title: r.title || '',
                                author: r.author || '',
                                description: r.description || '',
                                sourceURL: r.sourceURL || ''
                            })}>Save to Library</button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}