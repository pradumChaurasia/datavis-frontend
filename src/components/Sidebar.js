import React, { useContext } from 'react';
import { ThemeContext } from "./ThemeContext.js";
import './Sidebar.css';
import { FaSun } from "react-icons/fa";
import { FaMoon } from "react-icons/fa";

const Sidebar = () => {
    const { theme, toggleTheme } = useContext(ThemeContext);

    return (
        <div>
            <div className="sidebar">
                <button onClick={toggleTheme} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
                    {theme === 'light' ? <FaMoon style={{ color: 'gray', fontSize: '24px' }} /> : <FaSun style={{ color: 'yellow', fontSize: '24px' }} />}
                </button>
            </div>
            <div className="navbar">
                <button onClick={toggleTheme} className="theme-toggle-btn">
                    {theme === 'light' ? <FaMoon style={{ color: 'gray', fontSize: '24px' }} /> : <FaSun style={{ color: 'yellow', fontSize: '24px' }} />}
                </button>
            </div>
        </div>
    );
};

export default Sidebar;
