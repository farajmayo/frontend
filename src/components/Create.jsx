import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// Component for creating a new user
const Create = () => {
  // Initialize state variables for name, email, age, and error message
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate inputs
    if (!name || !email || !age) {
      setError("Please fill in all fields.");
      return;
    }

    if (isNaN(age) || parseInt(age) <= 0) {
      setError("Please provide a valid age.");
      return;
    }

    const addUser = { name, email, age };

    try {
      const response = await fetch("http://localhost:2025", {
        method: "POST",
        body: JSON.stringify(addUser),
        headers: {
          "Content-Type": "application/json"
        }
      });

      // Parse the response as JSON
      const result = await response.json();

      if (!response.ok) {
        setError(result.error || 'Failed to add user');
        return;
      }

      // If the request was successful, clear the form and error message
      console.log(result);
      setError("");
      setName("");
      setEmail("");
      setAge("");
      navigate("/all");

    } catch (error) {
      console.error(error);
      setError(error.message || "Failed to fetch data");
    }
  };

  // Render the form for creating a new user
  return (
    <div className="container my-2">
      {error && <div className="alert alert-danger">{error}</div>}
      <h2 className='text-center text-primary'>Enter Data</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label className='text-info'>Name</label>
          <input type="text" className="form-control" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        <div className="form-group">
          <label className='text-info'>Email address</label>
          <input type="email" className="form-control" placeholder="Enter email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div className="form-group">
          <label className='text-info'>Age</label>
          <input type="number" className="form-control" placeholder="Age" value={age} onChange={(e) => setAge(e.target.value)} />
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  );
};

export default Create;
