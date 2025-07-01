// import { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import axios from "axios";

// const ProjectsList = () => {
//   const [projects, setProjects] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [services, setServices] = useState({}); // Store services by ID
//   const [servicesLoading, setServicesLoading] = useState(false);
  
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
//         const projectsData = response.data || [];
//         setProjects(projectsData);
        
//         // Fetch service details for each unique serviceId
//         const uniqueServiceIds = [...new Set(
//           projectsData
//             .map(p => p.serviceId)
//             .filter(id => id && typeof id === 'string') // Only process string IDs
//         )];

//         if (uniqueServiceIds.length > 0) {
//           setServicesLoading(true);
//           await fetchServiceDetails(uniqueServiceIds);
//           setServicesLoading(false);
//         }
        
//         setError(null);
//       } catch (err) {
//         console.error("❌ Failed to fetch projects:", err);
//         setError("Failed to fetch projects. Please try again.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     const fetchServiceDetails = async (serviceIds) => {
//       try {
//         const servicePromises = serviceIds.map(async (serviceId) => {
//           try {
//             const response = await axios.get(
//               `${import.meta.env.VITE_API_BASE_URL}/services/${serviceId}`,
//               {
//                 headers: { Authorization: `Bearer ${token}` },
//               }
//             );
//             return { id: serviceId, data: response.data };
//           } catch (err) {
//             console.error(`Failed to fetch service ${serviceId}:`, err);
//             return { id: serviceId, data: null };
//           }
//         });

//         const serviceResults = await Promise.all(servicePromises);
//         const servicesMap = {};
//         serviceResults.forEach(({ id, data }) => {
//           servicesMap[id] = data;
//         });
//         setServices(servicesMap);
//       } catch (err) {
//         console.error("Failed to fetch service details:", err);
//       }
//     };

//     fetchProjects();
//   }, [userId, token]);

//   const formatDate = (dateString) => {
//     if (!dateString) return 'No date';
//     return new Date(dateString).toLocaleDateString();
//   };

//   const getServiceName = (serviceId) => {
//     // If serviceId is already an object (populated), return its name/title
//     if (typeof serviceId === 'object' && serviceId !== null) {
//       return serviceId.name || serviceId.title || 'Unknown Service';
//     }
    
//     // If serviceId is a string, look it up in our services state
//     if (typeof serviceId === 'string') {
//       if (services[serviceId]) {
//         const service = services[serviceId];
//         return service.name || service.title || 'Unknown Service';
//       }
//       // Show loading if we haven't fetched this service yet
//       return 'Loading...';
//     }
    
//     return 'Unknown Service';
//   };

