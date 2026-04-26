import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import type { TaskFormData, TaskState } from '../../types/taskTypes';

//const BASE_URL = 'http://localhost:5000/api/task';
const BASE_URL = 'https://todotaskreactredux.onrender.com/api/task';

const initialState: TaskState = {
    isLoading: false,
    taskList: [],
    taskDetails: null,
};

export const fetchAllTasks = createAsyncThunk(
    '/task/fetchAllTasks',
    async () => {
        const result = await axios.get(`${BASE_URL}/get`);
        return result?.data;
    }
);

export const fetchTaskDetails = createAsyncThunk(
    '/task/fetchTaskDetails',
    async (id: string) => {
        const result = await axios.get(`${BASE_URL}/get/${id}`);
        return result?.data;
    }
);

export const addTask = createAsyncThunk(
    '/task/addTask',
    async (formData: TaskFormData) => {
        const result = await axios.post(`${BASE_URL}/add`, formData, {
            headers: { 'Content-Type': 'application/json' },
        });
        return result?.data;
    }
);

export const editTask = createAsyncThunk(
    '/task/editTask',
    async ({ id, formData }: { id: string; formData: TaskFormData }) => {
        const result = await axios.put(`${BASE_URL}/edit/${id}`, formData, {
            headers: { 'Content-Type': 'application/json' },
        });
        return result?.data;
    }
);

export const deleteTask = createAsyncThunk(
    '/task/deleteTask',
    async (id: string) => {
        const result = await axios.delete(`${BASE_URL}/delete/${id}`);
        return result?.data;
    }
);

const taskSlice = createSlice({
    name: 'task',
    initialState,
    reducers: {
        clearTaskDetails: (state) => {
            state.taskDetails = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchAllTasks.pending, (state) => {
                 state.isLoading = true;
            })
            .addCase(fetchAllTasks.fulfilled, (state, action) => {
                state.isLoading = false;
                state.taskList = action.payload.data;
            })
            .addCase(fetchAllTasks.rejected, (state) => {
                state.isLoading = false;
                state.taskList = [];
            })
            .addCase(fetchTaskDetails.pending, (state) => { 
                state.isLoading = true; 
            })
            .addCase(fetchTaskDetails.fulfilled, (state, action) => {
                state.isLoading = false;
                state.taskDetails = action.payload.data;
            })
            .addCase(fetchTaskDetails.rejected, (state) => {
                state.isLoading = false;
                state.taskDetails = null;
            })
    },
});

export const { clearTaskDetails } = taskSlice.actions;
export default taskSlice.reducer;