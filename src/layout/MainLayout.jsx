// // import { Outlet, Navigate } from "react-router-dom";
// // import Sidebar from "../components/Sidebar";

// // const MainLayout = () => {
// //   const token = localStorage.getItem("token");

// //   if (!token) {
// //     return <Navigate to="/login" replace />;
// //   }

// //   return (
// //     <div className="flex min-h-screen bg-gray-100">
// //       {/* Sidebar */}
// //       <Sidebar />

// //       {/* Page Content */}
// //       <div className="flex-1 p-6">
// //         <Outlet />
// //       </div>
// //     </div>
// //   );
// // };



// // export default MainLayout;
// // MainLayout.jsx
// import { Outlet, Navigate } from "react-router-dom";
// import Sidebar from "../components/Sidebar";
// import { Menu } from 'lucide-react';
// import { useState } from "react";

// const MainLayout = () => {
//   const [sidebarOpen, setSidebarOpen] = useState(false);
//   const token = localStorage.getItem("token");

//   if (!token) {
//     return <Navigate to="/login" replace />;
//   }

//   return (
//     <div className="flex min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
//       {/* Mobile Menu Button */}
//       <button
//         onClick={() => setSidebarOpen(!sidebarOpen)}
//         className="lg:hidden fixed top-4 left-4 z-30 p-3 rounded-xl bg-white shadow-lg border hover:shadow-xl transition-shadow"
//       >
//         <Menu size={20} className="text-gray-700" />
//       </button>

//       {/* Sidebar */}
//       <Sidebar />

//       {/* Main Content */}
//       <div className="flex-1 flex flex-col min-h-screen">
//         {/* Top Bar */}
//         <div className="bg-white/80 backdrop-blur-sm border-b border-gray-200/50 px-6 py-4 lg:px-8">
//           <div className="flex items-center justify-between">
//             <div className="flex items-center space-x-4 lg:ml-0 ml-16">
//               <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600" />
//               <div>
//                 <h1 className="text-lg font-semibold text-gray-900">Welcome back</h1>
//                 <p className="text-sm text-gray-500">Here's what's happening today</p>
//               </div>
//             </div>
//             <div className="flex items-center space-x-3">
//               <div className="w-8 h-8 bg-gradient-to-br from-green-400 to-blue-500 rounded-full" />
//             </div>
//           </div>
//         </div>

//         {/* Page Content */}
//         <div className="flex-1 p-6 lg:p-8 overflow-auto">
//           <div className="max-w-7xl mx-auto">
//             <div className="bg-white rounded-2xl shadow-sm border border-gray-200/50 min-h-[calc(100vh-12rem)] p-6 lg:p-8">
//               <Outlet />
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default MainLayout;

// import { Outlet, Navigate } from "react-router-dom";
// import Sidebar from "../components/Sidebar";
// import { Menu } from "lucide-react";
// import { useState } from "react";

// const MainLayout = () => {
//   const [sidebarOpen, setSidebarOpen] = useState(false);
//   const token = localStorage.getItem("token");

//   if (!token) {
//     return <Navigate to="/login" replace />;
//   }

//   return (
//     <div className="flex min-h-screen bg-[#0f172a] text-gray-100">
//       {/* Mobile Menu Button */}
//       <button
//         onClick={() => setSidebarOpen(!sidebarOpen)}
//         className="lg:hidden fixed top-4 left-4 z-30 p-3 rounded-xl bg-[#1e293b] text-gray-200 shadow-lg border border-gray-700 hover:shadow-xl transition-shadow"
//       >
//         <Menu size={20} />
//       </button>

//       {/* Sidebar */}
//       <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

//       {/* Main Content */}
//       <div className="flex-1 flex flex-col min-h-screen">
//         {/* Top Bar */}
//         <div className="bg-[#1e293b]/70 backdrop-blur-md border-b border-gray-700 px-6 py-4 lg:px-8">
//           <div className="flex items-center justify-between">
//             <div className="flex items-center space-x-4 lg:ml-0 ml-16">
//               <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600" />
//               <div>
//                 <h1 className="text-lg font-semibold text-white">Welcome back</h1>
//                 <p className="text-sm text-gray-400">Here's what's happening today</p>
//               </div>
//             </div>
//             <div className="flex items-center space-x-3">
//               <div className="w-8 h-8 bg-gradient-to-br from-green-400 to-blue-500 rounded-full" />
//             </div>
//           </div>
//         </div>

//         {/* Page Content */}
//         <div className="flex-1 p-6 lg:p-8 overflow-auto bg-[#0f172a]">
//           <div className="max-w-7xl mx-auto">
//             <div className="bg-[#1e293b] rounded-2xl shadow-md border border-gray-700 min-h-[calc(100vh-12rem)] p-6 lg:p-8">
//               <Outlet />
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default MainLayout;
import { Outlet, Navigate, useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import { Menu, Home } from "lucide-react";
import { useState } from "react";

const MainLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  const handleHomeClick = () => {
    navigate("/"); // or navigate("/home") or navigate("/dashboard") - adjust to your home route
  };

  return (
    <div className="flex min-h-screen bg-[#0f172a] text-gray-100">
      {/* Mobile Menu Button */}
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="lg:hidden fixed top-4 left-4 z-30 p-3 rounded-xl bg-[#1e293b] text-gray-200 shadow-lg border border-gray-700 hover:shadow-xl transition-shadow"
      >
        <Menu size={20} />
      </button>

      {/* Sidebar */}
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-h-screen">
        {/* Top Bar */}
        <div className="bg-[#1e293b]/70 backdrop-blur-md border-b border-gray-700 px-6 py-4 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4 lg:ml-0 ml-16">
              <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600" />
              <div>
                <h1 className="text-lg font-semibold text-white">Welcome back</h1>
                <p className="text-sm text-gray-400">Here's what's happening today</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              {/* Home Button */}
              <button
                onClick={handleHomeClick}
                className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-[#334155] text-gray-200 hover:bg-[#475569] transition-colors border border-gray-600"
                title="Go to Home"
              >
                <Home size={16} />
                <span className="hidden sm:inline">Home</span>
              </button>
              <div className="w-8 h-8 bg-gradient-to-br from-green-400 to-blue-500 rounded-full" />
            </div>
          </div>
        </div>

        {/* Page Content */}
        <div className="flex-1 p-6 lg:p-8 overflow-auto bg-[#0f172a]">
          <div className="max-w-7xl mx-auto">
            <div className="bg-[#1e293b] rounded-2xl shadow-md border border-gray-700 min-h-[calc(100vh-12rem)] p-6 lg:p-8">
              <Outlet />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainLayout;