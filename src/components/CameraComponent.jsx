"use client"
import React, { useRef, useEffect, useState } from 'react';
import { Camera, CameraOff } from 'lucide-react';

export default function CameraComponent() {
  const videoRef = useRef(null);
  const [isCameraOn, setIsCameraOn] = useState(false);
  const [stream, setStream] = useState(null);

  // Function to handle camera toggle
  const toggleCamera = async () => {
    try {
      if (!isCameraOn) {
        const newStream = await navigator.mediaDevices.getUserMedia({ video: true });
        if (videoRef.current) {
          videoRef.current.srcObject = newStream;
          setStream(newStream);
          setIsCameraOn(true);
        }
      } else {
        if (stream) {
          stream.getTracks().forEach(track => track.stop());
          if (videoRef.current) {
            videoRef.current.srcObject = null;
          }
          setStream(null);
        }
        setIsCameraOn(false);
      }
    } catch (error) {
      console.error("Camera access error:", error);
      alert("Unable to access the camera. Please grant permission.");
    }
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, [stream]);

  return (
    
      <div className="relative w-full max-w-2xl mx-auto">
        {/* Video Container */}
        <div className="relative aspect-video  w-[800px] rounded-lg overflow-hidden bg-gray-800 shadow-lg">
          <video
            ref={videoRef}
            className={`w-full h-full object-cover transform scale-x-[-1] transition-opacity duration-300 ${
              isCameraOn ? 'opacity-100' : 'opacity-0'
            }`}
            autoPlay
            playsInline
            muted
          />
          
          {/* Camera Off Placeholder */}
          {!isCameraOn && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-gray-400 mb-5 text-lg">Camera is off</div>
            </div>
          )}

          {/* Controls Bar */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
            <div className="flex items-center justify-center space-x-4">
              <button
                onClick={toggleCamera}
                className={`p-4 rounded-full  transition-all duration-300 transform hover:scale-110 active:scale-95 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 ${
                  isCameraOn 
                    ? 'bg-gray-100 hover:bg-gray-200 text-gray-900' 
                    : 'bg-red-500 hover:bg-red-600 text-white'
                }`}
              >
                {isCameraOn ? (
                  <Camera className="w-6 h-6" />
                ) : (
                  <CameraOff className="w-6 h-6" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Status Text */}
        {/* <div className="mt-4 text-center">
          <p className="text-gray-400 text-sm">
            {isCameraOn ? 'Camera is active' : 'Camera is disabled'}
          </p>
        </div> */}
      </div>

  );
}