//   if (loading || servicesLoading) {
//     return (
//       <div className="flex justify-center items-center h-64">
//         <div className="text-lg">
//           {loading ? 'Loading projects...' : 'Loading service details...'}
//         </div>
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
//                   {/* <p>🔧 Service: {getServiceName(project.serviceId)}</p> */}
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
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-blue-500/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute top-3/4 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-cyan-500/20 rounded-full blur-3xl animate-pulse delay-500"></div>
        </div>
        
        <div className="relative z-10 flex flex-col justify-center items-center h-screen">
          <div className="relative mb-8">
            {/* Spinning outer ring */}
            <div className="w-20 h-20 border-4 border-transparent border-t-cyan-400 border-r-purple-400 rounded-full animate-spin"></div>
            {/* Inner pulsing circle */}
            <div className="absolute top-2 left-2 w-16 h-16 bg-gradient-to-r from-cyan-400 to-purple-400 rounded-full animate-pulse opacity-20"></div>
            {/* Center dot */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-white rounded-full"></div>
          </div>
          
          <div className="text-center">
            <h3 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent mb-2">
              {loading ? 'Initializing Projects Matrix...' : 'Loading Service Protocols...'}
            </h3>
            <div className="flex space-x-1 justify-center">
              <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce"></div>
              <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce delay-150"></div>
              <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce delay-300"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-red-900 to-slate-900 flex items-center justify-center p-4">
        <div className="bg-red-900/20 backdrop-blur-lg border border-red-500/30 rounded-2xl p-8 max-w-md w-full">
          <div className="text-center">
            <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-red-400 mb-2">System Error</h3>
            <p className="text-red-300">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      {/* Animated background grid */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.3) 1px, transparent 0)`,
          backgroundSize: '50px 50px'
        }}></div>
      </div>
      
      {/* Floating orbs */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-3/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 py-8">
        {/* Header Section */}
        <div className="flex justify-between items-center mb-12">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-cyan-400 via-purple-400 to-blue-400 bg-clip-text text-transparent mb-2">
              Project Matrix
            </h1>
            <p className="text-slate-400 text-lg">Manage your digital infrastructure</p>
          </div>
          
          <Link
            to="/projects/add"
            className="group relative px-8 py-4 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-2xl font-semibold text-white overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/25"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="relative flex items-center space-x-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              <span>Initialize New Project</span>
            </div>
          </Link>
        </div>

        {projects.length === 0 ? (
          <div className="text-center py-20">
            <div className="bg-slate-800/50 backdrop-blur-lg border border-slate-700/50 rounded-3xl p-12 max-w-2xl mx-auto">
              <div className="w-24 h-24 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 rounded-full flex items-center justify-center mx-auto mb-8">
                <svg className="w-12 h-12 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-slate-300 mb-4">No Projects Detected</h3>
              <p className="text-slate-400 mb-8 text-lg">Your digital workspace is ready for deployment</p>
              <Link
                to="/projects/add"
                className="inline-flex items-center space-x-2 px-8 py-4 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-2xl font-semibold text-white hover:scale-105 transition-all duration-300 hover:shadow-2xl hover:shadow-purple-500/25"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                <span>Deploy First Project</span>
              </Link>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <div 
                key={project._id} 
                className="group bg-slate-800/30 backdrop-blur-lg border border-slate-700/50 rounded-3xl overflow-hidden hover:border-purple-500/50 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/20"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                {/* Project Header */}
                <div className="p-6 border-b border-slate-700/50">
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <svg className="w-6 h-6 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                      </svg>
                    </div>
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                      <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse delay-150"></div>
                      <div className="w-2 h-2 bg-red-400 rounded-full animate-pulse delay-300"></div>
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-bold text-white mb-3 line-clamp-2 group-hover:text-cyan-400 transition-colors duration-300">
                    {project.title}
                  </h3>
                  <p className="text-slate-400 text-sm mb-4 line-clamp-3">
                    {project.description || 'No description provided'}
                  </p>
                  
                  {/* Project Metadata */}
                  <div className="space-y-2">
                    {project.location && (
                      <div className="flex items-center space-x-2 text-sm text-slate-400">
                        <svg className="w-4 h-4 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        <span>{project.location}</span>
                      </div>
                    )}
                    <div className="flex items-center space-x-2 text-sm text-slate-400">
                      <svg className="w-4 h-4 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      <span>{formatDate(project.projectDate)}</span>
                    </div>
                  </div>
                </div>
                
                {/* File Gallery Section */}
                {project.files && project.files.length > 0 && (
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-sm font-medium text-slate-300">
                        Digital Assets
                      </span>
                      <span className="px-3 py-1 bg-slate-700/50 rounded-full text-xs text-slate-400">
                        {project.files.length} files
                      </span>
                    </div>
                    <div className="grid grid-cols-3 gap-3">
                      {project.files.slice(0, 6).map((fileId, fileIndex) => (
                        <div key={fileId} className="relative group/file">
                          <a
                            href={`${import.meta.env.VITE_API_BASE_URL}/projects/files/${fileId}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="block relative overflow-hidden rounded-xl border border-slate-600/50 hover:border-cyan-400/50 transition-all duration-300 group-hover/file:scale-105"
                          >
                            <img
                              src={`${import.meta.env.VITE_API_BASE_URL}/projects/files/${fileId}`}
                              alt={`Project file ${fileIndex + 1}`}
                              className="w-full h-16 object-cover transition-transform duration-300 group-hover/file:scale-110"
                              onError={(e) => {
                                e.target.style.display = 'none';
                                const fallback = e.target.nextElementSibling;
                                if (fallback) fallback.style.display = 'flex';
                              }}
                            />
                            <div 
                              className="w-full h-16 bg-gradient-to-br from-slate-700 to-slate-800 rounded-xl flex items-center justify-center text-slate-400"
                              style={{ display: 'none' }}
                            >
                              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                              </svg>
                            </div>
                            
                            {/* Hover overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover/file:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                              </svg>
                            </div>
                          </a>
                          
                          {/* Extra files indicator */}
                          {fileIndex === 5 && project.files.length > 6 && (
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-black/40 flex items-center justify-center text-white text-sm font-bold rounded-xl">
                              +{project.files.length - 6}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                
                {/* Action Footer */}
                <div className="p-6 bg-slate-900/50 backdrop-blur-lg border-t border-slate-700/50 flex justify-between items-center">
                  <Link
                    to={`/projects/${project._id}`}
                    className="group/link flex items-center space-x-2 text-cyan-400 hover:text-cyan-300 font-medium transition-colors duration-300"
                  >
                    <span>Access Terminal</span>
                    <svg className="w-4 h-4 group-hover/link:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </Link>
                  <div className="text-xs text-slate-500 flex items-center space-x-1">
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>{formatDate(project.createdAt)}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectsList;