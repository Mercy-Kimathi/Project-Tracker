"use client";

import { Command, Menu, X } from "lucide-react";
import { useState } from "react";

function Nav() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <nav className="flex items-center justify-between bg-[#08090b] px-6 py-4 text-white">
        <div className="flex items-center gap-2">
          <Command size={24} />
          <span className="text-xl font-bold">Linear</span>
        </div>

        <div className="hidden items-center gap-6 md:flex">
          <a href="#">Features</a>
          <a href="#">Resources</a>
          <a href="#">Pricing</a>
          <a href="#">About</a>
        </div>

        <div className="hidden items-center justify-center gap-4 md:flex">
          <button className="rounded-lg bg-white px-5 py-1 text-black hover:bg-gray-300">
            Log in
          </button>
          <button className="rounded-lg bg-white px-5 py-1 text-black hover:bg-gray-300">
            Get Started
          </button>
        </div>
        <button onClick={()=>setIsOpen(!isOpen)}
        className="md:hidden">
            {isOpen? <X size={24}/>:<Menu size={24} />}
        </button>
      </nav>

      {isOpen && (
        <div className="flex flex-col md:hidden gap-4 bg-[#08090b] text-white px-4 py-5">
          <a href="#">Features</a>
          <a href="#">Resources</a>
          <a href="#">Pricing</a>
          <a href="#">About</a>
          <div className="flex gap-4">
            <button className="rounded-lg bg-white px-5 py-1 text-black hover:bg-gray-300">
              Log in
            </button>
            <button className="rounded-lg bg-white px-5 py-1 text-black hover:bg-gray-300">
              Get Started
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default Nav;