import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useToast } from "../components/Toast";

function CreateItem() {
  const navigate = useNavigate();
  const toast = useToast();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    location: "",
    status: "lost",
  });

  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [dragOver, setDragOver] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
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
      setLoading(true);
      const token = localStorage.getItem("token");

      const data = new FormData();
      data.append("title", formData.title);
      data.append("description", formData.description);
      data.append("category", formData.category);
      data.append("location", formData.location);
      data.append("status", formData.status);

      if (image) {
        data.append("image", image);
      }

      await axios.post(`${import.meta.env.VITE_API_URL}/api/items`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      toast.success("Item created successfully!");
      setFormData({
        title: "",
        description: "",
        category: "",
        location: "",
        status: "lost",
      });
      setImage(null);
      setImagePreview(null);
      navigate("/dashboard");
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message || "Failed to create item");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-container" style={{ maxWidth: "700px" }}>
      <div className="form-container">
        <h1 className="form-title">📝 Create New Item</h1>
        <p className="form-subtitle">
          Report a lost or found item to the campus community
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
              placeholder="e.g., Blue Backpack"
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
              placeholder="Describe the item in detail..."
              value={formData.description}
              onChange={handleChange}
              className="form-textarea"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="category">Category *</label>
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="form-select"
              required
            >
              <option value="">Select a category</option>
              <option value="Electronics">Electronics</option>
              <option value="Accessories">Accessories</option>
              <option value="Documents">Documents</option>
              <option value="Clothing">Clothing</option>
              <option value="Books">Books</option>
              <option value="Keys">Keys</option>
              <option value="Wallet">Wallet</option>
              <option value="ID Card">ID Card</option>
              <option value="Bags">Bags</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="location">Location *</label>
            <input
              id="location"
              type="text"
              name="location"
              placeholder="e.g., Library, Cafeteria, Room 205"
              value={formData.location}
              onChange={handleChange}
              className="form-input"
              required
            />
          </div>

          <div className="form-group">
            <label>Upload Image</label>
            <div
              className={`upload-area ${dragOver ? "drag-over" : ""}`}
              onDragOver={(e) => {
                e.preventDefault();
                setDragOver(true);
              }}
              onDragLeave={() => setDragOver(false)}
              onDrop={(e) => {
                e.preventDefault();
                setDragOver(false);
                const files = e.dataTransfer.files;
                if (files[0]) {
                  const event = { target: { files } };
                  handleImageChange(event);
                }
              }}
              onClick={() => document.getElementById("image").click()}
            >
              <input
                id="image"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                style={{ display: "none" }}
              />
              <div className="upload-icon">📸</div>
              <div className="upload-text">Click or drag image here</div>
              <div className="upload-subtext">
                PNG, JPG, GIF up to 5MB
              </div>
            </div>
            {imagePreview && (
              <div className="upload-preview">
                <img src={imagePreview} alt="Preview" />
              </div>
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="btn btn-primary"
            style={{
              width: "100%",
              marginTop: "1rem",
              padding: "14px",
              opacity: loading ? 0.6 : 1,
              cursor: loading ? "not-allowed" : "pointer",
            }}
          >
            {loading ? "Creating..." : "Create Item →"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default CreateItem;
