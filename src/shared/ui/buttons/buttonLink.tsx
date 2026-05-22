"use client";

import React, { useState } from "react";
import Image from "next/image";

// Pass your base arrow asset (diagonal) and your target state asset (right)
import arrowRight from "../../../../public/icon/arrow.svg";

interface ButtonLinkProps {
  link: string;
}

const ButtonLink = ({ link }: ButtonLinkProps) => {
  // Use local state to track hover status exclusively for the asset switch
  const [isHovered, setIsHovered] = useState(false);

  return (
    <a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group/btn inline-flex items-center justify-center gap-2.5 px-6 py-3 rounded-xl bg-cyan-950/30 hover:bg-white text-cyan-400 hover:text-black font-bold tracking-wide text-sm border border-cyan-900/60 hover:border-white shadow-[0_4px_20px_rgba(6,182,212,0.15)] hover:shadow-[0_0_35px_rgba(255,255,255,0.25)] hover:scale-[1.02] transition-all duration-300 ease-out shrink-0 w-full sm:w-auto cursor-pointer"
    >
      <span className="transition-colors duration-300">Visit Platform</span>
      
      {/* Container provides anchoring for the scale animation */}
      <div className="w-5 h-5 relative flex items-center justify-center shrink-0 transition-transform duration-300 ease-out group-hover/btn:scale-125">
        <Image 
          src={arrowRight} 
          alt="dynamic action arrow" 
          className="object-contain w-full h-full transition-all duration-300 ease-in-out invert-[56%] sepia(93%) saturate(1514%) hue-rotate(154deg) brightness(97%) contrast(97%) group-hover/btn:invert-0 group-hover/btn:sepia-0 group-hover/btn:saturate-100 group-hover/btn:hue-rotate-0"
        />
      </div>
    </a>
  );
};

export default ButtonLink;