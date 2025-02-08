"use client";

import React, { useState, useEffect, useMemo } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

// AnimatedListItem Component
const AnimatedListItem = ({ children }) => {
  const animations = {
    initial: { scale: 0, opacity: 0 },
    animate: { scale: 1, opacity: 1, originY: 0 },
    exit: { scale: 0, opacity: 0 },
    transition: { type: "spring", stiffness: 350, damping: 40 },
  };

  return (
    <motion.div {...animations} layout className="mx-auto w-full">
      {children}
    </motion.div>
  );
};

// AnimatedList Component
const AnimatedList = React.memo(({ children, className = "", delay = 20000, ...props }) => {
  const [index, setIndex] = useState(0);
  const childrenArray = useMemo(() => React.Children.toArray(children), [children]);

  useEffect(() => {
    if (index < childrenArray.length - 1) {
      const timeout = setTimeout(() => {
        setIndex((prevIndex) => prevIndex + 1);
      }, delay);

      return () => clearTimeout(timeout);
    }
  }, [index, delay, childrenArray.length]);

  const itemsToShow = useMemo(() => {
    return childrenArray.slice(0, index + 1).reverse();
  }, [index, childrenArray]);

  return (
    <div className={`flex flex-col items-center gap-4 ${className}`} {...props}>
      <AnimatePresence>
        {itemsToShow.map((item) => (
          <AnimatedListItem key={(item).key}>{item}</AnimatedListItem>
        ))}
      </AnimatePresence>
    </div>
  );
});

AnimatedList.displayName = "AnimatedList";

// Notification Component
const Notification = ({ name, description, icon, color, time }) => {
  return (
    <figure className="relative mx-auto min-h-fit w-full max-w-[400px] cursor-pointer overflow-hidden rounded-2xl p-4 transition-all duration-200 ease-in-out hover:bg-blue-200 bg-white dark:bg-transparent dark:backdrop-blur-md transform-gpu dark:[border:1px_solid_rgba(255,255,255,.1)] [box-shadow:0_0_0_1px_rgba(0,0,0,.03),0_2px_4px_rgba(0,0,0,.05),0_12px_24px_rgba(0,0,0,.05)] dark:[box-shadow:0_-20px_80px_-20px_#ffffff1f_inset]">
      <div className="flex flex-row items-center gap-3">
        <div
          className="flex size-10 items-center justify-center rounded-2xl"
          style={{ backgroundColor: color }}
        >
          <span className="text-lg">{icon}</span>
        </div>
        <div className="flex flex-col overflow-hidden">
          <figcaption className="flex flex-row items-center whitespace-pre text-lg font-medium dark:text-white">
            <span className="text-sm sm:text-lg">{name}</span>
            <span className="mx-1">    </span>
            <span className="text-xs text-gray-500">{time}</span>
          </figcaption>
          <p className="text-sm font-normal dark:text-white/60">{description}</p>
        </div>
      </div>
    </figure>
  );
};

// Sample notifications data
const notifications = Array.from({ length: 10 }, () => [
  {
    name: "Bicep Curls",
    description: "Grow them biceps!",
    time: "      ",
    icon: "💪",
    color: "#FF3D71",
  },
  {
    name: "Pushups",
    description: "Get down Soldier!",
    time: "      ",
    icon: "💪",
    color: "#FF3D71",
  },
  {
    name: "Shoulder Press",
    description: "You can Do It!",
    time: "      ",
    icon: "💪",
    color: "#FF3D71",
  },
  {
    name: "Squats",
    description: "Grow them Quads!!",
    time: "      ",
    icon: "💪",
    color: "#FF3D71",
  },
]).flat();

export default function AnimatedListDemo({ className = "" }) {
  return (
    <div className={`relative flex h-[200px] w-fit  flex-col overflow-hidden bg-transparent rounded-lg  md:shadow-xl ${className}`}>
      <AnimatedList>
        {notifications.map((item, idx) => (
          <Notification {...item} key={idx} />
        ))}
      </AnimatedList>
    </div>
  );
}