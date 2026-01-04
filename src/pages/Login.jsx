import { useContext, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router";
import { AuthContext } from "../providers/AuthProvider";
import api from "../utils/api";
import { toast } from "react-hot-toast";
import { FcGoogle } from "react-icons/fc";

const Login = () => {
  const { signIn, signInWithGoogle, fetchUserData } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/dashboard";
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;

    setLoading(true);

    try {
      // 1. Firebase Login
      const result = await signIn(email, password);
      
      // 2. Get User from Database (Using Google-Login endpoint which acts as "find or create" or a sync endpoint)
      // Actually, we should probably just have a specific 'login' endpoint if we want more explicit control, 
      // but 'google-login' controller logic handles "FindOne" which works for syncing.
      // However, for email/password, we just need to generate the token for the existing user.
      // Let's call google-login with just email/uid to get the token? 
      // Or better, let's add a simple 'sync' or 'login' endpoint in backend?
      // Since 'googleLogin' controller logic finds by email and returns token, it works perfectly fine for this purpose 
      // even if we just pass email and uid.
      
      const userInfo = {
        email: result.user.email,
        firebaseUid: result.user.uid,
      };

      const { data } = await api.post("/auth/google-login", userInfo);
      
      if (data.token) {
        localStorage.setItem("access-token", data.token);
        await fetchUserData(result.user);
        toast.success("Login successful!");
        navigate("/dashboard");
      }
    } catch (err) {
      console.error(err);
      toast.error(err.message || "Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithGoogle();
      const userInfo = {
        name: result.user.displayName,
        email: result.user.email,
        photo: result.user.photoURL,
        firebaseUid: result.user.uid,
        role: "worker" // Default if new
      };

      const { data } = await api.post("/auth/google-login", userInfo);
      
      if (data.token) {
        localStorage.setItem("access-token", data.token);
        await fetchUserData(result.user);
        toast.success("Login successful!");
        navigate("/dashboard");
      }
    } catch (err) {
      console.error(err);
      toast.error(err.message || "Google Sign In failed");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="card w-full max-w-md p-8 bg-white shadow-xl rounded-2xl">
        <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">Login</h2>
        
        {/* Demo Credentials */}
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-lg p-4 mb-6">
          <h3 className="font-bold text-sm text-gray-700 mb-3 flex items-center gap-2">
            <span className="badge badge-info badge-sm">Demo</span> Test Credentials
          </h3>
          <div className="space-y-2 text-xs">
            <button
              type="button"
              onClick={() => {
                document.querySelector('input[name="email"]').value = 'admin@taskmaster.com';
                document.querySelector('input[name="password"]').value = 'admin123';
              }}
              className="w-full text-left px-3 py-2 bg-white hover:bg-purple-50 border border-purple-200 rounded-lg transition-colors"
            >
              <div className="font-semibold text-purple-700">👑 Admin</div>
              <div className="text-gray-600">admin@taskmaster.com / admin123</div>
            </button>
            <button
              type="button"
              onClick={() => {
                document.querySelector('input[name="email"]').value = 'buyer@taskmaster.com';
                document.querySelector('input[name="password"]').value = 'buyer123';
              }}
              className="w-full text-left px-3 py-2 bg-white hover:bg-blue-50 border border-blue-200 rounded-lg transition-colors"
            >
              <div className="font-semibold text-blue-700">💼 Buyer</div>
              <div className="text-gray-600">buyer@taskmaster.com / buyer123</div>
            </button>
            <button
              type="button"
              onClick={() => {
                document.querySelector('input[name="email"]').value = 'worker@taskmaster.com';
                document.querySelector('input[name="password"]').value = 'worker123';
              }}
              className="w-full text-left px-3 py-2 bg-white hover:bg-green-50 border border-green-200 rounded-lg transition-colors"
            >
              <div className="font-semibold text-green-700">👷 Worker</div>
              <div className="text-gray-600">worker@taskmaster.com / worker123</div>
            </button>
          </div>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="label">
              <span className="label-text font-semibold">Email</span>
            </label>
            <input 
              type="email" 
              name="email" 
              placeholder="email@example.com" 
              className="input-field" 
              required 
            />
          </div>

          <div>
            <label className="label">
              <span className="label-text font-semibold">Password</span>
            </label>
            <input 
              type="password" 
              name="password" 
              placeholder="••••••••" 
              className="input-field" 
              required 
            />
          </div>

          <button 
            type="submit" 
            className="btn btn-primary w-full mt-4"
            disabled={loading}
          >
            {loading ? <span className="loading loading-spinner loading-sm"></span> : "Login"}
          </button>
        </form>

        <div className="divider my-6 text-center text-gray-400 text-sm">Or sign in with</div>

        <button 
          onClick={handleGoogleSignIn} 
          className="btn btn-outline w-full flex items-center justify-center gap-2"
        >
          <FcGoogle className="text-xl" />
          Continue with Google
        </button>

        <p className="mt-4 text-center text-sm">
          Don't have an account?{" "}
          <Link to="/register" className="text-primary-600 font-semibold hover:underline">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
