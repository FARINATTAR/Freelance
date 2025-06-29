// import { useEffect, useState } from 'react';
// import { useParams, useNavigate, Link } from 'react-router-dom';
// import axios from 'axios';

// const ProjectDetails = () => {
//   const { projectId } = useParams();
//   const navigate = useNavigate();

//   const [project, setProject] = useState(null);
//   const [newFiles, setNewFiles] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [isEditing, setIsEditing] = useState(false);
//   const [uploading, setUploading] = useState(false);

//   const token = localStorage.getItem('token');

//   useEffect(() => {
//     if (!projectId) {
//       setError('Invalid project ID');
//       setLoading(false);
//       return;
//     }

//     const fetchProject = async () => {
//       try {
//         setLoading(true);
//         const response = await axios.get(
//           `${import.meta.env.VITE_API_BASE_URL}/projects/${projectId}`, 
//           {
//             headers: { Authorization: `Bearer ${token}` }
//           }
//         );
//         setProject(response.data);
//         setError(null);
//       } catch (err) {
//         console.error('❌ Error fetching project:', err);
//         if (err.response?.status === 404) {
//           setError('Project not found');
//         } else if (err.response?.status === 401) {
//           setError('Unauthorized. Please log in again.');
//         } else {
//           setError('Failed to fetch project details');
//         }
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchProject();
//   }, [projectId, token]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setProject(prev => ({ ...prev, [name]: value }));
//   };

//   const handleSave = async () => {
//     if (!project.title?.trim()) {
//       alert('Project title is required');
//       return;
//     }

//     try {
//       const updateData = {
//         title: project.title,
//         description: project.description,
//         location: project.location,
//         projectDate: project.projectDate
//       };

//       await axios.put(
//         `${import.meta.env.VITE_API_BASE_URL}/projects/${projectId}`, 
//         updateData, 
//         {
//           headers: { Authorization: `Bearer ${token}` }
//         }
//       );
      
//       alert('✅ Project updated successfully');
//       setIsEditing(false);
//     } catch (err) {
//       console.error('❌ Update failed:', err);
//       alert('Failed to update project. Please try again.');
//     }
//   };

//   const handleUploadFiles = async () => {
//     if (!newFiles.length) {
//       alert('Please select files to upload');
//       return;
//     }

//     const formData = new FormData();
//     Array.from(newFiles).forEach(file => {
//       formData.append('files', file);
//     });

//     try {
//       setUploading(true);
//       await axios.put(
//         `${import.meta.env.VITE_API_BASE_URL}/projects/${projectId}/files`, 
//         formData, 
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//             'Content-Type': 'multipart/form-data'
//           }
//         }
//       );
      
//       alert('✅ Files uploaded successfully');
//       setNewFiles([]);
      
//       // Refresh project data to show new files
//       window.location.reload();
//     } catch (err) {
//       console.error('❌ File upload error:', err);
//       alert('Failed to upload files. Please try again.');
//     } finally {
//       setUploading(false);
//     }
//   };

//   const handleDeleteProject = async () => {
//     if (!confirm('Are you sure you want to delete this project? This action cannot be undone.')) {
//       return;
//     }

//     try {
//       await axios.delete(
//         `${import.meta.env.VITE_API_BASE_URL}/projects/${projectId}`, 
//         {
//           headers: { Authorization: `Bearer ${token}` }
//         }
//       );
      
//       alert('✅ Project deleted successfully');
//       navigate('/projects');
//     } catch (err) {
//       console.error('❌ Delete failed:', err);
//       alert('Failed to delete project. Please try again.');
//     }
//   };

//   const formatDate = (dateString) => {
//     if (!dateString) return 'No date';
//     return new Date(dateString).toLocaleDateString();
//   };

//   if (loading) {
//     return (
//       <div className="flex justify-center items-center h-64">
//         <div className="text-lg">Loading project details...</div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="max-w-2xl mx-auto p-6">
//         <div className="bg-red-50 border border-red-200 rounded-md p-4 mb-4">
//           <p className="text-red-800">{error}</p>
//         </div>
//         <Link 
//           to="/projects" 
//           className="text-blue-600 hover:underline"
//         >
//           ← Back to Projects
//         </Link>
//       </div>
//     );
//   }

//   if (!project) {
//     return (
//       <div className="max-w-2xl mx-auto p-6">
//         <p>Project not found</p>
//         <Link to="/projects" className="text-blue-600 hover:underline">
//           ← Back to Projects
//         </Link>
//       </div>
//     );
//   }

//   return (
//     <div className="max-w-4xl mx-auto p-6">
//       {/* Navigation */}
//       <div className="mb-6">
//         <Link 
//           to="/projects" 
//           className="text-blue-600 hover:underline mb-4 inline-block"
//         >
//           ← Back to Projects
//         </Link>
//       </div>

