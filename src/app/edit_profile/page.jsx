import React from 'react'
import EditProfile from '@/components/EditProfile'
import Pass from '@/components/Pass'
const page = () => {
    return (
        <>
            <div className="scale-110 flex flex-col m-auto ">
                <div className="mt-28">
                    <EditProfile />
                </div>
                <div className="-mt-40">
                    <Pass />
                </div>
            </div>

        </>
    )
}

export default page