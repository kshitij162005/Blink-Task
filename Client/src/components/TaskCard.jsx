import React from 'react';
import { FaTrashAlt } from 'react-icons/fa'; 
import '../styles/TaskCard.css';
import audioComplete from '../assets/audio3.mp3'; 
import audioDelete from '../assets/bin.mp3'; 

function TaskCard({ task, setSelectedTask, deleteTask, onCompleteTask }) {
    const handleCompleteTask = (e) => {
        e.stopPropagation(); 
        onCompleteTask(); 

        const audio = new Audio(audioComplete);
        audio.play().catch(error => {
            console.error('Audio playback failed:', error);
        });
    };

    const handleDeleteTask = (e) => {
        e.stopPropagation(); 
        deleteTask(); 


        const audio = new Audio(audioDelete);
        audio.play().catch(error => {
            console.error('Audio playback failed:', error);
        });
    };

    return (
        <div className="task-card" onClick={() => setSelectedTask(task)}>
            <input 
                type="checkbox" 
                checked={task.completed} 
                readOnly 
                onClick={handleCompleteTask} 
            />
            <p>{task.title}</p>
            <button onClick={handleDeleteTask}>
                <FaTrashAlt style={{ color: 'red' }} />
            </button>
        </div>
    );
}

export default TaskCard;
