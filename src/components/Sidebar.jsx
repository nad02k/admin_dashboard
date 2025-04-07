import React, { useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { FaMoneyBillWave, FaUniversity, FaClipboardList } from 'react-icons/fa';
import { MdOutlineCancel } from 'react-icons/md';
import { TooltipComponent } from '@syncfusion/ej2-react-popups';

const Sidebar = ({ activeMenu, setActiveMenu, currentColor }) => {
  const handleCloseSideBar = () => {
    if (activeMenu !== undefined) {
      setActiveMenu(false);
    }
  };

  const [firstLinkHovered, setFirstLinkHovered] = useState(false);

  // Active and normal link styles with baby blue box around text
  const activeLink = 'flex items-center gap-5 pl-4 pt-3 pb-2.5 rounded-lg text-white bg-blue-400 m-2'; // Baby blue background for active state
  const normalLink = 'flex items-center gap-5 pl-4 pt-3 pb-2.5 rounded-lg text-md text-gray-700 hover:bg-blue-100 hover:text-blue-400 dark:text-gray-200 dark:hover:text-blue-400 dark:hover:bg-blue-100 m-2'; // Normal state with hover effect (baby blue)

  // Set the first link to be "hovered" when the component mounts
  useEffect(() => {
    setFirstLinkHovered(true);
  }, []);

  return (
    <div 
      className="ml-3 h-screen md:overflow-hidden overflow-auto pb-10 shadow-lg shadow-gray-400"
      // Always visible shadow effect
    >
      {activeMenu && (
        <>
          <div className="flex justify-between items-center">
            <Link
              to="/"
              onClick={handleCloseSideBar}
              className="items-center gap-3 ml-3 mt-4 flex text-xl font-extrabold tracking-tight text-slate-900"
            >
              <span>Infinity</span>
            </Link>
            <TooltipComponent content="Close Menu" position="BottomCenter">
              <button
                type="button"
                onClick={() => setActiveMenu(!activeMenu)}
                className="text-xl rounded-full p-3 hover:bg-light-gray mt-4 block md:hidden"
              >
                <MdOutlineCancel />
              </button>
            </TooltipComponent>
          </div>

          <div className="mt-10">
            <nav className="space-y-4">
              {/* Admin Dashboard Link */}
              <NavLink
                to="/admin-dashboard"
                className={({ isActive }) => (isActive || firstLinkHovered ? activeLink : normalLink)}
                style={({ isActive }) => ({
                  backgroundColor: isActive ? currentColor : ''
                })}
                onMouseEnter={() => setFirstLinkHovered(true)}
                onMouseLeave={() => setFirstLinkHovered(false)}
              >
                <FaMoneyBillWave size={18} />
                <span>Admin Dashboard</span>
              </NavLink>

              {/* Manage Accounts Link */}
              <NavLink
                to="/manage-accounts"
                className={({ isActive }) => (isActive ? activeLink : normalLink)}
                style={({ isActive }) => ({
                  backgroundColor: isActive ? currentColor : ''
                })}
              >
                <FaUniversity size={18} />
                <span>Manage Accounts</span>
              </NavLink>

              {/* View Accounts Link */}
              <NavLink
                to="/view-accounts"
                className={({ isActive }) => (isActive ? activeLink : normalLink)}
                style={({ isActive }) => ({
                  backgroundColor: isActive ? currentColor : ''
                })}
              >
                <FaClipboardList size={18} />
                <span>View Accounts</span>
              </NavLink>
            </nav>
          </div>
        </>
      )}
    </div>
  );
};

export default Sidebar;
