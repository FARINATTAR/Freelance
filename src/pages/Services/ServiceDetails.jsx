import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const ServiceDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const [service, setService] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [icon, setIcon] = useState("");

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_BASE_URL}/services/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setService(res.data);
        setTitle(res.data.title);
        setDescription(res.data.description);
        setIcon(res.data.icon);
      })
      .catch((err) => {
        console.error("Error loading service", err);
        alert("Could not load service");
      });
  }, [id]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        `${import.meta.env.VITE_API_BASE_URL}/services/${id}`,
        { title, description, icon, userId: service.userId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert("✅ Service updated!");
      navigate("/services");
    } catch (err) {
      console.error("Update failed", err);
      alert("Failed to update service.");
    }
  };

  if (!service) return <p>Loading...</p>;

  return (
    <div className="max-w-xl mx-auto p-6 bg-white shadow rounded">
      <h2 className="text-2xl font-semibold mb-4">Edit Service</h2>
      <form onSubmit={handleUpdate} className="space-y-4">
        <div>
          <label className="block">Title</label>
          <input
            type="text"
            className="w-full border p-2 rounded"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="block">Description</label>
          <textarea
            className="w-full border p-2 rounded"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="block">Icon</label>
          <input
            type="text"
            className="w-full border p-2 rounded"
            value={icon}
            onChange={(e) => setIcon(e.target.value)}
          />
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default ServiceDetails;