//       {/* Project Header */}
//       <div className="bg-white rounded-lg shadow-md p-6 mb-6">
//         <div className="flex justify-between items-start mb-4">
//           <h1 className="text-3xl font-bold text-gray-800">
//             {isEditing ? (
//               <input
//                 type="text"
//                 name="title"
//                 value={project.title || ''}
//                 onChange={handleChange}
//                 className="text-3xl font-bold bg-transparent border-b-2 border-blue-500 focus:outline-none"
//                 placeholder="Project Title"
//               />
//             ) : (
//               project.title
//             )}
//           </h1>
          
//           <div className="flex gap-2">
//             <button
//               onClick={() => setIsEditing(!isEditing)}
//               className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition-colors"
//             >
//               {isEditing ? 'Cancel' : 'Edit'}
//             </button>
//             {isEditing && (
//               <button
//                 onClick={handleSave}
//                 className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition-colors"
//               >
//                 Save Changes
//               </button>
//             )}
//           </div>
//         </div>

//         {/* Project Details */}
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
//             {isEditing ? (
//               <textarea
//                 name="description"
//                 value={project.description || ''}
//                 onChange={handleChange}
//                 rows={4}
//                 className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
//                 placeholder="Project description"
//               />
//             ) : (
//               <p className="text-gray-600">{project.description || 'No description provided'}</p>
//             )}
//           </div>
          
//           <div className="space-y-4">
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
//               {isEditing ? (
//                 <input
//                   type="text"
//                   name="location"
//                   value={project.location || ''}
//                   onChange={handleChange}
//                   className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
//                   placeholder="Project location"
//                 />
//               ) : (
//                 <p className="text-gray-600">{project.location || 'No location specified'}</p>
//               )}
//             </div>
            
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">Project Date</label>
//               {isEditing ? (
//                 <input
//                   type="date"
//                   name="projectDate"
//                   value={project.projectDate ? project.projectDate.split('T')[0] : ''}
//                   onChange={handleChange}
//                   className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
//                 />
//               ) : (
//                 <p className="text-gray-600">{formatDate(project.projectDate)}</p>
//               )}
//             </div>
            
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">Service</label>
//               <p className="text-gray-600">
//                 {project.serviceId?.name || project.serviceId?.title || 'Unknown Service'}
//               </p>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Files Section */}
//       <div className="bg-white rounded-lg shadow-md p-6 mb-6">
//         <h2 className="text-xl font-semibold text-gray-800 mb-4">Project Files</h2>
        
//         {/* Current Files */}
//         {project.files && project.files.length > 0 ? (
//           <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 mb-6">
//             {project.files.map((fileId, index) => (
//               <div key={fileId} className="relative group">
//                 <a
//                   href={`${import.meta.env.VITE_API_BASE_URL}/projects/files/${fileId}`}
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   className="block border-2 border-gray-200 rounded-lg overflow-hidden hover:border-blue-400 transition-colors"
//                 >
//                   <img
//                     src={`${import.meta.env.VITE_API_BASE_URL}/projects/files/${fileId}`}
//                     alt={`Project file ${index + 1}`}
//                     className="w-full h-24 object-cover"
//                     onError={(e) => {
//                       e.target.style.display = 'none';
//                       const fallback = e.target.nextElementSibling;
//                       if (fallback) fallback.style.display = 'flex';
//                     }}
//                   />
//                   <div 
//                     className="w-full h-24 bg-gray-100 rounded flex items-center justify-center text-gray-500 text-sm"
//                     style={{ display: 'none' }}
//                   >
//                     📄 File
//                   </div>
//                 </a>
//               </div>
//             ))}
//           </div>
//         ) : (
//           <p className="text-gray-500 mb-6">No files uploaded yet.</p>
//         )}

//         {/* Upload New Files */}
//         <div className="border-t pt-4">
//           <h3 className="text-lg font-medium text-gray-800 mb-3">Add More Files</h3>
//           <div className="flex flex-col sm:flex-row gap-4">
//             <input
//               type="file"
//               multiple
//               onChange={(e) => setNewFiles(e.target.files)}
//               className="flex-1 p-2 border rounded-md"
//               accept="image/*,video/*,.pdf,.doc,.docx"
//             />
//             <button
//               onClick={handleUploadFiles}
//               disabled={!newFiles.length || uploading}
//               className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 disabled:bg-gray-400 transition-colors"
//             >
//               {uploading ? 'Uploading...' : 'Upload Files'}
//             </button>
//           </div>
//           {newFiles.length > 0 && (
//             <p className="text-sm text-gray-600 mt-2">
//               {newFiles.length} file(s) selected
//             </p>
//           )}
//         </div>
//       </div>

