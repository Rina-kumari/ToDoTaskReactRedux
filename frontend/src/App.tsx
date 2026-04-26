import { BrowserRouter, Routes, Route } from 'react-router-dom';
import TaskList from './Pages/taskList';
import TaskDetails from './Pages/taskDetails';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<TaskList />} />
                <Route path="/task/:id" element={<TaskDetails />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;