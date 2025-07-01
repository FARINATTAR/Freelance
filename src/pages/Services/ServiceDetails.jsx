// // // import { useEffect, useState } from "react";
// // // import { useParams, useNavigate } from "react-router-dom";
// // // import axios from "axios";

// // // const ServiceDetails = () => {
// // //   const { id } = useParams();
// // //   const navigate = useNavigate();
// // //   const token = localStorage.getItem("token");

// // //   const [service, setService] = useState(null);
// // //   const [title, setTitle] = useState("");
// // //   const [description, setDescription] = useState("");
// // //   const [icon, setIcon] = useState("");

// // //   useEffect(() => {
// // //     axios
// // //       .get(`${import.meta.env.VITE_API_BASE_URL}/services/${id}`, {
// // //         headers: { Authorization: `Bearer ${token}` },
// // //       })
// // //       .then((res) => {
// // //         setService(res.data);
// // //         setTitle(res.data.title);
// // //         setDescription(res.data.description);
// // //         setIcon(res.data.icon);
// // //       })
// // //       .catch((err) => {
// // //         console.error("Error loading service", err);
// // //         alert("Could not load service");
// // //       });
// // //   }, [id]);

// // //   const handleUpdate = async (e) => {
// // //     e.preventDefault();
// // //     try {
// // //       await axios.put(
// // //         `${import.meta.env.VITE_API_BASE_URL}/services/${id}`,
// // //         { title, description, icon, userId: service.userId },
// // //         {
// // //           headers: {
// // //             Authorization: `Bearer ${token}`,
// // //           },
// // //         }
// // //       );
// // //       alert("✅ Service updated!");
// // //       navigate("/services");
// // //     } catch (err) {
// // //       console.error("Update failed", err);
// // //       alert("Failed to update service.");
// // //     }
// // //   };

// // //   if (!service) return <p>Loading...</p>;

// // //   return (
// // //     <div className="max-w-xl mx-auto p-6 bg-white shadow rounded">
// // //       <h2 className="text-2xl font-semibold mb-4">Edit Service</h2>
// // //       <form onSubmit={handleUpdate} className="space-y-4">
// // //         <div>
// // //           <label className="block">Title</label>
// // //           <input
// // //             type="text"
// // //             className="w-full border p-2 rounded"
// // //             value={title}
// // //             onChange={(e) => setTitle(e.target.value)}
// // //             required
// // //           />
// // //         </div>

// // //         <div>
// // //           <label className="block">Description</label>
// // //           <textarea
// // //             className="w-full border p-2 rounded"
// // //             value={description}
// // //             onChange={(e) => setDescription(e.target.value)}
// // //             required
// // //           />
// // //         </div>

// // //         <div>
// // //           <label className="block">Icon</label>
// // //           <input
// // //             type="text"
// // //             className="w-full border p-2 rounded"
// // //             value={icon}
// // //             onChange={(e) => setIcon(e.target.value)}
// // //           />
// // //         </div>

// // //         <button
// // //           type="submit"
// // //           className="bg-blue-600 text-white px-4 py-2 rounded"
// // //         >
// // //           Save Changes
// // //         </button>
// // //       </form>
// // //     </div>
// // //   );
// // // };

// // // export default ServiceDetails;
// // import { useEffect, useState } from "react";
// // import { useParams, useNavigate } from "react-router-dom";
// // import axios from "axios";

// // const ServiceDetails = () => {
// //   const { id } = useParams();
// //   const navigate = useNavigate();
// //   const token = localStorage.getItem("token");

// //   const [service, setService] = useState(null);
// //   const [title, setTitle] = useState("");
// //   const [description, setDescription] = useState("");
// //   const [icon, setIcon] = useState("");
// //   const [loading, setLoading] = useState(true);

// //   useEffect(() => {
// //     axios
// //       .get(`${import.meta.env.VITE_API_BASE_URL}/services/${id}`, {
// //         headers: { Authorization: `Bearer ${token}` },
// //       })
// //       .then((res) => {
// //         setService(res.data);
// //         setTitle(res.data.title);
// //         setDescription(res.data.description);
// //         setIcon(res.data.icon);
// //         setLoading(false);
// //       })
// //       .catch((err) => {
// //         console.error("Error loading service", err);
// //         alert("Could not load service");
// //         setLoading(false);
// //       });
// //   }, [id]);

// //   const handleUpdate = async (e) => {
// //     e.preventDefault();
// //     try {
// //       await axios.put(
// //         `${import.meta.env.VITE_API_BASE_URL}/services/${id}`,
// //         { title, description, icon, userId: service.userId },
// //         {
// //           headers: {
// //             Authorization: `Bearer ${token}`,
// //           },
// //         }
// //       );
// //       alert("✅ Service updated!");
// //       navigate("/services");
// //     } catch (err) {
// //       console.error("Update failed", err);
// //       alert("Failed to update service.");
// //     }
// //   };

