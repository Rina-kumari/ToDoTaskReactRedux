import Task from "../models/task.js";

export const addTask = async (req, res) => {
    try {
        const { title, description, status } = req.body;

        const newTask = new Task({
            title,
            description,
            status,
        });

        await newTask.save();
        res.status(201).json({
            success: true,
            data: newTask,
        });

    } catch(e) {
        console.log(e);
        res.status(500).json({
            success: false,
            message: "Error occurred",
        });
    }
};

export const getAllTask = async (req, res) => {
    try {

        const allTask = await Task.find({});
        res.status(200).json({
            success: true,
            data: allTask
        });

    }catch(e) {
        console.log(e);
        res.status(500).json({
            success: false,
            message: "Error occured",
        })
    }
}

export const getTaskDetails = async(req, res) => {
    try {
        const {id} = req.params;
        const task = await Task.findById(id);

        if(!task) return res.status(404).json({
            success: false,
            message: 'Task not found!'
        })

        res.status(200).json({
            success: true,
            data: task,
        });

    }catch(e) {
        console.log(e);
        res.status(500).json({
            success: false,
            message: "some error occured",
        })
    }
}

export const editTask = async (req, res) => {
    try {

    const {id} = req.params;
    const {title, description, status} = req.body;

    let findTask = await Task.findById(id);
    if(!findTask) 
        return res.status(404).json({
            success:false,
            message: "Task not found",
        });

        findTask.title = title || findTask.title
        findTask.description = description || findTask.description
        findTask.status = status || findTask.status
        
        await findTask.save();
        res.status(200).json({
            success: true,
            data: findTask, 
        })

    }catch(e) {
        console.log(e);
        res.status(500).json({
            success: false,
            message: "Error occured",
        })
    }
}

export const deleteTask = async (req, res) => {
    try {

        const {id} = req.params
        const task = await Task.findByIdAndDelete(id);

        if(!task)
            return res.status(404).json({
                success: false,
                message: "Task not found",
            })
            res.status(200).json({
                success: true,
                message: 'Task deleted successfully',
            })
        

    }catch(e) {
        console.log(e);
        res.status(500).json({
            success: false,
            message: "Error occured",
        })
    }
}

