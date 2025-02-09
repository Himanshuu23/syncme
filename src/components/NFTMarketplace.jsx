"use client"

import { useState, useEffect } from 'react';
import { Heart } from 'lucide-react';
import ConnectWallet from './ConnectWallet';
import { ethers } from 'ethers';

const ITEMS = [
  {
    id: 1,
    image: "https://i.insider.com/5b2bf9281ae6621e008b46c1?width=700",
    price: 0.0500,
    likes: 341,
    type: "Netflix Voucher"
  },
  {
    id: 2,
<<<<<<< HEAD
    image: "./1",
=======
    image: "./spotify.jpg",
>>>>>>> e49ad6ffe8909a61c41ce98034de3382325ce029
    price: 0.0500,
    likes: 341,
    type: "Spotify Premium"
  },
  {
    id: 3,
<<<<<<< HEAD
    image: "./2",
=======
    image: "./hoodie.jpg",
>>>>>>> e49ad6ffe8909a61c41ce98034de3382325ce029
    price: 0.0500,
    likes: 341,
    type: "Customizable Hoodie"
  },
  {
    id: 4,
<<<<<<< HEAD
    image: "./3",
=======
    image: "./bootle.jpg",
>>>>>>> e49ad6ffe8909a61c41ce98034de3382325ce029
    price: 0.0500,
    likes: 341,
    type: "Customizable Bottle"
  },
  {
    id: 5, 
<<<<<<< HEAD
    image: "./5",
=======
    image: "./mmt.jpg",
>>>>>>> e49ad6ffe8909a61c41ce98034de3382325ce029
    price: 0.0500,
    likes: 341,
    type: "Make my Trip voucher"
  },
  {
    id: 6,
<<<<<<< HEAD
    image: "./6",
=======
    image: "./amazon.jpg",
>>>>>>> e49ad6ffe8909a61c41ce98034de3382325ce029
    price: 0.0500,
    likes: 341,
    type: "Amazon Gift Voucher"
  }
];
const SHOP_CONTRACT_ADDRESS = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512";
const SHOP_ABI = [
  {
    "anonymous": false,
    "inputs": [
      { "indexed": false, "internalType": "uint256", "name": "id", "type": "uint256" },
      { "indexed": false, "internalType": "string", "name": "name", "type": "string" },
      { "indexed": false, "internalType": "uint256", "name": "price", "type": "uint256" },
      { "indexed": false, "internalType": "address", "name": "buyer", "type": "address" }
    ],
    "name": "ProductPurchased",
    "type": "event"
  },
  {
    "inputs": [
      { "internalType": "uint256", "name": "_id", "type": "uint256" }
    ],
    "name": "buyProduct",
    "outputs": [],
    "stateMutability": "payable",
    "type": "function"
  }
];

const NFTMarketplace = () => {
  const [provider, setProvider] = useState(null);
  const [contract, setContract] = useState(null);
  const [likedItems, setLikedItems] = useState(new Set());

  useEffect(() => {
    if (window.ethereum) {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const contract = new ethers.Contract(SHOP_CONTRACT_ADDRESS, SHOP_ABI, provider);
      setProvider(provider);
      setContract(contract);
    }
  }, []);

  const buyProduct = async (id, price) => {
    const signer = await provider.getSigner();
    const contractWithSigner = contract.connect(signer);
    await contractWithSigner.buyProduct(id, { value: ethers.parseEther(price.toString()) });
  };

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
    <div className="min-h-screen w-[70vw] p-8">
      <h1 className="text-white text-4xl font-bold mb-8">REDEEM ITEMS</h1>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {ITEMS.map((item) => (
          <div 
            key={item.id}
            className="bg-gray-800 rounded-lg overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-xl"
          >
            <div className="relative p-4 ">
              <img
                src={item.image}
                alt={`Item ${item.id}`}
                className="w-full h-64 object-cover rounded-md"
              />
              <button
                onClick={() => toggleLike(item.id)}
                className="absolute top-4 right-4 p-2 rounded-md overflow-hidden bg-white/10 backdrop-blur-sm transition-all duration-300 hover:bg-white/20"
              >
                <Heart
                  className={`w-6 h-6 mr-8 transition-colors duration-300 ${
                    likedItems.has(item.id)
                      ? 'text-red-500 fill-red-500' 
                      : 'text-white'
                  }`}
                />
                <span className="ml-1 text-white absolute right-0 top-0 mt-2 mr-2">
                  {item.likes}
                </span>
              </button>
            </div>

            <div className="p-4">
              <div className="flex justify-between items-center mb-4">
                <span className="text-white align-center font-sans font-medium">{item.price} ETH</span>
                <span className="text-white align-center font-sans font-medium">{item.type}</span>
              </div>
              <ConnectWallet />
              <button onClick={() => buyProduct(1, item.price)} className="w-full bg-orange-500 text-white py-3 px-4 rounded-md font-medium transition-all duration-300 hover:bg-orange-600 active:scale-95">
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