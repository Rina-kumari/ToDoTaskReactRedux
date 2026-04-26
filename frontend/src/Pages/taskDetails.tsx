import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../store/store';
import { fetchTaskDetails } from '../store/task/taskSlice';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

const TaskDetails = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const { taskDetails, isLoading } = useAppSelector((state) => state.task);

    useEffect(() => {
        if (id) dispatch(fetchTaskDetails(id));
    }, [id, dispatch]);

    if (isLoading) {
        return (
            <p className="p-6 text-center">Loading...</p>
        )
    }
        
    if (!taskDetails) {
        return (
            <p className="p-6 text-center">Task not found.</p>
        )
    }

    return (
        <div className="p-6 max-w-xl mx-auto ">

            <Button className="mb-4 cursor-pointer bg-blue-500" onClick={() => navigate(-1)}>
               Back
            </Button>
        
            <Card className='border border-gray-100 rounded-xl hover:shadow-md bg-gray-100'>
                <CardHeader>
                    <div className="flex items-start justify-between gap-2 ">

                        <CardTitle className="text-xl font-bold">{taskDetails.title}</CardTitle>
                        
                        <span className={`shrink-0 text-xs font-semibold px-2 py-1 rounded-full capitalize
                            ${taskDetails.status === 'todo' ? 'bg-violet-200 text-violet-800' : ''}
                            ${taskDetails.status === 'pending' ? 'bg-yellow-100 text-yellow-700' : ''}
                            ${taskDetails.status === 'in-progress' ? 'bg-blue-100 text-blue-700' : ''}
                            ${taskDetails.status === 'completed' ? 'bg-green-100 text-green-700' : ''}
                        `}>
                            {taskDetails.status}
                        </span>
                        
                    </div>
                </CardHeader>

                <Separator />

                <CardContent className="pt-4 space-y-4">
                    <div>
                        <p className="text-sm font-medium mb-1">Description</p>
                        <p className="text-sm text-muted-foreground">
                            {taskDetails.description || 'No description provided.'}
                        </p>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default TaskDetails;