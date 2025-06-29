import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const ProjectDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user?.userId;

  const [project, setProject] = useState({
    title: "",
    description: "",
    techStack: "",
  });

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_BASE_URL}/projects/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setProject(res.data))
      .catch((err) => console.error("❌ Failed to fetch project:", err));
  }, [id]);

  const handleChange = (e) => {
    setProject({ ...project, [e.target.name]: e.target.value });
  };

  const handleUpdate = async () => {
    try {
      await axios.put(
        `${import.meta.env.VITE_API_BASE_URL}/projects/update/${id}`,
        { ...project, userId },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert("✅ Project Updated!");
    } catch (err) {
      console.error("❌ Update failed:", err);
      alert("Failed to update project.");
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`${import.meta.env.VITE_API_BASE_URL}/projects/delete/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert("🗑️ Project Deleted");
      navigate("/projects");
    } catch (err) {
      console.error("❌ Delete failed:", err);
      alert("Failed to delete.");
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white shadow rounded">
      <h2 className="text-2xl font-bold mb-4">Edit Project</h2>
      <input
        name="title"
        className="w-full border p-2 mb-3 rounded"
        value={project.title}
        onChange={handleChange}
      />
      <textarea
        name="description"
        className="w-full border p-2 mb-3 rounded"
        value={project.description}
        onChange={handleChange}
      />
      <input
        name="techStack"
        className="w-full border p-2 mb-3 rounded"
        value={project.techStack}
        onChange={handleChange}
      />

      <div className="flex justify-between">
        <button
          onClick={handleUpdate}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Update
        </button>
        <button
          onClick={handleDelete}
          className="bg-red-600 text-white px-4 py-2 rounded"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default ProjectDetails;
