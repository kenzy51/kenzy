"use client";

import useMediaQuery from "@/shared/hooks/useMediaQuery";
import Image from "next/image";
import { CardType } from "./constants";

interface CardProps {
  card: CardType;
  onSelect: () => void;
}

export const Card = ({ card, onSelect }: CardProps) => {
  const isMobile = useMediaQuery("exsm");

  const containerStyles = isMobile
    ? "group h-[360px] w-full overflow-hidden bg-neutral-950 rounded-[24px] relative border border-neutral-900 shadow-2xl transition-all duration-500 ease-out cursor-pointer"
    : "group h-[650px] w-full max-w-[650px] overflow-hidden bg-neutral-950 rounded-[32px] relative border border-neutral-900 hover:border-cyan-500/30 mx-auto shadow-[0_10px_50px_rgba(0,0,0,0.7)] transition-all duration-500 ease-out cursor-pointer";

  const titleTextStyles = isMobile
    ? "bg-neutral-900/70 backdrop-blur-md border border-neutral-800/60 p-5 rounded-xl text-lg font-bold tracking-tight text-white text-center max-w-[90%] shadow-lg"
    : "bg-neutral-900/40 backdrop-blur-xl border border-neutral-800/40 p-8 rounded-2xl text-3xl font-extrabold tracking-tight text-white text-center max-w-[85%] shadow-2xl transition-transform duration-500 group-hover:scale-95";

  return (
    <div className={containerStyles} onClick={onSelect}>
      {/* Visual Tech Grid Mesh Accent overlay layer */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:32px_32px] z-10 pointer-events-none" />

      {/* Background Image Layer */}
      <div
        style={{
          backgroundImage: `url(${card.url})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
        className="absolute inset-0 z-0 transition-transform duration-700 ease-out group-hover:scale-105 opacity-50 group-hover:opacity-15"
      />

      {/* Default Face View State — Absolute Centered Text */}
      <div className="absolute inset-0 z-20 flex items-center justify-center p-4 transition-all duration-500 group-hover:opacity-0 group-hover:scale-95 pointer-events-none">
        <p className={titleTextStyles}>{card.title}</p>
      </div>

      {/* Hover Panel Container — Explicitly Box-Centered Content Layout */}
      <div className="absolute inset-0 z-30 flex flex-col justify-center items-center p-6 md:p-10 bg-neutral-950/90 opacity-0 group-hover:opacity-100 transition-all duration-400 ease-out backdrop-blur-sm">
        
        {/* Centered Typography Context Block */}
        <div className="text-center max-w-[440px] mb-8 space-y-3">
          <span className="text-[10px] font-mono tracking-widest text-cyan-400 uppercase bg-cyan-950/40 border border-cyan-900/60 px-2.5 py-1 rounded-md inline-block">
            Production Build // 0{card.id || 1}
          </span>
          <h4 className="text-xl md:text-2xl font-bold text-white tracking-tight pt-1">
            {card.title}
          </h4>
          <p className="text-neutral-400 text-sm md:text-base font-light leading-relaxed">
            {card.description}
          </p>
        </div>

        {/* Dynamic technology stack badges (No white backgrounds) */}
        {card?.technologies && (
          <div className="flex gap-2.5 flex-wrap justify-center items-center max-w-[340px] mb-8">
            {card.technologies.map((image: any, index: number) => (
              <div 
                key={index} 
                className="p-2 bg-neutral-900 border border-neutral-800 rounded-xl w-9 h-9 max-[440px]:w-8 max-[440px]:h-8 flex items-center justify-center shadow-md transition-colors hover:border-neutral-700"
              >
                <Image
                  src={image}
                  className="object-contain w-full h-full brightness-95 contrast-125"
                  alt="tech tag"
                />
              </div>
            ))}
          </div>
        )}

        {/* Tech Styled Navigation Trigger Button */}
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            onSelect();
          }}
          className="group/btn relative inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-cyan-600 to-cyan-500 hover:from-cyan-500 hover:to-cyan-400 text-black text-sm font-semibold transition-all duration-300 shadow-[0_0_25px_rgba(6,182,212,0.2)] hover:shadow-[0_0_35px_rgba(6,182,212,0.45)] hover:scale-[1.03] w-full sm:w-auto cursor-pointer"
        >
          <span>See Blueprint</span>
          <svg 
            className="w-4 h-4 transform transition-transform duration-300 group-hover/btn:translate-x-1" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2.5" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
          </svg>
          
          <div className="absolute inset-0 rounded-xl bg-white/20 opacity-0 group-hover/btn:opacity-100 transition-opacity" />
        </button>
      </div>
    </div>
  );
};