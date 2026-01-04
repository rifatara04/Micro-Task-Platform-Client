import { useNavigate, useRouteError } from "react-router";
import { FaHome, FaExclamationTriangle, FaRedo } from "react-icons/fa";

const ErrorPage = () => {
    const error = useRouteError();
    const navigate = useNavigate();

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
            <div className="max-w-md w-full text-center">
                <div className="mb-6 inline-flex items-center justify-center w-20 h-20 rounded-full bg-red-100 text-red-600">
                    <FaExclamationTriangle className="text-4xl" />
                </div>
                
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Oops! Something went wrong</h1>
                <p className="text-gray-600 mb-8">
                    {error?.statusText || error?.message || "There was an unexpected error. Please try again or go back to home."}
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <button 
                        onClick={() => navigate('/')}
                        className="btn btn-primary flex items-center gap-2"
                    >
                        <FaHome /> Back to Home
                    </button>
                    <button 
                        onClick={() => window.location.reload()}
                        className="btn btn-outline flex items-center gap-2"
                    >
                        <FaRedo /> Refresh Page
                    </button>
                </div>

                <div className="mt-12">
                    <p className="text-xs text-gray-400 uppercase tracking-widest font-semibold">Error Reference</p>
                    <code className="mt-2 block p-3 bg-white rounded border border-gray-200 text-gray-500 text-xs text-left overflow-auto">
                        {error?.stack || JSON.stringify(error, null, 2)}
                    </code>
                </div>
            </div>
        </div>
    );
};

export default ErrorPage;
