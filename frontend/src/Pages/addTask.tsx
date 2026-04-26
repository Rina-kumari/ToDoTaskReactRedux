import React from 'react';
import type { Dispatch, SetStateAction } from 'react';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useAppDispatch } from '../store/store';
import { addTask, editTask, fetchAllTasks } from '../store/task/taskSlice';
import type { TaskFormData } from '../types/taskTypes';

interface AddTaskProps {
    open: boolean;
    setOpen: Dispatch<SetStateAction<boolean>>;
    formData: TaskFormData;
    setFormData: Dispatch<SetStateAction<TaskFormData>>;
    currentEditedId: string | null;
    setCurrentEditedId: Dispatch<SetStateAction<string | null>>;
    originalData: TaskFormData | null;
}

const initialFormData: TaskFormData = {
    title: '',
    description: '',
    status: undefined,
};

const AddTask = ({
    open,
    setOpen,
    formData,
    setFormData,
    currentEditedId,
    setCurrentEditedId,
    originalData,
}: AddTaskProps) => {

    const dispatch = useAppDispatch();

    function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    function handleStatusChange(value: string) {
        setFormData({ ...formData, status: value as TaskFormData['status'] });
    }

    function handleClose() {
        setOpen(false);
        setCurrentEditedId(null);
        setFormData(initialFormData);
    }

    function onSubmit() {
        if (currentEditedId !== null) {
            dispatch(editTask({ id: currentEditedId, formData })).then(() => {
                dispatch(fetchAllTasks());
                handleClose();
            });
        } else {
            dispatch(addTask(formData)).then(() => {
                dispatch(fetchAllTasks());
                handleClose();
            });
        }
    }

    const isUnchanged = currentEditedId !== null && (
    formData.title === originalData?.title &&
    formData.description === originalData?.description &&
    formData.status === originalData?.status
);

    return (
        <Dialog open={open} onOpenChange={handleClose}>
            <DialogContent className="sm:max-w-md bg-gray-100" onOpenAutoFocus={(e) => e.preventDefault()}>
                <DialogHeader>
                    <DialogTitle className="text-lg font-bold">
                        {currentEditedId !== null ? 'Edit Task' : 'Add New Task'}
                    </DialogTitle>
                </DialogHeader>

                <div>
                    <div className="mb-6">
                        <Label className="text-sm font-medium">Title</Label>
                        <Input
                            name="title"
                            placeholder="Enter task title"
                            value={formData.title}
                            onChange={handleChange}
                            className="w-full mt-2"
                        />
                    </div>
                    <div className="mb-6">
                        <Label className="text-sm font-medium">Description</Label>
                        <Textarea
                            name="description"
                            placeholder="Enter task description"
                            value={formData.description}
                            onChange={handleChange}
                            className="w-full mt-2"
                        />
                    </div>
                    <div className="mb-6">
                        <Label className="text-sm font-medium">Status</Label>
                        <Select value={formData.status} onValueChange={handleStatusChange}>
                            <SelectTrigger className="w-full mt-2">
                                <SelectValue placeholder="Select status" />
                            </SelectTrigger>
                            <SelectContent  className="bg-white">
                                <SelectItem value="todo">Todo</SelectItem>
                                <SelectItem value="pending">Pending</SelectItem>
                                <SelectItem value="in-progress">In Progress</SelectItem>
                                <SelectItem value="completed">Completed</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>

                <DialogFooter className="flex gap-2">
                    <Button variant="outline" onClick={handleClose} className="cursor-pointer sm:flex-1 text-xs sm:text-sm">
                        Cancel
                    </Button>
                    <Button 
                        disabled={!formData.title || isUnchanged}
                        onClick={onSubmit} 
                        className="cursor-pointer sm:flex-1 text-xs sm:text-sm bg-blue-800"
                    >
                        {currentEditedId !== null ? 'Update Task' : 'Create Task'}
                    </Button>
                </DialogFooter>

            </DialogContent>
        </Dialog>
    );
};

export default AddTask;