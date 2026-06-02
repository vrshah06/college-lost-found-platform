import { useEffect, useState } from "react";
import axios from "axios";

function Home() {
  const [items, setItems] = useState([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/items");

      setItems(res.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
  const claimItem = async (itemId) => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        alert("Please login first");
        return;
      }

      const message = prompt("Why are you claiming this item?");

      if (!message) return;

      await axios.post(
        "http://localhost:5000/api/claims",
        {
          itemId,
          message,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      alert("Claim request sent!");
    } catch (error) {
      console.log(error);

      alert(error?.response?.data?.message || "Failed to create claim");
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
      <div className="p-5">
        <h1 className="text-3xl font-bold">Loading items...</h1>
      </div>
    );
  }

  return (
    <div className="p-5">
      <h1 className="text-4xl font-bold mb-6">CampusConnect Lost & Found</h1>{" "}
      <div className="flex gap-4 mb-5">
        <input
          type="text"
          placeholder="Search items..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border p-3 rounded-lg w-72 shadow"
        />

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="border p-3 rounded-lg shadow"
        >
          <option value="all">All</option>
          <option value="lost">Lost</option>
          <option value="found">Found</option>
        </select>
      </div>
      <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-4">
        {filteredItems.length === 0 ? (
          <div className="col-span-3 text-center">
            <h2 className="text-2xl">🔍 No items match your search</h2>
          </div>
        ) : (
          filteredItems.map((item) => (
            <div
              key={item._id}
              className="border rounded-xl shadow-lg p-4 hover:shadow-2xl transition duration-300"
            >
              {item.image && (
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-56 object-cover rounded-lg mb-3"
                />
              )}
              <h2 className="font-bold text-xl">{item.title}</h2>

              <p>{item.description}</p>

              <p>
                <strong>Category:</strong> {item.category}
              </p>

              <p>
                <strong>Location:</strong> {item.location}
              </p>

              <div className="mt-3">
                <span
                  className={`px-3 py-1 rounded text-white ${
                    item.status === "lost" ? "bg-red-500" : "bg-green-500"
                  }`}
                >
                  {item.status.toUpperCase()}
                </span>
              </div>

              <p className="text-sm text-gray-500">
                Posted by: {item.user?.name}
              </p>
              <button
                onClick={() => claimItem(item._id)}
                className="bg-blue-500 text-white px-4 py-2 mt-3 roundedhover:bg-blue-600">
                Claim Item
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Home;
