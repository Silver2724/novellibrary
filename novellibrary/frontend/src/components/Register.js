import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const API_BASE_URL = process.env.REACT_APP_API_URL;

export default function Register() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    console.log("API_BASE_URL:", process.env.REACT_APP_API_URL);

    const handleRegister = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(`${API_BASE_URL}/api/auth/register`, {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({ name, email, password }),
            });

            if(!response.ok) {
                const errText = await response.text();
                setError(`Registration failed: ${errText}`);
                return;
            }

            alert("Registration successful! You can now log in!");
            navigate("/login");

        } catch (err) {
            console.error(err);
            setError("Something went wrong.")
        }      
    };

    return (
        <div>
            <h2>Register</h2>
            <form onSubmit={handleRegister}>
                <input
                    type="text"
                    placeholder="Full name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <br />
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
            {error && <p style={{color: "red" }}>{error}</p>}
            <p>
                Already have an account? <Link to="/login">Login</Link>
            </p>
        </div>       
    );
} 