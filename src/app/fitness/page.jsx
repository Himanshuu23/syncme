"use client"
import React from 'react'
import CameraComponent from '@/components/CameraComponent'
import { Activity, Flame, FootprintsIcon } from 'lucide-react';
import Fitness_stats from '@/components/Fitness_stats'
import AnimatedListDemo from '@/components/AnimatedListDemo';

const page = () => {
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
                            icon={FootprintsIcon}
                            title="Steps"
                            value="2200 steps"
                            color="bg-purple-500"
                        />
                    </div>
                    <div className="mt-6 ">
                        <AnimatedListDemo />
                    </div>
                </div>
            </div>
        </>
    )
}

export default page