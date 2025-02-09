"use client"
import Flex from "../components/Flex";
import Metric from "../components/Metric";
import { Activity, Flame, FootprintsIcon } from 'lucide-react';
import Graph from "../components/Graph"
import FoodTrackingList from "../components/FoodTrackingList";
import Schedule from "../components/Schedule";
import Goals from "../components/Goals";
import { useState } from 'react';

export default function Home() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <>
      <div className=" z-10 w-full grid grid-cols-3 pt-[5%]">
        <div className="col-span-2  h-[100vh] flex flex-col justify-between">
          <div className=" grid mt-2 md:mt-6 xl:mt-2 lg:mt-10 grid-cols-3 grid-row-4 flex-grow">
            <div className="col-span-3  scale-90 row-span-1 p-5 ">
              <Flex />
            </div>
            <div className="col-span-3 scale-90 grid grid-cols-1 md:grid-cols-3 gap-4 p-4  bg-transparent">
              <Metric
                icon={Activity}
                title="Workout"
                value="4 hrs"
                color="bg-cyan-500"
              />
              <Metric
                icon={Flame}
                title="Calories"
                value="1800 kcl"
                color="bg-orange-500"
              />
              <Metric
                icon={FootprintsIcon}
                title="Steps"
                value="2200 steps"
                color="bg-purple-500"
              />
            </div>
            <div className="col-span-3 row-span-1 flex items-center scale-90 justify-center">
              <Graph />
            </div>
            <div className="col-span-3 ">
              <FoodTrackingList/>
            </div>
          </div>
        </div>
        <div className={`col-span-1 mr-3 xl:mt-8 md:mt-14 mt-[60px] ${isSidebarOpen ? 'xl:mt-7':'xl:mt-15'}`}>
          <Schedule/>
          <div className="mt-5">
            <Goals/>
          </div>
          <div className="mt-5  mr-2 ">
            {/* <Membership/> */}
          </div>
        </div>
      </div>

    </>



  );
}
