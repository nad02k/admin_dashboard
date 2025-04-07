import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaUserCircle, FaSignOutAlt, FaBars, FaLanguage } from 'react-icons/fa';
import { FiBell } from 'react-icons/fi'; // Icon for Notifications
import { TooltipComponent } from '@syncfusion/ej2-react-popups';

const NavButton = ({ title, customFunc, icon, color }) => (
  <TooltipComponent content={title} position="BottomCenter">
    <button
      type="button"
      onClick={() => customFunc()}
      style={{ color }}
      className="relative text-xl rounded-full p-3 hover:bg-light-gray"
    >
      {icon}
    </button>
  </TooltipComponent>
);

const Navbar = ({ onToggleSidebar, currentColor }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isLanguageDropdownVisible, setIsLanguageDropdownVisible] = useState(false);
  const [isNotificationVisible, setIsNotificationVisible] = useState(false); // Track notification visibility

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const toggleLanguageDropdown = () => {
    setIsLanguageDropdownVisible(!isLanguageDropdownVisible);
  };

  const toggleNotificationDropdown = () => {
    setIsNotificationVisible(!isNotificationVisible); // Handle notification toggle
  };

  return (
    <div className="flex justify-between p-2 md:ml-6 md:mr-6 relative">
      {/* Menu Button */}
      <div className="flex items-center">
        <FaBars onClick={onToggleSidebar} className="text-xl text-gray-400 cursor-pointer" />
        <span className="ml-4 text-lg font-semibold text-gray-400">Admin Dashboard</span>
      </div>

      <div className="flex items-center">
        {/* Language Dropdown */}
        <NavButton title="Language" customFunc={toggleLanguageDropdown} icon={<FaLanguage />} color={currentColor} />
        {isLanguageDropdownVisible && (
          <div className="absolute top-full right-0 mt-2 bg-white text-black p-2 rounded shadow-md">
            <button className="block px-4 py-2">English</button>
            <button className="block px-4 py-2">Spanish</button>
            <button className="block px-4 py-2">French</button>
            <button className="block px-4 py-2">German</button>
          </div>
        )}

        {/* Notifications Dropdown */}
        <NavButton title="Notifications" customFunc={toggleNotificationDropdown} icon={<FiBell />} color={currentColor} />
        {isNotificationVisible && (
          <div className="absolute top-full right-0 mt-2 bg-white text-black p-2 rounded shadow-md">
            <p className="p-2">New message received!</p>
            <p className="p-2">Account update available!</p>
            <p className="p-2">Server maintenance scheduled.</p>
          </div>
        )}

        {/* Profile Dropdown */}
        <div className="profile-dropdown" onClick={toggleDropdown}>
          <FaUserCircle className="text-xl text-gray-400 cursor-pointer" />
          {dropdownOpen && (
            <div className="absolute top-full right-0 mt-2 bg-white text-black p-2 rounded shadow-md">
              <Link to="/profile" className="block px-4 py-2">Profile</Link>
              <Link to="/logout" className="block px-4 py-2">
                <FaSignOutAlt /> Logout
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
