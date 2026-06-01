import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function Dashboard() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetchMyItems();
  }, []);

  const fetchMyItems = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.get("http://localhost:5000/api/items/my-items", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setItems(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteItem = async (id) => {
    try {
      const token = localStorage.getItem("token");

      await axios.delete(`http://localhost:5000/api/items/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      alert("Item deleted successfully");

      fetchMyItems();
    } catch (error) {
      console.log(error);

      alert(error?.response?.data?.message || "Failed to delete item");
    }
  };

  return (
    <div className="p-5">
      <h1 className="text-3xl font-bold mb-5">My Items</h1>

      {items.length === 0 ? (
        <p className="text-gray-500">No items found</p>
      ) : (
        items.map((item) => (
          <div key={item._id} className="border p-4 mb-4 rounded shadow">
            {item.image && (
              <img
                src={item.image}
                alt={item.title}
                className="w-48 h-48 object-cover rounded mb-3"
              />
            )}
            <h2 className="text-xl font-bold">{item.title}</h2>

            <p className="mt-2">{item.description}</p>

            <p className="mt-2">
              <strong>Category:</strong> {item.category}
            </p>

            <p>
              <strong>Location:</strong> {item.location}
            </p>

            <p>
              <strong>Status:</strong> {item.status}
            </p>

            <Link
              to={`/edit-item/${item._id}`}
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              Edit
            </Link>

            <button
              onClick={() => deleteItem(item._id)}
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
            >
              Delete
            </button>
          </div>
        ))
      )}
    </div>
  );
}

export default Dashboard;
