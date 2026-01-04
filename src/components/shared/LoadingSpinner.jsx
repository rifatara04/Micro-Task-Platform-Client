const LoadingSpinner = ({ smallHeight = false }) => {
    return (
        <div className={`flex justify-center items-center ${smallHeight ? 'h-[200px]' : 'min-h-[calc(100vh-200px)]'} w-full`}>
             <div className="flex flex-col items-center gap-2">
                <span className="loading loading-spinner loading-lg text-primary-600 scale-150"></span>
                <p className="text-gray-500 font-medium animate-pulse mt-4">Loading...</p>
             </div>
        </div>
    );
};

export default LoadingSpinner;
