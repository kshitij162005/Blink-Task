import React, { useState } from 'react';
import MainPage from './pages/MainPage';
import './index.css';

function App() {
    const [darkMode, setDarkMode] = useState(false);

    const toggleDarkMode = () => {
        setDarkMode(!darkMode);
        document.body.classList.toggle('dark-mode', !darkMode);
    };

    return (
        <div className={`app ${darkMode ? 'dark' : 'light'}`}>
            <header className="app-header">
                <h1 className="app-logo">Blink Task</h1>
                <button className="mode-toggle" onClick={toggleDarkMode}>
                    <div className={`toggle-container ${darkMode ? 'dark' : 'light'}`}>
                        <span className="toggle-icon">{darkMode ? '🌕' : '☀️'}</span>
                    </div>
                </button>
            </header>
            <MainPage />
        </div>
    );
}

export default App;
