// // import { useEffect, useState } from "react";
// // import { Link } from "react-router-dom";
// // import axios from "axios";

// // const ProjectsList = () => {
// //   const [projects, setProjects] = useState([]);
// //   const token = localStorage.getItem("token");
// //   const user = JSON.parse(localStorage.getItem("user"));
// //   const userId = user?.userId;

// //   useEffect(() => {
// //     if (!userId) return;

// //     axios
// //       .get(`${import.meta.env.VITE_API_BASE_URL}/projects/user/${userId}`, {
// //         headers: { Authorization: `Bearer ${token}` },
// //       })
// //       .then((res) => setProjects(res.data || []))
// //       .catch((err) => console.error("❌ Failed to fetch projects:", err));
// //   }, [userId]);

// //   return (
// //     <div>
// //       <div className="flex justify-between items-center mb-6">
// //         <h2 className="text-2xl font-bold">Your Projects</h2>
// //         <Link
// //           to="/projects/add"
// //           className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
// //         >
// //           + Add New
// //         </Link>
// //       </div>

// //       {projects.length === 0 ? (
// //         <p>No projects found.</p>
// //       ) : (
// //         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
// //           {projects.map((project) => (
// //             <div key={project._id} className="bg-white p-4 rounded shadow">
// //               <h3 className="text-xl font-semibold">{project.title}</h3>
// //               <p className="text-gray-600 text-sm mt-1">{project.description}</p>
// //               <p className="text-sm text-gray-500 mt-1">
// //                 Service: {project.serviceId?.name || project.serviceId?.title || 'Unknown'}
// //               </p>
              
// //               {/* File Display Section */}
// //               {project.files && project.files.length > 0 && (
// //                 <div className="mt-4">
// //                   <p className="text-sm font-medium text-gray-700 mb-2">Files:</p>
// //                   <div className="flex flex-wrap gap-2">
// //                     {project.files.map((fileId) => (
// //                       <div key={fileId} className="relative">
// //                         <a
// //                           href={`${import.meta.env.VITE_API_BASE_URL}/projects/files/${fileId}`}
// //                           target="_blank"
// //                           rel="noopener noreferrer"
// //                           className="inline-block border-2 border-gray-200 rounded hover:border-blue-400 transition-colors"
// //                         >
// //                           <img
// //                             src={`${import.meta.env.VITE_API_BASE_URL}/projects/files/${fileId}`}
// //                             alt="Project file"
// //                             className="w-20 h-20 object-cover rounded"
// //                             onError={(e) => {
// //                               // Fallback for non-image files (PDFs, etc.)
// //                               e.target.style.display = 'none';
// //                               e.target.nextSibling.style.display = 'flex';
// //                             }}
// //                           />
// //                           {/* Fallback for non-image files */}
// //                           <div 
// //                             className="w-20 h-20 bg-gray-100 rounded flex items-center justify-center text-gray-500 text-xs"
// //                             style={{ display: 'none' }}
// //                           >
// //                             📄 File
// //                           </div>
// //                         </a>
// //                       </div>
// //                     ))}
// //                   </div>
// //                 </div>
// //               )}
              
// //               <Link
// //                 to={`/projects/${project._id}`}
// //                 className="mt-4 inline-block text-blue-600 hover:underline text-sm"
// //               >
// //                 View / Edit
// //               </Link>
// //             </div>
// //           ))}
// //         </div>
// //       )}
// //     </div>
// //   );
// // };

// // export default ProjectsList;

// import { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import axios from "axios";

// const ProjectsList = () => {
//   const [projects, setProjects] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
  
//   const token = localStorage.getItem("token");
//   const user = JSON.parse(localStorage.getItem("user"));
//   const userId = user?.userId;

//   useEffect(() => {
//     if (!userId) {
//       setError("User not found. Please log in again.");
//       setLoading(false);
//       return;
//     }

//     const fetchProjects = async () => {
//       try {
//         setLoading(true);
//         const response = await axios.get(
//           `${import.meta.env.VITE_API_BASE_URL}/projects/user/${userId}`, 
//           {
//             headers: { Authorization: `Bearer ${token}` },
//           }
//         );
//         setProjects(response.data || []);
//         setError(null);
//       } catch (err) {
//         console.error("❌ Failed to fetch projects:", err);
//         setError("Failed to fetch projects. Please try again.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchProjects();
//   }, [userId, token]);

//   const formatDate = (dateString) => {
//     if (!dateString) return 'No date';
//     return new Date(dateString).toLocaleDateString();
//   };

//   if (loading) {
//     return (
//       <div className="flex justify-center items-center h-64">
//         <div className="text-lg">Loading projects...</div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="bg-red-50 border border-red-200 rounded-md p-4">
//         <p className="text-red-800">{error}</p>
//       </div>
//     );
//   }

