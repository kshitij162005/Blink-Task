import React from 'react';
import TaskCard from './TaskCard';
import '../styles/Column.css';
import audioAdd from '../assets/audio1.mp3'; 
import audioUpdate from '../assets/audio3.mp3'; 
import audioDelete from '../assets/bin.mp3'; 

function Column({ title, tasks, setSelectedTask, input, setInput, onAddTask, onDeleteTask, onCompleteTask }) {
    const handleAddTask = () => {
        if (input.trim()) {
            onAddTask(); 

            const audio = new Audio(audioAdd);
            audio.play().catch(error => {
                console.error('Audio playback failed:', error);
            });

            setInput(''); 
        } else {
            alert('Please enter a task.'); 
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleAddTask(); // Call handleAddTask if Enter is pressed
        }
    };

    const handleUpdateTask = (taskId) => {
        onCompleteTask(taskId);

        const audio = new Audio(audioUpdate);
        audio.play().catch(error => {
            console.error('Audio playback failed:', error);
        });
    };

    const handleDeleteTask = (taskId) => {
        onDeleteTask(taskId); 

        const audio = new Audio(audioDelete);
        audio.play().catch(error => {
            console.error('Audio playback failed:', error);
        });
    };

    return (
        <div className="column">
            <h2>{title}</h2>
            <div className="task-input">
                <input 
                    type="text" 
                    placeholder="Add a task..." 
                    value={input} 
                    onChange={(e) => setInput(e.target.value)} 
                    onKeyDown={handleKeyDown} // Add the key down event here
                    className="task-input-field" 
                />
                <button 
                    onClick={handleAddTask} 
                    className="add-task-button" 
                >
                    Add
                </button>
            </div>
            {tasks.map(task => (
                <TaskCard 
                    key={task.id} 
                    task={task} 
                    setSelectedTask={setSelectedTask} 
                    deleteTask={() => handleDeleteTask(task.id)} 
                    onCompleteTask={() => handleUpdateTask(task.id)} 
                />
            ))}
        </div>
    );
}

export default Column;
