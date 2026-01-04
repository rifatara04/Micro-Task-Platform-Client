import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router";
import { AuthContext } from "../providers/AuthProvider";
import { imageUpload } from "../utils/helpers";
import api from "../utils/api";
import { toast } from "react-hot-toast";
import { FcGoogle } from "react-icons/fc";

const Register = () => {
  const { createUser, updateUserProfile, signInWithGoogle, fetchUserData } = useContext(AuthContext);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const password = form.password.value;
    const role = form.role.value;
    const image = form.image.files[0];

    // Password validation
    if (password.length < 6) {
      toast.error("Password should be at least 6 characters");
      return;
    }

    // Role validation
    if (role === "Select Role") {
      toast.error("Please select a role");
      return;
    }

    setLoading(true);

    try {
      // 1. Upload Image
      const photoURL = await imageUpload(image);

      // 2. Create User in Firebase
      const result = await createUser(email, password);
      
      // 3. Update Profile
      await updateUserProfile(name, photoURL);

      // 4. Save User to Database
      const userInfo = {
        name,
        email,
        role,
        photo: photoURL,
        firebaseUid: result.user.uid
      };

      const { data } = await api.post("/auth/register", userInfo);
      
      if (data.token) {
        localStorage.setItem("access-token", data.token); // Store backend custom token
        await fetchUserData(result.user);
        toast.success("Registration successful!");
        navigate("/dashboard");
      }
    } catch (err) {
      console.error(err);
      toast.error(err.message || "Registration failed");
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
        role: "worker" // Default role for Google Sign In, or create a modal to ask
      };

      // Check if user exists or register them
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
        <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">Register</h2>
        
        <form onSubmit={handleRegister} className="space-y-4">
          <div>
            <label className="label">
              <span className="label-text font-semibold">Name</span>
            </label>
            <input 
              type="text" 
              name="name" 
              placeholder="Your Name" 
              className="input-field" 
              required 
            />
          </div>

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

          <div>
            <label className="label">
              <span className="label-text font-semibold">Role</span>
            </label>
            <select name="role" className="input-field" required defaultValue="Select Role">
              <option disabled>Select Role</option>
              <option value="worker">Worker</option>
              <option value="buyer">Buyer</option>
            </select>
          </div>

          <div>
            <label className="label">
              <span className="label-text font-semibold">Profile Picture</span>
            </label>
            <input 
              type="file" 
              name="image" 
              accept="image/*"
              className="file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary-50 file:text-primary-700 hover:file:bg-primary-100" 
              required 
            />
          </div>

          <button 
            type="submit" 
            className="btn btn-primary w-full mt-4"
            disabled={loading}
          >
            {loading ? <span className="loading loading-spinner loading-sm"></span> : "Register"}
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
          Already have an account?{" "}
          <Link to="/login" className="text-primary-600 font-semibold hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
