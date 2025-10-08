import { Link } from "react-router-dom";
import './NavBar.css';

export default function NavBar({ user, setUser }) { 
    const handleLogout = () => {
        localStorage.removeItem("token");
        setUser(null);
    }
    return (
        <nav className="navbar"> 
            <div className="nav-links">
                <Link to="/">Home</Link> 
                <Link to="/search">Search Novels</Link>
                {user ? (
                    <>
                        <Link to="/library">Library</Link>
                        <Link className="Account" to="/account">Account</Link>
                        <button className="Account" onClick={handleLogout}>Logout</button>
                    </> 
                    ) : (
                        <Link to="/login">Login</Link>
                    )
                }
            </div>           
        </nav>
    );
}