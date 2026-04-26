import express from 'express';
import {addTask, getAllTask,getTaskDetails, editTask,deleteTask} from "../controllers/taskController.js"


const router = express.Router();

router.post('/add', addTask);
router.put('/edit/:id', editTask);
router.delete('/delete/:id', deleteTask);
router.get('/get', getAllTask);
router.get('/get/:id', getTaskDetails);

export default router;

