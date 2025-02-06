"use client"
import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { day: 'Mon', Workout: 25, Calories: 55, Steps: 75 },
  { day: 'Tue', Workout: 42, Calories: 30, Steps: 48 },
  { day: 'Wed', Workout: 75, Calories: 50, Steps: 58 },
  { day: 'Thu', Workout: 62, Calories: 75, Steps: 45 },
  { day: 'Fri', Workout: 32, Calories: 58, Steps: 62 },
  { day: 'Sat', Workout: 35, Calories: 58, Steps: 62 },
  { day: 'Sun', Workout: 35, Calories: 58, Steps: 62 }
];

const GoalProgressChart = () => {
  const [period, setPeriod] = useState('weekly');

  return (
    <Card className="w-full max-w-full bg-slate-900 p-2 sm:p-4 md:p-6 transition-all duration-300 hover:shadow-xl">
      <CardHeader className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-2 sm:p-4 space-y-4 sm:space-y-0">
        <CardTitle className="text-xl sm:text-2xl font-bold text-white">Goal Progress</CardTitle>
        <Select value={period} onValueChange={setPeriod}>
          <SelectTrigger className="w-full sm:w-32 bg-slate-800 text-white border-slate-700">
            <SelectValue placeholder="Select period" />
          </SelectTrigger>
          <SelectContent className="bg-slate-800 text-white border-slate-700">
            <SelectItem value="daily">Daily</SelectItem>
            <SelectItem value="weekly">Weekly</SelectItem>
            <SelectItem value="monthly">Monthly</SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent className="p-0 h-[300px] sm:h-[350px] md:h-[400px] lg:h-[500px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart 
            data={data} 
            margin={{ 
              top: 20, 
              right: 10, 
              left: -20, 
              bottom: 5 
            }}
          >
            <XAxis 
              dataKey="day" 
              stroke="#94a3b8"
              tick={{ fill: '#94a3b8', fontSize: '12px', sm: '14px' }}
            />
            <YAxis 
              stroke="#94a3b8"
              tick={{ fill: '#94a3b8', fontSize: '12px', sm: '14px' }}
              unit="%"
            />
            <Tooltip
              contentStyle={{
                backgroundColor: '#1e293b',
                border: 'none',
                borderRadius: '8px',
                color: '#fff',
                fontSize: '12px',
                sm: '14px'
              }}
              itemStyle={{ color: '#fff' }}
              cursor={{ fill: 'rgba(255, 255, 255, 0.1)' }}
            />
            <Bar
              dataKey="Workout"
              fill="#38bdf8"
              radius={[4, 4, 0, 0]}
              className="transition-all duration-300 hover:brightness-110"
            />
            <Bar
              dataKey="Calories"
              fill="#fb923c"
              radius={[4, 4, 0, 0]}
              className="transition-all duration-300 hover:brightness-110"
            />
            <Bar
              dataKey="Steps"
              fill="#a78bfa"
              radius={[4, 4, 0, 0]}
              className="transition-all duration-300 hover:brightness-110"
            />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default GoalProgressChart;