//   return (
//     <div className="container mx-auto px-4 py-6">
//       <div className="flex justify-between items-center mb-6">
//         <h2 className="text-2xl font-bold text-gray-800">Your Projects</h2>
//         <Link
//           to="/projects/add"
//           className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
//         >
//           + Add New Project
//         </Link>
//       </div>

//       {projects.length === 0 ? (
//         <div className="text-center py-12">
//           <div className="text-gray-500 text-lg mb-4">No projects found</div>
//           <Link
//             to="/projects/add"
//             className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
//           >
//             Create Your First Project
//           </Link>
//         </div>
//       ) : (
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//           {projects.map((project) => (
//             <div key={project._id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
//               {/* Project Header */}
//               <div className="p-4 border-b border-gray-100">
//                 <h3 className="text-xl font-semibold text-gray-800 mb-2 line-clamp-2">
//                   {project.title}
//                 </h3>
//                 <p className="text-gray-600 text-sm mb-2 line-clamp-3">
//                   {project.description || 'No description provided'}
//                 </p>
                
//                 {/* Project Metadata */}
//                 <div className="space-y-1 text-sm text-gray-500">
//                   {project.location && (
//                     <p>📍 {project.location}</p>
//                   )}
//                   <p>📅 {formatDate(project.projectDate)}</p>
//                   <p>🔧 Service: {project.serviceId?.name || project.serviceId?.title || 'Unknown'}</p>
//                 </div>
//               </div>
              
//               {/* File Gallery Section */}
//               {project.files && project.files.length > 0 && (
//                 <div className="p-4">
//                   <p className="text-sm font-medium text-gray-700 mb-3">
//                     Files ({project.files.length})
//                   </p>
//                   <div className="grid grid-cols-3 gap-2">
//                     {project.files.slice(0, 6).map((fileId, index) => (
//                       <div key={fileId} className="relative group">
//                         <a
//                           href={`${import.meta.env.VITE_API_BASE_URL}/projects/files/${fileId}`}
//                           target="_blank"
//                           rel="noopener noreferrer"
//                           className="block border-2 border-gray-200 rounded-lg overflow-hidden hover:border-blue-400 transition-colors"
//                         >
//                           <img
//                             src={`${import.meta.env.VITE_API_BASE_URL}/projects/files/${fileId}`}
//                             alt={`Project file ${index + 1}`}
//                             className="w-full h-16 object-cover"
//                             onError={(e) => {
//                               // Replace broken image with file icon
//                               e.target.style.display = 'none';
//                               const fallback = e.target.nextElementSibling;
//                               if (fallback) fallback.style.display = 'flex';
//                             }}
//                           />
//                           {/* Fallback for non-image files */}
//                           <div 
//                             className="w-full h-16 bg-gray-100 rounded flex items-center justify-center text-gray-500 text-xs"
//                             style={{ display: 'none' }}
//                           >
//                             📄
//                           </div>
//                         </a>
                        
//                         {/* Overlay for extra files count */}
//                         {index === 5 && project.files.length > 6 && (
//                           <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center text-white text-xs rounded-lg">
//                             +{project.files.length - 6}
//                           </div>
//                         )}
//                       </div>
//                     ))}
//                   </div>
//                 </div>
//               )}
              
