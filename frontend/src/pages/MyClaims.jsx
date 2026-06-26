import { useEffect, useState } from "react";
import axios from "axios";
import LoadingSpinner from "../components/LoadingSpinner";

function MyClaims() {
  const [claims, setClaims] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchClaims();
  }, []);

  const fetchClaims = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/claims/my-submissions`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setClaims(res.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="page-container">
        <LoadingSpinner text="Loading your claims..." />
      </div>
    );
  }

  return (
    <div className="page-container">
      <div className="page-header">
        <h1 className="page-title">🙋 My Claims</h1>
        <p className="page-subtitle">
          Track the status of claims you've submitted
        </p>
      </div>

      {claims.length === 0 ? (
        <div className="empty-state">
          <div className="empty-state-icon">📭</div>
          <p className="empty-state-text">No claims submitted yet</p>
          <p className="empty-state-subtext">
            Browse items and submit a claim to help find lost items
          </p>
        </div>
      ) : (
        <div className="grid-container">
          {claims.map((claim) => (
            <div key={claim._id} className="card">
              <div className="card-content">
                <h3 className="card-title">{claim.item?.title}</h3>

                <div className="card-meta" style={{ marginBottom: "1rem" }}>
                  <div>
                    <strong
                      style={{
                        color: "var(--text-muted)",
                        fontSize: "0.85rem",
                      }}
                    >
                      📝 Your Message:
                    </strong>
                    <p
                      style={{
                        marginTop: "6px",
                        marginBottom: 0,
                        padding: "10px 14px",
                        background: "var(--bg-glass)",
                        borderRadius: "var(--radius-sm)",
                        border: "1px solid var(--border)",
                        fontStyle: "italic",
                        fontSize: "0.9rem",
                        color: "var(--text-secondary)",
                      }}
                    >
                      "{claim.message}"
                    </p>
                  </div>
                </div>

                <div
                  style={{
                    display: "flex",
                    gap: "1rem",
                    marginBottom: "1rem",
                  }}
                >
                  <div style={{ flex: 1 }}>
                    <strong
                      style={{
                        fontSize: "0.8rem",
                        color: "var(--text-muted)",
                        display: "block",
                        marginBottom: "6px",
                      }}
                    >
                      Claim Status
                    </strong>
                    <span
                      className={`status-badge ${
                        claim.status === "accepted"
                          ? "status-found"
                          : claim.status === "rejected"
                            ? "status-lost"
                            : "status-pending"
                      }`}
                      style={{ display: "inline-flex" }}
                    >
                      <span className="status-dot" />
                      {claim.status.toUpperCase()}
                    </span>
                  </div>

                  <div style={{ flex: 1 }}>
                    <strong
                      style={{
                        fontSize: "0.8rem",
                        color: "var(--text-muted)",
                        display: "block",
                        marginBottom: "6px",
                      }}
                    >
                      Item Status
                    </strong>
                    <span
                      className={`status-badge ${
                        claim.item?.status === "lost"
                          ? "status-lost"
                          : claim.item?.status === "found"
                            ? "status-found"
                            : "status-resolved"
                      }`}
                      style={{ display: "inline-flex" }}
                    >
                      <span className="status-dot" />
                      {claim.item?.status?.toUpperCase()}
                    </span>
                  </div>
                </div>

                <div className="card-meta">
                  <div className="card-meta-item">
                    <span className="card-meta-icon">📍</span>
                    <span>
                      <strong>Location:</strong> {claim.item?.location}
                    </span>
                  </div>
                  <div className="card-meta-item">
                    <span className="card-meta-icon">📁</span>
                    <span>
                      <strong>Category:</strong> {claim.item?.category}
                    </span>
                  </div>
                  <div className="card-meta-item">
                    <span className="card-meta-icon">📅</span>
                    <span>
                      <strong>Submitted:</strong>{" "}
                      {new Date(claim.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>

                {claim.status === "accepted" && (
                  <div className="claim-status-message accepted">
                    ✅ Great news! Your claim has been accepted. Contact the item
                    owner for pickup details.
                  </div>
                )}

                {claim.status === "rejected" && (
                  <div className="claim-status-message rejected">
                    ✕ Your claim was not accepted. Try other items or submit
                    another claim.
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default MyClaims;