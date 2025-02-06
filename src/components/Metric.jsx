import React from 'react'

import { Activity, Flame, FootprintsIcon } from 'lucide-react';

const Metric = ({ icon: Icon, title, value, color }) => {
    return (
        <div 
          className={`relative bg- p-6 rounded-xl ${color} transition-all duration-300 hover:scale-105 hover:shadow-lg`}
        >
          <div className="flex items-center space-x-3">
            <div className="p-2 rounded-lg ">
              <Icon className="w-6 h-6 text-white" />
            </div>
            <div className="flex flex-col">
              <h3 className="text-white text-lg font-medium">{title}</h3>
              <p className="text-white/90 text-2xl font-semibold">{value}</p>
            </div>
          </div>
          <div className="absolute bottom-0  left-0 right-0 h-20">
            <svg viewBox="0 0 400 200" preserveAspectRatio="none" className="w-full rounded-b-xl h-full opacity-30">
              <path
                d="M0 50 C100 20, 200 80, 400 50 L400 200 L0 200 Z"
                fill="currentColor"
                className="text-white"
              />
            </svg>
          </div>
        </div>
      );
}

export default Metric