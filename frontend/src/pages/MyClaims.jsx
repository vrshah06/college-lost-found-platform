import { useEffect, useState } from "react";
import axios from "axios";

function MyClaims() {
  const [claims, setClaims] = useState([]);

  useEffect(() => {
    fetchClaims();
  }, []);

  const fetchClaims = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.get(
        "http://localhost:5000/api/claims/my-submissions",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setClaims(res.data);

    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="p-5">
      <h1 className="text-3xl font-bold mb-5">
        My Claims
      </h1>

      {claims.length === 0 ? (
        <p>No claims submitted</p>
      ) : (
        claims.map((claim) => (
          <div
            key={claim._id}
            className="border p-4 rounded shadow mb-4"
          >
            <h2 className="text-xl font-bold">
              {claim.item?.title}
            </h2>

            <p>
              <strong>Message:</strong>{" "}
              {claim.message}
            </p>

            <p className="mt-2">
              <strong>Claim Status:</strong>{" "}
              <span
                className={`px-2 py-1 rounded text-white ${
                  claim.status === "accepted"
                    ? "bg-green-500"
                    : claim.status === "rejected"
                    ? "bg-red-500"
                    : "bg-yellow-500"
                }`}
              >
                {claim.status}
              </span>
            </p>

            <p className="mt-2">
              <strong>Item Status:</strong>{" "}
              {claim.item?.status}
            </p>
          </div>
        ))
      )}
    </div>
  );
}

export default MyClaims;