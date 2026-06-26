import { useEffect, useState } from "react";
import axios from "axios";
import { useToast } from "../components/Toast";
import LoadingSpinner from "../components/LoadingSpinner";

function ClaimRequests() {
  const [claims, setClaims] = useState([]);
  const [loading, setLoading] = useState(true);
  const toast = useToast();

  useEffect(() => {
    fetchClaims();
  }, []);

  const fetchClaims = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/claims/my-claims`,
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

  const updateStatus = async (id, status) => {
    try {
      const token = localStorage.getItem("token");

      await axios.put(
        `${import.meta.env.VITE_API_URL}/api/claims/${id}`,
        { status },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success(`Claim ${status} successfully`);
      fetchClaims();
    } catch (error) {
      console.log(error);
      toast.error("Failed to update claim status");
    }
  };

  if (loading) {
    return (
      <div className="page-container">
        <LoadingSpinner text="Loading claim requests..." />
      </div>
    );
  }

  return (
    <div className="page-container">
      <div className="page-header">
        <h1 className="page-title">📨 Claim Requests</h1>
        <p className="page-subtitle">
          Review requests from users claiming your items
        </p>
      </div>

      {claims.length === 0 ? (
        <div className="empty-state">
          <div className="empty-state-icon">📭</div>
          <p className="empty-state-text">No claim requests yet</p>
          <p className="empty-state-subtext">
            When someone claims your item, it will appear here
          </p>
        </div>
      ) : (
        <div className="grid-container">
          {claims.map((claim) => (
            <div key={claim._id} className="card">
              <div className="card-content">
                <h3 className="card-title">{claim.item?.title}</h3>

                <div className="card-meta" style={{ marginBottom: "1rem" }}>
                  <div className="card-meta-item">
                    <span className="card-meta-icon">👤</span>
                    <span>
                      <strong>Claimant:</strong> {claim.claimant?.name}
                    </span>
                  </div>
                  <div className="card-meta-item">
                    <span className="card-meta-icon">📧</span>
                    <span>
                      <strong>Email:</strong> {claim.claimant?.email}
                    </span>
                  </div>
                  <div style={{ marginTop: "0.5rem" }}>
                    <strong
                      style={{
                        color: "var(--text-muted)",
                        fontSize: "0.85rem",
                      }}
                    >
                      💬 Message:
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

                <div style={{ marginBottom: "1rem" }}>
                  <span
                    className={`status-badge ${
                      claim.status === "pending"
                        ? "status-pending"
                        : claim.status === "accepted"
                          ? "status-found"
                          : "status-lost"
                    }`}
                  >
                    <span className="status-dot" />
                    {claim.status === "pending" && "PENDING"}
                    {claim.status === "accepted" && "ACCEPTED"}
                    {claim.status === "rejected" && "REJECTED"}
                  </span>
                </div>

                {claim.status === "pending" && (
                  <div style={{ display: "flex", gap: "0.75rem" }}>
                    <button
                      onClick={() => updateStatus(claim._id, "accepted")}
                      className="btn btn-primary"
                      style={{ flex: 1 }}
                    >
                      ✓ Accept
                    </button>
                    <button
                      onClick={() => updateStatus(claim._id, "rejected")}
                      className="btn btn-danger"
                      style={{ flex: 1 }}
                    >
                      ✕ Reject
                    </button>
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

export default ClaimRequests;