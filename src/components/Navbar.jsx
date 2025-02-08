// components/Navbar.jsx
'use client'
import { useState } from 'react';
import { BiBell } from 'react-icons/bi';
import { IoSettingsOutline } from 'react-icons/io5';
import { FiSearch } from 'react-icons/fi';
import { GiHamburgerMenu } from 'react-icons/gi';
import { GoSidebarCollapse, GoSidebarExpand } from 'react-icons/go';
import Image from 'next/image';
import Sidebar from './Sidebar';
import Dropdown from './Dropdown'

const Navbar = ({ isSidebarOpen, setIsSidebarOpen }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <>
      {/* Sidebar Component */}
      {isSidebarOpen && <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />}
      <nav className={`
        fixed top-0 right-0 h-16
        ${isSidebarOpen ? 'lg:w-[calc(100%-16.6666667%)]' : 'w-full'}
        transition-all duration-300 ease-in-out
         px-4 py-2
        flex items-center justify-between
        bg-[#0E071D]
        bg-opacity-70
        backdrop-blur-xl
        shadow-xlx
        z-50
      `}>
        {/* Hamburger Menu Button */}
        <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="p-2">
          {isSidebarOpen ? <GoSidebarExpand className="text-white text-2xl" /> : <GoSidebarCollapse className="text-white text-2xl" />}
        </button>

        {/* Left Section - Greeting */}
        <div className="flex flex-col">
          <span className="text-gray-400 text-sm">Good Morning</span>
          <h1 className="text-white text-xl font-semibold">Welcome Back!</h1>
        </div>

        {/* Middle Section - Search Bar */}
        <div className="hidden md:flex items-center flex-1 max-w-2xl mx-4">
          <div className="relative w-full">
            <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-lg bg-[#2D303E] text-white 
              focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
        </div>

        {/* Right Section - Icons & Profile */}
        <div className="flex items-center gap-4">
          <button className="p-2 hover:bg-[#2D303E] rounded-lg">
            <BiBell className="text-white text-xl" />
          </button>
          <button className="p-2 hover:bg-[#2D303E] rounded-lg">
            <IoSettingsOutline className="text-white text-xl" />
          </button>
          <div 
            className="h-10 w-10 rounded-full overflow-hidden cursor-pointer" 
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            onMouseEnter={() => setIsDropdownOpen(true)}
            onMouseLeave={() => setIsDropdownOpen(false)}
          >
            <img
              src="https://e7.pngegg.com/pngimages/799/987/png-clipart-computer-icons-avatar-icon-design-avatar-heroes-computer-wallpaper-thumbnail.png"
              alt="Profile"
              width={40}
              height={40}
              className="object-cover"
            />
          </div>
          {isDropdownOpen && <Dropdown isOpen={isDropdownOpen} setIsOpen={setIsDropdownOpen} />}
        </div>
      </nav>
    </>
  );
};

export default Navbar;
