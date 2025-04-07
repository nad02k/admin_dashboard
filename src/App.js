import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { FiSettings } from 'react-icons/fi';
import { TooltipComponent } from '@syncfusion/ej2-react-popups';

import { Navbar, Footer, Sidebar, ThemeSettings } from './components';
import { Infinity, CreateAccount, ViewAccounts } from './pages';
import './App.css';

const App = () => {
  const [activeMenu, setActiveMenu] = useState(true);
  const [themeSettings, setThemeSettings] = useState(false);
  const [currentMode, setCurrentMode] = useState('Light');
  const [currentColor, setCurrentColor] = useState('#3498db');

  useEffect(() => {
    const storedColor = localStorage.getItem('colorMode');
    const storedMode = localStorage.getItem('themeMode');
    if (storedColor && storedMode) {
      setCurrentColor(storedColor);
      setCurrentMode(storedMode);
    }
  }, []);

  return (
    <div className={currentMode === 'Dark' ? 'dark' : ''}>
      <BrowserRouter>
        <div className="flex relative dark:bg-main-dark-bg">
          {/* Settings Button */}
          <div className="fixed right-4 bottom-4 z-50">
            <TooltipComponent content="Settings" position="Top">
              <button
                type="button"
                onClick={() => setThemeSettings(true)}
                style={{ background: currentColor, borderRadius: '50%' }}
                className="text-3xl text-white p-3 hover:drop-shadow-xl hover:bg-light-gray"
              >
                <FiSettings />
              </button>
            </TooltipComponent>
          </div>

          {/* Sidebar */}
          {activeMenu && (
            <div className="w-72 fixed sidebar dark:bg-secondary-dark-bg bg-white">
              <Sidebar activeMenu={activeMenu} setActiveMenu={setActiveMenu} currentColor={currentColor} />
            </div>
          )}

          {/* Main Content */}
          <div
            className={
              activeMenu
                ? 'md:ml-72 w-full h-screen flex flex-col'  // Added flex and flex-col to manage layout
                : 'w-full h-screen flex flex-col'
            }
          >
            {/* Navbar */}
            <Navbar onToggleSidebar={() => setActiveMenu(!activeMenu)} currentColor={currentColor} />

            {/* Welcome message under the navbar */}
            <div className="flex justify-center items-center mt-8 text-center">
              <h2 className="text-3xl font-semibold text-gray-800 dark:text-white">
                Welcome to the Admin Dashboard
              </h2>
            </div>

            {/* Routing Content */}
            <Routes>
              <Route path="/" element={<Infinity />} />
              <Route path="/CreateAccount" element={<CreateAccount />} />
              <Route path="/ViewAccounts" element={<ViewAccounts />} />
            </Routes>
          </div>
        </div>

        {/* Theme Settings */}
        {themeSettings && <ThemeSettings />}
      </BrowserRouter>
    </div>
  );
};

export default App;
