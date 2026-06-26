import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { useToast } from "../components/Toast";

function Register() {
  const navigate = useNavigate();
  const toast = useToast();
  const [formData, setFormData] = useState({
    name: "",
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

  const getPasswordStrength = () => {
    const pw = formData.password;
    if (!pw) return { label: "", color: "", width: "0%" };
    if (pw.length < 4) return { label: "Weak", color: "var(--status-lost)", width: "25%" };
    if (pw.length < 6) return { label: "Fair", color: "var(--status-pending)", width: "50%" };
    if (pw.length < 8) return { label: "Good", color: "var(--accent-2)", width: "75%" };
    return { label: "Strong", color: "var(--status-found)", width: "100%" };
  };

  const strength = getPasswordStrength();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.password) {
      toast.error("Please fill in all fields");
      return;
    }

    if (formData.password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }

    try {
      setLoading(true);
      await axios.post(
        `${import.meta.env.VITE_API_URL}/api/auth/register`,
        formData
      );

      toast.success("Registration successful! Please login now.");
      navigate("/login");
    } catch (error) {
      toast.error(error.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-decorative">
        <div className="auth-decorative-content">
          <div className="auth-decorative-icon">🎉</div>
          <h2 className="auth-decorative-title">Join CampusConnect</h2>
          <p className="auth-decorative-text">
            Create an account to report lost items and help others find their
            belongings.
          </p>
        </div>
      </div>

      <div className="auth-form-side">
        <div className="auth-form-container">
          <div className="form-container">
            <h1 className="form-title">Create Account</h1>
            <p className="form-subtitle">
              Join the campus community today
            </p>

            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="name">Full Name</label>
                <input
                  id="name"
                  type="text"
                  name="name"
                  placeholder="Your full name"
                  value={formData.name}
                  onChange={handleChange}
                  className="form-input"
                  required
                />
              </div>

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
                    placeholder="At least 6 characters"
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
                {formData.password && (
                  <div style={{ marginTop: "8px" }}>
                    <div
                      style={{
                        height: "4px",
                        borderRadius: "2px",
                        background: "var(--border)",
                        overflow: "hidden",
                      }}
                    >
                      <div
                        style={{
                          height: "100%",
                          width: strength.width,
                          background: strength.color,
                          borderRadius: "2px",
                          transition: "all 0.3s ease",
                        }}
                      />
                    </div>
                    <small
                      style={{
                        color: strength.color,
                        fontSize: "0.8rem",
                        marginTop: "4px",
                        display: "block",
                      }}
                    >
                      {strength.label}
                    </small>
                  </div>
                )}
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
                {loading ? "Creating account..." : "Create Account →"}
              </button>
            </form>

            <div className="auth-footer-text">
              Already have an account?{" "}
              <Link to="/login">Sign in here</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;