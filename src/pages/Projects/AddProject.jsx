// // import { useState, useEffect } from 'react';
// // import axios from 'axios';
// // import { useNavigate } from 'react-router-dom';

// // const AddProject = () => {
// //   const [title, setTitle] = useState('');
// //   const [location, setLocation] = useState('');
// //   const [description, setDescription] = useState('');
// //   const [projectDate, setProjectDate] = useState('');
// //   const [files, setFiles] = useState([]);
// //   const [serviceId, setServiceId] = useState('');
// //   const [services, setServices] = useState([]);
// //   const [isDropdownOpen, setIsDropdownOpen] = useState(false);
// //   const [selectedServiceName, setSelectedServiceName] = useState('Select a Service');

// //   const navigate = useNavigate();

// //   const token = localStorage.getItem('token');
// //   const user = JSON.parse(localStorage.getItem('user'));

// //   // 🔹 Fetch all available services for the dropdown
// //   useEffect(() => {
// //     const fetchServices = async () => {
// //       try {
// //         const res = await axios.get('http://localhost:3000/api/services');
// //         setServices(res.data.services || []);
// //       } catch (err) {
// //         console.error('❌ Failed to fetch services:', err);
// //       }
// //     };

// //     fetchServices();
// //   }, []);

// //   const handleServiceSelect = (service) => {
// //     setServiceId(service._id);
// //     setSelectedServiceName(service.title || service.name); // Use title first, fallback to name
// //     setIsDropdownOpen(false);
// //     console.log('Selected service:', service.title || service.name);
// //   };

// //   const handleSubmit = async (e) => {
// //     e.preventDefault();

// //     if (!user?.userId || !serviceId) {
// //       alert('User ID and Service ID are required');
// //       return;
// //     }

// //     const formData = new FormData();
// //     formData.append('userId', user.userId);
// //     formData.append('serviceId', serviceId);
// //     formData.append('title', title);
// //     formData.append('location', location);
// //     formData.append('description', description);
// //     formData.append('projectDate', projectDate);
// //     for (const file of files) {
// //       formData.append('files', file);
// //     }

// //     try {
// //       await axios.post('http://localhost:3000/api/projects/create', formData, {
// //         headers: {
// //           Authorization: `Bearer ${token}`,
// //           'Content-Type': 'multipart/form-data',
// //         },
// //       });

// //       alert('✅ Project added successfully!');
// //       navigate('/projects');
// //     } catch (error) {
// //       console.error('❌ Error creating project:', error);
// //       alert('Error creating project. Check console.');
// //     }
// //   };

// //   return (
// //     <div className="max-w-2xl mx-auto p-6 bg-white rounded shadow">
// //       <h2 className="text-xl font-bold mb-4">Add New Project</h2>
// //       <form onSubmit={handleSubmit}>
// //         <input
// //           type="text"
// //           placeholder="Title"
// //           value={title}
// //           onChange={(e) => setTitle(e.target.value)}
// //           required
// //           className="w-full mb-3 p-2 border rounded"
// //         />
// //         <input
// //           type="text"
// //           placeholder="Location"
// //           value={location}
// //           onChange={(e) => setLocation(e.target.value)}
// //           className="w-full mb-3 p-2 border rounded"
// //         />
// //         <textarea
// //           placeholder="Description"
// //           value={description}
// //           onChange={(e) => setDescription(e.target.value)}
// //           className="w-full mb-3 p-2 border rounded"
// //         ></textarea>
// //         <input
// //           type="date"
// //           value={projectDate}
// //           onChange={(e) => setProjectDate(e.target.value)}
// //           className="w-full mb-3 p-2 border rounded"
// //         />

// //         {/* 🔹 Custom Service Dropdown */}
// //         <div style={{ position: 'relative', width: '100%', marginBottom: '12px', zIndex: 9999 }}>
// //           <button
// //             type="button"
// //             onClick={() => {
// //               console.log('Dropdown clicked, current state:', isDropdownOpen);
// //               console.log('Services data:', services);
// //               setIsDropdownOpen(!isDropdownOpen);
// //             }}
// //             style={{
// //               width: '100%',
// //               padding: '8px 12px',
// //               border: '1px solid #d1d5db',
// //               borderRadius: '6px',
// //               backgroundColor: '#ffffff',
// //               color: serviceId ? '#000000' : '#6b7280',
// //               display: 'flex',
// //               justifyContent: 'space-between',
// //               alignItems: 'center',
// //               cursor: 'pointer',
// //               fontSize: '14px'
// //             }}
// //           >
// //             <span>{selectedServiceName}</span>
// //             <span style={{ 
// //               transform: isDropdownOpen ? 'rotate(180deg)' : 'rotate(0deg)',
// //               transition: 'transform 0.2s'
// //             }}>
// //               ▼
// //             </span>
// //           </button>

