const API_BASE = process.env.REACT_APP_API_BASE || '/api';

export async function searchNovels(query) {
    const res = await fetch(`${API_BASE}/search?=q=${encodeURIComponent(query)}`);
    return res.json();
}

export async function getLibrary() {
    const res = await fetch(`${API_BASE}/novels`);
    return res.json();
}

export async function saveNovel(novel) {
    const res = await fetch(`${API_BASE}/novels`, {
        method: 'POST',
        headers: { "Content-Type": "application/json", "Authorization": `Bearer ${localStorage.getItem("token")}` },
        body: JSON.stringify(novel)
    });
    return res.json();
}

export async function deleteNovel(id) {
    const res = await fetch(`${API_BASE}/novels/${id}`, {method: 'DELETE'});
    return res.json();
}