// //   if (loading) {
// //     return (
// //       <div className="min-h-screen bg-[#0f172a] flex items-center justify-center">
// //         <div className="text-center">
// //           <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
// //           <p className="text-gray-400">Loading service...</p>
// //         </div>
// //       </div>
// //     );
// //   }

// //   if (!service) {
// //     return (
// //       <div className="min-h-screen bg-[#0f172a] flex items-center justify-center">
// //         <div className="text-center">
// //           <div className="text-6xl mb-4 opacity-50">❌</div>
// //           <h3 className="text-xl font-semibold text-gray-300 mb-2">Service not found</h3>
// //           <p className="text-gray-500 mb-6">The service you're looking for doesn't exist</p>
// //           <button
// //             onClick={() => navigate("/services")}
// //             className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200"
// //           >
// //             Back to Services
// //           </button>
// //         </div>
// //       </div>
// //     );
// //   }

// //   return (
// //     <div className="min-h-screen bg-[#0f172a] p-6 flex items-center justify-center">
// //       <div className="w-full max-w-2xl">
// //         <div className="bg-[#1e293b] border border-gray-700 rounded-2xl p-8 shadow-2xl">
// //           <div className="mb-8">
// //             <div className="flex items-center gap-4 mb-4">
// //               <div className="text-4xl">{service.icon}</div>
// //               <div>
// //                 <h2 className="text-3xl font-bold text-white">Edit Service</h2>
// //                 <p className="text-gray-400">Update your service information</p>
// //               </div>
// //             </div>
// //           </div>

// //           <form onSubmit={handleUpdate} className="space-y-6">
// //             <div className="space-y-2">
// //               <label className="block text-sm font-medium text-gray-300">
// //                 Service Title
// //               </label>
// //               <input
// //                 type="text"
// //                 className="w-full bg-[#0f172a] border border-gray-600 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
// //                 placeholder="Enter service title..."
// //                 value={title}
// //                 onChange={(e) => setTitle(e.target.value)}
// //                 required
// //               />
// //             </div>

// //             <div className="space-y-2">
// //               <label className="block text-sm font-medium text-gray-300">
// //                 Description
// //               </label>
// //               <textarea
// //                 rows={4}
// //                 className="w-full bg-[#0f172a] border border-gray-600 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 resize-none"
// //                 placeholder="Describe what this service offers..."
// //                 value={description}
// //                 onChange={(e) => setDescription(e.target.value)}
// //                 required
// //               />
// //             </div>

// //             <div className="space-y-2">
// //               <label className="block text-sm font-medium text-gray-300">
// //                 Icon
// //               </label>
// //               <div className="relative">
// //                 <input
// //                   type="text"
// //                   className="w-full bg-[#0f172a] border border-gray-600 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
// //                   placeholder="🚀 (emoji or Font Awesome class)"
// //                   value={icon}
// //                   onChange={(e) => setIcon(e.target.value)}
// //                 />
// //                 {icon && (
// //                   <div className="absolute right-4 top-1/2 transform -translate-y-1/2 text-2xl">
// //                     {icon}
// //                   </div>
// //                 )}
// //               </div>
// //               <p className="text-xs text-gray-500 mt-1">
// //                 Use an emoji or Font Awesome class (e.g., fas fa-rocket)
// //               </p>
// //             </div>

// //             <div className="flex gap-4 pt-6">
// //               <button
// //                 type="button"
// //                 onClick={() => navigate("/services")}
// //                 className="flex-1 bg-gray-700 text-gray-300 px-6 py-3 rounded-xl hover:bg-gray-600 transition-all duration-200 font-medium"
// //               >
// //                 Cancel
// //               </button>
// //               <button
// //                 type="submit"
// //                 className="flex-1 bg-gradient-to-r from-emerald-600 to-blue-600 text-white px-6 py-3 rounded-xl hover:from-emerald-700 hover:to-blue-700 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-emerald-500/25 font-medium"
// //               >
// //                 Save Changes
// //               </button>
// //             </div>
// //           </form>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default ServiceDetails;
// // import { useEffect, useState } from "react";
// // import { useParams, useNavigate } from "react-router-dom";
// // import axios from "axios";

// // const ServiceDetails = () => {
// //   const { id } = useParams();
// //   const navigate = useNavigate();
// //   const token = localStorage.getItem("token");

