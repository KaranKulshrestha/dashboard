import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import { useAuth0 } from "@auth0/auth0-react";

const App = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();
  return (
    <BrowserRouter>
    <Routes>
        {isAuthenticated && <Route path="/dashboard" element={<Home />} />}
        {<Route path="/" element={<Login />} />}
    </Routes>
  </BrowserRouter>
  );
};

export default App;
