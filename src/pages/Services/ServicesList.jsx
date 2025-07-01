import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const ServicesList = () => {
  const [services, setServices] = useState([]);
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user?.userId;

  // 🔄 Fetch user-specific services
  useEffect(() => {
    if (!userId) return;

    axios
      .get(`${import.meta.env.VITE_API_BASE_URL}/services/user/${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        console.log("Fetched services:", res.data);
        setServices(res.data || []);
      })
      .catch((err) => console.error("❌ Failed to fetch services:", err));
  }, [userId]);

  // ❌ Handle delete
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this service?");
    if (!confirmDelete) return;

    try {
      await axios.delete(`${import.meta.env.VITE_API_BASE_URL}/services/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setServices((prev) => prev.filter((s) => s._id !== id));
      alert("✅ Service deleted");
    } catch (err) {
      console.error("❌ Failed to delete:", err);
      alert("Something went wrong while deleting.");
    }
  };

  return (
    <div className="min-h-screen bg-[#0f172a] p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-3xl font-bold text-white mb-2">Your Services</h2>
            <p className="text-gray-400">Manage and organize your service offerings</p>
          </div>
          <Link
            to="/services/add"
            className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-blue-500/25 font-medium flex items-center gap-2"
          >
            <span className="text-lg">+</span>
            Add New Service
          </Link>
        </div>

        {services.length === 0 ? (
          <div className="text-center py-16">
            <div className="bg-[#1e293b] border border-gray-700 rounded-2xl p-12 max-w-md mx-auto">
              <div className="text-6xl mb-4 opacity-50">📋</div>
              <h3 className="text-xl font-semibold text-gray-300 mb-2">No services yet</h3>
              <p className="text-gray-500 mb-6">Create your first service to get started</p>
              <Link
                to="/services/add"
                className="inline-block bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200"
              >
                Create Service
              </Link>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service) => (
              <div 
                key={service._id} 
                className="bg-[#1e293b] border border-gray-700 p-6 rounded-2xl relative hover:shadow-xl hover:shadow-blue-500/10 transition-all duration-300 hover:border-gray-600 group"
              >
                {/* ✖ Delete Button */}
                <button
                  onClick={() => handleDelete(service._id)}
                  className="absolute top-4 right-4 text-gray-500 hover:text-red-400 transition-colors duration-200 opacity-0 group-hover:opacity-100 p-2 hover:bg-red-500/10 rounded-lg"
                  title="Delete Service"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>

                <div className="mb-4">
                  <div className="text-4xl mb-3 filter drop-shadow-lg">{service.icon}</div>
                  <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-blue-400 transition-colors duration-200">
                    {service.title}
                  </h3>
                  <p className="text-gray-400 text-sm leading-relaxed line-clamp-3">
                    {service.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-gray-700">
                  <Link
                    to={`/services/${service._id}`}
                    className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 text-sm font-medium transition-colors duration-200 group/link"
                  >
                    <span>View & Edit</span>
                    <svg className="w-4 h-4 group-hover/link:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ServicesList;