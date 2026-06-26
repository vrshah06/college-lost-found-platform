import { Link, useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [pendingCount, setPendingCount] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const token = localStorage.getItem("token");

  const logout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  useEffect(() => {
    fetchPendingCount();
  }, [token]);

  // Close menu on route change
  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

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
        }
      );

      setPendingCount(res.data.count);
    } catch (error) {
      console.log(error);
    }
  };

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="navbar">
      <div className="navbar-inner">
        <Link to="/" style={{ textDecoration: "none" }}>
          <h1 className="navbar-brand">
            <span className="navbar-brand-icon">🔍</span>
            CampusConnect
          </h1>
        </Link>

        <button
          className={`nav-hamburger ${menuOpen ? "open" : ""}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle navigation menu"
        >
          <span />
          <span />
          <span />
        </button>

        <div className={`nav-links ${menuOpen ? "open" : ""}`}>
          <Link to="/" className={isActive("/") ? "active" : ""}>
            Home
          </Link>

          {!token && (
            <>
              <Link to="/login" className={isActive("/login") ? "active" : ""}>
                Login
              </Link>
              <Link
                to="/register"
                className={isActive("/register") ? "active" : ""}
              >
                Register
              </Link>
            </>
          )}

          {token && (
            <>
              <Link
                to="/dashboard"
                className={isActive("/dashboard") ? "active" : ""}
              >
                Dashboard
              </Link>
              <Link
                to="/claim-requests"
                className={isActive("/claim-requests") ? "active" : ""}
                style={{ position: "relative" }}
              >
                Claims
                {pendingCount > 0 && (
                  <span className="notification-badge">{pendingCount}</span>
                )}
              </Link>
              <Link
                to="/my-claims"
                className={isActive("/my-claims") ? "active" : ""}
              >
                My Claims
              </Link>
              <Link
                to="/create-item"
                className={`btn btn-primary btn-small ${isActive("/create-item") ? "active" : ""}`}
                style={{ marginLeft: "4px" }}
              >
                + New Item
              </Link>
              <button onClick={logout} className="nav-logout-btn">
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
