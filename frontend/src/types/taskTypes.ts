export interface Task {
    _id: string;
    title: string;
    description?: string;
    status: 'todo' | 'pending' | 'in-progress' | 'completed';
}

export interface TaskFormData {
    title: string;
    description?: string;
    status?: 'todo' | 'pending' | 'in-progress' | 'completed';
}

export interface TaskState {
    isLoading: boolean;
    taskList: Task[];
    taskDetails: Task | null;
}