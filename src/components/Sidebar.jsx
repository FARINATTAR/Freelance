// import { Link, useNavigate } from "react-router-dom";

// const Sidebar = () => {
//   const navigate = useNavigate();

//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     navigate("/login");
//   };

//   return (
//     <div className="w-64 bg-white shadow-lg p-4">
//       <h2 className="text-xl font-bold mb-6">Dashboard</h2>
//       <nav className="flex flex-col gap-4">
//         <Link to="/">🏠 Dashboard</Link>
//         <Link to="/profile">👤 Profile</Link>
//         <Link to="/chat">💬 Chat</Link>
//         <Link to="/services">🛠️ Services</Link>
//         <Link to="/projects">📁 Projects</Link>
//         <button
//           onClick={handleLogout}
//           className="mt-6 text-red-600 hover:underline text-left"
//         >
//           🚪 Logout
//         </button>
//       </nav>
//     </div>
//   );
// };

// export default Sidebar;

// Sidebar.jsx
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";
import { 
  Home, 
  User, 
  MessageCircle, 
  Settings, 
  FolderOpen, 
  LogOut, 
  Menu, 
  X,
  ChevronRight
} from 'lucide-react';

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isCollapsed, setIsCollapsed] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const navItems = [
    { path: '/', icon: Home, label: 'Dashboard' },
    { path: '/profile', icon: User, label: 'Profile' },
    { path: '/chat', icon: MessageCircle, label: 'Chat' },
    { path: '/services', icon: Settings, label: 'Services' },
    { path: '/projects', icon: FolderOpen, label: 'Projects' },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <>
      {/* Mobile Overlay */}
      {!isCollapsed && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setIsCollapsed(true)}
        />
      )}
      
      <div className={`
        fixed lg:static inset-y-0 left-0 z-50
        ${isCollapsed ? '-translate-x-full lg:translate-x-0 lg:w-20' : 'translate-x-0 w-80 lg:w-72'}
        bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900
        border-r border-gray-700/50
        transition-all duration-300 ease-in-out
        flex flex-col
      `}>
        {/* Header */}
        <div className="p-6 border-b border-gray-700/50">
          <div className="flex items-center justify-between">
            <div className={`${isCollapsed ? 'lg:hidden' : 'flex'} items-center space-x-3`}>
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                <div className="w-6 h-6 bg-white rounded-md opacity-90" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-white">Dashboard</h2>
                <p className="text-sm text-gray-400">Control Panel</p>
              </div>
            </div>
            <button
              onClick={() => setIsCollapsed(!isCollapsed)}
              className="lg:hidden p-2 rounded-lg hover:bg-gray-700/50 text-gray-400 hover:text-white transition-colors"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-6 space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.path);
            
            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => {
                  // Only collapse on mobile, not on desktop
                  if (window.innerWidth < 1024) {
                    setIsCollapsed(true);
                  }
                }}
                className={`
                  group flex items-center px-4 py-3 rounded-xl transition-all duration-200
                  ${active 
                    ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg shadow-blue-500/25' 
                    : 'text-gray-300 hover:bg-gray-700/50 hover:text-white'
                  }
                `}
              >
                <Icon size={20} className="flex-shrink-0" />
                <span className={`${isCollapsed ? 'lg:hidden' : 'ml-3'} font-medium`}>
                  {item.label}
                </span>
                {active && (
                  <ChevronRight 
                    size={16} 
                    className={`${isCollapsed ? 'lg:hidden' : 'ml-auto'} opacity-70`} 
                  />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Logout Button */}
        <div className="p-6 border-t border-gray-700/50">
          <button
            onClick={handleLogout}
            className="w-full flex items-center px-4 py-3 rounded-xl text-gray-300 hover:bg-red-500/10 hover:text-red-400 transition-all duration-200 group"
          >
            <LogOut size={20} className="flex-shrink-0" />
            <span className={`${isCollapsed ? 'lg:hidden' : 'ml-3'} font-medium`}>
              Logout
            </span>
          </button>
        </div>

        {/* Collapse Toggle for Desktop */}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="hidden lg:block absolute -right-3 top-8 w-6 h-6 bg-gray-800 border border-gray-700 rounded-full flex items-center justify-center text-gray-400 hover:text-white hover:bg-gray-700 transition-colors"
        >
          <ChevronRight 
            size={12} 
            className={`transform transition-transform ${isCollapsed ? 'rotate-0' : 'rotate-180'}`} 
          />
        </button>
      </div>
    </>
  );
};

export default Sidebar;