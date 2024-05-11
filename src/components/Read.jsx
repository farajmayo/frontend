import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

// Component for displaying all users
const Read = () => {
  const [data, setData] = useState([]); // State to hold user data
  const [error, setError] = useState(""); // State for error message

  // Function to fetch data from the server
  const getData = async () => {
    try {
      const response = await fetch("http://localhost:2025");
      const result = await response.json();

      if (!response.ok) {
        setError(result.error || 'Failed to fetch data');
        return;
      }

      setData(result.Users || []); // Update data state with fetched data
      setError("");
    } catch (error) {
      console.error(error);
      setError("Failed to fetch data");
    }
  };

  useEffect(() => {
    // Fetch data when the component mounts
    getData();
  }, []);

  // Function to handle user deletion
  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:2025/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      const result = await response.json();

      if (!response.ok) {
        setError(result.error || 'Failed to delete user');
        return;
      }

      setError("Deleted");

      // Clear error message and fetch updated data after 2 seconds
      setTimeout(() => {
        setError("");
        getData();
      }, 2000);
    } catch (error) {
      console.error(error);
      setError("Failed to delete user");
    }
  }

  return (
    <div className='container'>
      {error && <div className="alert alert-danger">{error}</div>}
      <h2>Show All Data</h2>
      <div className='row'>
        {/* Map through data array and display user information */}
        {Array.isArray(data) && data.map((element) => (
          <div key={element._id} className='col-4 my-3'>
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">{element.name}</h5>
                <h6 className="card-subtitle mb-2 text-muted">{element.email}</h6>
                <h6 className="card-subtitle mb-2">{element.age}</h6>
                {/* Button to delete user */}
                <button className="btn btn-primary mx-2 my-2" onClick={() => handleDelete(element._id)}>Delete</button>
                {/* Link to edit user */}
                <Link to={`/${element._id}`} className="btn btn-primary mx-2 my-2">Edit</Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Read;
