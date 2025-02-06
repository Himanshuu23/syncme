"use client"
import React, { useState } from 'react';
import { ChevronRight } from 'lucide-react';
import { Card, CardHeader, CardContent } from '@/components/ui/card';

const Schedule = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  const scheduleData = [
    {
      day: 'Monday',
      activity: 'Stretch',
      time: '08:00',
      metric: '20 Pieces',
      icon: '🧘‍♀️'
    },
    {
      day: 'Tuesday',
      activity: 'Back Stretch',
      time: '08:00',
      metric: '10 Round',
      icon: '🧘‍♀️'
    },
    {
      day: 'Wednesday',
      activity: 'Yoga',
      time: '08:00',
      metric: '20 min',
      icon: '🧘‍♀️'
    }
  ];

  return (
    <Card className="w-full max-w-[95%] sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl mx-auto bg-[#10172A] p-2 sm:p-4 border-none">
      <CardHeader className="flex flex-row justify-between items-center p-0 mb-2 sm:mb-4">
        <h2 className="text-xl text-white sm:text-2xl font-bold">My Schedule</h2>
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="text-orange-500 flex items-center hover:text-orange-600 transition-colors text-sm sm:text-base"
        >
          View All
          <ChevronRight 
            className={`ml-1 transform transition-transform duration-200 ${
              isExpanded ? 'rotate-90' : ''
            }`}
          />
        </button>
      </CardHeader>
      <CardContent className="p-0">
        <div className={`space-y-2 sm:space-y-3 transition-all duration-300 ${
          isExpanded ? 'max-h-[800px]' : 'max-h-28 sm:max-h-32'
        } overflow-hidden`}>
          {scheduleData.map((item) => (
            <Card 
              key={item.day}
              className="p-2 sm:p-4 hover:shadow-lg transition-shadow border-none duration-200 transform hover:bg-gray-700 bg-gray-800"
            >
              <div className="flex justify-between items-center">
                <div className="space-y-0.5 sm:space-y-1">
                  <h3 className="text-base sm:text-lg text-white">{item.day}</h3>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm sm:text-base">{item.icon}</span>
                    <div>
                      <p className="text-sm sm:text-base font-medium text-white">{item.activity}</p>
                      <p className="text-xs sm:text-sm text-gray-300">At {item.time}</p>
                    </div>
                  </div>
                </div>
                <span className="text-white text-sm sm:text-base">{item.metric}</span>
              </div>
            </Card>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default Schedule;