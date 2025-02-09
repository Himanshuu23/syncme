"use client";
import { useState, useRef } from "react";
import Meyda from "meyda";

export default function SpeechToText() {
  const [transcript, setTranscript] = useState("");
  const [stressLevel, setStressLevel] = useState("Unknown");
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);

  const startRecording = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    const mediaRecorder = new MediaRecorder(stream);
    mediaRecorderRef.current = mediaRecorder;
    audioChunksRef.current = [];

    mediaRecorder.ondataavailable = (event) => {
      audioChunksRef.current.push(event.data);
    };

    mediaRecorder.onstop = async () => {
      const audioBlob = new Blob(audioChunksRef.current, { type: "audio/wav" });
      processAudio(audioBlob);
    };

    mediaRecorder.start();
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
    }
  };

  const processAudio = async (audioBlob) => {
    const audioUrl = URL.createObjectURL(audioBlob);
    analyzeAudio(audioBlob);
    transcribeAudio(audioBlob);
  };

  const analyzeAudio = async (audioBlob) => {
    const audioUrl = URL.createObjectURL(audioBlob);
    const audio = new Audio(audioUrl);
    const context = new AudioContext();
    const source = context.createMediaElementSource(audio);

    await new Promise((resolve) => {
      audio.oncanplaythrough = resolve;
    });

    const analyzer = Meyda.createMeydaAnalyzer({
      audioContext: context,
      source: source,
      bufferSize: 1024,
      featureExtractors: ["rms", "spectralCentroid"],
      callback: (features) => {
        if (!features) return;

        const stressScore =
          (features.rms || 0) * 50 + (features.pitch || 0) * 20;

        setStressLevel(
          stressScore > 70
            ? "High Stress"
            : stressScore > 40
            ? "Moderate Stress"
            : "Low Stress"
        );
      },
    });

    analyzer.start();
    audio.play();
  };

  const transcribeAudio = async (audioBlob) => {
    const formData = new FormData();
    formData.append("file", audioBlob);
    formData.append("model", "whisper-1");

    const response = await fetch("https://api.openai.com/v1/audio/transcriptions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_OPENAI_API_KEY}`,
      },
      body: formData,
    });

    const data = await response.json();
    setTranscript(data.text);
  };

  return (
    <div className="p-4 py-16 z-[999]">
      <button onClick={startRecording} className="p-2 bg-green-500 text-white">
        Start Recording
      </button>
      <button onClick={stopRecording} className="p-2 bg-red-500 text-white ml-2">
        Stop Recording
      </button>
      <div className="mt-4">
        <p><strong>Stress Level:</strong> {stressLevel}</p>
      </div>
    </div>
  );
}