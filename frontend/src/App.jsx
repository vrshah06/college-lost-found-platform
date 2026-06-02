import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import CreateItem from "./pages/CreateItem";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";
import Dashboard from "./pages/Dashboard"; 
import EditItem from "./pages/EditItem";
import ClaimRequests from "./pages/ClaimRequests";
function App() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/create-item"
          element={
            <ProtectedRoute>
              <CreateItem />
            </ProtectedRoute>
          }
        />{" "}
        <Route
  path="/dashboard"
  element={
    <ProtectedRoute>
      <Dashboard />
    </ProtectedRoute>
  }
/>
<Route
  path="/edit-item/:id"
  element={
    <ProtectedRoute>
      <EditItem />
    </ProtectedRoute>
  }
/>
<Route
  path="/claim-requests"
  element={
    <ProtectedRoute>
      <ClaimRequests />
    </ProtectedRoute>
  }
/>
      </Routes>
    </>
  );
}

export default App;
