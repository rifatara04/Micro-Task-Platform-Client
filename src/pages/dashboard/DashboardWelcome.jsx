import { useContext, useEffect } from "react";
import { AuthContext } from "../../providers/AuthProvider";
import { useNavigate } from "react-router";
import LoadingSpinner from "../../components/shared/LoadingSpinner";

const DashboardWelcome = () => {
    const { user, loading } = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (!loading && user) {
            if (user.role === 'worker') {
                navigate('/dashboard/worker', { replace: true });
            } else if (user.role === 'buyer') {
                navigate('/dashboard/buyer', { replace: true });
            } else if (user.role === 'admin') {
                navigate('/dashboard/admin', { replace: true });
            }
        }
    }, [user, loading, navigate]);

    return <LoadingSpinner />;
};

export default DashboardWelcome;
