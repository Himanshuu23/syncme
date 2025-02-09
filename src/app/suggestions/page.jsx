"use client";

import { useEffect, useState } from "react";
import { io } from "socket.io-client";

const socket = io("http://localhost:6001");

export default function RealtimePage() {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    socket.on("log_response", (data) => {
      setLogs((prevLogs) => [data, ...prevLogs]);
    });

    return () => socket.off("log_response");
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Real-time Flask Responses</h1>
      <div className="space-y-2">
        {logs.map((log, index) => (
          <div key={index} className="p-2 border rounded bg-gray-100">
            <pre className="text-sm">{JSON.stringify(log, null, 2)}</pre>
          </div>
        ))}
      </div>
    </div>
  );
}