// //   const [service, setService] = useState(null);
// //   const [title, setTitle] = useState("");
// //   const [description, setDescription] = useState("");
// //   const [icon, setIcon] = useState("");
// //   const [loading, setLoading] = useState(true);

// //   useEffect(() => {
// //     axios
// //       .get(`${import.meta.env.VITE_API_BASE_URL}/services/${id}`, {
// //         headers: { Authorization: `Bearer ${token}` },
// //       })
// //       .then((res) => {
// //         setService(res.data);
// //         setTitle(res.data.title);
// //         setDescription(res.data.description);
// //         setIcon(res.data.icon);
// //         setLoading(false);
// //       })
// //       .catch((err) => {
// //         console.error("Error loading service", err);
// //         alert("Could not load service");
// //         setLoading(false);
// //       });
// //   }, [id]);

// //   const handleUpdate = async (e) => {
// //     e.preventDefault();
// //     try {
// //       await axios.put(
// //         `${import.meta.env.VITE_API_BASE_URL}/services/${id}`,
// //         { title, description, icon, userId: service.userId },
// //         {
// //           headers: {
// //             Authorization: `Bearer ${token}`,
// //           },
// //         }
// //       );
// //       alert("✅ Service updated!");
// //       navigate("/services");
// //     } catch (err) {
// //       console.error("Update failed", err);
// //       alert("Failed to update service.");
// //     }
// //   };

// //   if (loading) {
// //     return (
// //       <div className="min-h-screen bg-[#0f172a] flex items-center justify-center">
// //         <div className="text-center">
// //           <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
// //           <p className="text-gray-400">Loading service...</p>
// //         </div>
// //       </div>
// //     );
// //   }

// //   if (!service) {
// //     return (
// //       <div className="min-h-screen bg-[#0f172a] flex items-center justify-center">
// //         <div className="text-center">
// //           <div className="text-6xl mb-4 opacity-50">❌</div>
// //           <h3 className="text-xl font-semibold text-gray-300 mb-2">Service not found</h3>
// //           <p className="text-gray-500 mb-6">The service you're looking for doesn't exist</p>
// //           <button
// //             onClick={() => navigate("/services")}
// //             className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200"
// //           >
// //             Back to Services
// //           </button>
// //         </div>
// //       </div>
// //     );
// //   }

// //   return (
// //     <div className="min-h-screen bg-[#0f172a] p-6">
// //       <div className="max-w-3xl mx-auto">
// //         {/* Back Button */}
// //         <button
// //           onClick={() => navigate("/services")}
// //           className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors duration-200 mb-8"
// //         >
// //           <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
// //             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
// //           </svg>
// //           Back to Services
// //         </button>

// //         {/* Current Service Display */}
// //         <div className="bg-[#1e293b] border border-gray-700 rounded-2xl p-8 mb-8">
// //           <div className="text-center mb-6">
// //             <div className="text-6xl mb-4">{service.icon}</div>
// //             <h1 className="text-3xl font-bold text-white mb-3">{service.title}</h1>
// //             <p className="text-gray-400 text-lg max-w-2xl mx-auto leading-relaxed">
// //               {service.description}
// //             </p>
// //           </div>
// //         </div>

// //         {/* Edit Form */}
// //         <div className="bg-[#1e293b] border border-gray-700 rounded-2xl p-8">
// //           <div className="mb-8">
// //             <h2 className="text-2xl font-bold text-white mb-2">Edit Service</h2>
// //             <p className="text-gray-400">Update your service information</p>
// //           </div>

// //           <form onSubmit={handleUpdate} className="space-y-6">
// //             {/* Service Title */}
// //             <div>
// //               <label className="block text-sm font-medium text-gray-300 mb-3">
// //                 Service Title *
// //               </label>
// //               <input
// //                 type="text"
// //                 className="w-full bg-[#0f172a] border border-gray-600 rounded-xl px-4 py-4 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
// //                 placeholder="Enter service title..."
// //                 value={title}
// //                 onChange={(e) => setTitle(e.target.value)}
// //                 required
// //               />
// //             </div>

// //             {/* Service Description */}
// //             <div>
// //               <label className="block text-sm font-medium text-gray-300 mb-3">
// //                 Service Description *
// //               </label>
// //               <textarea
// //                 rows={4}
// //                 className="w-full bg-[#0f172a] border border-gray-600 rounded-xl px-4 py-4 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 resize-none"
// //                 placeholder="Describe what this service offers..."
// //                 value={description}
// //                 onChange={(e) => setDescription(e.target.value)}
// //                 required
// //               />
// //             </div>

