import { createContext, useEffect, useState } from "react";
import { 
  GoogleAuthProvider, 
  createUserWithEmailAndPassword, 
  onAuthStateChanged, 
  signInWithEmailAndPassword, 
  signInWithPopup, 
  signOut, 
  updateProfile 
} from "firebase/auth";
import auth from "../firebase/firebase.config";
import api from "../utils/api";

export const AuthContext = createContext(null);

const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const signIn = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  const signInWithGoogle = () => {
    setLoading(true);
    return signInWithPopup(auth, googleProvider);
  };

  const logOut = () => {
    setLoading(true);
    return signOut(auth);
  };

  const updateUserProfile = (name, photo) => {
    return updateProfile(auth.currentUser, {
      displayName: name,
      photoURL: photo
    });
  };

  // Function to fetch user data from backend
  const fetchUserData = async (currentUser) => {
      try {
           const { data } = await api.get('/auth/me');
           setUser({ ...currentUser, ...data });
      } catch (backendError) {
           console.error("Backend sync error", backendError);
           // Fallback to minimal firebase user if backend fails
           setUser(currentUser);
      }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      
      if (currentUser) {
        setUser(currentUser);
        // Try to fetch user data. 
        // Note: This might fail on initial login if the token isn't in localStorage yet.
        // The Login/Register components should manually call fetchUserData after setting the token.
         await fetchUserData(currentUser);
      } else {
        setUser(null);
        localStorage.removeItem('access-token');
      }
      setLoading(false);
    });

    return () => {
      return unsubscribe();
    };
  }, []);

  const authInfo = {
    user,
    loading,
    createUser,
    signIn,
    signInWithGoogle,
    logOut,
    updateUserProfile,
    fetchUserData // Expose this
  };

  return (
    <AuthContext.Provider value={authInfo}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
