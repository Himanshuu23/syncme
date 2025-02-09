"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaMicrophone } from "react-icons/fa";
import { MdClose } from "react-icons/md";
import { BsPauseFill, BsChatLeftText } from "react-icons/bs";
import Meyda from "meyda";

export default function VoiceInterface() {
  const [isRecording, setIsRecording] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [audioData, setAudioData] = useState(new Array(20).fill(0));
  const mediaRecorderRef = useRef(null);
  const audioContextRef = useRef(null);
  const analyzerRef = useRef(null);
  const audioChunksRef = useRef([]);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];

      // Set up audio analysis
      audioContextRef.current = new AudioContext();
      const source = audioContextRef.current.createMediaStreamSource(stream);

      analyzerRef.current = Meyda.createMeydaAnalyzer({
        audioContext: audioContextRef.current,
        source: source,
        bufferSize: 1024,
        featureExtractors: ["rms"],
        callback: (features) => {
          if (features && features.rms) {
            setAudioData((prev) => {
              const newData = [...prev.slice(1), features.rms * 1000];
              return newData;
            });
          }
        },
      });

      mediaRecorder.ondataavailable = (event) => {
        audioChunksRef.current.push(event.data);
      };

      mediaRecorder.onstop = async () => {
        const audioBlob = new Blob(audioChunksRef.current, {
          type: "audio/wav",
        });
        transcribeAudio(audioBlob);
      };

      analyzerRef.current.start();
      mediaRecorder.start();
      setIsRecording(true);
      setIsPaused(false);
    } catch (error) {
      console.error("Error starting recording:", error);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
      analyzerRef.current?.stop();
      setIsRecording(false);
      setIsPaused(false);
    }
  };

  const togglePause = () => {
    if (mediaRecorderRef.current) {
      if (isPaused) {
        mediaRecorderRef.current.resume();
      } else {
        mediaRecorderRef.current.pause();
      }
      setIsPaused(!isPaused);
    }
  };

  const transcribeAudio = async (audioBlob) => {
    const formData = new FormData();
    formData.append("file", audioBlob);
    formData.append("model", "whisper-1");

    try {
      const response = await fetch(
        "https://api.openai.com/v1/audio/transcriptions",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_OPENAI_API_KEY}`,
          },
          body: formData,
        }
      );

      const data = await response.json();
      setTranscript(data.text);
    } catch (error) {
      console.error("Error transcribing audio:", error);
    }
  };

  return (
    <>
      <div className="text-white">
      Hi, I am your AI assistant, IRIS 
      Press the mic button to start chatting
      </div>
      <div className="min-h-screen mt-7 mx-auto flex flex-col items-center justify-center p-4">
        {/* Main Circle with Voice Visualization */}
        <motion.div
          className="relative w-64 h-64 rounded-full mb-8"
          style={{
            background:
              "radial-gradient(circle, rgba(88,91,246,0.5) 0%, rgba(52,54,163,0.2) 100%)",
          }}
        >
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative w-48 h-48">
              {/* Voice Visualization Waves */}
              <div className="absolute inset-0 flex items-center justify-center">
                {audioData.map((value, index) => {
                  const waveHeight =
                    Math.sin(index + (isRecording ? Date.now() / 100 : 0)) *
                    800; // Adjust the multiplier for wave effect
                  return (
                    <motion.div
                      key={index}
                      className="w-0.5 mx-0.5 bg-blue-400"
                      animate={{
                        height: isRecording
                          ? Math.min(value * 100 + waveHeight, 50)
                          : 4,
                        opacity: isRecording ? 0.6 : 0.2,
                      }}
                      transition={{
                        type: "spring",
                        stiffness: 300,
                        damping: 20,
                      }}
                      style={{
                        background:
                          "linear-gradient(180deg, #8B5CF6 0%, #3B82F6 100%)",
                      }}
                    />
                  );
                })}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Control Buttons */}
        <div className="flex items-center gap-8">
          {/* Chat Button */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="w-12 h-12 rounded-full bg-purple-600 flex items-center justify-center text-white"
            onClick={togglePause}
          >
            <BsChatLeftText size={20} />
          </motion.button>

          {/* Mic Button */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className={`w-16 h-16 rounded-full flex items-center justify-center text-white
            ${isRecording ? "bg-red-500" : "bg-blue-500"}`}
            onClick={isRecording ? stopRecording : startRecording}
          >
            <FaMicrophone size={24} />
          </motion.button>

          {/* Close Button */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="w-12 h-12 rounded-full bg-pink-600 flex items-center justify-center text-white"
            onClick={stopRecording}
          >
            <MdClose size={24} />
          </motion.button>
        </div>

        {/* Transcript Display */}
        <AnimatePresence>
          {transcript && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="mt-8 p-4 rounded-lg bg-opacity-20 bg-white backdrop-blur-lg text-white max-w-md"
            >
              <p className="text-lg">{transcript}</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}
