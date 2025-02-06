import React from 'react';
import { 
  GiMeat, 
  GiHamburger, 
  GiBurstBlob,
  GiIceCreamCone,
  GiSlicedBread,
  GiCookie,
  GiFrenchFries,
  GiBacon,
  GiCupcake,
  GiTacos
} from 'react-icons/gi';

const FoodTrackingList = () => {
  const foodItems = [
    { 
      icon: <GiMeat className="text-red-600" />,
      food: "Meat",
      meal: "Break Fast",
      calories: "Receiving",
      priorities: "08:00 AM",
      carbs: "20 gm"
    },
    {
      icon: <GiHamburger className="text-amber-700" />,
      food: "Burger",
      meal: "Lunch",
      calories: "Receiving",
      priorities: "01:00 AM",
      carbs: "30 gm"
    },
    {
      icon: <GiBurstBlob className="text-green-600" />,
      food: "Burrito",
      meal: "Dinner",
      calories: "Receiving",
      priorities: "011:00 PM",
      carbs: "10 gm"
    },
    {
      icon: <GiIceCreamCone className="text-pink-400" />,
      food: "Ice Cream",
      meal: "Lunch",
      calories: "Receiving",
      priorities: "01:00 AM",
      carbs: "90 gm"
    },
    {
      icon: <GiSlicedBread className="text-yellow-600" />,
      food: "Pizza Slice",
      meal: "Branch",
      calories: "Receiving",
      priorities: "11:00 AM",
      carbs: "50 gm"
    },
    {
      icon: <GiCookie className="text-amber-800" />,
      food: "Cookies",
      meal: "Break Fast",
      calories: "Receiving",
      priorities: "08:00 AM",
      carbs: "30 gm"
    },
    {
      icon: <GiFrenchFries className="text-yellow-500" />,
      food: "Fries",
      meal: "Lunch",
      calories: "Receiving",
      priorities: "01:00 AM",
      carbs: "90 gm"
    },
    {
      icon: <GiBacon className="text-red-500" />,
      food: "Egg & Bacon",
      meal: "Dinner",
      calories: "Receiving",
      priorities: "10:00 PM",
      carbs: "70 gm"
    },
    {
      icon: <GiCupcake className="text-purple-500" />,
      food: "Cup Cake",
      meal: "Break Fast",
      calories: "Receiving",
      priorities: "08:00 AM",
      carbs: "40 gm"
    },
    {
      icon: <GiTacos className="text-amber-600" />,
      food: "Taco",
      meal: "Lunch",
      calories: "Receiving",
      priorities: "01:00 AM",
      carbs: "80 gm"
    }
  ];

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="bg-[#10172A] rounded-lg shadow">
        <div className="grid grid-cols-5 gap-4 p-4 bg-gray-100 rounded-t-lg font-semibold text-gray-600">
          <div>Food</div>
          <div>Meal</div>
          <div>Calories</div>
          <div>Priorities</div>
          <div>Carbs</div>
        </div>
        
        <div className="divide-y divide-gray-200">
          {foodItems.map((item, index) => (
            <div 
              key={index}
              className="grid grid-cols-5 gap-4 p-4 items-center hover:bg-blue-950 transition-colors duration-150"
            >
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                  {item.icon}
                </div>
                <span className="text-white">{item.food}</span>
              </div>
              <div className="text-white">{item.meal}</div>
              <div className="text-white">{item.calories}</div>
              <div className="text-white">{item.priorities}</div>
              <div className="text-white">{item.carbs}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FoodTrackingList;