// const Dashboard = () => {
//   // dummy values — can be fetched from backend later
//   const userName = "Farin";
//   const totalServices = 3;
//   const totalProjects = 5;

//   return (
//     <div className="space-y-6">
//       <h1 className="text-3xl font-bold">Welcome, {userName} 👋</h1>

//       <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//         {/* Card 1 */}
//         <div className="bg-white p-6 rounded-lg shadow-md">
//           <h2 className="text-xl font-semibold">Your Services</h2>
//           <p className="text-4xl mt-2">{totalServices}</p>
//         </div>

//         {/* Card 2 */}
//         <div className="bg-white p-6 rounded-lg shadow-md">
//           <h2 className="text-xl font-semibold">Your Projects</h2>
//           <p className="text-4xl mt-2">{totalProjects}</p>
//         </div>

//         {/* Card 3 */}
//         <div className="bg-white p-6 rounded-lg shadow-md">
//           <h2 className="text-xl font-semibold">Profile Status</h2>
//           <p className="mt-2">Looks good 👍</p>
//           <button
//             className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
//             onClick={() => window.location.href = "/profile"}
//           >
//             Edit Info
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Dashboard;
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  User, 
  Settings, 
  FolderOpen, 
  TrendingUp, 
  Activity,
  CheckCircle,
  ArrowUpRight,
  Sparkles
} from 'lucide-react';

