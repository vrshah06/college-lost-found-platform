import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useToast } from "../components/Toast";
import StatsBar from "../components/StatsBar";
import LoadingSpinner from "../components/LoadingSpinner";

function Home() {
  const [items, setItems] = useState([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [loading, setLoading] = useState(true);
  const [claimModal, setClaimModal] = useState(null);
  const [claimMessage, setClaimMessage] = useState("");
  const [claimLoading, setClaimLoading] = useState(false);
  const toast = useToast();

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/items`);
      setItems(res.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
      toast.error("Failed to load items");
    }
  };

  const openClaimModal = (item) => {
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Please login first to claim items");
      return;
    }
    setClaimModal(item);
    setClaimMessage("");
  };

  const submitClaim = async () => {
    if (!claimMessage.trim()) {
      toast.error("Please provide a reason for your claim");
      return;
    }

    try {
      setClaimLoading(true);
      const token = localStorage.getItem("token");

      await axios.post(
        `${import.meta.env.VITE_API_URL}/api/claims`,
        { itemId: claimModal._id, message: claimMessage },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success("Claim request sent successfully!");
      setClaimModal(null);
      setClaimMessage("");
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message || "Failed to create claim");
    } finally {
      setClaimLoading(false);
    }
  };

  const filteredItems = items.filter((item) => {
    const matchesSearch =
      item.title.toLowerCase().includes(search.toLowerCase()) ||
      item.category.toLowerCase().includes(search.toLowerCase());

    const matchesStatus =
      statusFilter === "all" || item.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  if (loading) {
    return (
      <div className="page-container">
        <LoadingSpinner text="Loading items..." />
      </div>
    );
  }

  return (
    <>
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-badge">
          <span className="hero-badge-dot" />
          Campus Lost & Found Platform
        </div>
        <h1 className="hero-title">
          Lost Something?{" "}
          <span className="hero-title-gradient">We'll Help You Find It.</span>
        </h1>
        <p className="hero-subtitle">
          Report lost items, discover found belongings, and reconnect with your
          campus community — all in one place.
        </p>
        <div className="hero-actions">
          <Link to="/create-item" className="btn btn-primary">
            📝 Report an Item
          </Link>
          <a href="#browse" className="btn btn-outline">
            🔍 Browse Items
          </a>
        </div>
      </section>

      {/* Stats Bar */}
      <StatsBar items={items} />

      {/* Browse Section */}
      <div className="page-container" id="browse">
        <div className="page-header">
          <h2 className="page-title">Browse Items</h2>
          <p className="page-subtitle">
            Search through {items.length} items posted by the campus community
          </p>
        </div>

        <div className="search-filter-section">
          <div className="search-input">
            <label
              htmlFor="search"
              style={{
                display: "block",
                marginBottom: "0.5rem",
                fontWeight: "600",
                color: "var(--text-primary)",
                fontSize: "0.9rem",
              }}
            >
              🔍 Search
            </label>
            <input
              id="search"
              type="text"
              placeholder="Search by title or category..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="form-input"
              style={{ width: "100%" }}
            />
          </div>

          <div className="filter-select">
            <label
              htmlFor="status-filter"
              style={{
                display: "block",
                marginBottom: "0.5rem",
                fontWeight: "600",
                color: "var(--text-primary)",
                fontSize: "0.9rem",
              }}
            >
              📋 Status
            </label>
            <select
              id="status-filter"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="form-select"
              style={{ width: "100%" }}
            >
              <option value="all">All Items</option>
              <option value="lost">Lost Items</option>
              <option value="found">Found Items</option>
            </select>
          </div>
        </div>

        <div className="grid-container">
          {filteredItems.length === 0 ? (
            <div className="empty-state">
              <div className="empty-state-icon">🔍</div>
              <p className="empty-state-text">No items match your search</p>
              <p className="empty-state-subtext">
                Try adjusting your search or filters
              </p>
            </div>
          ) : (
            filteredItems.map((item) => (
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
                      <span className="card-meta-icon">👤</span>
                      <span>
                        <strong>Posted by:</strong>{" "}
                        {item.user?.name || "Anonymous"}
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

                  {item.status !== "resolved" ? (
                    <button
                      onClick={() => openClaimModal(item)}
                      className="btn btn-primary"
                      style={{ width: "100%", marginTop: "1rem" }}
                    >
                      ✋ Claim Item
                    </button>
                  ) : (
                    <button
                      disabled
                      className="btn btn-secondary"
                      style={{
                        width: "100%",
                        marginTop: "1rem",
                        opacity: 0.5,
                        cursor: "not-allowed",
                      }}
                    >
                      ✓ Resolved
                    </button>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Claim Modal */}
      {claimModal && (
        <div className="modal-overlay" onClick={() => setClaimModal(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h3 className="modal-title">✋ Claim This Item</h3>
            <p className="modal-subtitle">
              Claiming: <strong>{claimModal.title}</strong>
            </p>
            <div className="form-group" style={{ marginBottom: 0 }}>
              <label htmlFor="claim-message">
                Why are you claiming this item?
              </label>
              <textarea
                id="claim-message"
                className="form-textarea"
                placeholder="Describe why this item belongs to you..."
                value={claimMessage}
                onChange={(e) => setClaimMessage(e.target.value)}
                style={{ minHeight: "100px" }}
              />
            </div>
            <div className="modal-actions">
              <button
                onClick={() => setClaimModal(null)}
                className="btn btn-secondary"
              >
                Cancel
              </button>
              <button
                onClick={submitClaim}
                className="btn btn-primary"
                disabled={claimLoading}
                style={{
                  opacity: claimLoading ? 0.6 : 1,
                  cursor: claimLoading ? "not-allowed" : "pointer",
                }}
              >
                {claimLoading ? "Submitting..." : "Submit Claim"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Home;
