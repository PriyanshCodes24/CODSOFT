import { BrowserRouter as Router } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import AnimatedRoutes from "./Routes/AnimatedRoutes";

const App = () => {
  return (
    <Router>
      <AnimatedRoutes />
      <Toaster position="top-left" />
    </Router>
  );
};

export default App;
