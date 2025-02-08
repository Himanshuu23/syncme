"use client";

import { useRef, useEffect } from "react";

export default function CameraComponent() {
  const videoRef = useRef(null);
  const showBtnRef = useRef(null);

  // Function to show the camera
  const showCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (error) {
      console.error("There is an error accessing the camera:", error);
      alert("Unable to access the camera. Please grant permission.");
    }
  };

  // Attach event listener on component mount
  useEffect(() => {
    const showBtn = showBtnRef.current;
    if (showBtn) {
      showBtn.addEventListener("click", showCamera);
    }
    return () => {
      if (showBtn) {
        showBtn.removeEventListener("click", showCamera);
      }
    };
  }, []);

  return (
    <div style={{ textAlign: "center", color: "white" }}>
      <h1>Camera Access Component</h1>
      <video
        ref={videoRef}
        style={{
          width: "100%",
          maxWidth: "500px",
          backgroundColor: "black",
          transform: "scaleX(-1)",
        }}
        autoPlay
        playsInline
        muted
      />
      <button ref={showBtnRef} style={{ marginTop: "20px", padding: "10px", zIndex: 1 }}>
        Show Camera
      </button>
    </div>
  );
}
