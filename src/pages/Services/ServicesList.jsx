// import { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import axios from "axios";

// const ServicesList = () => {
//   const [services, setServices] = useState([]);
//   const token = localStorage.getItem("token");
//   const user = JSON.parse(localStorage.getItem("user"));
//   const userId = user?.userId;

//   useEffect(() => {
//     if (!userId) return;

//     axios
//       .get(`${import.meta.env.VITE_API_BASE_URL}/services/user/${userId}`, {
//         headers: { Authorization: `Bearer ${token}` },
//       })
//       .then((res) => {
//         console.log("Fetched services:", res.data);
//         setServices(res.data || []);
//       })
//       .catch((err) => console.error("❌ Failed to fetch services:", err));
//   }, [userId]);

//   return (
//     <div>
//       <div className="flex justify-between items-center mb-6">
//         <h2 className="text-2xl font-bold">Your Services</h2>
//         <Link
//           to="/services/add"
//           className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
//         >
//           + Add New
//         </Link>
//       </div>

//       {services.length === 0 ? (
//         <p>No services found.</p>
//       ) : (
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//           {services.map((service) => (
//             <div key={service._id} className="bg-white p-4 rounded shadow">
//               <div className="text-2xl mb-2">{service.icon}</div>
//               <h3 className="text-xl font-semibold">{service.title}</h3>
//               <p className="text-gray-600 text-sm mt-1">{service.description}</p>

//               <Link
//                 to={`/services/${service._id}`}
//                 className="mt-4 inline-block text-blue-600 hover:underline text-sm"
//               >
//                 View / Edit
//               </Link>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default ServicesList;
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
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Your Services</h2>
        <Link
          to="/services/add"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          + Add New
        </Link>
      </div>

      {services.length === 0 ? (
        <p>No services found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => (
            <div key={service._id} className="bg-white p-4 rounded shadow relative">
              {/* ✖ Delete Button */}
              <button
                onClick={() => handleDelete(service._id)}
                className="absolute top-2 right-2 text-red-500 hover:text-red-700 text-lg"
                title="Delete Service"
              >
                ✖
              </button>

              <div className="text-2xl mb-2">{service.icon}</div>
              <h3 className="text-xl font-semibold">{service.title}</h3>
              <p className="text-gray-600 text-sm mt-1">{service.description}</p>

              <Link
                to={`/services/${service._id}`}
                className="mt-4 inline-block text-blue-600 hover:underline text-sm"
              >
                View / Edit
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ServicesList;
