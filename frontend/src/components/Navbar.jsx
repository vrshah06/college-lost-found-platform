import { Link, useNavigate } from "react-router-dom";

function Navbar() {

  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  const logout = () => {
  localStorage.removeItem("token");
  window.location.href = "/login";
};

  return (
    <nav className="bg-black text-white p-4 flex justify-between">

      <h1 className="font-bold text-xl">
        CampusConnect
      </h1>

      <div className="flex gap-4">

        <Link to="/">
          Home
        </Link>

        {!token && (
          <>
            <Link to="/login">
              Login
            </Link>

            <Link to="/register">
              Register
            </Link>
            
          </>
        )}

        {token && (
  <>
    <Link to="/dashboard">
      Dashboard
    </Link>

    <Link to="/create-item">
      Create Item
    </Link>

    <button onClick={logout}>
      Logout
    </button>
  </>
)}

      </div>

    </nav>
  );
}

export default Navbar;