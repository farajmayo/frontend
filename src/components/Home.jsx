import React from 'react';
import { Link } from 'react-router-dom';

// Component for the home page
const Home = () => {
  return (
    <div className="container">
      <div className="row mt-5">
        <div className="col-md-6 offset-md-3">
          <h2 className="text-center mb-4">Welcome to Your App</h2>
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Manage Users</h5>
              <p className="card-text">Add, edit, and delete user information.</p>
              {/* Link to the page that displays all users */}
              <Link to="/all" className="btn btn-primary mr-2">View All Users</Link>
              {/* Link to the page for adding a new user */}
              <Link to="/add" className="btn btn-success">Add New User</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
