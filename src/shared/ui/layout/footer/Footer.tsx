import React from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/router";
import { useInView } from "react-intersection-observer";
import Image from "next/image";
import Link from "next/link";
import { Link as ScrollLink } from "react-scroll";
import { Github, Linkedin, Instagram, Youtube, Music } from "lucide-react";
import git from "../../../../../public/images/githubW.svg";
import linkedin from "../../../../../public/images/socIcons/linkedin.webp";

const smallBlocksData = [
  {
    header: "Works",
    description: "Curated selection showcasing expertise.",
    link: "portfolio",
  },
  {
    header: "Skills",
    description: "Website building, design, and more.",
    link: "skills",
  },
  {
    header: "Experience",
    description: "Qualification and professional history.",
    link: "experience",
  },
];

const resume =
  "https://drive.google.com/file/d/1LUudYEypSjBSYhlfYSOqhyA6GRTmhv_n/view?usp=sharing";
// Замени эту ссылку на прямую ссылку на свой трек/профиль, которую ты копировал в Spotify
const spotifyArtistLink =
  "https://open.spotify.com/artist/5ImzIdakvtROU8R206Jjqj";

const Footer = () => {
  const router = useRouter();
  const isLifestyle = router.pathname.includes("/lifestyle");
  const [ref, inView] = useInView({ triggerOnce: true });

  // 1. Editorial Footer (Lifestyle)
  if (isLifestyle) {
    return (
      <footer className="bg-[#FAF7F2] border-t border-[#EFEBE3] py-24">
        <div className="max-w-5xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 text-[#5A564E]">
          <div className="col-span-1 lg:col-span-2">
            <h2 className="text-[12px] font-bold uppercase tracking-[0.2em] text-[#1C1A17] mb-4">
              Kanat Nazarov
            </h2>
            <p className="text-[12px] leading-relaxed opacity-60 uppercase tracking-[0.15em] max-w-sm mb-4">
              Exploring the synthesis of peak human performance, creative
              design, and nutritional mastery. Documenting the journey toward a
              more optimized, intentional life.
            </p>
            <p className="text-[11px] uppercase tracking-[0.15em] text-[#1C1A17] font-semibold opacity-80">
              Latest Release:{" "}
              <span className="italic">"Synth City Chronicles"</span> now
              available on Spotify.
            </p>
          </div>
          <div className="flex flex-col gap-4">
            <h2 className="text-[12px] font-bold uppercase tracking-[0.25em] text-[#1C1A17]">
              Navigation
            </h2>
            <nav className="flex flex-col gap-3 text-[12px] uppercase tracking-[0.25em] opacity-80">
              <Link href="/" className="hover:text-[#3B533E] transition-colors">
                Home
              </Link>
              <Link
                href="/lifestyle"
                className="hover:text-[#3B533E] transition-colors"
              >
                Journal
              </Link>
            </nav>
          </div>
          <div className="flex flex-col gap-4">
            <h2 className="text-[12px] font-bold uppercase tracking-[0.25em] text-[#1C1A17]">
              Connect
            </h2>
            <div className="flex flex-col gap-2 text-[12px] uppercase tracking-[0.15em]">
              <a
                href="mailto:kanatnazarov.dev@gmail.com"
                className="hover:text-[#3B533E] transition-colors"
              >
                <span className="opacity-60 text-[10px] block">
                  Engineering:
                </span>{" "}
                kanatnazarov.dev@gmail.com
              </a>
              <a
                href="mailto:nazarovkanat7@gmail.com"
                className="hover:text-[#3B533E] transition-colors"
              >
                <span className="opacity-60 text-[10px] block">
                  Creative & Music:
                </span>{" "}
                nazarovkanat7@gmail.com
              </a>
            </div>
            <div className="grid grid-cols-2 gap-y-3 gap-x-4 mt-2">
              <a
                href="https://github.com/kenzy51"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 text-[9px] uppercase tracking-[0.2em] hover:text-[#3B533E] transition-colors"
              >
                <Github size={12} /> Github
              </a>
              <a
                href="https://www.linkedin.com/in/kanatnazarov"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 text-[9px] uppercase tracking-[0.2em] hover:text-[#3B533E] transition-colors"
              >
                <Linkedin size={12} /> LinkedIn
              </a>
              <a
                href="https://instagram.com/exxnpc"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 text-[9px] uppercase tracking-[0.2em] hover:text-[#3B533E] transition-colors"
              >
                <Instagram size={12} /> Instagram
              </a>
              <a
                href="https://youtube.com/@isnotnpc"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 text-[9px] uppercase tracking-[0.2em] hover:text-[#3B533E] transition-colors"
              >
                <Youtube size={12} /> YouTube
              </a>
              <a
                href={spotifyArtistLink}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 text-[9px] uppercase tracking-[0.2em] hover:text-[#3B533E] transition-colors"
              >
                <Music size={12} /> Spotify
              </a>
            </div>
          </div>
        </div>
        <div className="max-w-5xl mx-auto px-6 mt-20 pt-8 border-t border-[#EFEBE3] text-center text-[8px] uppercase tracking-[0.4em] text-[#9A958C]">
          © 2026 Kanat Nazarov. All rights reserved.
        </div>
      </footer>
    );
  }

  // 2. Developer Footer (Portfolio)
  return (
    <footer
      className="py-20 px-4 md:px-10 border-t border-[rgba(255,255,255,0.1)]"
      ref={ref}
      id="contact"
    >
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-12 lg:gap-20">
        <div className="flex-1 flex flex-col items-center lg:items-start text-center lg:text-left gap-6">
          <div className="flex flex-col gap-2">
            <motion.h3
              className="text-[clamp(34px,4.5vw,60px)] font-light text-white leading-tight"
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
            >
              Let's Connect.
            </motion.h3>
            <p className="text-[#68727d] text-[14px] uppercase tracking-wider mt-2">
              Latest Track:{" "}
              <span className="text-white italic">"Synth City Chronicles"</span>{" "}
              available on Spotify
            </p>
          </div>

          {/* Разделенные Имейлы */}
          <div className="flex flex-col gap-3 mt-2">
            <div className="flex flex-col lg:items-start items-center">
              <span className="text-[11px] text-[#68727d] uppercase tracking-widest block mb-1">
                Engineering & Business
              </span>
              <a
                href="mailto:kanatnazarov.dev@gmail.com"
                className="text-[clamp(16px,1.8vw,19px)] text-white hover:text-[#68727d] transition-colors"
              >
                kanatnazarov.dev@gmail.com
              </a>
            </div>
            <div className="flex flex-col lg:items-start items-center">
              <span className="text-[11px] text-[#68727d] uppercase tracking-widest block mb-1">
                Creative & Music Inquiries
              </span>
              <a
                href="mailto:nazarovkanat7@gmail.com"
                className="text-[clamp(16px,1.8vw,19px)] text-white hover:text-[#68727d] transition-colors"
              >
                nazarovkanat7@gmail.com
              </a>
            </div>
          </div>

          <div className="flex gap-5 mt-4 items-center">
            <a
              href="https://github.com/kenzy51"
              target="_blank"
              rel="noreferrer"
              className="hover:opacity-80 transition-opacity"
            >
              <Image alt="GitHub" src={git} width={26} />
            </a>
            <a
              href="https://www.linkedin.com/in/kanatnazarov"
              target="_blank"
              rel="noreferrer"
              className="hover:opacity-80 transition-opacity"
            >
              <Image alt="LinkedIn" src={linkedin} width={26} />
            </a>
            <a
              href={spotifyArtistLink}
              target="_blank"
              rel="noreferrer"
              className="text-[#68727d] hover:text-white transition-colors flex items-center gap-1.5 text-[14px] uppercase tracking-wider"
            >
              <Music size={18} /> Spotify
            </a>
            <a
              href="https://instagram.com/exxnpc"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 text-[9px] uppercase tracking-[0.2em] hover:text-[#3B533E] transition-colors"
            >
              <Instagram size={12} /> 
            </a>
          </div>
          <div className="text-[#68727d] text-[clamp(13px,1.3vw,15px)] mt-4">
            <p>Designed and Developed by Kanat Nazarov</p>
            <p>Powered by NextJs 14</p>
          </div>
        </div>
        <div className="flex flex-wrap justify-center lg:justify-end gap-5 lg:w-1/2">
          {smallBlocksData.map((block, index) => (
            <motion.div
              key={index}
              className="max-w-[350px] flex flex-col gap-3 text-center lg:text-left cursor-pointer"
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
            >
              <ScrollLink to={block.link} smooth={true} duration={800}>
                <h5 className="text-[clamp(18px,2vw,20px)] text-white hover:underline">
                  {block.header}
                </h5>
              </ScrollLink>
              <p className="text-[clamp(15px,1.6vw,17px)] text-[#68727d] leading-relaxed">
                {block.description}
              </p>
            </motion.div>
          ))}
          <div className="max-w-[350px] flex flex-col gap-3 text-center lg:text-left">
            <a href={resume} target="_blank" rel="noreferrer">
              <h5 className="text-[clamp(18px,2vw,20px)] text-white hover:underline">
                Resume
              </h5>
            </a>
            <p className="text-[clamp(15px,1.6vw,17px)] text-[#68727d] leading-relaxed">
              You can check my CV to learn me better.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