// //             {/* Service Icon */}
// //             <div>
// //               <label className="block text-sm font-medium text-gray-300 mb-3">
// //                 Service Icon
// //               </label>
// //               <div className="flex gap-4">
// //                 <div className="flex-1">
// //                   <input
// //                     type="text"
// //                     className="w-full bg-[#0f172a] border border-gray-600 rounded-xl px-4 py-4 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
// //                     placeholder="🚀"
// //                     value={icon}
// //                     onChange={(e) => setIcon(e.target.value)}
// //                   />
// //                   <p className="text-xs text-gray-500 mt-2">
// //                     Choose an emoji to represent your service
// //                   </p>
// //                 </div>
// //                 <div className="w-20 h-20 bg-[#0f172a] border border-gray-600 rounded-xl flex items-center justify-center">
// //                   <div className="text-3xl">{icon || "🔧"}</div>
// //                 </div>
// //               </div>
// //             </div>

// //             {/* Action Buttons */}
// //             <div className="flex gap-4 pt-6 border-t border-gray-700">
// //               <button
// //                 type="button"
// //                 onClick={() => navigate("/services")}
// //                 className="px-6 py-3 bg-gray-700 text-gray-300 rounded-xl hover:bg-gray-600 transition-all duration-200 font-medium"
// //               >
// //                 Cancel
// //               </button>
// //               <button
// //                 type="submit"
// //                 className="flex-1 px-6 py-3 bg-gradient-to-r from-emerald-600 to-blue-600 text-white rounded-xl hover:from-emerald-700 hover:to-blue-700 transition-all duration-300 hover:scale-[1.02] font-medium"
// //               >
// //                 Save Changes
// //               </button>
// //             </div>
// //           </form>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default ServiceDetails;
// import { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import axios from "axios";

// const ServiceDetails = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const token = localStorage.getItem("token");
  
//   const [service, setService] = useState(null);
//   const [title, setTitle] = useState("");
//   const [description, setDescription] = useState("");
//   const [icon, setIcon] = useState("");
//   const [loading, setLoading] = useState(true);
//   const [saving, setSaving] = useState(false);
//   const [hasChanges, setHasChanges] = useState(false);
  
//   // Track original values to detect changes
//   const [originalValues, setOriginalValues] = useState({
//     title: "",
//     description: "",
//     icon: ""
//   });

//   useEffect(() => {
//     axios
//       .get(`${import.meta.env.VITE_API_BASE_URL}/services/${id}`, {
//         headers: { Authorization: `Bearer ${token}` },
//       })
//       .then((res) => {
//         setService(res.data);
//         setTitle(res.data.title);
//         setDescription(res.data.description);
//         setIcon(res.data.icon);
//         setOriginalValues({
//           title: res.data.title,
//           description: res.data.description,
//           icon: res.data.icon
//         });
//         setLoading(false);
//       })
//       .catch((err) => {
//         console.error("Error loading service", err);
//         alert("Could not load service");
//         setLoading(false);
//       });
//   }, [id, token]);

//   // Check for changes
//   useEffect(() => {
//     const changed = 
//       title !== originalValues.title ||
//       description !== originalValues.description ||
//       icon !== originalValues.icon;
//     setHasChanges(changed);
//   }, [title, description, icon, originalValues]);

//   const handleUpdate = async (e) => {
//     e.preventDefault();
//     if (!title.trim() || !description.trim()) {
//       alert("Please fill in all required fields");
//       return;
//     }

//     setSaving(true);
//     try {
//       const updatedData = { title, description, icon, userId: service.userId };
//       await axios.put(
//         `${import.meta.env.VITE_API_BASE_URL}/services/${id}`,
//         updatedData,
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );
      
//       // Update the service state to reflect changes in the preview
//       setService(prev => ({ ...prev, ...updatedData }));
//       setOriginalValues({ title, description, icon });
//       setHasChanges(false);
      
//       alert("✅ Service updated!");
//       navigate("/services");
//     } catch (err) {
//       console.error("Update failed", err);
//       alert("Failed to update service.");
//     } finally {
//       setSaving(false);
//     }
//   };

//   const resetForm = () => {
//     setTitle(originalValues.title);
//     setDescription(originalValues.description);
//     setIcon(originalValues.icon);
//     setHasChanges(false);
//   };

