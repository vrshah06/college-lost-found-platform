import { useEffect, useState } from "react";
import axios from "axios";

function ClaimRequests() {
  const [claims, setClaims] = useState([]);

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
    } catch (error) {
      console.log(error);
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

      alert(`Claim ${status}`);
      fetchClaims();

    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="p-5">
      <h1 className="text-3xl font-bold mb-5">
        Claim Requests
      </h1>

      {claims.length === 0 ? (
        <p>No claim requests found</p>
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
              <strong>Claimant:</strong>{" "}
              {claim.claimant?.name}
            </p>

            <p>
              <strong>Email:</strong>{" "}
              {claim.claimant?.email}
            </p>

            <p>
              <strong>Message:</strong>{" "}
              {claim.message}
            </p>

            <p>
              <strong>Status:</strong>{" "}
              {claim.status}
            </p>

            {claim.status === "pending" && (
              <div className="flex gap-3 mt-3">
                <button
                  onClick={() =>
                    updateStatus(
                      claim._id,
                      "accepted"
                    )
                  }
                  className="bg-green-500 text-white px-4 py-2 rounded"
                >
                  Accept
                </button>

                <button
                  onClick={() =>
                    updateStatus(
                      claim._id,
                      "rejected"
                    )
                  }
                  className="bg-red-500 text-white px-4 py-2 rounded"
                >
                  Reject
                </button>
              </div>
            )}
          </div>
        ))
      )}
    </div>
  );
}

export default ClaimRequests;