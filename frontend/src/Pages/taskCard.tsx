import { Button } from '@/components/ui/button';
import type { Task, TaskFormData } from '../types/taskTypes';
import { useNavigate } from 'react-router-dom';

interface TaskCardProps {
    task: Task;
    setFormData: (formData: TaskFormData) => void;
    setCreateTask: (open: boolean) => void;
    setCurrentEditedId: (id: string | null) => void;
    handleDelete: (id: string) => void;
    setOriginalData: (data: TaskFormData | null) => void;
}

const TaskCard = ({
    task,
    setFormData,
    setCreateTask,
    setCurrentEditedId,
    handleDelete,
    setOriginalData
}: TaskCardProps) => {

    const navigate = useNavigate();
    
    return (
        <div className="bg-gray-100 border border-gray-200 rounded-xl p-4 sm:p-5 flex flex-col gap-3 hover:shadow-md">

            <div className="flex items-start justify-between gap-2">
                <h2 className="font-bold text-black truncate text-sm sm:text-base">{task.title}</h2>
                <span className={`shrink-0 text-xs font-semibold px-2 py-1 rounded-full capitalize
                    ${task.status === 'todo' ? 'bg-gray-100 text-gray-700' : ''}
                    ${task.status === 'pending' ? 'bg-yellow-100 text-yellow-700' : ''}
                    ${task.status === 'in-progress' ? 'bg-blue-100 text-blue-700' : ''}
                    ${task.status === 'completed' ? 'bg-green-100 text-green-700' : ''}
                `}>
                    {task.status}
                </span>
            </div>

            {task.description && (
                <p className="text-xs sm:text-sm text-gray-500 line-clamp-2">{task.description}</p>
            )}

            <div className="flex gap-2 mt-auto pt-2 justify-center">

                <Button
                    size="sm"
                    className="bg-violet-300 text-xs sm:text-sm cursor-pointer"
                    onClick={() => navigate(`/task/${task._id}`)}
                >
                    View Task
                </Button>
                <Button
                    size="sm"
                    className="bg-blue-400 text-xs sm:text-sm cursor-pointer"
                    onClick={() => {
                        setCreateTask(true);
                        setCurrentEditedId(task._id);
                        setFormData(task);
                        setOriginalData({
                            title: task.title,
                            description: task.description,
                            status: task.status,
                        });
                    }}
                >
                    Edit
                </Button>
                <Button
                    size="sm"
                    variant="destructive"
                    className="text-xs sm:text-sm cursor-pointer"
                    onClick={() => handleDelete(task._id)}
                >
                    Delete
                </Button>
            </div>
        </div>
    );
};

export default TaskCard;