//   if (loading) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center">
//         <div className="text-center">
//           <div className="relative">
//             <div className="animate-spin rounded-full h-20 w-20 border-4 border-blue-500/30 border-t-blue-500 mx-auto mb-6"></div>
//             <div className="absolute inset-0 rounded-full h-20 w-20 border-4 border-emerald-500/20 border-b-emerald-500 mx-auto animate-spin" style={{animationDelay: '0.15s'}}></div>
//           </div>
//           <p className="text-slate-300 text-xl font-medium">Loading service details...</p>
//           <div className="flex justify-center mt-4 space-x-1">
//             <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"></div>
//             <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
//             <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   if (!service) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center">
//         <div className="text-center max-w-lg mx-auto px-8">
//           <div className="text-9xl mb-8 opacity-60 animate-pulse">🔍</div>
//           <h2 className="text-3xl font-bold text-white mb-4 bg-gradient-to-r from-red-400 to-pink-400 bg-clip-text text-transparent">
//             Service Not Found
//           </h2>
//           <p className="text-slate-400 mb-10 text-lg leading-relaxed">
//             The service you're looking for seems to have vanished into the digital void
//           </p>
//           <button
//             onClick={() => navigate("/services")}
//             className="group bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-10 py-4 rounded-xl font-semibold transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-blue-500/25"
//           >
//             <span className="flex items-center gap-3">
//               <svg className="w-5 h-5 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
//               </svg>
//               Return to Services
//             </span>
//           </button>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
//       <div className="container mx-auto px-6 py-8">
        
//         {/* Enhanced Back Button */}
//         <button
//           onClick={() => navigate("/services")}
//           className="group flex items-center gap-3 text-slate-400 hover:text-white transition-all duration-300 mb-10 hover:translate-x-1"
//         >
//           <div className="p-2 rounded-lg bg-slate-800/50 group-hover:bg-slate-700 transition-colors">
//             <svg className="w-5 h-5 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
//             </svg>
//           </div>
//           <span className="font-medium">Back to Services</span>
//         </button>

//         <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-8">
          
//           {/* Live Preview Section */}
//           <div className="space-y-6">
//             <div className="flex items-center gap-3 mb-6">
//               <div className="w-3 h-3 bg-emerald-500 rounded-full animate-pulse"></div>
//               <h2 className="text-xl font-semibold text-white">Live Preview</h2>
//             </div>
            
//             <div className="bg-gradient-to-br from-slate-800/80 to-slate-800/40 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-8 shadow-2xl hover:shadow-3xl transition-all duration-500">
//               <div className="space-y-4">
//                 <h1 className="text-2xl font-bold bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent leading-tight">
//                   {title || service.title || "Service Title"}
//                 </h1>
//                 <p className="text-slate-300 text-base leading-relaxed">
//                   {description || service.description || "Service description will appear here..."}
//                 </p>
//               </div>

//               {/* Status Indicator */}
//               <div className="flex items-center justify-between pt-6 mt-6 border-t border-slate-700/50">
//                 <div className="flex items-center gap-2">
//                   <div className={`w-2 h-2 rounded-full ${hasChanges ? 'bg-yellow-400 animate-pulse' : 'bg-emerald-400'}`}></div>
//                   <span className="text-sm text-slate-400">
//                     {hasChanges ? 'Unsaved changes' : 'Up to date'}
//                   </span>
//                 </div>
//                 <div className="text-xs text-slate-500">
//                   Service ID: {service.id}
//                 </div>
//               </div>
//             </div>

//             {/* Preview Tips */}
//             <div className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-6">
//               <h3 className="text-sm font-semibold text-slate-300 mb-3 flex items-center gap-2">
//                 <svg className="w-4 h-4 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
//                 </svg>
//                 Preview Tips
//               </h3>
//               <ul className="text-xs text-slate-400 space-y-1">
//                 <li>• Changes update in real-time as you type</li>
//                 <li>• Yellow dot indicates unsaved changes</li>
//                 <li>• Preview shows exactly how your service will appear</li>
//               </ul>
//             </div>
//           </div>

//           {/* Enhanced Edit Form */}
//           <div className="space-y-6">
//             <div className="flex items-center justify-between mb-6">
//               <div>
//                 <h2 className="text-2xl font-bold text-white mb-2">Edit Service</h2>
//                 <p className="text-slate-400">Make changes and see them update live</p>
//               </div>
//               {hasChanges && (
//                 <div className="flex items-center gap-2 text-amber-400">
//                   <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
//                     <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
//                   </svg>
//                   <span className="text-sm font-medium">Unsaved</span>
//                 </div>
//               )}
//             </div>

//             <div className="bg-gradient-to-br from-slate-800/80 to-slate-800/40 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-8 shadow-2xl space-y-8">
              
