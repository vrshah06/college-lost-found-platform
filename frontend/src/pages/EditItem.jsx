import { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

function EditItem() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    location: "",
    status: "lost",
  });

  useEffect(() => {
    fetchItem();
  }, []);

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

    } catch (error) {
      console.log(error);
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

    try {
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

      alert("Item updated successfully");

      navigate("/dashboard");

    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex justify-center mt-10">
      <form
        onSubmit={handleSubmit}
        className="w-96 flex flex-col gap-4"
      >
        <h1 className="text-3xl font-bold">
          Edit Item
        </h1>

        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          className="border p-2"
        />

        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          className="border p-2"
        />

        <input
          type="text"
          name="category"
          value={formData.category}
          onChange={handleChange}
          className="border p-2"
        />

        <input
          type="text"
          name="location"
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

        <button
          type="submit"
          className="bg-blue-500 text-white p-2 rounded"
        >
          Update Item
        </button>
      </form>
    </div>
  );
}

export default EditItem;