import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { useToast } from "../components/Toast";

function Login() {
  const navigate = useNavigate();
  const toast = useToast();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      toast.error("Please fill in all fields");
      return;
    }

    try {
      setLoading(true);
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/auth/login`,
        formData
      );

      localStorage.setItem("token", res.data.token);
      toast.success("Login successful! Welcome back.");
      navigate("/");
    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-decorative">
        <div className="auth-decorative-content">
          <div className="auth-decorative-icon">🔐</div>
          <h2 className="auth-decorative-title">Welcome Back!</h2>
          <p className="auth-decorative-text">
            Sign in to manage your lost & found items and track your claims.
          </p>
        </div>
      </div>

      <div className="auth-form-side">
        <div className="auth-form-container">
          <div className="form-container">
            <h1 className="form-title">Sign In</h1>
            <p className="form-subtitle">
              Access your CampusConnect account
            </p>

            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="email">Email Address</label>
                <input
                  id="email"
                  type="email"
                  name="email"
                  placeholder="your@email.com"
                  value={formData.email}
                  onChange={handleChange}
                  className="form-input"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="password">Password</label>
                <div className="password-wrapper">
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={handleChange}
                    className="form-input"
                    style={{ width: "100%", paddingRight: "48px" }}
                    required
                  />
                  <button
                    type="button"
                    className="password-toggle"
                    onClick={() => setShowPassword(!showPassword)}
                    tabIndex={-1}
                  >
                    {showPassword ? "🙈" : "👁️"}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="btn btn-primary"
                style={{
                  width: "100%",
                  marginTop: "1.5rem",
                  opacity: loading ? 0.6 : 1,
                  cursor: loading ? "not-allowed" : "pointer",
                  padding: "14px",
                }}
              >
                {loading ? "Signing in..." : "Sign In →"}
              </button>
            </form>

            <div className="auth-footer-text">
              Don't have an account?{" "}
              <Link to="/register">Create one now</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;