import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import EmployerDashboard from "./Pages/EmployerDashboard";
import CandidateDashboard from "./Pages/CandidateDashboard";
import Post from "./Pages/Post";
import Layout from "./Layout";
import Jobs from "./Pages/Jobs";
import JobDetails from "./Pages/JobDetails";
import Register from "./Pages/Register";
import Login from "./Pages/Login";
import { Toaster } from "react-hot-toast";
import ProtectedRoute from "./Components/ProtectedRoute";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/employer-dashboard" element={<EmployerDashboard />} />
          <Route path="/candidate-dashboard" element={<CandidateDashboard />} />
          <Route path="/jobs" element={<Jobs />} />
          <Route path="/jobs/:id" element={<JobDetails />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/post" element={<Post />} />
          </Route>
        </Route>
      </Routes>
      <Toaster position="top-left" />
    </Router>
  );
};

export default App;
