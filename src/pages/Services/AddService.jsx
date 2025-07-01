
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddService = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [icon, setIcon] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");
    const userStr = localStorage.getItem("user");

    if (!userStr || !token) {
      alert("🔐 Login info missing. Please log in again.");
      navigate("/login");
      return;
    }

    let user;
    try {
      user = JSON.parse(userStr);
    } catch (parseErr) {
      alert("⚠️ Login data corrupted. Please log in again.");
      localStorage.removeItem("user");
      navigate("/login");
      return;
    }

    const userId = user?.userId;
    if (!userId) {
      alert("❌ User ID missing.");
      return;
    }

    try {
      await axios.post(
        "http://localhost:3000/api/services/create",
        {
          userId,
          title,
          description,
          icon,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("✅ Service added!");
      navigate("/services");
    } catch (err) {
      console.error("❌ Error adding service:", err);
      alert(
        err.response?.data?.message ||
          "Something went wrong while adding the service."
      );
    }
  };

  return (
    <div className="min-h-screen bg-[#0f172a] p-6 flex items-center justify-center">
      <div className="w-full max-w-2xl">
        <div className="bg-[#1e293b] border border-gray-700 rounded-2xl p-8 shadow-2xl">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-white mb-2">Add New Service</h2>
            <p className="text-gray-400">Create a new service offering for your portfolio</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-300">
                Service Title
              </label>
              <input
                type="text"
                className="w-full bg-[#0f172a] border border-gray-600 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                placeholder="Enter service title..."
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-300">
                Description
              </label>
              <textarea
                rows={4}
                className="w-full bg-[#0f172a] border border-gray-600 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 resize-none"
                placeholder="Describe what this service offers..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-300">
                Icon
              </label>
              <div className="relative">
                <input
                  type="text"
                  className="w-full bg-[#0f172a] border border-gray-600 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  placeholder="🚀 (emoji or Font Awesome class)"
                  value={icon}
                  onChange={(e) => setIcon(e.target.value)}
                />
                {icon && (
                  <div className="absolute right-4 top-1/2 transform -translate-y-1/2 text-2xl">
                    {icon}
                  </div>
                )}
              </div>
              <p className="text-xs text-gray-500 mt-1">
                Use an emoji or Font Awesome class (e.g., fas fa-rocket)
              </p>
            </div>

            <div className="flex gap-4 pt-6">
              <button
                type="button"
                onClick={() => navigate("/services")}
                className="flex-1 bg-gray-700 text-gray-300 px-6 py-3 rounded-xl hover:bg-gray-600 transition-all duration-200 font-medium"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-blue-500/25 font-medium"
              >
                Create Service
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddService;

