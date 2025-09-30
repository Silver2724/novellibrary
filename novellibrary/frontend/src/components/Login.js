// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { Link } from "react-router-dom";

// export default function Login({ setUser }) {
//     const [email, setEmail] = useState("");
//     const [password, setPassword] = useState("");
//     const [error, setError] = useState("");
//     const navigate = useNavigate();

//     const handleLogin = async (e) => {
//         e.preventDefault();

//         try {
//             const response = await fetch("http://localhost:8080/api/auth/login", {
//                 method: "POST",
//                 headers: { "Content-Type": "application/json"},
//                 body: JSON.stringify({ email, password }),
//             });

//             if(!response.ok) {
//                 setError("Invalid email or password.");
//                 return;
//             }

//             const user = await response.json();
//             localStorage.setItem("user", JSON.stringify(user));
//             setUser(user);
//             navigate("/account");
//         } catch (err) {
//             console.error(err);
//             setError("Login failed. Try again.")
//         }
        
//     };

//     return (
//         <div className="login-page">
//             <h2>Login</h2>
//             <form onSubmit={handleLogin}>
//                 <input
//                     type="email"
//                     placeholder="Type in email address...."
//                     value={email}
//                     onChange={(e) => setEmail(e.target.value)}
//                     required
//                 />
//                 <input
//                     type="password"
//                     placeholder="Type in password...."
//                     value={password}
//                     onChange={(e) => setPassword(e.target.value)}
//                     required
//                 />
//                 <button type="submit">Login</button>
//             </form>
//             {error && <p style={{color: "red" }}>{error}</p>}
//             <p>
//                 Don't have an account? <Link to="/register">Register here</Link>
//             </p>
//         </div>
//     );
// }  

import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

export default function Login({ setUser }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const res = await fetch("http://localhost:8080/api/auth/login", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({ email, password }),
      });
      if (!res.ok) {
        setError("Invalid email or password");
        return;
      }
      const user = await res.json();
      localStorage.setItem("token", user.token);
      setUser(user);
      navigate("/account");
    } catch (err) {
      console.error(err);
      setError("Login failed. Try again.");
    }
  };

  return (
    <div className="login-page">
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Login</button>
      </form>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <p>
        <Link to="/register">Don’t have an account?</Link>
      </p>
      <p>
        <Link to ="/reset-password">Forgot Password?</Link>
      </p>
    </div>
  );
}
