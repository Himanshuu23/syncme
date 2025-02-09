"use client";

import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";
import CameraComponent from "@/components/CameraComponent";
import { Activity, Flame, FootprintsIcon, BicepsFlexed } from "lucide-react";
import Fitness_stats from "@/components/Fitness_stats";
import AnimatedListDemo from "@/components/AnimatedListDemo";

const socket = io("http://localhost:6001");

const Page = () => {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    socket.on("log_response", (data) => {
      setLogs((prevLogs) => [data, ...prevLogs]);
    });

    return () => socket.off("log_response");
  }, []);

  return (
    <>
      <div className="flex mt-24 w-full justify-center flex-col">
        <div className="flex justify-center">
          <CameraComponent />
        </div>

        <div className="flex justify-center ml-3 w-full">
          <div className="col-span-3 -ml-9 scale-90 grid grid-cols-2 gap-4 p-4 bg-transparent">
            <Fitness_stats
              icon={Activity}
              title="Workout"
              value="4 hrs"
              color="bg-cyan-500"
            />
            <Fitness_stats
              icon={Flame}
              title="Calories"
              value="1800 kcl"
              color="bg-orange-500"
            />
            <Fitness_stats
              icon={FootprintsIcon}
              title="Steps"
              value="2200 steps"
              color="bg-purple-500"
            />
            <Fitness_stats
              icon={BicepsFlexed}
              title="Reps"
              value="2200 steps"
              color="bg-red-500"
            />
          </div>
          <div className="mt-6">
            <AnimatedListDemo />
          </div>
        </div>

        {/* Real-time logs display */}
        <div className="p-4 mt-6 bg-gray-100 rounded-lg shadow-md w-3/4 mx-auto">
          <h1 className="text-xl font-bold mb-4 text-center">
            Real-time Flask Responses
          </h1>
          <div className="space-y-2 max-h-80 overflow-y-auto">
            {logs.map((log, index) => (
              <div key={index} className="p-2 border rounded bg-white shadow-sm">
                <pre className="text-sm">{JSON.stringify(log, null, 2)}</pre>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Page;
