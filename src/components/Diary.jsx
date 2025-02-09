"use client";

import { useEffect, useState } from "react";

export default function Diary() {
    const [schedule, setSchedule] = useState("");
    const [todos, setTodos] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const generateTodos = async () => {
        if (loading) return;
        setLoading(true);
        setError("");

        try {
            console.log("DeepSeek API Key:", process.env.NEXT_PUBLIC_DEEPSEEK_API_KEY);

            const response = await fetch("https://api.openai.com/v1/chat/completions", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                  "Authorization": `Bearer ${process.env.NEXT_PUBLIC_OPENAI_API_KEY}`, // Make sure this is set
                },
                body: JSON.stringify({
                  model: "gpt-4",
                  messages: [{ role: "user", content: "Hello!" }],
                }),
              });

            if (response.status === 429) throw new Error("Too many requests. Try again later.");
            if (!response.ok) throw new Error("Failed to fetch data.");

            const data = await response.json();
            setTodos(data.choices?.[0]?.message?.content || "No todos generated.");
        } catch (err) {
            setError(err.message);
            setTodos("");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        console.log(todos);
    }, [todos]);

    return (
        <div className="flex px-10 py-48 space-x-6 z-[9999] w-full max-w-6xl mx-auto">
            <div className="w-1/2 space-y-4">
                <textarea
                    value={schedule}
                    onChange={(e) => setSchedule(e.target.value)}
                    placeholder="Enter your schedule"
                    className="w-full h-40 p-4 text-lg border rounded"
                />
                <button
                    onClick={generateTodos}
                    className="w-full px-6 py-3 bg-blue-600 text-white text-lg rounded disabled:opacity-50"
                    disabled={loading}
                >
                    {loading ? "Generating..." : "Generate Todos"}
                </button>
                {error && <p className="text-red-500 text-lg">{error}</p>}
            </div>
            <div className="w-1/2">
                <pre className="w-full h-60 p-4 bg-gray-800 text-white text-lg rounded whitespace-pre-wrap overflow-auto">{todos}</pre>
            </div>
        </div>
    );
}