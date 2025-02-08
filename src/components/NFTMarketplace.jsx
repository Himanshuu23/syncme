"use client"
import { useState } from 'react';
import { Heart } from 'lucide-react';

const NFTMarketplace = () => {
  const items = [
    {
      id: 1,
      image: "/api/placeholder/400/400",
      price: "0.0500 ETH",
      likes: 341,
      type: "hoodie"
    },
    {
      id: 2,
      image: "/api/placeholder/400/400",
      price: "0.0500 ETH",
      likes: 341,
      type: "tshirt"
    },
    {
      id: 3,
      image: "/api/placeholder/400/400",
      price: "0.0500 ETH",
      likes: 341,
      type: "bottle"
    },
    {
      id: 4,
      image: "/api/placeholder/400/400",
      price: "0.0500 ETH",
      likes: 341,
      type: "nft"
    },
    {
      id: 5, 
      image: "/api/placeholder/400/400",
      price: "0.0500 ETH",
      likes: 341,
      type: "nft"
    },
    {
      id: 6,
      image: "/api/placeholder/400/400",
      price: "0.0500 ETH",
      likes: 341,
      type: "nft"
    }
  ];

  const [likedItems, setLikedItems] = useState(new Set());

  const toggleLike = (id) => {
    setLikedItems(prev => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  return (
    <div className="min-h-screen w-full bg-gray-900 p-8">
      <h1 className="text-white text-4xl font-bold mb-8">REDEEM ITEMS</h1>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((item) => (
          <div 
            key={item.id}
            className="bg-gray-800 rounded-lg overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-xl"
          >
            <div className="relative">
              <img
                src={item.image}
                alt={`Item ${item.id}`}
                className="w-full h-64 object-cover"
              />
              <button
                onClick={() => toggleLike(item.id)}
                className="absolute top-4 right-4 p-2 rounded-full bg-white/10 backdrop-blur-sm transition-all duration-300 hover:bg-white/20"
              >
                <Heart
                  className={`w-6 h-6 transition-colors duration-300 ${
                    likedItems.has(item.id) 
                      ? 'text-red-500 fill-red-500' 
                      : 'text-white'
                  }`}
                />
                <span className="ml-1 text-white absolute right-0 top-0 -mt-1 -mr-1">
                  {item.likes}
                </span>
              </button>
            </div>

            <div className="p-4">
              <div className="flex justify-between items-center mb-4">
                <span className="text-white font-medium">{item.price}</span>
              </div>

              <button className="w-full bg-orange-500 text-white py-3 px-4 rounded-md font-medium transition-all duration-300 hover:bg-orange-600 active:scale-95">
                Buy Now
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NFTMarketplace;