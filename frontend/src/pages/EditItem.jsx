import { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { useToast } from "../components/Toast";
import LoadingSpinner from "../components/LoadingSpinner";

function EditItem() {
  const { id } = useParams();
  const navigate = useNavigate();
  const toast = useToast();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    location: "",
    status: "lost",
  });

  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetchItem();
  }, [id]);

  const fetchItem = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/items/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setFormData(res.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      toast.error("Failed to load item");
      navigate("/dashboard");
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.title ||
      !formData.description ||
      !formData.category ||
      !formData.location
    ) {
      toast.error("Please fill in all required fields");
      return;
    }

    try {
      setSubmitting(true);
      const token = localStorage.getItem("token");

      await axios.put(
        `${import.meta.env.VITE_API_URL}/api/items/${id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success("Item updated successfully");
      navigate("/dashboard");
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message || "Failed to update item");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="page-container">
        <LoadingSpinner text="Loading item..." />
      </div>
    );
  }

  return (
    <div className="page-container" style={{ maxWidth: "700px" }}>
      <div className="form-container">
        <h1 className="form-title">✏️ Edit Item</h1>
        <p className="form-subtitle">
          Update the details of your item post
        </p>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="status">Item Type *</label>
            <select
              id="status"
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="form-select"
            >
              <option value="lost">🔴 Lost Item</option>
              <option value="found">🟢 Found Item</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="title">Title *</label>
            <input
              id="title"
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="form-input"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="description">Description *</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="form-textarea"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="category">Category *</label>
            <input
              id="category"
              type="text"
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="form-input"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="location">Location *</label>
            <input
              id="location"
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              className="form-input"
              required
            />
          </div>

          <div style={{ display: "flex", gap: "1rem", marginTop: "1.5rem" }}>
            <button
              type="submit"
              disabled={submitting}
              className="btn btn-primary"
              style={{
                flex: 1,
                padding: "14px",
                opacity: submitting ? 0.6 : 1,
                cursor: submitting ? "not-allowed" : "pointer",
              }}
            >
              {submitting ? "Updating..." : "Update Item →"}
            </button>
            <button
              type="button"
              onClick={() => navigate("/dashboard")}
              className="btn btn-secondary"
              style={{ flex: 1, padding: "14px" }}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditItem;