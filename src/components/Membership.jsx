"use client"
import React from 'react';
import { motion } from 'framer-motion';

const Membership = () => {
  return (
    <motion.div 
      className="w-full max-w-[95%] sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl mx-auto overflow-hidden rounded-2xl bg-purple-500 p-6 text-white shadow-xl hover:shadow-2xl transition-shadow"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="space-y-4">
        <motion.h2 
          className="text-3xl font-bold"
          initial={{ x: -20 }}
          animate={{ x: 0 }}
          transition={{ delay: 0.2 }}
        >
          50% off on Premium Membership
        </motion.h2>
        
        <motion.p 
          className="text-purple-100"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
        </motion.p>

        <motion.button 
          className="bg-orange-500 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-orange-600 transform hover:scale-105 transition-all"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Upgrade
        </motion.button>
      </div>

      <motion.div 
        className="absolute bottom-0 right-0 w-64 h-64"
        initial={{ x: 100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 0.4, type: "spring" }}
      >
        
      </motion.div>
    </motion.div>
  );
};

export default Membership;