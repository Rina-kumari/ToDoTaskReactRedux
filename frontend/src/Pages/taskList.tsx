import { Fragment, useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { useAppDispatch, useAppSelector } from '../store/store';
import { fetchAllTasks, deleteTask } from '../store/task/taskSlice';
import type { TaskFormData } from '../types/taskTypes';
import AddTask from './addTask';
import TaskCard from '../Pages/taskCard';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const initialFormData: TaskFormData = {
    title: '',
    description: '',
    status: undefined,
};

const TaskList = () => {

    const [CreateTask, setCreateTask] = useState(false);
    const [formData, setFormData] = useState<TaskFormData>(initialFormData);
    const [currentEditedId, setCurrentEditedId] = useState<string | null>(null);
    const [originalData, setOriginalData] = useState<TaskFormData | null>(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');

    const { taskList } = useAppSelector((state) => state.task);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(fetchAllTasks());
    }, [dispatch]);

    function handleDelete(id: string) {
        dispatch(deleteTask(id)).then(() => {
            dispatch(fetchAllTasks());
        });
    }

    function matchesSearch(title: string, description?: string) {
        const query = searchQuery.toLowerCase();
            return (
                title.toLowerCase().includes(query) ||
                (description ?? '').toLowerCase().includes(query)
            );
    }

    function matchesStatus(status: string) {
        return statusFilter === 'all' || status === statusFilter;
    }
   
    const filteredTasks = taskList.filter((task) =>
        matchesSearch(task.title) && matchesStatus(task.status)
    );

return (
        <Fragment>
            <div className="p-6">

                <div className="flex items-center justify-between mb-6">
                    <h1 className="text-2xl font-bold text-violet-800 text-center">My Tasks</h1>
                
                    <Button onClick={() => setCreateTask(true)} className='cursor-pointer bg-blue-600'>
                         Add New Task
                    </Button>
                </div>

                  <div className="mb-6 flex justify-center gap-3">
                    <Input
                        placeholder="Search tasks..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="max-w-sm"
                    />
                    <Select value={statusFilter} onValueChange={setStatusFilter}>
                        <SelectTrigger className="w-40">
                            <SelectValue placeholder="Filter status" />
                        </SelectTrigger>
                        <SelectContent className="bg-white">
                            <SelectItem value="all">All</SelectItem>
                            <SelectItem value="todo">Todo</SelectItem>
                            <SelectItem value="pending">Pending</SelectItem>
                            <SelectItem value="in-progress">In Progress</SelectItem>
                            <SelectItem value="completed">Completed</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                    {filteredTasks && filteredTasks.length > 0
                        ? filteredTasks.map((taskItem) => (
                            <TaskCard
                                key={taskItem._id}
                                task={taskItem}
                                setFormData={setFormData}
                                setCreateTask={setCreateTask}
                                setCurrentEditedId={setCurrentEditedId}
                                handleDelete={handleDelete}
                                setOriginalData={setOriginalData}
                            />
                        ))
                        : <p className="text-sm col-span-4 text-center">No tasks found.</p>
                    }
                </div>

            </div>

            <AddTask
                open={CreateTask}
                setOpen={setCreateTask}
                formData={formData}
                setFormData={setFormData}
                currentEditedId={currentEditedId}
                setCurrentEditedId={setCurrentEditedId}
                originalData={originalData}
            />

        </Fragment>
    );
};

export default TaskList;