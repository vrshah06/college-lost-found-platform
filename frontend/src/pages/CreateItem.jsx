import { useState } from "react";
import axios from "axios";

function CreateItem() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    location: "",
    status: "lost",
  });

  const [image, setImage] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
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

await axios.post(
  `${import.meta.env.VITE_API_URL}/api/items`,
  data,
  {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
  }
);

alert("Item Created");

      setFormData({
        title: "",
        description: "",
        category: "",
        location: "",
        status: "lost",
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex justify-center mt-10">
      <form onSubmit={handleSubmit} className="w-96 flex flex-col gap-4">
        <h1 className="text-3xl font-bold">Create Item</h1>

        <input
          type="text"
          name="title"
          placeholder="Title"
          value={formData.title}
          onChange={handleChange}
          className="border p-2"
        />

        <textarea
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
          className="border p-2"
        />

        <input
          type="text"
          name="category"
          placeholder="Category"
          value={formData.category}
          onChange={handleChange}
          className="border p-2"
        />

        <input
          type="text"
          name="location"
          placeholder="Location"
          value={formData.location}
          onChange={handleChange}
          className="border p-2"
        />

        <select
          name="status"
          value={formData.status}
          onChange={handleChange}
          className="border p-2"
        >
          <option value="lost">Lost</option>

          <option value="found">Found</option>
        </select>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImage(e.target.files[0])}
          className="border p-2"
        />
        <button type="submit" className="bg-black text-white p-2">
          Submit
        </button>
      </form>
    </div>
  );
}

export default CreateItem;