const Dashboard = () => {
  const navigate = useNavigate();
  const userName = "Farin";
  const totalServices = 3;
  const totalProjects = 5;
  const profileStatus = "Looks good";

  const handleEditInfo = () => {
    navigate('/profile');
  };

  return (
    <div className="min-h-screen bg-[#0f172a] text-white p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex items-center space-x-3 mb-2">
            <Sparkles className="w-8 h-8 text-blue-400" />
            <h1 className="text-4xl font-bold bg-gradient-to-r from-white via-blue-100 to-blue-200 bg-clip-text text-transparent">
              Welcome, {userName}
            </h1>
            <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
          </div>
          <p className="text-slate-400 text-lg">
            Here's your dashboard overview for today
          </p>
        </div>

        {/* Stats Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {/* Services Card */}
          <div className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-slate-700/50 p-6 hover:border-blue-500/50 transition-all duration-300 hover:shadow-2xl hover:shadow-blue-500/10">
            <div className="absolute top-0 right-0 w-20 h-20 bg-blue-500/10 rounded-full -mr-10 -mt-10 group-hover:bg-blue-500/20 transition-colors duration-300" />
            <div className="relative">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 rounded-xl bg-blue-500/10 border border-blue-500/20">
                  <Settings className="w-6 h-6 text-blue-400" />
                </div>
                <ArrowUpRight className="w-5 h-5 text-slate-400 group-hover:text-blue-400 transition-colors duration-300" />
              </div>
              <h3 className="text-slate-300 text-sm font-medium mb-1">Your Services</h3>
              <div className="flex items-baseline space-x-2">
                <span className="text-3xl font-bold text-white">{totalServices}</span>
                <span className="text-emerald-400 text-sm font-medium">Active</span>
              </div>
            </div>
          </div>

          {/* Projects Card */}
          <div className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-slate-700/50 p-6 hover:border-emerald-500/50 transition-all duration-300 hover:shadow-2xl hover:shadow-emerald-500/10">
            <div className="absolute top-0 right-0 w-20 h-20 bg-emerald-500/10 rounded-full -mr-10 -mt-10 group-hover:bg-emerald-500/20 transition-colors duration-300" />
            <div className="relative">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
                  <FolderOpen className="w-6 h-6 text-emerald-400" />
                </div>
                <TrendingUp className="w-5 h-5 text-slate-400 group-hover:text-emerald-400 transition-colors duration-300" />
              </div>
              <h3 className="text-slate-300 text-sm font-medium mb-1">Your Projects</h3>
              <div className="flex items-baseline space-x-2">
                <span className="text-3xl font-bold text-white">{totalProjects}</span>
                <span className="text-emerald-400 text-sm font-medium">In Progress</span>
              </div>
            </div>
          </div>

          {/* Profile Status Card */}
          <div className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-slate-700/50 p-6 hover:border-purple-500/50 transition-all duration-300 hover:shadow-2xl hover:shadow-purple-500/10 md:col-span-2 lg:col-span-1">
            <div className="absolute top-0 right-0 w-20 h-20 bg-purple-500/10 rounded-full -mr-10 -mt-10 group-hover:bg-purple-500/20 transition-colors duration-300" />
            <div className="relative">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 rounded-xl bg-purple-500/10 border border-purple-500/20">
                  <User className="w-6 h-6 text-purple-400" />
                </div>
                <CheckCircle className="w-5 h-5 text-emerald-400" />
              </div>
              <h3 className="text-slate-300 text-sm font-medium mb-3">Profile Status</h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <span className="text-lg font-semibold text-white">{profileStatus}</span>
                  <div className="w-2 h-2 bg-emerald-400 rounded-full" />
                </div>
                <button
                  onClick={handleEditInfo}
                  className="w-full bg-gradient-to-r from-purple-600 to-purple-500 hover:from-purple-500 hover:to-purple-400 text-white font-medium py-2.5 px-4 rounded-xl transition-all duration-200 hover:shadow-lg hover:shadow-purple-500/25 active:scale-[0.98]"
                >
                  Edit Info
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Activity Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Activity */}
          <div className="rounded-2xl bg-gradient-to-br from-slate-800/30 to-slate-900/30 border border-slate-700/50 p-6">
            <div className="flex items-center space-x-3 mb-6">
              <div className="p-2 rounded-lg bg-blue-500/10 border border-blue-500/20">
                <Activity className="w-5 h-5 text-blue-400" />
              </div>
              <h2 className="text-xl font-semibold text-white">Recent Activity</h2>
            </div>
            <div className="space-y-4">
              {[
                { action: "Project updated", time: "2 hours ago", type: "project" },
                { action: "Service configured", time: "5 hours ago", type: "service" },
                { action: "Profile completed", time: "1 day ago", type: "profile" },
                { action: "New project created", time: "2 days ago", type: "project" }
              ].map((activity, index) => (
                <div key={index} className="flex items-center space-x-4 p-3 rounded-xl hover:bg-slate-800/30 transition-colors duration-200">
                  <div className={`w-2 h-2 rounded-full ${
                    activity.type === 'project' ? 'bg-emerald-400' :
                    activity.type === 'service' ? 'bg-blue-400' : 'bg-purple-400'
                  }`} />
                  <div className="flex-1">
                    <p className="text-slate-200 font-medium">{activity.action}</p>
                    <p className="text-slate-400 text-sm">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="rounded-2xl bg-gradient-to-br from-slate-800/30 to-slate-900/30 border border-slate-700/50 p-6">
            <div className="flex items-center space-x-3 mb-6">
              <div className="p-2 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
                <Sparkles className="w-5 h-5 text-emerald-400" />
              </div>
              <h2 className="text-xl font-semibold text-white">Quick Actions</h2>
            </div>
            <div className="grid grid-cols-1 gap-3">
              {[
                { title: "Create New Project", desc: "Start a new project", color: "emerald" },
                { title: "Add Service", desc: "Configure a new service", color: "blue" },
                { title: "View Analytics", desc: "Check your progress", color: "purple" }
              ].map((action, index) => (
                <button
                  key={index}
                  className={`text-left p-4 rounded-xl border transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] ${
                    action.color === 'emerald' 
                      ? 'bg-emerald-500/5 border-emerald-500/20 hover:bg-emerald-500/10 hover:border-emerald-500/40'
                      : action.color === 'blue'
                      ? 'bg-blue-500/5 border-blue-500/20 hover:bg-blue-500/10 hover:border-blue-500/40'
                      : 'bg-purple-500/5 border-purple-500/20 hover:bg-purple-500/10 hover:border-purple-500/40'
                  }`}
                >
                  <h3 className="text-white font-medium mb-1">{action.title}</h3>
                  <p className="text-slate-400 text-sm">{action.desc}</p>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;