//               {/* Service Title */}
//               <div className="space-y-3">
//                 <label className="flex items-center gap-2 text-sm font-semibold text-slate-300">
//                   <svg className="w-4 h-4 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.99 1.99 0 013 12V7a4 4 0 014-4z" />
//                   </svg>
//                   Service Title
//                   <span className="text-red-400">*</span>
//                 </label>
//                 <input
//                   type="text"
//                   className="w-full bg-slate-900/80 border border-slate-600/50 rounded-xl px-5 py-4 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-300 hover:border-slate-500"
//                   placeholder="Enter an engaging service title..."
//                   value={title}
//                   onChange={(e) => setTitle(e.target.value)}
//                   required
//                 />
//                 <div className="text-xs text-slate-500 flex justify-between">
//                   <span>Make it descriptive and memorable</span>
//                   <span className={title.length > 50 ? 'text-amber-400' : 'text-slate-500'}>{title.length}/100</span>
//                 </div>
//               </div>

//               {/* Service Description */}
//               <div className="space-y-3">
//                 <label className="flex items-center gap-2 text-sm font-semibold text-slate-300">
//                   <svg className="w-4 h-4 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
//                   </svg>
//                   Service Description
//                   <span className="text-red-400">*</span>
//                 </label>
//                 <textarea
//                   rows={5}
//                   className="w-full bg-slate-900/80 border border-slate-600/50 rounded-xl px-5 py-4 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/50 transition-all duration-300 hover:border-slate-500 resize-none"
//                   placeholder="Describe what makes this service special and valuable..."
//                   value={description}
//                   onChange={(e) => setDescription(e.target.value)}
//                   required
//                 />
//                 <div className="text-xs text-slate-500 flex justify-between">
//                   <span>Be specific about the benefits and features</span>
//                   <span className={description.length > 200 ? 'text-amber-400' : 'text-slate-500'}>{description.length}/500</span>
//                 </div>
//               </div>

