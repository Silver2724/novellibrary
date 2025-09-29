import React, { useState } from "react";

export default function Register() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        const response = await fetch("http://localhost:8080/api/auth/register", {
            method: "POST",
            headers: { "Content-Type": "application/json"},
            body: JSON.stringify({ username, password }),
        });

        const data = await response.json();

        if(response.ok) {
            alert("Registration successful.");
        } else {
            alert(data.error || "Registration failed.");
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Register</h2>
            <input
                type="text"
                placeholder="Type in email address...."
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <br/>
            <input
                type="password"
                placeholder="Type in password...."
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <br />
            <button type="submit">Register</button>                            
        </form>
    );
} 