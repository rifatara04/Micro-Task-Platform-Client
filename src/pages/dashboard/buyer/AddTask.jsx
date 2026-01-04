import { useState, useContext } from "react";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router";
import { imageUpload } from "../../../utils/helpers";
import api from "../../../utils/api";
import { AuthContext } from "../../../providers/AuthProvider";

const AddTask = () => {
    const { user } = useContext(AuthContext);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleAddTask = async (e) => {
        e.preventDefault();
        setLoading(true);
        
        const form = e.target;
        const task_title = form.task_title.value;
        const task_detail = form.task_detail.value;
        const required_workers = form.required_workers.value;
        const payable_amount = form.payable_amount.value;
        const completion_date = form.completion_date.value;
        const submission_info = form.submission_info.value;
        const image = form.image.files[0];

        try {
            // 1. Upload Image
            const image_url = await imageUpload(image);

            // 2. Prepare Task Data
            const taskData = {
                task_title,
                task_detail,
                required_workers: parseInt(required_workers),
                payable_amount: parseInt(payable_amount),
                completion_date,
                submission_info,
                task_image_url: image_url,
                buyer_email: user?.email, // Handled by backend from token usually, but sending for safety if model requires
                buyer_name: user?.displayName
            };

            // 3. Call API
            await api.post('/tasks', taskData);
            
            toast.success("Task created successfully!");
            form.reset();
            navigate('/dashboard/buyer/my-tasks');

        } catch (err) {
            console.error(err);
            toast.error(err.response?.data?.message || "Failed to create task");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-3xl mx-auto bg-white p-8 rounded-xl shadow-sm border border-gray-100">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Add New Task</h2>
            <form onSubmit={handleAddTask} className="space-y-6">
                
                <div>
                    <label className="label font-semibold">Task Title</label>
                    <input type="text" name="task_title" placeholder="Ex: Watch this YouTube Video" className="input-field" required />
                </div>

                <div>
                    <label className="label font-semibold">Task Detail</label>
                    <textarea name="task_detail" placeholder="Describe exactly what needs to be done..." className="textarea textarea-bordered w-full focus:outline-none focus:ring-2 focus:ring-primary-500 h-24" required></textarea>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="label font-semibold">Required Workers</label>
                        <input type="number" name="required_workers" placeholder="Ex: 100" className="input-field" required min="1" />
                    </div>
                    <div>
                        <label className="label font-semibold">Payable Amount (per worker)</label>
                        <input type="number" name="payable_amount" placeholder="Ex: 5" className="input-field" required min="1" />
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="label font-semibold">Completion Date</label>
                        <input type="date" name="completion_date" className="input-field" required />
                    </div>
                    <div>
                        <label className="label font-semibold">Submission Info</label>
                        <input type="text" name="submission_info" placeholder="Ex: Screenshot of liked page" className="input-field" required />
                    </div>
                </div>

                <div>
                    <label className="label font-semibold">Task Image</label>
                    <input type="file" name="image" accept="image/*" className="file-input file-input-bordered w-full focus:outline-none" required />
                </div>

                <button type="submit" className="btn btn-primary w-full mt-4" disabled={loading}>
                    {loading ? "Creating Task..." : "Add Task"}
                </button>

            </form>
        </div>
    );
};

export default AddTask;