//       {/* Danger Zone */}
//       <div className="bg-red-50 border border-red-200 rounded-lg p-6">
//         <h2 className="text-xl font-semibold text-red-800 mb-4">Danger Zone</h2>
//         <p className="text-red-600 mb-4">
//           Once you delete a project, there is no going back. Please be certain.
//         </p>
//         <button
//           onClick={handleDeleteProject}
//           className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition-colors"
//         >
//           Delete Project
//         </button>
//       </div>
//     </div>
//   );
// };

// export default ProjectDetails;

import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

const ProjectDetails = () => {
  const { projectId } = useParams();
  const navigate = useNavigate();

  const [project, setProject] = useState(null);
  const [newFiles, setNewFiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [deletingFiles, setDeletingFiles] = useState(new Set()); // Track which files are being deleted

  const token = localStorage.getItem('token');

  useEffect(() => {
    if (!projectId) {
      setError('Invalid project ID');
      setLoading(false);
      return;
    }

    const fetchProject = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/projects/${projectId}`, 
          {
            headers: { Authorization: `Bearer ${token}` }
          }
        );
        setProject(response.data);
        setError(null);
      } catch (err) {
        console.error('❌ Error fetching project:', err);
        if (err.response?.status === 404) {
          setError('Project not found');
        } else if (err.response?.status === 401) {
          setError('Unauthorized. Please log in again.');
        } else {
          setError('Failed to fetch project details');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchProject();
  }, [projectId, token]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProject(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    if (!project.title?.trim()) {
      alert('Project title is required');
      return;
    }

    try {
      const updateData = {
        title: project.title,
        description: project.description,
        location: project.location,
        projectDate: project.projectDate
      };

      await axios.put(
        `${import.meta.env.VITE_API_BASE_URL}/projects/${projectId}`, 
        updateData, 
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );
      
      alert('✅ Project updated successfully');
      setIsEditing(false);
    } catch (err) {
      console.error('❌ Update failed:', err);
      alert('Failed to update project. Please try again.');
    }
  };

  const handleUploadFiles = async () => {
    if (!newFiles.length) {
      alert('Please select files to upload');
      return;
    }

    const formData = new FormData();
    Array.from(newFiles).forEach(file => {
      formData.append('files', file);
    });

    try {
      setUploading(true);
      await axios.put(
        `${import.meta.env.VITE_API_BASE_URL}/projects/${projectId}/files`, 
        formData, 
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data'
          }
        }
      );
      
      alert('✅ Files uploaded successfully');
      setNewFiles([]);
      
      // Refresh project data to show new files
      window.location.reload();
    } catch (err) {
      console.error('❌ File upload error:', err);
      alert('Failed to upload files. Please try again.');
    } finally {
      setUploading(false);
    }
  };

  // NEW: Handle individual file deletion
  const handleDeleteFile = async (fileId) => {
    if (!confirm('Are you sure you want to delete this file? This action cannot be undone.')) {
      return;
    }

    try {
      // Add fileId to deleting set to show loading state
      setDeletingFiles(prev => new Set([...prev, fileId]));

      await axios.delete(
        `${import.meta.env.VITE_API_BASE_URL}/projects/${projectId}/files/${fileId}`, 
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );
      
      // Update project state to remove the deleted file
      setProject(prev => ({
        ...prev,
        files: prev.files.filter(id => id !== fileId)
      }));
      
      alert('✅ File deleted successfully');
    } catch (err) {
      console.error('❌ File delete failed:', err);
      alert('Failed to delete file. Please try again.');
    } finally {
      // Remove fileId from deleting set
      setDeletingFiles(prev => {
        const newSet = new Set(prev);
        newSet.delete(fileId);
        return newSet;
      });
    }
  };

  const handleDeleteProject = async () => {
    if (!confirm('Are you sure you want to delete this project? This action cannot be undone.')) {
      return;
    }

    try {
      await axios.delete(
        `${import.meta.env.VITE_API_BASE_URL}/projects/${projectId}`, 
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );
      
      alert('✅ Project deleted successfully');
      navigate('/projects');
    } catch (err) {
      console.error('❌ Delete failed:', err);
      alert('Failed to delete project. Please try again.');
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'No date';
    return new Date(dateString).toLocaleDateString();
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-lg">Loading project details...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-2xl mx-auto p-6">
        <div className="bg-red-50 border border-red-200 rounded-md p-4 mb-4">
          <p className="text-red-800">{error}</p>
        </div>
        <Link 
          to="/projects" 
          className="text-blue-600 hover:underline"
        >
          ← Back to Projects
        </Link>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="max-w-2xl mx-auto p-6">
        <p>Project not found</p>
        <Link to="/projects" className="text-blue-600 hover:underline">
          ← Back to Projects
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Navigation */}
      <div className="mb-6">
        <Link 
          to="/projects" 
          className="text-blue-600 hover:underline mb-4 inline-block"
        >
          ← Back to Projects
        </Link>
      </div>

      {/* Project Header */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <div className="flex justify-between items-start mb-4">
          <h1 className="text-3xl font-bold text-gray-800">
            {isEditing ? (
              <input
                type="text"
                name="title"
                value={project.title || ''}
                onChange={handleChange}
                className="text-3xl font-bold bg-transparent border-b-2 border-blue-500 focus:outline-none"
                placeholder="Project Title"
              />
            ) : (
              project.title
            )}
          </h1>
          
          <div className="flex gap-2">
            <button
              onClick={() => setIsEditing(!isEditing)}
              className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition-colors"
            >
              {isEditing ? 'Cancel' : 'Edit'}
            </button>
            {isEditing && (
              <button
                onClick={handleSave}
                className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition-colors"
              >
                Save Changes
              </button>
            )}
          </div>
        </div>

        {/* Project Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            {isEditing ? (
              <textarea
                name="description"
                value={project.description || ''}
                onChange={handleChange}
                rows={4}
                className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
                placeholder="Project description"
              />
            ) : (
              <p className="text-gray-600">{project.description || 'No description provided'}</p>
            )}
          </div>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
              {isEditing ? (
                <input
                  type="text"
                  name="location"
                  value={project.location || ''}
                  onChange={handleChange}
                  className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
                  placeholder="Project location"
                />
              ) : (
                <p className="text-gray-600">{project.location || 'No location specified'}</p>
              )}
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Project Date</label>
              {isEditing ? (
                <input
                  type="date"
                  name="projectDate"
                  value={project.projectDate ? project.projectDate.split('T')[0] : ''}
                  onChange={handleChange}
                  className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
                />
              ) : (
                <p className="text-gray-600">{formatDate(project.projectDate)}</p>
              )}
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Service</label>
              <p className="text-gray-600">
                {project.serviceId?.name || project.serviceId?.title || 'Unknown Service'}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Files Section */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Project Files</h2>
        
        {/* Current Files - UPDATED WITH DELETE BUTTONS */}
        {project.files && project.files.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 mb-6">
            {project.files.map((fileId, index) => (
              <div key={fileId} className="relative group">
                {/* File Preview */}
                <a
                  href={`${import.meta.env.VITE_API_BASE_URL}/projects/files/${fileId}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block border-2 border-gray-200 rounded-lg overflow-hidden hover:border-blue-400 transition-colors"
                >
                  <img
                    src={`${import.meta.env.VITE_API_BASE_URL}/projects/files/${fileId}`}
                    alt={`Project file ${index + 1}`}
                    className="w-full h-24 object-cover"
                    onError={(e) => {
                      e.target.style.display = 'none';
                      const fallback = e.target.nextElementSibling;
                      if (fallback) fallback.style.display = 'flex';
                    }}
                  />
                  <div 
                    className="w-full h-24 bg-gray-100 rounded flex items-center justify-center text-gray-500 text-sm"
                    style={{ display: 'none' }}
                  >
                    📄 File
                  </div>
                </a>
                
                {/* Delete Button - NEW */}
                <button
                  onClick={() => handleDeleteFile(fileId)}
                  disabled={deletingFiles.has(fileId)}
                  className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs hover:bg-red-600 transition-colors opacity-0 group-hover:opacity-100 disabled:opacity-50"
                  title="Delete file"
                >
                  {deletingFiles.has(fileId) ? '⏳' : '×'}
                </button>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500 mb-6">No files uploaded yet.</p>
        )}

        {/* Upload New Files */}
        <div className="border-t pt-4">
          <h3 className="text-lg font-medium text-gray-800 mb-3">Add More Files</h3>
          <div className="flex flex-col sm:flex-row gap-4">
            <input
              type="file"
              multiple
              onChange={(e) => setNewFiles(e.target.files)}
              className="flex-1 p-2 border rounded-md"
              accept="image/*,video/*,.pdf,.doc,.docx"
            />
            <button
              onClick={handleUploadFiles}
              disabled={!newFiles.length || uploading}
              className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 disabled:bg-gray-400 transition-colors"
            >
              {uploading ? 'Uploading...' : 'Upload Files'}
            </button>
          </div>
          {newFiles.length > 0 && (
            <p className="text-sm text-gray-600 mt-2">
              {newFiles.length} file(s) selected
            </p>
          )}
        </div>
      </div>

      {/* Danger Zone */}
      <div className="bg-red-50 border border-red-200 rounded-lg p-6">
        <h2 className="text-xl font-semibold text-red-800 mb-4">Danger Zone</h2>
        <p className="text-red-600 mb-4">
          Once you delete a project, there is no going back. Please be certain.
        </p>
        <button
          onClick={handleDeleteProject}
          className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition-colors"
        >
          Delete Project
        </button>
      </div>
    </div>
  );
};

export default ProjectDetails;