//               {/* Action Buttons */}
//               <div className="p-4 bg-gray-50 flex justify-between items-center">
//                 <Link
//                   to={`/projects/${project._id}`}
//                   className="text-blue-600 hover:text-blue-800 font-medium text-sm transition-colors"
//                 >
//                   View Details →
//                 </Link>
//                 <div className="text-xs text-gray-400">
//                   Created {formatDate(project.createdAt)}
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };
// export default ProjectsList;
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const ProjectsList = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [services, setServices] = useState({}); // Store services by ID
  const [servicesLoading, setServicesLoading] = useState(false);
  
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user?.userId;

  useEffect(() => {
    if (!userId) {
      setError("User not found. Please log in again.");
      setLoading(false);
      return;
    }

    const fetchProjects = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/projects/user/${userId}`, 
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        const projectsData = response.data || [];
        setProjects(projectsData);
        
        // Fetch service details for each unique serviceId
        const uniqueServiceIds = [...new Set(
          projectsData
            .map(p => p.serviceId)
            .filter(id => id && typeof id === 'string') // Only process string IDs
        )];

        if (uniqueServiceIds.length > 0) {
          setServicesLoading(true);
          await fetchServiceDetails(uniqueServiceIds);
          setServicesLoading(false);
        }
        
        setError(null);
      } catch (err) {
        console.error("❌ Failed to fetch projects:", err);
        setError("Failed to fetch projects. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    const fetchServiceDetails = async (serviceIds) => {
      try {
        const servicePromises = serviceIds.map(async (serviceId) => {
          try {
            const response = await axios.get(
              `${import.meta.env.VITE_API_BASE_URL}/services/${serviceId}`,
              {
                headers: { Authorization: `Bearer ${token}` },
              }
            );
            return { id: serviceId, data: response.data };
          } catch (err) {
            console.error(`Failed to fetch service ${serviceId}:`, err);
            return { id: serviceId, data: null };
          }
        });

        const serviceResults = await Promise.all(servicePromises);
        const servicesMap = {};
        serviceResults.forEach(({ id, data }) => {
          servicesMap[id] = data;
        });
        setServices(servicesMap);
      } catch (err) {
        console.error("Failed to fetch service details:", err);
      }
    };

    fetchProjects();
  }, [userId, token]);

  const formatDate = (dateString) => {
    if (!dateString) return 'No date';
    return new Date(dateString).toLocaleDateString();
  };

  const getServiceName = (serviceId) => {
    // If serviceId is already an object (populated), return its name/title
    if (typeof serviceId === 'object' && serviceId !== null) {
      return serviceId.name || serviceId.title || 'Unknown Service';
    }
    
    // If serviceId is a string, look it up in our services state
    if (typeof serviceId === 'string') {
      if (services[serviceId]) {
        const service = services[serviceId];
        return service.name || service.title || 'Unknown Service';
      }
      // Show loading if we haven't fetched this service yet
      return 'Loading...';
    }
    
    return 'Unknown Service';
  };

  if (loading || servicesLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-lg">
          {loading ? 'Loading projects...' : 'Loading service details...'}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-md p-4">
        <p className="text-red-800">{error}</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Your Projects</h2>
        <Link
          to="/projects/add"
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          + Add New Project
        </Link>
      </div>

      {projects.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-gray-500 text-lg mb-4">No projects found</div>
          <Link
            to="/projects/add"
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Create Your First Project
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <div key={project._id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
              {/* Project Header */}
              <div className="p-4 border-b border-gray-100">
                <h3 className="text-xl font-semibold text-gray-800 mb-2 line-clamp-2">
                  {project.title}
                </h3>
                <p className="text-gray-600 text-sm mb-2 line-clamp-3">
                  {project.description || 'No description provided'}
                </p>
                
                {/* Project Metadata */}
                <div className="space-y-1 text-sm text-gray-500">
                  {project.location && (
                    <p>📍 {project.location}</p>
                  )}
                  <p>📅 {formatDate(project.projectDate)}</p>
                  {/* <p>🔧 Service: {getServiceName(project.serviceId)}</p> */}
                </div>
              </div>
              
              {/* File Gallery Section */}
              {project.files && project.files.length > 0 && (
                <div className="p-4">
                  <p className="text-sm font-medium text-gray-700 mb-3">
                    Files ({project.files.length})
                  </p>
                  <div className="grid grid-cols-3 gap-2">
                    {project.files.slice(0, 6).map((fileId, index) => (
                      <div key={fileId} className="relative group">
                        <a
                          href={`${import.meta.env.VITE_API_BASE_URL}/projects/files/${fileId}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="block border-2 border-gray-200 rounded-lg overflow-hidden hover:border-blue-400 transition-colors"
                        >
                          <img
                            src={`${import.meta.env.VITE_API_BASE_URL}/projects/files/${fileId}`}
                            alt={`Project file ${index + 1}`}
                            className="w-full h-16 object-cover"
                            onError={(e) => {
                              // Replace broken image with file icon
                              e.target.style.display = 'none';
                              const fallback = e.target.nextElementSibling;
                              if (fallback) fallback.style.display = 'flex';
                            }}
                          />
                          {/* Fallback for non-image files */}
                          <div 
                            className="w-full h-16 bg-gray-100 rounded flex items-center justify-center text-gray-500 text-xs"
                            style={{ display: 'none' }}
                          >
                            📄
                          </div>
                        </a>
                        
                        {/* Overlay for extra files count */}
                        {index === 5 && project.files.length > 6 && (
                          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center text-white text-xs rounded-lg">
                            +{project.files.length - 6}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              {/* Action Buttons */}
              <div className="p-4 bg-gray-50 flex justify-between items-center">
                <Link
                  to={`/projects/${project._id}`}
                  className="text-blue-600 hover:text-blue-800 font-medium text-sm transition-colors"
                >
                  View Details →
                </Link>
                <div className="text-xs text-gray-400">
                  Created {formatDate(project.createdAt)}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProjectsList;