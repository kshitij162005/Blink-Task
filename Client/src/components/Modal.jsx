import React, { useEffect } from 'react';
import '../styles/Modal.css';
import successAudio from '../assets/audio3.mp3'; 
import errorAudio from '../assets/bin.mp3'; 

function Modal({ message, type, onClose }) {
    useEffect(() => {
        const audio = new Audio(type === 'error' ? errorAudio : successAudio);
        audio.play().catch(error => {
            console.error('Audio playback failed:', error);
        });
    }, [type]);

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h2>{type === 'error' ? 'Error' : 'Success'}</h2>
                <p>{message}</p>
                <button className="modal-close-button" onClick={onClose}>Close</button>
            </div>
        </div>
    );
}

export default Modal;
