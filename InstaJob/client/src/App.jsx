import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import RecruiterDashboard from "./Pages/RecruiterDashboard";
import ApplicantDashboard from "./Pages/ApplicantDashboard";
import Post from "./Pages/Post";
import Layout from "./Layout";
import Jobs from "./Pages/Jobs";
import JobDetails from "./Pages/JobDetails";
import Register from "./Pages/Register";
import Login from "./Pages/Login";
import { Toaster } from "react-hot-toast";
import ProtectedRoute, {
  RoleProtectedRoute,
} from "./Components/ProtectedRoute";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/applicant-dashboard" element={<ApplicantDashboard />} />
          <Route path="/jobs" element={<Jobs />} />
          <Route path="/jobs/:id" element={<JobDetails />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route element={<ProtectedRoute />}>
            <Route
              element={
                <RoleProtectedRoute allowedRoles={["recruiter", "admin"]} />
              }
            >
              <Route path="/post" element={<Post />} />
            </Route>
            <Route
              element={<RoleProtectedRoute allowedRoles={["recruiter"]} />}
            >
              <Route
                path="/recruiter-dashboard"
                element={<RecruiterDashboard />}
              />
            </Route>
          </Route>
        </Route>
      </Routes>
      <Toaster position="top-left" />
    </Router>
  );
};

export default App;
