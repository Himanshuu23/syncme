// components/Schedule.js
import Link from "next/link";

const Schedule = () => {
    const scheduleItems = [
      { day: 'Monday', activity: 'Stretch', time: '08:00', reps: '20 Pieces' },
      { day: 'Tuesday', activity: 'Back Stretch', time: '06:00', reps: '10 Round' },
      { day: 'Wednesday', activity: 'Yoga', time: '08:00', reps: '20 min' }
    ];
  
    return (
      <div className="bg-white rounded-lg p-6">
        <div className="flex justify-between mb-4">
          <h2 className="text-xl font-bold">My Schedule</h2>
          <Link href="/schedule" className="text-orange-500">View All</Link>
        </div>
        {scheduleItems.map((item, index) => (
          <div key={index} className="flex items-center justify-between py-3 border-b">
            <div>
              <h3 className="font-medium">{item.day}</h3>
              <p className="text-gray-500">{item.activity} at {item.time}</p>
            </div>
            <span className="text-orange-500">{item.reps}</span>
          </div>
        ))}
      </div>
    );
  };
  
  export default Schedule;
  