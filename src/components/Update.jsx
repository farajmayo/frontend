import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

// Component for updating user data
const Update = () => {
    // Initialize state variables for name, email, age, and error message
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [age, setAge] = useState(null); // Initialize age as null
    const [error, setError] = useState("");

    const { id } = useParams();
    const navigate = useNavigate();

    // Function to fetch single user data
    const getSimpleUser = async () => {
        try {
            const response = await fetch(`http://localhost:2025/${id}`);
            const result = await response.json();

            if (!response.ok) {
                setError(result.error || 'Failed to fetch user data');
                return;
            }

            // Update state with user data
            setName(result.name);
            setEmail(result.email);
            // Convert age to number or null if it's not provided or empty
            setAge(result.age ? parseInt(result.age) : null);
            setError("");
        } catch (error) {
            console.error(error);
            setError("Failed to fetch user data");
        }
    };

    // Function to handle update of user data
    const handleUpdate = async (e) => {
        e.preventDefault();
        const updatedUser = { name, email, age };

        try {
            const response = await fetch(`http://localhost:2025/${id}`, {
                method: 'PATCH',
                body: JSON.stringify(updatedUser),
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            // Parse the response as JSON
            const result = await response.json();

            if (!response.ok) {
                setError(result.error || 'Failed to update user');
                return;
            }

            // If the request was successful, clear the form and error message
            setError("");
            navigate("/all"); // Redirect to the all users page after successful update
        } catch (error) {
            console.error(error);
            setError(error.message || "Failed to update data");
        }
    }

    useEffect(() => {
        // Call the getSimpleUser function when the component mounts
        getSimpleUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
      <div className="container my-2">
        {error && <div className="alert alert-danger">{error}</div>}
        <h2 className='text-center text-primary'>Edit Data</h2>
        <form onSubmit={handleUpdate}>
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
            {/* Ensure input is empty string if age is null */}
            <input type="number" className="form-control" placeholder="Age" value={age === null ? '' : age} onChange={(e) => setAge(parseInt(e.target.value) || null)} />
          </div>
          <button type="submit" className="btn btn-primary">Submit</button>
        </form>
      </div>
    );
}

export default Update;
