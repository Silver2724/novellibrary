import { Link } from "react-router-dom";
import './NavBar.css';

export default function NavBar() {
    return (
        <nav className="navbar"> 
            <div className="nav-links">
                <Link to="/">Home</Link>
                <Link to="/library">Library</Link>
                <Link to="/search">Search Novels</Link>
            </div>           
        </nav>
    );
}