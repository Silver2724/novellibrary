import React, { useState } from "react";

export default function Login({ onLogin }) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        const response = await fetch("http://localhost:8080/api/auth/login", {
            method: "POST",
            headers: { "Content-Type": "application/json"},
            body: JSON.stringify({ username, password }),
        });

        const data = await response.json();

        if(response.ok) {
            alert("Login successful.");
            onLogin(data.id); //pass user ID up to APP
        } else {
            alert(data.error || "Login failed.");
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Login</h2>
            <input
                type="text"
                placeholder="Type in email address...."
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />
            <br/>
            <input
                type="password"
                placeholder="Type in password...."
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <br />
            <button type="submit">Login</button>                            
        </form>
    );
} 