// //           {isDropdownOpen && (
// //             <div 
// //               style={{
// //                 position: 'absolute',
// //                 top: '100%',
// //                 left: '0',
// //                 right: '0',
// //                 backgroundColor: '#ffffff',
// //                 border: '1px solid #d1d5db',
// //                 borderTop: 'none',
// //                 borderRadius: '0 0 6px 6px',
// //                 boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
// //                 maxHeight: '200px',
// //                 overflowY: 'auto',
// //                 zIndex: 10000
// //               }}
// //             >
// //               {Array.isArray(services) && services.length > 0 ? (
// //                 services.map((service, index) => (
// //                   <div
// //                     key={service._id}
// //                     onClick={() => {
// //                       console.log('Service selected:', service);
// //                       handleServiceSelect(service);
// //                     }}
// //                     style={{
// //                       padding: '12px 16px',
// //                       color: '#000000',
// //                       backgroundColor: '#ffffff',
// //                       cursor: 'pointer',
// //                       borderBottom: index < services.length - 1 ? '1px solid #f3f4f6' : 'none',
// //                       fontSize: '14px'
// //                     }}
// //                     onMouseEnter={(e) => {
// //                       e.target.style.backgroundColor = '#f3f4f6';
// //                     }}
// //                     onMouseLeave={(e) => {
// //                       e.target.style.backgroundColor = '#ffffff';
// //                     }}
// //                   >
// //                     {service.title || service.name}
// //                   </div>
// //                 ))
// //               ) : (
// //                 <div style={{ 
// //                   padding: '12px 16px', 
// //                   color: '#6b7280',
// //                   fontSize: '14px'
// //                 }}>
// //                   No services available
// //                 </div>
// //               )}
// //             </div>
// //           )}

// //           {/* Hidden input for form validation */}
// //           <input
// //             type="hidden"
// //             value={serviceId}
// //             required
// //           />
// //         </div>

// //         {/* Close dropdown when clicking outside */}
// //         {isDropdownOpen && (
// //           <div
// //             style={{
// //               position: 'fixed',
// //               top: '0',
// //               left: '0',
// //               right: '0',
// //               bottom: '0',
// //               zIndex: 9998
// //             }}
// //             onClick={() => setIsDropdownOpen(false)}
// //           ></div>
// //         )}

// //         <input
// //           type="file"
// //           multiple
// //           onChange={(e) => setFiles(e.target.files)}
// //           className="mb-4"
// //         />
// //         <button
// //           type="submit"
// //           className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
// //         >
// //           Add Project
// //         </button>
// //       </form>
// //     </div>
// //   );
// // };

// // export default AddProject;
// import { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useNavigate, Link } from 'react-router-dom';

// const AddProject = () => {
//   const [title, setTitle] = useState('');
//   const [location, setLocation] = useState('');
//   const [description, setDescription] = useState('');
//   const [projectDate, setProjectDate] = useState('');
//   const [files, setFiles] = useState([]);
//   const [serviceId, setServiceId] = useState('');
//   const [services, setServices] = useState([]);
//   const [isDropdownOpen, setIsDropdownOpen] = useState(false);
//   const [selectedServiceName, setSelectedServiceName] = useState('Select a Service');
//   const [loading, setLoading] = useState(false);
//   const [servicesLoading, setServicesLoading] = useState(true);

//   const navigate = useNavigate();

//   const token = localStorage.getItem('token');
//   const user = JSON.parse(localStorage.getItem('user') || '{}');

//   // Fetch all available services for the dropdown
//   useEffect(() => {
//     const fetchServices = async () => {
//       try {
//         setServicesLoading(true);
//         console.log('🔄 Fetching services...');
//         const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/services`, {
//           headers: { Authorization: `Bearer ${token}` }
//         });
//         const servicesData = res.data.services || res.data || [];
//         setServices(servicesData);
//         console.log('✅ Services fetched:', servicesData.length, 'services');
//       } catch (err) {
//         console.error('❌ Failed to fetch services:', err);
//         alert('Failed to load services. Please refresh the page.');
//       } finally {
//         setServicesLoading(false);
//       }
//     };

//     if (token) {
//       fetchServices();
//     }
//   }, [token]);

//   const handleServiceSelect = (service) => {
//     console.log('🔧 Service selected:', service);
//     setServiceId(service._id);
//     setSelectedServiceName(service.title || service.name);
//     setIsDropdownOpen(false);
//   };

//   const handleFileChange = (e) => {
//     const selectedFiles = Array.from(e.target.files);
//     console.log('📁 Files selected:', selectedFiles.length, 'files');
//     setFiles(selectedFiles);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
    
//     // Validation
//     if (!user?.userId) {
//       alert('❌ User not found. Please log in again.');
//       return;
//     }
    
//     if (!serviceId) {
//       alert('❌ Please select a service.');
//       return;
//     }

//     if (!title.trim()) {
//       alert('❌ Project title is required.');
//       return;
//     }

//     console.log('🚀 Creating project with data:', {
//       userId: user.userId,
//       serviceId,
//       title,
//       location,
//       description,
//       projectDate,
//       filesCount: files.length
//     });

//     const formData = new FormData();
//     formData.append('userId', user.userId);
//     formData.append('serviceId', serviceId);
//     formData.append('title', title);
//     formData.append('location', location);
//     formData.append('description', description);
//     formData.append('projectDate', projectDate);
    
//     // Append files
//     files.forEach(file => {
//       formData.append('files', file);
//     });

//     try {
//       setLoading(true);
//       await axios.post(`${import.meta.env.VITE_API_BASE_URL}/projects/create`, formData, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//           'Content-Type': 'multipart/form-data',
//         },
//       });