//               {/* Action Buttons */}
//               <div className="flex flex-col sm:flex-row gap-4 pt-8 border-t border-slate-700/50">
//                 <button
//                   type="button"
//                   onClick={resetForm}
//                   disabled={!hasChanges}
//                   className="px-6 py-3 bg-slate-700/70 hover:bg-slate-600 disabled:bg-slate-800 disabled:text-slate-500 text-slate-200 rounded-xl font-medium transition-all duration-300 hover:scale-[1.02] disabled:hover:scale-100 disabled:cursor-not-allowed"
//                 >
//                   Reset Changes
//                 </button>
//                 <button
//                   type="button"
//                   onClick={() => navigate("/services")}
//                   className="px-6 py-3 bg-slate-700/70 hover:bg-slate-600 text-slate-200 rounded-xl font-medium transition-all duration-300 hover:scale-[1.02]"
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   type="button"
//                   onClick={handleUpdate}
//                   disabled={saving || !hasChanges || !title.trim() || !description.trim()}
//                   className="flex-1 px-6 py-3 bg-gradient-to-r from-emerald-600 to-blue-600 hover:from-emerald-700 hover:to-blue-700 disabled:from-slate-700 disabled:to-slate-600 text-white rounded-xl font-semibold transition-all duration-300 hover:scale-[1.02] disabled:hover:scale-100 disabled:cursor-not-allowed shadow-lg hover:shadow-xl hover:shadow-emerald-500/25"
//                 >
//                   {saving ? (
//                     <span className="flex items-center justify-center gap-2">
//                       <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
//                       Saving...
//                     </span>
//                   ) : (
//                     <span className="flex items-center justify-center gap-2">
//                       <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
//                       </svg>
//                       Save Changes
//                     </span>
//                   )}
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ServiceDetails;

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
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);
  
  // Track original values to detect changes
  const [originalValues, setOriginalValues] = useState({
    title: "",
    description: "",
    icon: ""
  });

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
        setOriginalValues({
          title: res.data.title,
          description: res.data.description,
          icon: res.data.icon
        });
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error loading service", err);
        alert("Could not load service");
        setLoading(false);
      });
  }, [id, token]);

  // Check for changes
  useEffect(() => {
    const changed = 
      title !== originalValues.title ||
      description !== originalValues.description ||
      icon !== originalValues.icon;
    setHasChanges(changed);
  }, [title, description, icon, originalValues]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!title.trim() || !description.trim()) {
      alert("Please fill in all required fields");
      return;
    }

    setSaving(true);
    try {
      const updatedData = { title, description, icon, userId: service.userId };
      await axios.put(
        `${import.meta.env.VITE_API_BASE_URL}/services/${id}`,
        updatedData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      
      // Update the service state to reflect changes in the preview
      setService(prev => ({ ...prev, ...updatedData }));
      setOriginalValues({ title, description, icon });
      setHasChanges(false);
      
      alert("✅ Service updated!");
      navigate("/services");
    } catch (err) {
      console.error("Update failed", err);
      alert("Failed to update service.");
    } finally {
      setSaving(false);
    }
  };

  const resetForm = () => {
    setTitle(originalValues.title);
    setDescription(originalValues.description);
    setIcon(originalValues.icon);
    setHasChanges(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <div className="relative">
            <div className="animate-spin rounded-full h-20 w-20 border-4 border-blue-500/30 border-t-blue-500 mx-auto mb-6"></div>
            <div className="absolute inset-0 rounded-full h-20 w-20 border-4 border-emerald-500/20 border-b-emerald-500 mx-auto animate-spin" style={{animationDelay: '0.15s'}}></div>
          </div>
          <p className="text-slate-300 text-xl font-medium">Loading service details...</p>
          <div className="flex justify-center mt-4 space-x-1">
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"></div>
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
          </div>
        </div>
      </div>
    );
  }

  if (!service) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center">
        <div className="text-center max-w-lg mx-auto px-8">
          <div className="text-9xl mb-8 opacity-60 animate-pulse">🔍</div>
          <h2 className="text-3xl font-bold text-white mb-4 bg-gradient-to-r from-red-400 to-pink-400 bg-clip-text text-transparent">
            Service Not Found
          </h2>
          <p className="text-slate-400 mb-10 text-lg leading-relaxed">
            The service you're looking for seems to have vanished into the digital void
          </p>
          <button
            onClick={() => navigate("/services")}
            className="group bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-10 py-4 rounded-xl font-semibold transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-blue-500/25"
          >
            <span className="flex items-center gap-3">
              <svg className="w-5 h-5 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Return to Services
            </span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="container mx-auto px-6 py-8">
        
        {/* Enhanced Back Button */}
        <button
          onClick={() => navigate("/services")}
          className="group flex items-center gap-3 text-slate-400 hover:text-white transition-all duration-300 mb-10 hover:translate-x-1"
        >
          <div className="p-2 rounded-lg bg-slate-800/50 group-hover:bg-slate-700 transition-colors">
            <svg className="w-5 h-5 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </div>
          <span className="font-medium">Back to Services</span>
        </button>

        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-8">
          
          {/* Live Preview Section */}
          <div className="space-y-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-3 h-3 bg-emerald-500 rounded-full animate-pulse"></div>
              <h2 className="text-xl font-semibold text-white">Live Preview</h2>
            </div>
            <div>
              <div className="text-4xl pl-2 transform hover:scale-110 transition-transform duration-300">
                {icon || service.icon || "🔧"}                
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-slate-800/80 to-slate-800/40 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-8 shadow-2xl hover:shadow-3xl transition-all duration-500">
              <div className="flex items-center gap-6">
                {/* Icon Section */}
                <div className="flex-shrink-0">
                  <div className="relative group">
                    <div className="absolute -inset-2 bg-gradient-to-r from-blue-500 to-emerald-500 rounded-full opacity-0 group-hover:opacity-20 blur transition-all duration-500"></div>
                    {/* <div className="relative w-20 h-20 bg-gradient-to-br from-slate-700 to-slate-800 rounded-xl flex items-center justify-center border border-slate-600/50 shadow-lg"> */}

                    {/* </div> */}
                  </div>
                </div>

                {/* Content Section */}
                <div className="flex-1 min-w-0">
                  <h1 className="text-2xl font-bold bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent leading-tight mb-3">
                    {title || service.title || "Service Title"}
                  </h1>
                  <p className="text-slate-300 text-base leading-relaxed line-clamp-3">
                    {description || service.description || "Service description will appear here..."}
                  </p>
                </div>
              </div>

              {/* Status Indicator */}
              <div className="flex items-center justify-between pt-6 mt-6 border-t border-slate-700/50">
                <div className="flex items-center gap-2">
                  <div className={`w-2 h-2 rounded-full ${hasChanges ? 'bg-yellow-400 animate-pulse' : 'bg-emerald-400'}`}></div>
                  <span className="text-sm text-slate-400">
                    {hasChanges ? 'Unsaved changes' : 'Up to date'}
                  </span>
                </div>
                <div className="text-xs text-slate-500">
                  Service ID: {service.id}
                </div>
              </div>
            </div>

            {/* Preview Tips */}
            <div className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-6">
              <h3 className="text-sm font-semibold text-slate-300 mb-3 flex items-center gap-2">
                <svg className="w-4 h-4 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Preview Tips
              </h3>
              <ul className="text-xs text-slate-400 space-y-1">
                <li>• Changes update in real-time as you type</li>
                <li>• Icon preview shows on the left side</li>
                <li>• Yellow dot indicates unsaved changes</li>
              </ul>
            </div>
          </div>

          {/* Enhanced Edit Form */}
          <div className="space-y-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold text-white mb-2">Edit Service</h2>
                <p className="text-slate-400">Make changes and see them update live</p>
              </div>
              {hasChanges && (
                <div className="flex items-center gap-2 text-amber-400">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  <span className="text-sm font-medium">Unsaved</span>
                </div>
              )}
            </div>

            <div className="bg-gradient-to-br from-slate-800/80 to-slate-800/40 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-8 shadow-2xl space-y-8">
              
              {/* Service Title */}
              <div className="space-y-3">
                <label className="flex items-center gap-2 text-sm font-semibold text-slate-300">
                  <svg className="w-4 h-4 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.99 1.99 0 013 12V7a4 4 0 014-4z" />
                  </svg>
                  Service Title
                  <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  className="w-full bg-slate-900/80 border border-slate-600/50 rounded-xl px-5 py-4 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-300 hover:border-slate-500"
                  placeholder="Enter an engaging service title..."
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
                <div className="text-xs text-slate-500 flex justify-between">
                  <span>Make it descriptive and memorable</span>
                  <span className={title.length > 50 ? 'text-amber-400' : 'text-slate-500'}>{title.length}/100</span>
                </div>
              </div>

              {/* Service Description */}
              <div className="space-y-3">
                <label className="flex items-center gap-2 text-sm font-semibold text-slate-300">
                  <svg className="w-4 h-4 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  Service Description
                  <span className="text-red-400">*</span>
                </label>
                <textarea
                  rows={5}
                  className="w-full bg-slate-900/80 border border-slate-600/50 rounded-xl px-5 py-4 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/50 transition-all duration-300 hover:border-slate-500 resize-none"
                  placeholder="Describe what makes this service special and valuable..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                />
                <div className="text-xs text-slate-500 flex justify-between">
                  <span>Be specific about the benefits and features</span>
                  <span className={description.length > 200 ? 'text-amber-400' : 'text-slate-500'}>{description.length}/500</span>
                </div>
              </div>

              {/* Service Icon */}
              <div className="space-y-3">
                <label className="flex items-center gap-2 text-sm font-semibold text-slate-300">
                  <svg className="w-4 h-4 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1.586a1 1 0 01.707.293l2.414 2.414a1 1 0 00.707.293H15M9 10V9a2 2 0 012-2h2a2 2 0 012 2v1M9 10v5a2 2 0 002 2h2a2 2 0 002-2v-5" />
                  </svg>
                  Service Icon
                </label>
                <div className="flex gap-4 items-center">
                  <div className="flex-1">
                    <input
                      type="text"
                      className="w-full bg-slate-900/80 border border-slate-600/50 rounded-xl px-5 py-4 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all duration-300 hover:border-slate-500"
                      placeholder="🚀"
                      value={icon}
                      onChange={(e) => setIcon(e.target.value)}
                    />
                  </div>
                  {/* <div className="w-16 h-16 bg-gradient-to-br from-slate-900 to-slate-800 border border-slate-600/50 rounded-xl flex items-center justify-center shadow-inner"> */}
                    {/* <div className="text-2xl pr-15 transform hover:scale-110 transition-transform duration-300">
                      {icon || "🔧"}
                    </div> */}
                  {/* </div> */}
                </div>
                <p className="text-xs text-slate-500">
                  Choose an emoji that represents your service best
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 pt-8 border-t border-slate-700/50">
                <button
                  type="button"
                  onClick={resetForm}
                  disabled={!hasChanges}
                  className="px-6 py-3 bg-slate-700/70 hover:bg-slate-600 disabled:bg-slate-800 disabled:text-slate-500 text-slate-200 rounded-xl font-medium transition-all duration-300 hover:scale-[1.02] disabled:hover:scale-100 disabled:cursor-not-allowed"
                >
                  Reset Changes
                </button>
                <button
                  type="button"
                  onClick={() => navigate("/services")}
                  className="px-6 py-3 bg-slate-700/70 hover:bg-slate-600 text-slate-200 rounded-xl font-medium transition-all duration-300 hover:scale-[1.02]"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleUpdate}
                  disabled={saving || !hasChanges || !title.trim() || !description.trim()}
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-emerald-600 to-blue-600 hover:from-emerald-700 hover:to-blue-700 disabled:from-slate-700 disabled:to-slate-600 text-white rounded-xl font-semibold transition-all duration-300 hover:scale-[1.02] disabled:hover:scale-100 disabled:cursor-not-allowed shadow-lg hover:shadow-xl hover:shadow-emerald-500/25"
                >
                  {saving ? (
                    <span className="flex items-center justify-center gap-2">
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      Saving...
                    </span>
                  ) : (
                    <span className="flex items-center justify-center gap-2">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      Save Changes
                    </span>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceDetails;