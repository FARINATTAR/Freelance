// import { useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// const Register = () => {
//   const navigate = useNavigate();
//   const [formData, setFormData] = useState({
//     email: "",
//     phone: "",
//     password: "",
//   });

//   const [error, setError] = useState("");
//   const [message, setMessage] = useState("");

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleRegister = async (e) => {
//     e.preventDefault();
//     setError("");
//     setMessage("");

//     try {
//       const res = await axios.post(
//         `${import.meta.env.VITE_API_BASE_URL}/users/register`,
//         formData
//       );
//       setMessage(res.data.message);
//       setFormData({ email: "", phone: "", password: "" });

//       setTimeout(() => {
//         navigate("/login");
//       }, 3000); // Redirect after 3s
//     } catch (err) {
//       setError(err.response?.data?.message || "Registration failed");
//     }
//   };

//   return (
//     <div className="flex justify-center items-center min-h-screen bg-gray-100">
//       <form
//         className="bg-white p-8 rounded shadow-md w-full max-w-md"
//         onSubmit={handleRegister}
//       >
//         <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>

//         {error && <p className="text-red-500 mb-4">{error}</p>}
//         {message && <p className="text-green-600 mb-4">{message}</p>}

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
//           type="text"
//           name="phone"
//           placeholder="Phone"
//           className="w-full mb-4 p-2 border border-gray-300 rounded"
//           value={formData.phone}
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
//           className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
//         >
//           Register
//         </button>

//         <p className="mt-4 text-center text-sm">
//           Already have an account?{" "}
//           <a href="/login" className="text-blue-600 hover:underline">
//             Login here
//           </a>
//         </p>
//       </form>
//     </div>
//   );
// };

// export default Register;
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    phone: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");
    setIsLoading(true);

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/users/register`,
        formData
      );
      setMessage(res.data.message);
      setFormData({ email: "", phone: "", password: "" });

      setTimeout(() => {
        navigate("/login");
      }, 3000); // Redirect after 3s
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 flex justify-center items-center p-4">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-gray-900">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900"></div>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-cyan-900/20 via-transparent to-transparent"></div>
      </div>

      <div className="relative z-10 w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold font-mono bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent mb-2">
            REGISTER
          </h1>
          <p className="text-gray-400 font-mono text-sm">Create your account</p>
          <div className="w-16 h-1 bg-gradient-to-r from-cyan-400 to-blue-400 mx-auto mt-4 rounded-full"></div>
        </div>

        {/* Form Container */}
        <form
          className="bg-gray-800 backdrop-blur-sm border border-gray-700 rounded-xl shadow-2xl p-8 relative overflow-hidden"
          onSubmit={handleRegister}
        >
          {/* Subtle glow effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 to-blue-500/5 rounded-xl"></div>
          
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

            {/* Success Message */}
            {message && (
              <div className="bg-green-900/20 border border-green-500/30 rounded-lg p-4 mb-6 backdrop-blur-sm">
                <div className="flex items-center space-x-2">
                  <span className="text-green-400 text-lg">✓</span>
                  <p className="text-green-300 font-mono text-sm">{message}</p>
                </div>
              </div>
            )}

            {/* Email Field */}
            <div className="mb-6">
              <label className="block text-cyan-400 font-mono text-sm mb-2 uppercase tracking-wider">
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
                  className="w-full pl-12 pr-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-cyan-400 focus:border-transparent text-white font-mono placeholder-gray-400 transition-all duration-200"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            {/* Phone Field */}
            <div className="mb-6">
              <label className="block text-cyan-400 font-mono text-sm mb-2 uppercase tracking-wider">
                Phone Number
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                  📱
                </span>
                <input
                  type="text"
                  name="phone"
                  placeholder="Enter your phone number"
                  className="w-full pl-12 pr-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-cyan-400 focus:border-transparent text-white font-mono placeholder-gray-400 transition-all duration-200"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="mb-8">
              <label className="block text-cyan-400 font-mono text-sm mb-2 uppercase tracking-wider">
                Password
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                  🔒
                </span>
                <input
                  type="password"
                  name="password"
                  placeholder="Create a password"
                  className="w-full pl-12 pr-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-cyan-400 focus:border-transparent text-white font-mono placeholder-gray-400 transition-all duration-200"
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
              className="w-full bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 disabled:from-gray-600 disabled:to-gray-600 text-white font-mono py-3 rounded-lg transition-all duration-200 hover:shadow-lg hover:shadow-cyan-500/25 disabled:cursor-not-allowed relative overflow-hidden"
            >
              {isLoading ? (
                <div className="flex items-center justify-center space-x-2">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  <span>REGISTERING...</span>
                </div>
              ) : (
                <span className="flex items-center justify-center space-x-2">
                  <span>REGISTER</span>
                  <span>→</span>
                </span>
              )}
            </button>

            {/* Login Link */}
            <div className="mt-6 text-center">
              <p className="text-gray-400 font-mono text-sm">
                Already have an account?{" "}
                <a 
                  href="/login" 
                  className="text-cyan-400 hover:text-cyan-300 font-semibold transition-colors duration-200 hover:underline"
                >
                  Login here
                </a>
              </p>
            </div>

            {/* Divider */}
            <div className="mt-8 pt-6 border-t border-gray-700">
              <p className="text-center text-gray-500 font-mono text-xs">
                Secure Registration • Protected Connection
              </p>
            </div>
          </div>
        </form>

        {/* Footer */}
        <div className="text-center mt-6">
          <p className="text-gray-500 font-mono text-xs">
            By registering, you agree to our terms and privacy policy
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;