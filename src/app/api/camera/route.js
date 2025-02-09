import { Server } from "socket.io";

let io; // Store socket instance to prevent multiple instances

export async function POST(req) {
  try {
    if (!io) {
      io = new Server(6001, { cors: { origin: "*" } });
      console.log("🔥 Socket.IO server started on port 6001");
    }

    const body = await req.json();
    console.log("✅ Flask Response Received in Next.js API:", JSON.stringify(body, null, 2));

    io.emit("log_response", body);

    return new Response(JSON.stringify({ message: "Response logged and broadcasted!" }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Invalid request" }), { status: 400 });
  }
}