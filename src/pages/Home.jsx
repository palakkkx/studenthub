import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="home-container">
      <h1>🎓 Welcome to StudentHub</h1>
      <p>Your one-stop platform for sharing notes and learning resources.</p>

      <div className="dashboard-grid">
        <div className="card">
          <h2>📝 Posts</h2>
          <p>Create and manage your study posts.</p>
          <Link to="/posts">
            <button>Go to Posts</button>
          </Link>
        </div>

        <div className="card">
          <h2>👤 Profile</h2>
          <p>View and update your profile.</p>
          <Link to="/profile">
            <button>View Profile</button>
          </Link>
        </div>

        <div className="card">
          <h2>🚀 Quick Start</h2>
          <p>Share notes, assignments, and resources with your classmates.</p>
        </div>
      </div>
    </div>
  );
}

export default Home;