import React, { useState } from 'react';
import '../styles/TaskDetail.css'; 

function TaskDetail({ task, onClose, onDelete, onEdit }) {
    const [newTitle, setNewTitle] = useState(task.title);

    const handleSaveChanges = () => {
        onEdit(task.id, newTitle);
        onClose(); 
    };

    return (
        <div className="modal-overlay">
            <div className="task-detail-modal">
                <button className="close-button" onClick={onClose}>
                    &times; 
                </button>
                <h3>Task Details</h3>
                <input 
                    type="text" 
                    value={newTitle} 
                    onChange={(e) => setNewTitle(e.target.value)} 
                    className="task-input-field"
                />
                <div className="modal-buttons">
                    <button className="save-button" onClick={handleSaveChanges}>
                        Save Changes
                    </button>
                    <button className="delete-button" onClick={() => {
                        onDelete(task.id);
                        onClose(); 
                    }}>
                        Delete
                    </button>
                </div>
            </div>
        </div>
    );
}

export default TaskDetail;
