import { useEffect, useState } from "react";
import axios from "axios";

function Home() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/items"
      );

      setItems(res.data);

    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="p-5">
      <h1 className="text-3xl font-bold mb-5">
        Lost & Found Items
      </h1>

      <div className="grid grid-cols-3 gap-4">

        {items.map((item) => (

          <div
            key={item._id}
            className="border p-4 rounded shadow"
          >
            <h2 className="font-bold text-xl">
              {item.title}
            </h2>

            <p>{item.description}</p>

            <p>
              <strong>Category:</strong>{" "}
              {item.category}
            </p>

            <p>
              <strong>Location:</strong>{" "}
              {item.location}
            </p>

            <p>
              <strong>Status:</strong>{" "}
              {item.status}
            </p>

            <p className="text-sm text-gray-500">
              Posted by: {item.user?.name}
            </p>

          </div>

        ))}

      </div>
    </div>
  );
}

export default Home;