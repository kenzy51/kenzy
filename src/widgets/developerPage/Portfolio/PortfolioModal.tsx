"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import ButtonLink from "@/shared/ui/buttons/buttonLink";
import BulletList from "@/shared/ui/components/BulletList";
import { CardType } from "./constants";

interface PortfolioModalProps {
  card: CardType;
  onClose: () => void;
}

export const PortfolioModal = ({ card, onClose }: PortfolioModalProps) => {
  const [activeTab, setActiveTab] = useState<"problem" | "solution" | "outcome">("problem");

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  const RenderedContent = () => {
    switch (activeTab) {
      case "problem":
        return <div className="text-sm md:text-base text-neutral-300 whitespace-pre-line leading-relaxed font-light">{card.problem}</div>;
      case "solution":
        return <div className="text-sm md:text-base text-neutral-300 whitespace-pre-line leading-relaxed font-light">{card.solution}</div>;
      case "outcome":
        return <BulletList text={card.outcome || ""} />;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/90 backdrop-blur-md p-0 sm:p-6"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <motion.div
        initial={{ scale: 0.97, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.97, y: 20 }}
        transition={{ type: "spring", damping: 32, stiffness: 500 }}
        className="relative w-full sm:max-w-4xl bg-neutral-950 border-t sm:border border-neutral-900 sm:rounded-3xl shadow-[0_0_80px_rgba(0,0,0,0.95)] p-6 md:p-10 text-white max-h-[85vh] sm:max-h-[80vh] flex flex-col overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Subtle Cyber Decor Bar */}
        <div className="w-12 h-1 bg-neutral-800 rounded-full mx-auto mb-4 sm:hidden shrink-0" />

        {/* Header Block Section */}
        <div className="flex justify-between items-start mb-6 pr-8 relative">
          <div className="space-y-1">
            <span className="text-[10px] font-mono text-cyan-400 tracking-widest uppercase">System Architecture</span>
            <h2 className="text-xl md:text-3xl font-extrabold tracking-tight text-white">{card.title}</h2>
          </div>
          <button
            type="button"
            className="absolute -top-2 -right-2 text-neutral-500 hover:text-white bg-neutral-900/50 hover:bg-neutral-900 border border-neutral-800/50 rounded-xl p-2.5 transition-all duration-200 cursor-pointer z-40"
            onClick={(e) => {
              e.stopPropagation();
              onClose();
            }}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Tab Selection Row Bar */}
        <div className="flex border-b border-neutral-900 mb-6 overflow-x-auto gap-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden shrink-0">
          {["problem", "solution", "outcome"].map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setActiveTab(tab as any);
              }}
              className={`px-4 py-3 text-sm md:text-base font-semibold tracking-wide whitespace-nowrap transition-all relative cursor-pointer z-20 ${
                activeTab === tab ? "text-cyan-400" : "text-neutral-500 hover:text-neutral-300"
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
              {activeTab === tab && (
                <motion.div 
                  layoutId="modalTabUnderline" 
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-cyan-500 shadow-[0_2px_10px_rgba(6,182,212,0.4)]" 
                />
              )}
            </button>
          ))}
        </div>

        {/* Scrollable Context Body Viewport */}
        <div className="overflow-y-auto flex-1 pr-2 border-b border-neutral-900/80 pb-6 [scrollbar-width:thin] [scrollbar-color:#262626_transparent] text-neutral-300">
          <div className="prose prose-invert max-w-none">
            <RenderedContent />
          </div>
        </div>

        {/* Modernized Sticky Footer Panel */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-5 pt-6 bg-neutral-950 mt-auto shrink-0">
          
          {/* Re-styled Badges with dynamic dark-minimal design */}
          {card?.technologies && (
            <div className="flex flex-wrap gap-2.5 self-start sm:self-center">
              {card.technologies.map((tech, index) => (
                <div key={index} className="w-8 h-8 sm:w-9 sm:h-9 p-1.5 rounded-xl bg-neutral-900/80 border border-neutral-800/80 flex items-center justify-center shrink-0 shadow-inner">
                  <Image src={tech} alt="stack metric icon" className="object-contain w-full h-full brightness-95" />
                </div>
              ))}
            </div>
          )}

          {/* Premium Cyber-Vibe Action Trigger Button Link styling setup */}
          {card?.link && (
            <div className="w-full sm:w-auto shrink-0 transition-all duration-300 
              [&_a]:w-full sm:[&_a]:w-auto [&_a]:inline-flex [&_a]:items-center [&_a]:justify-center [&_a]:gap-2 [&_a]:px-6 [&_a]:py-3 [&_a]:rounded-xl 
              [&_a]:bg-cyan-950/40 [&_a]:text-cyan-400 [&_a]:font-bold [&_a]:tracking-wide [&_a]:text-sm [&_a]:border [&_a]:border-cyan-900/60
              [&_a]:shadow-[0_4px_20px_rgba(6,182,212,0.15)] [&_a]:transition-all [&_a]:duration-300
              
              hover:[&_a]:bg-white! hover:[&_a]:text-black! hover:[&_a]:border-white! 
              hover:[&_a]:shadow-[0_0_30px_rgba(255,255,255,0.3)] hover:[&_a]:scale-[1.02]"
            >
              <ButtonLink link={card.link} />
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
};