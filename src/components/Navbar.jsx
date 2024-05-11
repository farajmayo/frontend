import React from 'react';
import { Link } from 'react-router-dom';

// Component for the navigation bar
const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      {/* Link to the home page */}
      <Link className="navbar-brand" to="/home">Mern</Link>
      {/* Navbar toggler for mobile */}
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav">
          {/* Link to the page for creating a new post */}
          <li className="nav-item">
            <Link className="nav-link active text-info" to="/">Create Post</Link>
          </li>
          {/* Link to the page for viewing all posts */}
          <li className="nav-item">
            <Link className="nav-link text-muted" to="/all">All Posts</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
