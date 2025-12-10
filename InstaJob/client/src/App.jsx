import {BrowserRouter as Router,Routes,Route } from "react-router-dom";
import Home from "./Components/Home";
import EmployerDashboard from "./Components/EmployerDashboard";
import CandidateDashboard from "./Components/CandidateDashboard";
import Form from "./Components/Form";
import Layout from "./Layout";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout/>}>
          <Route path="/" element={<Home/>}/>
          <Route path="/employer-dashboard" element={<EmployerDashboard/>}/>
          <Route path="/candidate-dashboard" element={<CandidateDashboard/>}/>
          <Route path="/form" element={<Form/>}/>
        </Route>
      </Routes>
    </Router>
  )
}

export default App