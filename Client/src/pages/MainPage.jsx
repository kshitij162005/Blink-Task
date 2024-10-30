import React, { useState, useEffect } from 'react';
import Column from '../components/Coloumn'; 
import TaskDetail from '../components/TaskDetail';
import Modal from '../components/Modal';
import '../styles/MainPage.css';

let nextId = 1; // Start your ID counter from 1 for simplicity

function MainPage() {
    const [tasks, setTasks] = useState([]);
    const [todayTasks, setTodayTasks] = useState([]);
    const [completedTasks, setCompletedTasks] = useState([]);
    const [selectedTask, setSelectedTask] = useState(null);
    const [showToday, setShowToday] = useState(false);
    const [modal, setModal] = useState({ show: false, message: '', type: '' });
    const [input, setInput] = useState('');

    useEffect(() => {
        fetch('https://jsonplaceholder.typicode.com/todos')
            .then(response => response.json())
            .then(data => {
                const tasksWithUniqueIds = data
                    .slice(0, 7) 
                    .filter(task => !task.completed) 
                    .map(task => ({
                        ...task,
                        id: nextId++,
                    }));
                setTasks(tasksWithUniqueIds);
            });
    }, []);

    const handleAddTask = (isToday) => {
        if (!input.trim()) {
            setModal({ show: true, message: 'Task cannot be empty', type: 'error' });
            return;
        }

        const newTask = {
            id: nextId++, 
            title: input,
            completed: false,
        };

        setTasks(prevTasks => [...prevTasks, newTask]);
        if (isToday) {
            setTodayTasks(prevTodayTasks => [...prevTodayTasks, newTask]);
        }

        setModal({ show: true, message: 'Task added successfully', type: 'success' });
        setInput('');
    };

    const handleDeleteTask = (taskId) => {
        setTasks(prevTasks => prevTasks.filter(task => task.id !== taskId));
        setTodayTasks(prevTodayTasks => prevTodayTasks.filter(task => task.id !== taskId));
        setCompletedTasks(prevCompletedTasks => prevCompletedTasks.filter(task => task.id !== taskId));
        setSelectedTask(null);
        setModal({ show: true, message: 'Task deleted successfully', type: 'success' });
    };

    const handleEditTask = (taskId, newTitle) => {
        setTasks(prevTasks => 
            prevTasks.map(task => 
                task.id === taskId ? { ...task, title: newTitle } : task
            )
        );
        setModal({ show: true, message: 'Task updated successfully', type: 'success' });
        setSelectedTask(null);
    };

    const handleCompleteTask = (taskId) => {
        setTasks(prevTasks => {
            const taskToComplete = prevTasks.find(task => task.id === taskId);
    
            if (taskToComplete) {
                const isAlreadyCompleted = completedTasks.some(task => task.id === taskId);
                if (!isAlreadyCompleted) {
                    setCompletedTasks(prevCompletedTasks => [
                        ...prevCompletedTasks,
                        { ...taskToComplete, completed: true }
                    ]);
                }
                return prevTasks.filter(task => task.id !== taskId);
            }
            return prevTasks;
        });
    
        setTodayTasks(prevTodayTasks => prevTodayTasks.filter(task => task.id !== taskId));
    
        setModal({ show: true, message: 'Task marked as completed', type: 'success' });
    };
    
    const clearCompletedTasks = () => {
        setCompletedTasks([]);
        setModal({ show: true, message: 'All completed tasks have been cleared', type: 'success' });
    };

    const toggleTodayView = () => setShowToday(prevShowToday => !prevShowToday);

    return (
        <div className="main-page">
            <aside className="sidebar">
                <ul>
                    <li onClick={() => setShowToday(false)}>All</li>
                    <li onClick={toggleTodayView}>Today</li>
                    {/* <li>Inbox</li> */}
                </ul>
            </aside>
            <div className="task-content">
                <Column 
                    title={showToday ? "Today" : "All Tasks"} 
                    tasks={showToday ? todayTasks : tasks} 
                    onAddTask={() => handleAddTask(showToday)} 
                    onDeleteTask={handleDeleteTask} 
                    setSelectedTask={setSelectedTask} 
                    input={input} 
                    setInput={setInput} 
                    onCompleteTask={handleCompleteTask} 
                />
                {selectedTask && (
                    <TaskDetail 
                        task={selectedTask} 
                        onClose={() => setSelectedTask(null)} 
                        onDelete={() => handleDeleteTask(selectedTask.id)} 
                        onEdit={handleEditTask} 
                    />
                )}
            </div>
            {modal.show && (
                <Modal 
                    message={modal.message} 
                    type={modal.type} 
                    onClose={() => setModal({ show: false, message: '', type: '' })} 
                />
            )}
            <div className="completed-tasks">
                <h2>Completed Tasks</h2>
                {completedTasks.length > 0 && (
                    <button className="clear-completed-button" onClick={clearCompletedTasks}>
                        Clear Completed Tasks
                    </button>
                )}
                {completedTasks.map(task => (
                    <div key={task.id} className="completed-task">
                        <p>{task.title}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default MainPage;
