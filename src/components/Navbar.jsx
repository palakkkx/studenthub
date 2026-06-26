import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav>

      <h2>StudentHub</h2>

      <div className="nav-links">

        <Link to="/">Home</Link>

        <Link to="/posts">
          Posts
        </Link>

        <Link to="/profile">
          Profile
        </Link>

      </div>

    </nav>
  );
}

export default Navbar;