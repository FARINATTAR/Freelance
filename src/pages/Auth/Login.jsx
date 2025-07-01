// import { useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// const Login = () => {
//   const navigate = useNavigate();
//   const [formData, setFormData] = useState({
//     email: "",
//     password: "",
//   });

//   const [error, setError] = useState("");

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     setError("");

//     try {
//       const res = await axios.post(
//         `${import.meta.env.VITE_API_BASE_URL}/users/login`,
//         formData
//       );

//       const { token, user } = res.data;

//       if (!token || !user || !user.userId) {
//         throw new Error("Invalid login response");
//       }

//       // ✅ Store both token and user info
//       localStorage.setItem("token", token);
//       localStorage.setItem("user", JSON.stringify(user));

//       console.log("🟢 Logged in as:", user); // optional debug
//       navigate("/"); // redirect to dashboard
//     } catch (err) {
//       setError(err.response?.data?.message || "Login failed. Try again.");
//     }
//   };

//   return (
//     <div className="flex justify-center items-center min-h-screen bg-gray-100">
//       <form
//         className="bg-white p-8 rounded shadow-md w-full max-w-md"
//         onSubmit={handleLogin}
//       >
//         <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>

//         {error && <p className="text-red-500 mb-4">{error}</p>}

//         <input
//           type="email"
//           name="email"
//           placeholder="Email"
//           className="w-full mb-4 p-2 border border-gray-300 rounded"
//           value={formData.email}
//           onChange={handleChange}
//           required
//         />

//         <input
//           type="password"
//           name="password"
//           placeholder="Password"
//           className="w-full mb-6 p-2 border border-gray-300 rounded"
//           value={formData.password}
//           onChange={handleChange}
//           required
//         />

//         <button
//           type="submit"
//           className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
//         >
//           Login
//         </button>

//         <p className="mt-4 text-center text-sm">
//           Don’t have an account?{" "}
//           <a href="/register" className="text-blue-600 hover:underline">
//             Register here
//           </a>
//         </p>
//       </form>
//     </div>
//   );
// };

// export default Login;
// ✅ Login.jsx
// import { useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// const Login = () => {
//   const navigate = useNavigate();
//   const [formData, setFormData] = useState({ email: "", password: "" });
//   const [error, setError] = useState("");

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     setError("");

//     try {
//       const res = await axios.post(
//         `${import.meta.env.VITE_API_BASE_URL}/users/login`,
//         formData
//       );

//       const { token, user } = res.data;
//       localStorage.setItem("token", token);
//       localStorage.setItem("user", JSON.stringify(user));
//       navigate("/");
//     } catch (err) {
//       setError(err.response?.data?.message || "Login failed");
//     }
//   };

//   return (
//     <div className="flex justify-center items-center min-h-screen bg-gray-100">
//       <form
//         onSubmit={handleLogin}
//         className="bg-white p-8 rounded shadow-md w-full max-w-md"
//       >
//         <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
//         {error && <p className="text-red-500 mb-4">{error}</p>}
//         <input
//           type="email"
//           name="email"
//           placeholder="Email"
//           className="w-full mb-4 p-2 border border-gray-300 rounded"
//           value={formData.email}
//           onChange={handleChange}
//           required
//         />
//         <input
//           type="password"
//           name="password"
//           placeholder="Password"
//           className="w-full mb-6 p-2 border border-gray-300 rounded"
//           value={formData.password}
//           onChange={handleChange}
//           required
//         />
//         <button
//           type="submit"
//           className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
//         >
//           Login
//         </button>
//         <p className="mt-4 text-center text-sm">
//           Don’t have an account?{" "}
//           <a href="/register" className="text-blue-600 hover:underline">
//             Register here
//           </a>
//         </p>
//       </form>
//     </div>
//   );
// };

// export default Login;
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/users/login`,
        formData
      );

      const { token, user } = res.data;
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 flex justify-center items-center p-4">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-gray-900">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900"></div>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-900/20 via-transparent to-transparent"></div>
      </div>

      <div className="relative z-10 w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold font-mono bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent mb-2">
            LOGIN
          </h1>
          <p className="text-gray-400 font-mono text-sm">Access your account</p>
          <div className="w-16 h-1 bg-gradient-to-r from-blue-400 to-cyan-400 mx-auto mt-4 rounded-full"></div>
        </div>

        {/* Form Container */}
        <form
          onSubmit={handleLogin}
          className="bg-gray-800 backdrop-blur-sm border border-gray-700 rounded-xl shadow-2xl p-8 relative overflow-hidden"
        >
          {/* Subtle glow effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-cyan-500/5 rounded-xl"></div>
          
          <div className="relative z-10">
            {/* Error Message */}
            {error && (
              <div className="bg-red-900/20 border border-red-500/30 rounded-lg p-4 mb-6 backdrop-blur-sm">
                <div className="flex items-center space-x-2">
                  <span className="text-red-400 text-lg">⚠</span>
                  <p className="text-red-300 font-mono text-sm">{error}</p>
                </div>
              </div>
            )}

            {/* Email Field */}
            <div className="mb-6">
              <label className="block text-blue-400 font-mono text-sm mb-2 uppercase tracking-wider">
                Email Address
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                  📧
                </span>
                <input
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  className="w-full pl-12 pr-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-transparent text-white font-mono placeholder-gray-400 transition-all duration-200"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="mb-8">
              <label className="block text-blue-400 font-mono text-sm mb-2 uppercase tracking-wider">
                Password
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                  🔒
                </span>
                <input
                  type="password"
                  name="password"
                  placeholder="Enter your password"
                  className="w-full pl-12 pr-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-transparent text-white font-mono placeholder-gray-400 transition-all duration-200"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 disabled:from-gray-600 disabled:to-gray-600 text-white font-mono py-3 rounded-lg transition-all duration-200 hover:shadow-lg hover:shadow-blue-500/25 disabled:cursor-not-allowed relative overflow-hidden"
            >
              {isLoading ? (
                <div className="flex items-center justify-center space-x-2">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  <span>LOGGING IN...</span>
                </div>
              ) : (
                <span className="flex items-center justify-center space-x-2">
                  <span>LOGIN</span>
                  <span>→</span>
                </span>
              )}
            </button>

            {/* Register Link */}
            <div className="mt-6 text-center">
              <p className="text-gray-400 font-mono text-sm">
                Don't have an account?{" "}
                <a 
                  href="/register" 
                  className="text-blue-400 hover:text-blue-300 font-semibold transition-colors duration-200 hover:underline"
                >
                  Register here
                </a>
              </p>
            </div>

            {/* Additional Options */}
            <div className="mt-6 text-center">
              <a 
                href="#" 
                className="text-gray-500 hover:text-gray-400 font-mono text-xs transition-colors duration-200"
              >
                Forgot your password?
              </a>
            </div>

            {/* Divider */}
            <div className="mt-8 pt-6 border-t border-gray-700">
              <p className="text-center text-gray-500 font-mono text-xs">
                Secure Login • Protected Connection
              </p>
            </div>
          </div>
        </form>

        {/* Footer */}
        <div className="text-center mt-6">
          <p className="text-gray-500 font-mono text-xs">
            Welcome back! Enter your credentials to continue
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;