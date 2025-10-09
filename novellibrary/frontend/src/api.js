const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080';

async function handleResponse(res) {
    if (!res.ok) {
        const text = await res.json();
        throw new Error(`Error ${res.status}: ${text}`);
    }
    return res.json();
}

export async function searchNovels(query) {
    const res = await fetch(`${API_BASE_URL}/api/novels/search?=q=${encodeURIComponent(query)}`);
    return handleResponse(res);
}

export async function getLibrary() {
    const res = await fetch(`${API_BASE_URL}/api/novels/library`, {
        headers: { "Authorization": `Bearer ${localStorage.getItem("token")}` }
    });
    return handleResponse(res);
}

export async function saveNovel(novel) {
    const res = await fetch(`${API_BASE_URL}/api/novels/library`, {
        method: 'POST',
        headers: { "Content-Type": "application/json", "Authorization": `Bearer ${localStorage.getItem("token")}` },
        body: JSON.stringify(novel)
    });
    return handleResponse(res);
}

export async function deleteNovel(id) {
    const res = await fetch(`${API_BASE_URL}/api/novels/${id}`, {
        method: 'DELETE',
        headers: { "Authorization": `Bearer ${localStorage.getItem("token")}` }
    });
    return handleResponse(res);
}