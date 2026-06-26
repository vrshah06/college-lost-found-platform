import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useToast } from "../components/Toast";
import LoadingSpinner from "../components/LoadingSpinner";

function Dashboard() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const toast = useToast();

  useEffect(() => {
    fetchMyItems();
  }, []);

  const fetchMyItems = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/items/my-items`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setItems(res.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const deleteItem = async (id) => {
    if (!window.confirm("Are you sure you want to delete this item?")) return;

    try {
      const token = localStorage.getItem("token");

      await axios.delete(`${import.meta.env.VITE_API_URL}/api/items/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      toast.success("Item deleted successfully");
      fetchMyItems();
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message || "Failed to delete item");
    }
  };

  const lostCount = items.filter((i) => i.status === "lost").length;
  const foundCount = items.filter((i) => i.status === "found").length;
  const resolvedCount = items.filter((i) => i.status === "resolved").length;

  if (loading) {
    return (
      <div className="page-container">
        <LoadingSpinner text="Loading your items..." />
      </div>
    );
  }

  return (
    <div className="page-container">
      {/* Welcome Card */}
      <div className="dashboard-welcome">
        <div className="dashboard-welcome-text">
          <h2>📋 My Dashboard</h2>
          <p>Manage your lost and found item posts</p>
        </div>
        <div className="dashboard-mini-stats">
          <div className="dashboard-mini-stat">
            <div className="stat-number" style={{ color: "var(--accent-2)" }}>
              {items.length}
            </div>
            <div className="stat-label">Total</div>
          </div>
          <div className="dashboard-mini-stat">
            <div className="stat-number" style={{ color: "var(--status-lost)" }}>
              {lostCount}
            </div>
            <div className="stat-label">Lost</div>
          </div>
          <div className="dashboard-mini-stat">
            <div className="stat-number" style={{ color: "var(--status-found)" }}>
              {foundCount}
            </div>
            <div className="stat-label">Found</div>
          </div>
          <div className="dashboard-mini-stat">
            <div className="stat-number" style={{ color: "var(--status-resolved)" }}>
              {resolvedCount}
            </div>
            <div className="stat-label">Resolved</div>
          </div>
        </div>
      </div>

      <div style={{ marginBottom: "1.5rem" }}>
        <Link to="/create-item">
          <button className="btn btn-primary">+ Add New Item</button>
        </Link>
      </div>

      {items.length === 0 ? (
        <div className="empty-state">
          <div className="empty-state-icon">📭</div>
          <p className="empty-state-text">No items posted yet</p>
          <p className="empty-state-subtext">
            <Link
              to="/create-item"
              style={{ color: "var(--accent-2)", textDecoration: "underline" }}
            >
              Create your first item post
            </Link>
          </p>
        </div>
      ) : (
        <div className="grid-container">
          {items.map((item) => (
            <div key={item._id} className="card">
              {item.image && (
                <div className="card-image-wrapper">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="card-image"
                  />
                </div>
              )}
              <div className="card-content">
                <h3 className="card-title">{item.title}</h3>
                <p className="card-description">{item.description}</p>

                <div className="card-meta">
                  <div className="card-meta-item">
                    <span className="card-meta-icon">📁</span>
                    <span>
                      <strong>Category:</strong> {item.category}
                    </span>
                  </div>
                  <div className="card-meta-item">
                    <span className="card-meta-icon">📍</span>
                    <span>
                      <strong>Location:</strong> {item.location}
                    </span>
                  </div>
                  <div className="card-meta-item">
                    <span className="card-meta-icon">📅</span>
                    <span>
                      <strong>Posted:</strong>{" "}
                      {new Date(item.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>

                <div>
                  <span
                    className={`status-badge ${
                      item.status === "lost"
                        ? "status-lost"
                        : item.status === "found"
                          ? "status-found"
                          : "status-resolved"
                    }`}
                  >
                    <span className="status-dot" />
                    {item.status.toUpperCase()}
                  </span>
                </div>

                <div
                  style={{
                    display: "flex",
                    gap: "0.75rem",
                    marginTop: "1.25rem",
                  }}
                >
                  <Link to={`/edit-item/${item._id}`} style={{ flex: 1 }}>
                    <button
                      className="btn btn-secondary"
                      style={{ width: "100%" }}
                    >
                      ✏️ Edit
                    </button>
                  </Link>
                  <button
                    onClick={() => deleteItem(item._id)}
                    className="btn btn-danger"
                    style={{ flex: 1 }}
                  >
                    🗑️ Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Dashboard;
