"use client"
import "./globals.css";

import { useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

export default function RootLayout({ children }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <html lang="en">
      <body>
        <div className="relative min-h-screen bg-slate-950 overflow-hidden">
          <div className="z-0 absolute bottom-0 left-[-10%] right-0 top-[-10%] size-[500px] rounded-full bg-[radial-gradient(circle_farthest-side,rgba(255,0,182,.15),rgba(255,255,255,0))]" />
          <div className="z-0 absolute bottom-0 right-[-10%] top-[-10%] size-[500px] rounded-full bg-[radial-gradient(circle_farthest-side,rgba(255,0,182,.15),rgba(255,255,255,0))]" />
          <Navbar isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />
          <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
          <main
            className={`
        pt-16
        ${isSidebarOpen ? "lg:ml-60" : "ml-0"}
        transition-all duration-300 ease-in-out
      `}
          ></main>

          {children}
        </div>
      </body>
    </html>
  );
}
