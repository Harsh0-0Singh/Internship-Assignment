import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import AddSchool from "./Components/AddSchool";
import ShowSchools from "./Components/ShowSchools";

function App() {
  return (
    <Router>
      <nav className="p-4 bg-green-800 text-white rounded-b-2xl flex justify-between">
        <Link to="/">Add School</Link>
        <Link to="/schools">Show Schools</Link>
      </nav>

      <Routes>
        <Route path="/" element={<AddSchool />} />
        <Route path="/schools" element={<ShowSchools />} />
      </Routes>
    </Router>
  );
}

export default App;
