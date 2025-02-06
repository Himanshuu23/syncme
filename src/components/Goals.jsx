"use client"
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';

const Goals = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const goals = [
    {
      title: 'Running on Track',
      date: 'Saturday, April 14 | 08:00 AM',
      metric: '04 Rounds'
    },
    {
      title: 'Push Up',
      date: 'Sunday, April 15 | 08:00 AM',
      metric: '50 Pieces'
    },
    {
        title: 'Running on Track',
        date: 'Saturday, April 14 | 08:00 AM',
        metric: '04 Rounds'
      },
      {
        title: 'Running on Track',
        date: 'Saturday, April 14 | 08:00 AM',
        metric: '04 Rounds'
      }
  ];

  return (
    <div className="bg-gray-900  p-6 rounded-lg max-w-[95%] sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-white text-2xl font-bold">Goals</h2>
        <motion.button 
          onClick={() => setIsExpanded(!isExpanded)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="text-orange-500 flex items-center hover:text-orange-600 transition-colors"
        >
          View All
          <ChevronRight className={`w-4 h-4 ml-1 transform transition-transform duration-200 ${isExpanded ? 'rotate-90' : ''}`} />
        </motion.button>
      </div>

      <div className={`space-y-4 ${isExpanded ? '' : 'max-h-28 overflow-hidden'}`}>
        {goals.map((goal, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.02 }}
            className="bg-gray-800 p-4 rounded-lg cursor-pointer hover:bg-gray-700 transition-colors"
          >
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-white font-semibold mb-1">{goal.title}</h3>
                <p className="text-gray-400 text-sm">{goal.date}</p>
              </div>
              <span className="text-orange-500 text-sm font-medium">
                {goal.metric}
              </span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Goals;