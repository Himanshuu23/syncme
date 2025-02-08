import React, { useState } from 'react';
import { Settings, LogOut, BarChart2, User } from 'lucide-react';

const ProfileDropdown = () => {
  const [isOpen, setIsOpen] = useState(true);

  const menuItems = [
    {
      label: 'Edit Profile',
      icon: <User size={18} />,
      href: '/edit_profile'
    },
    {
      label: 'Stats',
      icon: <BarChart2 size={18} />,
      href: '/profile/stats'
    },
    {
      label: 'Settings',
      icon: <Settings size={18} />,
      href: '/settings'
    },
    {
      label: 'Logout',
      icon: <LogOut size={18} />,
      href: '/logout'
    }
  ];

  return (
    <div className="fixed right-2 top-12 ">
      <div
        className={`absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-gray-800 ring-1 ring-black ring-opacity-5 transition-all duration-200 ease-in-out transform origin-top-right
          ${isOpen 
            ? 'opacity-100 scale-100 translate-y-0' 
            : 'opacity-0 scale-95 -translate-y-2 pointer-events-none'}`}
      >
        {menuItems.map((item, index) => (
          <a
            key={item.label}
            href={item.href}
            className={`flex items-center px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white transition-colors duration-150
              ${index === menuItems.length - 1 ? 'border-t border-gray-700' : ''}`}
          >
            <span className="mr-3">{item.icon}</span>
            {item.label}
          </a>
        ))}
      </div>
    </div>
  );
};

export default ProfileDropdown;