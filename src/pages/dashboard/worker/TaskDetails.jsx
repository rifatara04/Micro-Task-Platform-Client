import { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router";
import api from "../../../utils/api";
 
import { toast } from "react-hot-toast";
import { AuthContext } from "../../../providers/AuthProvider";
import LoadingSpinner from "../../../components/shared/LoadingSpinner";

const TaskDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { user } = useContext(AuthContext);
    const [task, setTask] = useState(null);
    const [loading, setLoading] = useState(true);
    const [submissionDetails, setSubmissionDetails] = useState("");
    const [submitting, setSubmitting] = useState(false);
    const [screenshot, setScreenshot] = useState(null);
    const [screenshotPreview, setScreenshotPreview] = useState(null);
    const [uploading, setUploading] = useState(false);

    useEffect(() => {
        const fetchTask = async () => {
            try {
                const { data } = await api.get(`/tasks/${id}`);
                setTask(data);
            } catch (error) {
                console.error("Failed to load task", error);
                toast.error("Could not load task details");
            } finally {
                setLoading(false);
            }
        };
        fetchTask();
    }, [id]);

    const handleScreenshotChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            // Validate file type
            if (!file.type.startsWith('image/')) {
                toast.error("Please upload an image file");
                return;
            }
            // Validate file size (max 5MB)
            if (file.size > 5 * 1024 * 1024) {
                toast.error("Image size should be less than 5MB");
                return;
            }
            setScreenshot(file);
            // Create preview
            const reader = new FileReader();
            reader.onloadend = () => {
                setScreenshotPreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const uploadToImgBB = async (imageFile) => {
        const formData = new FormData();
        formData.append('image', imageFile);
        
        const apiKey = import.meta.env.VITE_IMGBB_API_KEY;
        
        if (!apiKey) {
            toast.error("Image upload is not configured. Please contact administrator.");
            throw new Error('ImgBB API key not configured');
        }
        
        try {
            const response = await fetch(`https://api.imgbb.com/1/upload?key=${apiKey}`, {
                method: 'POST',
                body: formData
            });
            const data = await response.json();
            if (data.success) {
                return data.data.url;
            } else {
                throw new Error('Upload failed');
            }
        } catch (error) {
            console.error("Image upload error:", error);
            toast.error("Failed to upload screenshot. Please try again.");
            throw error;
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if(!submissionDetails.trim()) return toast.error("Please enter submission details");
        if(!screenshot) return toast.error("Please upload a screenshot");

        setSubmitting(true);
        setUploading(true);

        try {
            // Upload screenshot first
            const screenshotUrl = await uploadToImgBB(screenshot);
            
            setUploading(false);

            // Submit with screenshot URL
            await api.post('/submissions', {
                task_id: task._id,
                task_title: task.task_title,
                payable_amount: task.payable_amount,
                buyer_email: task.buyer_email,
                buyer_name: task.buyer_name,
                submission_details: submissionDetails,
                screenshot_url: screenshotUrl
            });
            toast.success("Task submitted successfully!");
            navigate('/dashboard/worker/my-submissions');
        } catch (error) {
            console.error("Submission failed", error);
            toast.error(error.response?.data?.message || "Submission failed");
        } finally {
            setSubmitting(false);
            setUploading(false);
        }
    };

    if (loading) return <LoadingSpinner />;
    if (!task) return <div className="p-10 text-center">Task not found</div>;

    return (
        <div className="max-w-4xl mx-auto">
            <div className="card bg-white shadow-xl rounded-2xl overflow-hidden mb-8">
                <figure className="h-64 w-full">
                    <img src={task.task_image_url} alt={task.task_title} className="w-full h-full object-cover" />
                </figure>
                <div className="p-6 sm:p-8">
                    <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-4">{task.task_title}</h1>
                    <div className="flex flex-wrap gap-3 mb-6">
                        <span className="badge badge-primary py-3 px-4 text-base sm:text-lg">{task.payable_amount} Coins</span>
                        <span className="badge badge-ghost py-3 px-4 text-base sm:text-lg">{task.required_workers} slots left</span>
                    </div>
                    
                    <div className="space-y-6">
                        <div>
                             <h3 className="text-lg font-bold text-gray-700 mb-2">Task Details</h3>
                             <p className="text-gray-600 leading-relaxed text-sm sm:text-base">{task.task_detail}</p>
                        </div>
                        
                        <div>
                             <h3 className="text-lg font-bold text-gray-700 mb-2">Submission Instructions</h3>
                             <p className="text-gray-600 text-sm sm:text-base">{task.submission_info}</p>
                        </div>

                         <div className="bg-gray-50 p-4 rounded-lg">
                             <div className="flex flex-col sm:flex-row justify-between gap-2 text-sm text-gray-500">
                                <span>Buyer: {task.buyer_name}</span>
                                <span>Deadline: {new Date(task.completion_date).toLocaleDateString()}</span>
                             </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="card bg-white shadow-md rounded-2xl p-8 border border-gray-100">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Submit Your Work</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-control mb-6">
                        <label className="label">
                            <span className="label-text font-semibold text-gray-700">Submission Details</span>
                        </label>
                        <textarea 
                            className="textarea textarea-bordered h-32 w-full focus:border-primary-500 focus:ring-1 bg-gray-200 focus:ring-primary-500"
                            placeholder="Paste your proof or link here..."
                            value={submissionDetails}
                            onChange={(e) => setSubmissionDetails(e.target.value)}
                            required
                        ></textarea>
                    </div>

                    <div className="form-control mb-6">
                        <label className="label">
                            <span className="label-text font-semibold text-gray-700">Upload Screenshot <span className="text-red-500">*</span></span>
                        </label>
                        <input 
                            type="file" 
                            accept="image/*"
                            onChange={handleScreenshotChange}
                            className="file-input file-input-bordered file-input-primary w-full"
                            required
                        />
                        <label className="label">
                            <span className="label-text-alt text-gray-500">Max file size: 5MB. Supported formats: JPG, PNG, GIF</span>
                        </label>
                        
                        {screenshotPreview && (
                            <div className="mt-4">
                                <p className="text-sm font-semibold text-gray-700 mb-2">Preview:</p>
                                <img 
                                    src={screenshotPreview} 
                                    alt="Screenshot preview" 
                                    className="max-w-full h-auto max-h-64 rounded-lg border border-gray-300 shadow-sm"
                                />
                            </div>
                        )}
                    </div>

                    {uploading && (
                        <div className="alert alert-info mb-4">
                            <span className="loading loading-spinner loading-sm"></span>
                            <span>Uploading screenshot...</span>
                        </div>
                    )}
                    
                    <button 
                        type="submit" 
                        className={`btn btn-primary w-full text-lg ${submitting ? 'loading' : ''}`}
                        disabled={submitting || uploading}
                    >
                        {submitting ? 'Submitting...' : uploading ? 'Uploading...' : 'Submit Work'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default TaskDetails;