//       console.log('✅ Project created successfully');
//       alert('✅ Project added successfully!');
//       navigate('/projects');
//     } catch (error) {
//       console.error('❌ Error creating project:', error);
//       const errorMessage = error.response?.data?.message || 'Failed to create project';
//       alert(`❌ ${errorMessage}`);
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (servicesLoading) {
//     return (
//       <div className="max-w-2xl mx-auto p-6">
//         <div className="flex justify-center items-center h-64">
//           <div className="text-lg">Loading services...</div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="max-w-2xl mx-auto p-6">
//       {/* Header */}
//       <div className="mb-6">
//         <Link 
//           to="/projects" 
//           className="text-blue-600 hover:underline mb-4 inline-block"
//         >
//           ← Back to Projects
//         </Link>
//         <h1 className="text-3xl font-bold text-gray-800">Add New Project</h1>
//       </div>

//       {/* Form */}
//       <div className="bg-white rounded-lg shadow-md p-6">
//         <form onSubmit={handleSubmit} className="space-y-6">
//           {/* Title */}
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-2">
//               Project Title *
//             </label>
//             <input
//               type="text"
//               placeholder="Enter project title"
//               value={title}
//               onChange={(e) => setTitle(e.target.value)}
//               required
//               className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//             />
//           </div>

//           {/* Location */}
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-2">
//               Location
//             </label>
//             <input
//               type="text"
//               placeholder="Enter project location"
//               value={location}
//               onChange={(e) => setLocation(e.target.value)}
//               className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//             />
//           </div>

//           {/* Description */}
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-2">
//               Description
//             </label>
//             <textarea
//               placeholder="Enter project description"
//               value={description}
//               onChange={(e) => setDescription(e.target.value)}
//               rows={4}
//               className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-vertical"
//             />
//           </div>

//           {/* Project Date */}
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-2">
//               Project Date
//             </label>
//             <input
//               type="date"
//               value={projectDate}
//               onChange={(e) => setProjectDate(e.target.value)}
//               className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//             />
//           </div>

//           {/* Service Dropdown */}
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-2">
//               Service *
//             </label>
//             <div className="relative">
//               <button
//                 type="button"
//                 onClick={() => {
//                   console.log('🔽 Dropdown clicked, current state:', isDropdownOpen);
//                   console.log('📊 Available services:', services.length);
//                   setIsDropdownOpen(!isDropdownOpen);
//                 }}
//                 className={`w-full p-3 border border-gray-300 rounded-md bg-white flex justify-between items-center cursor-pointer hover:border-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
//                   serviceId ? 'text-gray-900' : 'text-gray-500'
//                 }`}
//               >
//                 <span>{selectedServiceName}</span>
//                 <span className={`transform transition-transform duration-200 ${
//                   isDropdownOpen ? 'rotate-180' : 'rotate-0'
//                 }`}>
//                   ▼
//                 </span>
//               </button>

//               {isDropdownOpen && (
//                 <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-y-auto z-50">
//                   {Array.isArray(services) && services.length > 0 ? (
//                     services.map((service, index) => (
//                       <div
//                         key={service._id}
//                         onClick={() => handleServiceSelect(service)}
//                         className="p-3 cursor-pointer hover:bg-blue-50 border-b border-gray-100 last:border-b-0 transition-colors"
//                       >
//                         <div className="font-medium text-gray-900">
//                           {service.title || service.name}
//                         </div>
//                         {service.description && (
//                           <div className="text-sm text-gray-500 mt-1 truncate">
//                             {service.description}
//                           </div>
//                         )}
//                       </div>
//                     ))
//                   ) : (
//                     <div className="p-3 text-gray-500 text-center">
//                       No services available
//                     </div>
//                   )}
//                 </div>
//               )}
//             </div>
//           </div>

//           {/* File Upload */}
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-2">
//               Project Files
//             </label>
//             <input
//               type="file"
//               multiple
//               onChange={handleFileChange}
//               accept="image/*,video/*,.pdf,.doc,.docx,.txt"
//               className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
//             />
//             {files.length > 0 && (
//               <div className="mt-2 text-sm text-gray-600">
//                 📁 {files.length} file{files.length !== 1 ? 's' : ''} selected
//               </div>
//             )}
//           </div>

//           {/* Submit Button */}
//           <div className="flex gap-4 pt-4">
//             <button
//               type="submit"
//               disabled={loading || !serviceId}
//               className="flex-1 bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors font-medium"
//             >
//               {loading ? '⏳ Creating Project...' : '✅ Create Project'}
//             </button>
//             <Link
//               to="/projects"
//               className="px-6 py-3 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors font-medium text-center"
//             >
//               Cancel
//             </Link>
//           </div>
//         </form>
//       </div>

//       {/* Overlay for dropdown */}
//       {isDropdownOpen && (
//         <div
//           className="fixed inset-0 z-40"
//           onClick={() => setIsDropdownOpen(false)}
//         />
//       )}
//     </div>
//   );
// };

// export default AddProject;

// import { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useNavigate, Link } from 'react-router-dom';

// const AddProject = () => {
//   const [formData, setFormData] = useState({
//     title: '',
//     location: '',
//     description: '',
//     projectDate: ''
//   });
//   const [files, setFiles] = useState([]);
//   const [serviceId, setServiceId] = useState('');
//   const [services, setServices] = useState([]);
//   const [isDropdownOpen, setIsDropdownOpen] = useState(false);
//   const [selectedServiceName, setSelectedServiceName] = useState('Select a Service');
//   const [loading, setLoading] = useState(false);
//   const [servicesLoading, setServicesLoading] = useState(true);
//   const [errors, setErrors] = useState({});

//   const navigate = useNavigate();

//   const token = localStorage.getItem('token');
//   const user = JSON.parse(localStorage.getItem('user') || '{}');

//   // Fetch all available services for the dropdown
//   useEffect(() => {
//     const fetchServices = async () => {
//       try {
//         setServicesLoading(true);
//         console.log('🔄 Fetching services...');
        
//         const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/services`, {
//           headers: { Authorization: `Bearer ${token}` }
//         });
        
//         const servicesData = res.data.services || res.data || [];
//         setServices(servicesData);
//         console.log('✅ Services fetched:', servicesData.length, 'services');
        
//         if (servicesData.length === 0) {
//           console.warn('⚠️ No services available');
//         }
//       } catch (err) {
//         console.error('❌ Failed to fetch services:', err);
//         setErrors(prev => ({ ...prev, services: 'Failed to load services. Please refresh the page.' }));
//       } finally {
//         setServicesLoading(false);
//       }
//     };

//     if (token) {
//       fetchServices();
//     } else {
//       setErrors(prev => ({ ...prev, auth: 'Please log in to continue' }));
//       setServicesLoading(false);
//     }
//   }, [token]);

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({
//       ...prev,
//       [name]: value
//     }));
    
//     // Clear error when user starts typing
//     if (errors[name]) {
//       setErrors(prev => ({ ...prev, [name]: '' }));
//     }
//   };

//   const handleServiceSelect = (service) => {
//     console.log('🔧 Service selected:', service);
//     setServiceId(service._id);
//     setSelectedServiceName(service.title || service.name);
//     setIsDropdownOpen(false);
    
//     // Clear service error
//     if (errors.service) {
//       setErrors(prev => ({ ...prev, service: '' }));
//     }
//   };

//   const handleFileChange = (e) => {
//     const selectedFiles = Array.from(e.target.files);
//     console.log('📁 Files selected:', selectedFiles.length, 'files');
    
//     // Validate file types and sizes
//     const allowedTypes = ['image/', 'video/', 'application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'text/plain'];
//     const maxSize = 10 * 1024 * 1024; // 10MB
    
//     const validFiles = selectedFiles.filter(file => {
//       const isValidType = allowedTypes.some(type => file.type.startsWith(type));
//       const isValidSize = file.size <= maxSize;
      
//       if (!isValidType) {
//         console.warn(`⚠️ Invalid file type: ${file.name}`);
//         return false;
//       }
//       if (!isValidSize) {
//         console.warn(`⚠️ File too large: ${file.name}`);
//         return false;
//       }
//       return true;
//     });
    
//     setFiles(validFiles);
    
//     if (validFiles.length !== selectedFiles.length) {
//       setErrors(prev => ({ 
//         ...prev, 
//         files: 'Some files were skipped due to invalid type or size (max 10MB)' 
//       }));
//     } else if (errors.files) {
//       setErrors(prev => ({ ...prev, files: '' }));
//     }
//   };

//   const validateForm = () => {
//     const newErrors = {};
    
//     // Validate required fields
//     if (!formData.title.trim()) {
//       newErrors.title = 'Project title is required';
//     }
    
//     if (!serviceId) {
//       newErrors.service = 'Please select a service';
//     }
    
//     if (!user?.userId) {
//       newErrors.auth = 'User not found. Please log in again.';
//     }

//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
    
//     if (!validateForm()) {
//       console.error('❌ Form validation failed');
//       return;
//     }

//     console.log('🚀 Creating project with data:', {
//       userId: user.userId,
//       serviceId,
//       ...formData,
//       filesCount: files.length
//     });

//     const formDataObj = new FormData();
//     formDataObj.append('userId', user.userId);
//     formDataObj.append('serviceId', serviceId);
//     formDataObj.append('title', formData.title);
//     formDataObj.append('location', formData.location);
//     formDataObj.append('description', formData.description);
//     formDataObj.append('projectDate', formData.projectDate);
    
//     // Append files
//     files.forEach(file => {
//       formDataObj.append('files', file);
//     });

//     try {
//       setLoading(true);
//       await axios.post(`${import.meta.env.VITE_API_BASE_URL}/projects/create`, formDataObj, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//           'Content-Type': 'multipart/form-data',
//         },
//       });

//       console.log('✅ Project created successfully');
//       navigate('/projects', { 
//         state: { message: 'Project created successfully!' }
//       });
//     } catch (error) {
//       console.error('❌ Error creating project:', error);
//       const errorMessage = error.response?.data?.message || 'Failed to create project';
//       setErrors(prev => ({ ...prev, submit: errorMessage }));
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Loading state
//   if (servicesLoading) {
//     return (
//       <div className="max-w-2xl mx-auto p-6">
//         <div className="flex justify-center items-center h-64">
//           <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
//           <span className="ml-3 text-lg">Loading services...</span>
//         </div>
//       </div>
//     );
//   }

//   // Auth error state
//   if (errors.auth) {
//     return (
//       <div className="max-w-2xl mx-auto p-6">
//         <div className="bg-red-50 border border-red-200 rounded-md p-4 mb-4">
//           <p className="text-red-800">{errors.auth}</p>
//         </div>
//         <Link to="/login" className="text-blue-600 hover:underline">
//           ← Go to Login
//         </Link>
//       </div>
//     );
//   }

//   return (
//     <div className="max-w-2xl mx-auto p-6">
//       {/* Header */}
//       <div className="mb-6">
//         <Link 
//           to="/projects" 
//           className="text-blue-600 hover:underline mb-4 inline-block"
//         >
//           ← Back to Projects
//         </Link>
//         <h1 className="text-3xl font-bold text-gray-800">Add New Project</h1>
//         <p className="text-gray-600 mt-2">Create a new project and upload related files</p>
//       </div>

//       {/* Services error */}
//       {errors.services && (
//         <div className="bg-yellow-50 border border-yellow-200 rounded-md p-4 mb-6">
//           <p className="text-yellow-800">{errors.services}</p>
//         </div>
//       )}

//       {/* Form */}
//       <div className="bg-white rounded-lg shadow-md p-6">
//         <form onSubmit={handleSubmit} className="space-y-6">
//           {/* Submit Error */}
//           {errors.submit && (
//             <div className="bg-red-50 border border-red-200 rounded-md p-4">
//               <p className="text-red-800">{errors.submit}</p>
//             </div>
//           )}

//           {/* Title */}
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-2">
//               Project Title *
//             </label>
//             <input
//               type="text"
//               name="title"
//               placeholder="Enter project title"
//               value={formData.title}
//               onChange={handleInputChange}
//               className={`w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
//                 errors.title ? 'border-red-500' : 'border-gray-300'
//               }`}
//             />
//             {errors.title && (
//               <p className="mt-1 text-sm text-red-600">{errors.title}</p>
//             )}
//           </div>

//           {/* Location */}
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-2">
//               Location
//             </label>
//             <input
//               type="text"
//               name="location"
//               placeholder="Enter project location"
//               value={formData.location}
//               onChange={handleInputChange}
//               className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//             />
//           </div>

//           {/* Description */}
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-2">
//               Description
//             </label>
//             <textarea
//               name="description"
//               placeholder="Enter project description"
//               value={formData.description}
//               onChange={handleInputChange}
//               rows={4}
//               className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-vertical"
//             />
//           </div>

//           {/* Project Date */}
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-2">
//               Project Date
//             </label>
//             <input
//               type="date"
//               name="projectDate"
//               value={formData.projectDate}
//               onChange={handleInputChange}
//               className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//             />
//           </div>

//           {/* Service Dropdown */}
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-2">
//               Service *
//             </label>
//             <div className="relative">
//               <button
//                 type="button"
//                 onClick={() => {
//                   console.log('🔽 Dropdown clicked, current state:', isDropdownOpen);
//                   console.log('📊 Available services:', services.length);
//                   setIsDropdownOpen(!isDropdownOpen);
//                 }}
//                 className={`w-full p-3 border rounded-md bg-white flex justify-between items-center cursor-pointer hover:border-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
//                   errors.service ? 'border-red-500' : 'border-gray-300'
//                 } ${serviceId ? 'text-gray-900' : 'text-gray-500'}`}
//               >
//                 <span>{selectedServiceName}</span>
//                 <span className={`transform transition-transform duration-200 ${
//                   isDropdownOpen ? 'rotate-180' : 'rotate-0'
//                 }`}>
//                   ▼
//                 </span>
//               </button>

//               {isDropdownOpen && (
//                 <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-y-auto z-50">
//                   {Array.isArray(services) && services.length > 0 ? (
//                     services.map((service, index) => (
//                       <div
//                         key={service._id}
//                         onClick={() => handleServiceSelect(service)}
//                         className="p-3 cursor-pointer hover:bg-blue-50 border-b border-gray-100 last:border-b-0 transition-colors"
//                       >
//                         <div className="font-medium text-gray-900">
//                           {service.title || service.name}
//                         </div>
//                         {service.description && (
//                           <div className="text-sm text-gray-500 mt-1 truncate">
//                             {service.description}
//                           </div>
//                         )}
//                       </div>
//                     ))
//                   ) : (
//                     <div className="p-3 text-gray-500 text-center">
//                       No services available
//                     </div>
//                   )}
//                 </div>
//               )}
//             </div>
//             {errors.service && (
//               <p className="mt-1 text-sm text-red-600">{errors.service}</p>
//             )}
//           </div>

//           {/* File Upload */}
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-2">
//               Project Files
//             </label>
//             <input
//               type="file"
//               multiple
//               onChange={handleFileChange}
//               accept="image/*,video/*,.pdf,.doc,.docx,.txt"
//               className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
//             />
//             {files.length > 0 && (
//               <div className="mt-2 text-sm text-gray-600">
//                 📁 {files.length} file{files.length !== 1 ? 's' : ''} selected
//               </div>
//             )}
//             {errors.files && (
//               <p className="mt-1 text-sm text-yellow-600">{errors.files}</p>
//             )}
//             <p className="mt-1 text-xs text-gray-500">
//               Supported formats: Images, Videos, PDF, Word documents, Text files (max 10MB each)
//             </p>
//           </div>

//           {/* Submit Button */}
//           <div className="flex gap-4 pt-4">
//             <button
//               type="submit"
//               disabled={loading || !serviceId}
//               className="flex-1 bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors font-medium flex items-center justify-center"
//             >
//               {loading ? (
//                 <>
//                   <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
//                   Creating Project...
//                 </>
//               ) : (
//                 '✅ Create Project'
//               )}
//             </button>
//             <Link
//               to="/projects"
//               className="px-6 py-3 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors font-medium text-center"
//             >
//               Cancel
//             </Link>
//           </div>
//         </form>
//       </div>

//       {/* Overlay for dropdown */}
//       {isDropdownOpen && (
//         <div
//           className="fixed inset-0 z-40"
//           onClick={() => setIsDropdownOpen(false)}
//         />
//       )}
//     </div>
//   );
// };

// export default AddProject;

import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

const AddProject = () => {
  const [formData, setFormData] = useState({
    title: '',
    location: '',
    description: '',
    projectDate: ''
  });
  const [files, setFiles] = useState([]);
  const [serviceId, setServiceId] = useState('');
  const [services, setServices] = useState([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedServiceName, setSelectedServiceName] = useState('Select a Service');
  const [loading, setLoading] = useState(false);
  const [servicesLoading, setServicesLoading] = useState(true);
  const [errors, setErrors] = useState({});

  const navigate = useNavigate();

  const token = localStorage.getItem('token');
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  // Fetch all available services for the dropdown
  useEffect(() => {
    const fetchServices = async () => {
      try {
        setServicesLoading(true);
        console.log('🔄 Fetching services...');
        
        const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/services`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        
        const servicesData = res.data.services || res.data || [];
        setServices(servicesData);
        console.log('✅ Services fetched:', servicesData.length, 'services');
        
        if (servicesData.length === 0) {
          console.warn('⚠️ No services available');
        }
      } catch (err) {
        console.error('❌ Failed to fetch services:', err);
        setErrors(prev => ({ ...prev, services: 'Failed to load services. Please refresh the page.' }));
      } finally {
        setServicesLoading(false);
      }
    };

    if (token) {
      fetchServices();
    } else {
      setErrors(prev => ({ ...prev, auth: 'Please log in to continue' }));
      setServicesLoading(false);
    }
  }, [token]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleServiceSelect = (service) => {
    console.log('🔧 Service selected:', service);
    setServiceId(service._id);
    setSelectedServiceName(service.title || service.name);
    setIsDropdownOpen(false);
    
    // Clear service error
    if (errors.service) {
      setErrors(prev => ({ ...prev, service: '' }));
    }
  };

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    console.log('📁 Files selected:', selectedFiles.length, 'files');
    
    // Validate file types and sizes
    const allowedTypes = ['image/', 'video/', 'application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'text/plain'];
    const maxSize = 10 * 1024 * 1024; // 10MB
    
    const validFiles = selectedFiles.filter(file => {
      const isValidType = allowedTypes.some(type => file.type.startsWith(type));
      const isValidSize = file.size <= maxSize;
      
      if (!isValidType) {
        console.warn(`⚠️ Invalid file type: ${file.name}`);
        return false;
      }
      if (!isValidSize) {
        console.warn(`⚠️ File too large: ${file.name}`);
        return false;
      }
      return true;
    });
    
    setFiles(validFiles);
    
    if (validFiles.length !== selectedFiles.length) {
      setErrors(prev => ({ 
        ...prev, 
        files: 'Some files were skipped due to invalid type or size (max 10MB)' 
      }));
    } else if (errors.files) {
      setErrors(prev => ({ ...prev, files: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    // Validate required fields
    if (!formData.title.trim()) {
      newErrors.title = 'Project title is required';
    }
    
    if (!serviceId) {
      newErrors.service = 'Please select a service';
    }
    
    if (!user?.userId) {
      newErrors.auth = 'User not found. Please log in again.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      console.error('❌ Form validation failed');
      return;
    }

    console.log('🚀 Creating project with data:', {
      userId: user.userId,
      serviceId,
      ...formData,
      filesCount: files.length
    });

    const formDataObj = new FormData();
    formDataObj.append('userId', user.userId);
    formDataObj.append('serviceId', serviceId);
    formDataObj.append('title', formData.title);
    formDataObj.append('location', formData.location);
    formDataObj.append('description', formData.description);
    formDataObj.append('projectDate', formData.projectDate);
    
    // Append files
    files.forEach(file => {
      formDataObj.append('files', file);
    });

    try {
      setLoading(true);
      await axios.post(`${import.meta.env.VITE_API_BASE_URL}/projects/create`, formDataObj, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log('✅ Project created successfully');
      navigate('/projects', { 
        state: { message: 'Project created successfully!' }
      });
    } catch (error) {
      console.error('❌ Error creating project:', error);
      const errorMessage = error.response?.data?.message || 'Failed to create project';
      setErrors(prev => ({ ...prev, submit: errorMessage }));
    } finally {
      setLoading(false);
    }
  };

  // Loading state
  if (servicesLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="relative">
          {/* Animated loading ring */}
          <div className="w-20 h-20 border-4 border-transparent border-t-cyan-400 border-r-purple-400 rounded-full animate-spin"></div>
          <div className="absolute inset-0 w-20 h-20 border-4 border-transparent border-b-pink-400 border-l-blue-400 rounded-full animate-spin" style={{ animationDirection: 'reverse', animationDuration: '1.5s' }}></div>
          
          {/* Glowing center */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-6 h-6 bg-gradient-to-r from-cyan-400 to-purple-400 rounded-full animate-pulse"></div>
          </div>
          
          {/* Loading text */}
          <div className="mt-8 text-center">
            <div className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400 text-xl font-bold animate-pulse">
              INITIALIZING SERVICES
            </div>
            <div className="flex justify-center mt-2 space-x-1">
              <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce"></div>
              <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
              <div className="w-2 h-2 bg-pink-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Auth error state
  if (errors.auth) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-red-900 to-slate-900 flex items-center justify-center p-6">
        <div className="relative max-w-md w-full">
          {/* Error container */}
          <div className="relative bg-black/40 backdrop-blur-xl border border-red-500/30 rounded-2xl p-8 shadow-2xl">
            {/* Animated border */}
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-red-500/20 to-orange-500/20 animate-pulse"></div>
            
            {/* Content */}
            <div className="relative z-10">
              <div className="flex items-center justify-center w-16 h-16 mx-auto mb-6 bg-gradient-to-r from-red-500 to-orange-500 rounded-full">
                <span className="text-2xl">⚠️</span>
              </div>
              
              <h2 className="text-2xl font-bold text-white text-center mb-4">
                ACCESS DENIED
              </h2>
              
              <p className="text-red-300 text-center mb-6">{errors.auth}</p>
              
              <Link 
                to="/login" 
                className="group relative w-full flex items-center justify-center px-6 py-3 bg-gradient-to-r from-red-600 to-orange-600 text-white font-semibold rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-red-500/25 hover:scale-105"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-red-500 to-orange-500 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity"></span>
                <span className="relative flex items-center">
                  ← AUTHENTICATE
                </span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Background effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-pink-500/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '4s' }}></div>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto p-6">
        {/* Header */}
        <div className="mb-8">
          <Link 
            to="/projects" 
            className="group inline-flex items-center text-cyan-400 hover:text-cyan-300 mb-6 transition-all duration-300"
          >
            <div className="w-8 h-8 rounded-full bg-cyan-500/10 flex items-center justify-center mr-3 group-hover:bg-cyan-500/20 transition-all">
              ←
            </div>
            <span className="font-medium">Back to Projects</span>
          </Link>
          
          <div className="text-center">
            <h1 className="text-5xl font-bold mb-4">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400">
                CREATE PROJECT
              </span>
            </h1>
            <p className="text-slate-300 text-lg">
              Initialize a new project with advanced configuration
            </p>
            
            {/* Decorative line */}
            <div className="flex justify-center mt-6">
              <div className="w-32 h-1 bg-gradient-to-r from-cyan-400 to-purple-400 rounded-full"></div>
            </div>
          </div>
        </div>

        {/* Services error */}
        {errors.services && (
          <div className="mb-6 relative">
            <div className="bg-yellow-500/10 backdrop-blur-xl border border-yellow-500/30 rounded-2xl p-4">
              <div className="flex items-center">
                <div className="w-6 h-6 rounded-full bg-yellow-500/20 flex items-center justify-center mr-3">
                  ⚠️
                </div>
                <p className="text-yellow-300">{errors.services}</p>
              </div>
            </div>
          </div>
        )}

        {/* Main Form Container */}
        <div className="relative">
          {/* Glowing border effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 via-purple-500/20 to-pink-500/20 rounded-3xl blur-xl"></div>
          
          <div className="relative bg-black/40 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl">
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Submit Error */}
              {errors.submit && (
                <div className="bg-red-500/10 backdrop-blur-xl border border-red-500/30 rounded-2xl p-4">
                  <div className="flex items-center">
                    <div className="w-6 h-6 rounded-full bg-red-500/20 flex items-center justify-center mr-3">
                      ❌
                    </div>
                    <p className="text-red-300">{errors.submit}</p>
                  </div>
                </div>
              )}

              {/* Form Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Title */}
                <div className="lg:col-span-2">
                  <label className="block text-sm font-semibold text-slate-300 mb-3 uppercase tracking-wider">
                    Project Title *
                  </label>
                  <div className="relative group">
                    <input
                      type="text"
                      name="title"
                      placeholder="Enter project title"
                      value={formData.title}
                      onChange={handleInputChange}
                      className={`w-full p-4 bg-slate-800/50 backdrop-blur-xl border rounded-2xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 transition-all duration-300 ${
                        errors.title 
                          ? 'border-red-500/50 focus:ring-red-500/50' 
                          : 'border-slate-700/50 focus:ring-cyan-500/50 group-hover:border-slate-600/50'
                      }`}
                    />
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-cyan-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
                  </div>
                  {errors.title && (
                    <p className="mt-2 text-sm text-red-400 flex items-center">
                      <span className="w-4 h-4 rounded-full bg-red-500/20 flex items-center justify-center mr-2 text-xs">!</span>
                      {errors.title}
                    </p>
                  )}
                </div>

                {/* Location */}
                <div>
                  <label className="block text-sm font-semibold text-slate-300 mb-3 uppercase tracking-wider">
                    Location
                  </label>
                  <div className="relative group">
                    <input
                      type="text"
                      name="location"
                      placeholder="Enter project location"
                      value={formData.location}
                      onChange={handleInputChange}
                      className="w-full p-4 bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-2xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500/50 group-hover:border-slate-600/50 transition-all duration-300"
                    />
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-purple-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
                  </div>
                </div>

                {/* Project Date */}
                <div>
                  <label className="block text-sm font-semibold text-slate-300 mb-3 uppercase tracking-wider">
                    Project Date
                  </label>
                  <div className="relative group">
                    <input
                      type="date"
                      name="projectDate"
                      value={formData.projectDate}
                      onChange={handleInputChange}
                      className="w-full p-4 bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-2xl text-white focus:outline-none focus:ring-2 focus:ring-pink-500/50 group-hover:border-slate-600/50 transition-all duration-300"
                    />
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-pink-500/10 to-cyan-500/10 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
                  </div>
                </div>

                {/* Description */}
                <div className="lg:col-span-2">
                  <label className="block text-sm font-semibold text-slate-300 mb-3 uppercase tracking-wider">
                    Description
                  </label>
                  <div className="relative group">
                    <textarea
                      name="description"
                      placeholder="Enter project description"
                      value={formData.description}
                      onChange={handleInputChange}
                      rows={4}
                      className="w-full p-4 bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-2xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 group-hover:border-slate-600/50 transition-all duration-300 resize-vertical"
                    />
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-cyan-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
                  </div>
                </div>

                {/* Service Dropdown */}
                <div className="lg:col-span-2">
                  <label className="block text-sm font-semibold text-slate-300 mb-3 uppercase tracking-wider">
                    Service *
                  </label>
                  <div className="relative">
                    <button
                      type="button"
                      onClick={() => {
                        console.log('🔽 Dropdown clicked, current state:', isDropdownOpen);
                        console.log('📊 Available services:', services.length);
                        setIsDropdownOpen(!isDropdownOpen);
                      }}
                      className={`w-full p-4 bg-slate-800/50 backdrop-blur-xl border rounded-2xl text-left flex justify-between items-center cursor-pointer transition-all duration-300 hover:border-slate-600/50 focus:outline-none focus:ring-2 ${
                        errors.service 
                          ? 'border-red-500/50 focus:ring-red-500/50' 
                          : 'border-slate-700/50 focus:ring-purple-500/50'
                      } ${serviceId ? 'text-white' : 'text-slate-400'}`}
                    >
                      <span>{selectedServiceName}</span>
                      <div className={`transform transition-transform duration-300 text-purple-400 ${
                        isDropdownOpen ? 'rotate-180' : 'rotate-0'
                      }`}>
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                      </div>
                    </button>

                    {isDropdownOpen && (
                      <div className="absolute top-full left-0 right-0 mt-2 bg-slate-800/90 backdrop-blur-xl border border-slate-700/50 rounded-2xl shadow-2xl max-h-60 overflow-y-auto z-50">
                        {Array.isArray(services) && services.length > 0 ? (
                          services.map((service, index) => (
                            <div
                              key={service._id}
                              onClick={() => handleServiceSelect(service)}
                              className="p-4 cursor-pointer hover:bg-slate-700/50 border-b border-slate-700/30 last:border-b-0 transition-all duration-200 group"
                            >
                              <div className="font-medium text-white group-hover:text-purple-300 transition-colors">
                                {service.title || service.name}
                              </div>
                              {service.description && (
                                <div className="text-sm text-slate-400 mt-1 truncate group-hover:text-slate-300">
                                  {service.description}
                                </div>
                              )}
                            </div>
                          ))
                        ) : (
                          <div className="p-4 text-slate-400 text-center">
                            No services available
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                  {errors.service && (
                    <p className="mt-2 text-sm text-red-400 flex items-center">
                      <span className="w-4 h-4 rounded-full bg-red-500/20 flex items-center justify-center mr-2 text-xs">!</span>
                      {errors.service}
                    </p>
                  )}
                </div>

                {/* File Upload */}
                <div className="lg:col-span-2">
                  <label className="block text-sm font-semibold text-slate-300 mb-3 uppercase tracking-wider">
                    Project Files
                  </label>
                  <div className="relative group">
                    <input
                      type="file"
                      multiple
                      onChange={handleFileChange}
                      accept="image/*,video/*,.pdf,.doc,.docx,.txt"
                      className="w-full p-4 bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-2xl text-white file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:bg-gradient-to-r file:from-cyan-600 file:to-purple-600 file:text-white file:font-medium hover:file:from-cyan-500 hover:file:to-purple-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 group-hover:border-slate-600/50 transition-all duration-300"
                    />
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-cyan-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
                  </div>
                  
                  {files.length > 0 && (
                    <div className="mt-3 p-3 bg-green-500/10 backdrop-blur-xl border border-green-500/30 rounded-xl">
                      <div className="flex items-center text-green-300">
                        <div className="w-5 h-5 rounded-full bg-green-500/20 flex items-center justify-center mr-2">
                          📁
                        </div>
                        <span className="font-medium">
                          {files.length} file{files.length !== 1 ? 's' : ''} selected
                        </span>
                      </div>
                    </div>
                  )}
                  
                  {errors.files && (
                    <p className="mt-2 text-sm text-yellow-400 flex items-center">
                      <span className="w-4 h-4 rounded-full bg-yellow-500/20 flex items-center justify-center mr-2 text-xs">⚠</span>
                      {errors.files}
                    </p>
                  )}
                  
                  <p className="mt-2 text-xs text-slate-500">
                    Supported: Images, Videos, PDF, Word, Text files (max 10MB each)
                  </p>
                </div>
              </div>

              {/* Submit Buttons */}
              <div className="flex gap-4 pt-6">
                <button
                  type="submit"
                  disabled={loading || !serviceId}
                  className="group relative flex-1 bg-gradient-to-r from-cyan-600 to-purple-600 text-white px-8 py-4 rounded-2xl font-semibold transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/25 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:hover:shadow-none overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  <div className="relative flex items-center justify-center">
                    {loading ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-3"></div>
                        <span>CREATING PROJECT...</span>
                      </>
                    ) : (
                      <>
                        <span className="mr-2">🚀</span>
                        <span>CREATE PROJECT</span>
                      </>
                    )}
                  </div>
                </button>
                
                <Link
                  to="/projects"
                  className="group relative px-8 py-4 bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 text-slate-300 rounded-2xl font-semibold hover:bg-slate-700/50 hover:border-slate-600/50 transition-all duration-300 text-center overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-slate-700/50 to-slate-600/50 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  <span className="relative">CANCEL</span>
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Overlay for dropdown */}
      {isDropdownOpen && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setIsDropdownOpen(false)}
        />
      )}
    </div>
  );
};

export default AddProject;