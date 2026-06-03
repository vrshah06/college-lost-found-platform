import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

function Navbar() {
  const navigate = useNavigate();
  const [pendingCount, setPendingCount] = useState(0);
  const token = localStorage.getItem("token");

  const logout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };
  useEffect(() => {
    fetchPendingCount();
  }, []);

  const fetchPendingCount = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) return;

      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/claims/pending-count`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      setPendingCount(res.data.count);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <nav className="bg-black text-white p-4 flex justify-between">
      <h1 className="font-bold text-xl">CampusConnect</h1>

      <div className="flex gap-4">
        <Link to="/">Home</Link>

        {!token && (
          <>
            <Link to="/login">Login</Link>

            <Link to="/register">Register</Link>
          </>
        )}

        {token && (
          <>
            <Link to="/dashboard">Dashboard</Link>
            <Link to="/claim-requests">
              Claims
              {pendingCount > 0 && (
                <span className="ml-1 bg-red-500 text-white px-2 rounded-full text-sm">
                  {pendingCount}
                </span>
              )}
            </Link>{" "}
            <Link to="/my-claims">My Claims</Link>
            <Link to="/create-item">Create Item</Link>
            <button onClick={logout}>Logout</button>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
