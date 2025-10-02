import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Account() {
    const [user, setUser] = useState(null);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUser = async () => {
            const token = localStorage.getItem("token");

            if(!token)  {
                //navigate("/login");
                return;
            }

            try {
                const res = await fetch("http://localhost:8080/api/auth/me", {
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`
                    }
                });

                if(res.status === 401 || res.status === 403) {
                    localStorage.removeItem("token");
                    //navigate("/login");
                    return;
                }

                if(!res.ok) throw new Error("Failed to fetch user");

                const data = await res.json();
                setUser(data);
            } catch (err) {
                console.error("Fetch user failed: ", err);
                setError("Could not load account info");
            }
        };

        fetchUser();
    }, [navigate]);
    
    if(error) return <p style={{color: "red"}}>{error}</p>;
    if(!user) return <p>You are not logged in.</p>;

    return (
        <div className="account-page">
            <h2>Account Details</h2>
            <p><strong>Name: </strong> {user.name}</p>
            <p><strong>Email: </strong> {user.email}</p>
        </div>
    );
}