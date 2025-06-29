// // import { useState } from "react";
// // import axios from "axios";
// // import { useNavigate } from "react-router-dom";

// // const AddService = () => {
// //   const [title, setTitle] = useState("");
// //   const [description, setDescription] = useState("");
// //   const [icon, setIcon] = useState("");
// //   const navigate = useNavigate();

// //   const handleSubmit = async (e) => {
// //     e.preventDefault();

// //     try {
// //       const token = localStorage.getItem("token");
// //       const user = JSON.parse(localStorage.getItem("user")); // get userId here
// //       const userId = user?.userId;

// //       if (!userId) {
// //         alert("User ID not found. Please login again.");
// //         navigate("/login");
// //         return;
// //       }

// //       const res = await axios.post(
// //         "http://localhost:3000/api/services/create",
// //         {
// //           userId,
// //           title,
// //           description,
// //           icon,
// //         },
// //         {
// //           headers: {
// //             Authorization: `Bearer ${token}`,
// //           },
// //         }
// //       );

// //       alert("✅ Service Added!");
// //       navigate("/services");
// //     } catch (err) {
// //       console.error("❌ Error adding service:", err);
// //       alert("Failed to add service. Check console.");
// //     }
// //   };

// //   return (
// //     <div className="max-w-xl mx-auto p-6 bg-white shadow rounded">
// //       <h2 className="text-2xl font-semibold mb-4">Add New Service</h2>
// //       <form onSubmit={handleSubmit} className="space-y-4">
// //         <div>
// //           <label className="block">Title</label>
// //           <input
// //             type="text"
// //             className="w-full border p-2 rounded"
// //             value={title}
// //             onChange={(e) => setTitle(e.target.value)}
// //             required
// //           />
// //         </div>

// //         <div>
// //           <label className="block">Description</label>
// //           <textarea
// //             className="w-full border p-2 rounded"
// //             value={description}
// //             onChange={(e) => setDescription(e.target.value)}
// //             required
// //           />
// //         </div>

// //         <div>
// //           <label className="block">Icon (emoji or font-awesome class)</label>
// //           <input
// //             type="text"
// //             className="w-full border p-2 rounded"
// //             value={icon}
// //             onChange={(e) => setIcon(e.target.value)}
// //           />
// //         </div>

// //         <button
// //           type="submit"
// //           className="bg-blue-600 text-white px-4 py-2 rounded"
// //         >
// //           Add Service
// //         </button>
// //       </form>
// //     </div>
// //   );
// // };

// // export default AddService;
// import { useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// const AddService = () => {
//   const [title, setTitle] = useState("");
//   const [description, setDescription] = useState("");
//   const [icon, setIcon] = useState("");
//   const [error, setError] = useState("");

//   const navigate = useNavigate();

// const handleSubmit = async (e) => {
//   e.preventDefault();
//   setError("");

//   const userString = localStorage.getItem("user");
//   const user = userString ? JSON.parse(userString) : null;
//   const token = localStorage.getItem("token");

//   if (!user || !user.userId || !token) {
//     alert("You are not logged in. Please login again.");
//     navigate("/login");
//     return;
//   }

//   const userId = user.userId;

//   try {
//     const res = await axios.post(
//       "http://localhost:3000/api/services/create",
//       {
//         userId,
//         title,
//         description,
//         icon,
//       },
//       {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       }
//     );

//     alert("✅ Service Added!");
//     navigate("/services");
//   } catch (err) {
//     console.error("❌ Error adding service:", err);

//     if (err.response?.status === 400) {
//       setError("Title and User ID are required.");
//     } else if (err.response?.status === 404) {
//       setError("User not found. Please re-login.");
//     } else {
//       setError("Something went wrong. Try again.");
//     }
//   }
// };

//   return (
//     <div className="max-w-xl mx-auto p-6 bg-white shadow rounded">
//       <h2 className="text-2xl font-semibold mb-4">Add New Service</h2>

//       {error && <p className="text-red-500 mb-4">{error}</p>}

//       <form onSubmit={handleSubmit} className="space-y-4">
//         <div>
//           <label className="block">Title</label>
//           <input
//             type="text"
//             className="w-full border p-2 rounded"
//             value={title}
//             onChange={(e) => setTitle(e.target.value)}
//             required
//           />
//         </div>

//         <div>
//           <label className="block">Description</label>
//           <textarea
//             className="w-full border p-2 rounded"
//             value={description}
//             onChange={(e) => setDescription(e.target.value)}
//             required
//           />
//         </div>

//         <div>
//           <label className="block">Icon (emoji or font-awesome class)</label>
//           <input
//             type="text"
//             className="w-full border p-2 rounded"
//             value={icon}
//             onChange={(e) => setIcon(e.target.value)}
//           />
//         </div>

//         <button
//           type="submit"
//           className="bg-blue-600 text-white px-4 py-2 rounded"
//         >
//           Add Service
//         </button>
//       </form>
//     </div>
//   );
// };

// export default AddService;
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
    <div className="max-w-xl mx-auto p-6 bg-white shadow rounded">
      <h2 className="text-2xl font-semibold mb-4">Add New Service</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
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
          <label className="block">Icon (emoji or Font Awesome class)</label>
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
          Add Service
        </button>
      </form>
    </div>
  );
};

export default AddService;
