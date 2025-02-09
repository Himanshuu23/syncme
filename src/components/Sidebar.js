// components/Sidebar.js
'use client'
import { useState } from 'react';
import Link from 'next/link';

// Importing react icons for each menu item
import { AiOutlineDashboard, AiOutlineBook, AiOutlineCalendar } from 'react-icons/ai';
import { GiMeal } from 'react-icons/gi';
import { FaBullseye } from 'react-icons/fa';
import { FiTrendingUp, FiLogOut, FiHelpCircle } from 'react-icons/fi';

const Sidebar = ({ isOpen, setIsOpen }) => {
  // Top menu items (displayed at the top of the sidebar)
  const topMenuItems = [
    { icon: <AiOutlineDashboard />, label: 'Overview', path: '/' },
    { icon: <AiOutlineBook />, label: 'Daily Diary', path: '/diary' },
    { icon: <GiMeal />, label: 'Diet Plan', path: '/diet' },
    { icon: <FaBullseye />, label: 'Fitness Tracker', path: '/fitness' },
    { icon: <AiOutlineCalendar />, label: 'My Schedule', path: '/schedule' },
    { icon: <FiTrendingUp />, label: 'Shop', path: '/shop' }
  ];

  // Bottom menu items (Logout and Help will be shown at the bottom)
  const bottomMenuItems = [
    { icon: <FiLogOut />, label: 'Logout', path: '/logout' },
    { icon: <FiHelpCircle />, label: 'Help', path: '/help' }
  ];

  return (
    <div className={`w-2/12    fixed  h-screen border-r-2 bg-transparent backdrop-blur-sm shadow-lg ${isOpen ? 'block' : 'hidden'} flex flex-col justify-between`}>
      <div className="p-4">
        <div className="border-b-2">
          <div className="flex items-center mb-8 justify-self-center">
            <h1 className="text-2xl font-bold text-orange-500">SyncMe</h1>
          </div>
        </div>
        
        <nav className="mt-5 text-black">
          {topMenuItems.map((item, index) => (
            <Link 
              key={index}
              href={item.path}
              className="flex items-center p-3 mb-4 w-11/12 bg-white rounded-lg hover:bg-orange-500 hover:text-white"
            >
              <span className="mr-3">{item.icon}</span>
              <span>{item.label}</span>
            </Link>
          ))}
        </nav>
      </div>
      
      <div className="p-4 text-black
       ">
        {bottomMenuItems.map((item, index) => (
          <Link 
            key={index}
            href={item.path}
            className="flex items-center p-3 mb-4 w-11/12 bg-white rounded-lg hover:bg-orange-500 hover:text-white"
          >
            <span className="mr-3">{item.icon}</span>
            <span>{item.label}</span>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
