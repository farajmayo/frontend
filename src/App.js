// Importing necessary dependencies and components
import './App.css';
import Create from './components/Create';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"; // Importing BrowserRouter and Route related components
import Read from './components/Read';
import Update from './components/Update';
import Home from './components/Home';

function App() {
  return (
    <div className="App">
      <Router> {/* Router component to enable routing */}
        <Navbar /> {/* Navbar component */}
        <Routes> {/* Defining routes */}
          <Route exact path="/home" element={<Home />} /> {/* Route for Home component */}
          <Route exact path="/" element={<Create />} /> {/* Route for Create component */}
          <Route path="/all" element={<Read />} /> {/* Route for Read component */}
          <Route path="/:id" element={<Update />} /> {/* Route for Update component */}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
