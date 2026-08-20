import React from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/router";
import { useInView } from "react-intersection-observer";
import Image from "next/image";
import Link from "next/link";
import { Link as ScrollLink } from "react-scroll";
import { Github, Linkedin, Instagram, Youtube, Music, BookOpen } from "lucide-react";
import git from "../../../../../public/images/githubW.svg";
import linkedin from "../../../../../public/images/socIcons/linkedin.webp";

const smallBlocksData = [
  {
    header: "Works",
    description: "Curated selection showcasing engineering expertise.",
    link: "portfolio",
    isScroll: true,
  },
  {
    header: "Blog",
    description: "Deep dives on Next.js, systems, & web performance.",
    link: "/blog",
    isScroll: false,
  },
  {
    header: "Skills",
    description: "Full-stack architecture, design, and frameworks.",
    link: "skills",
    isScroll: true,
  },
  {
    header: "Experience",
    description: "Qualification and professional achievements.",
    link: "experience",
    isScroll: true,
  },
];

const resumeLink =
  "https://drive.google.com/file/d/1LUudYEypSjBSYhlfYSOqhyA6GRTmhv_n/view?usp=sharing";
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
            <p className="text-[12px] leading-relaxed opacity-70 uppercase tracking-[0.15em] max-w-sm mb-4">
              Exploring the synthesis of peak human performance, creative
              design, and nutritional mastery. Documenting the journey toward a
              more optimized, intentional life.
            </p>
            <p className="text-[11px] uppercase tracking-[0.15em] text-[#1C1A17] font-semibold opacity-80">
              Latest Track:{" "}
              <span className="italic">"Synth City Chronicles"</span> on Spotify.
            </p>
          </div>

          <div className="flex flex-col gap-4">
            <h2 className="text-[12px] font-bold uppercase tracking-[0.25em] text-[#1C1A17]">
              Navigation
            </h2>
            <nav className="flex flex-col gap-3 text-[12px] uppercase tracking-[0.25em] opacity-80">
              <Link href="/" className="hover:text-[#3B533E] transition-colors">
                Engineering
              </Link>
              <Link href="/blog" className="hover:text-[#3B533E] transition-colors">
                Blog
              </Link>
              <Link href="/lifestyle" className="hover:text-[#3B533E] transition-colors">
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
                href="mailto:kanat@kanatnazarov.com"
                className="hover:text-[#3B533E] transition-colors font-medium text-[#1C1A17]"
              >
                kanat@kanatnazarov.com
              </a>
            </div>
            <div className="grid grid-cols-2 gap-y-3 gap-x-4 mt-2">
              <a
                href="https://github.com/kanatnazarovdev"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-[9px] uppercase tracking-[0.2em] hover:text-[#3B533E] transition-colors"
              >
                <Github size={12} /> Github
              </a>
              <a
                href="https://www.linkedin.com/in/kanatnazarov"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-[9px] uppercase tracking-[0.2em] hover:text-[#3B533E] transition-colors"
              >
                <Linkedin size={12} /> LinkedIn
              </a>
              <a
                href="https://instagram.com/exxnpc"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-[9px] uppercase tracking-[0.2em] hover:text-[#3B533E] transition-colors"
              >
                <Instagram size={12} /> Instagram
              </a>
              <a
                href={spotifyArtistLink}
                target="_blank"
                rel="noopener noreferrer"
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

  // 2. Developer / Portfolio Footer
  return (
    <footer
      className="py-20 px-4 md:px-10 border-t border-[rgba(255,255,255,0.1)] bg-black"
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
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
              }}
            >
              Let's Connect.
            </motion.h3>
            <p className="text-[#68727d] text-[13px] uppercase tracking-wider mt-1">
              Latest Track:{" "}
              <span className="text-white italic">"Synth City Chronicles"</span>{" "}
              available on Spotify
            </p>
          </div>

          {/* Single Unified Contact Email */}
          <div className="flex flex-col lg:items-start items-center mt-1">
            <span className="text-[11px] text-[#68727d] uppercase tracking-widest block mb-1">
              Engineering & Inquiries
            </span>
            <a
              href="mailto:kanat@kanatnazarov.com"
              className="text-[clamp(18px,2vw,22px)] font-medium text-white hover:text-cyan-400 transition-colors"
            >
              kanat@kanatnazarov.com
            </a>
          </div>

          {/* Social Icons & External Profiles */}
          <div className="flex gap-6 mt-2 items-center">
            <a
              href="https://github.com/kanatnazarovdev"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="hover:opacity-80 transition-opacity"
            >
              <Image alt="GitHub" src={git} width={24} height={24} />
            </a>
            <a
              href="https://www.linkedin.com/in/kanatnazarov"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="hover:opacity-80 transition-opacity"
            >
              <Image alt="LinkedIn" src={linkedin} width={24} height={24} />
            </a>
            <a
              href={spotifyArtistLink}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#68727d] hover:text-white transition-colors flex items-center gap-1.5 text-[13px] uppercase tracking-wider"
            >
              <Music size={16} /> Spotify
            </a>
            <a
              href="https://instagram.com/exxnpc"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="text-[#68727d] hover:text-white transition-colors"
            >
              <Instagram size={18} />
            </a>
          </div>

          <div className="text-[#68727d] text-[13px] mt-2 font-mono">
            <p>Designed and Developed by Kanat Nazarov</p>
            <p className="text-[11px] opacity-70 mt-0.5">Powered by Next.js & Sanity CMS</p>
          </div>
        </div>

        {/* Navigation Grid (Blocks + Blog + Resume) */}
        <div className="flex flex-wrap justify-center lg:justify-end gap-6 lg:w-1/2">
          {smallBlocksData.map((block, index) => (
            <motion.div
              key={index}
              className="w-full sm:w-[45%] max-w-[320px] flex flex-col gap-2 text-center lg:text-left"
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.5, delay: 0.1 * index },
                },
              }}
            >
              {block.isScroll ? (
                <ScrollLink
                  to={block.link}
                  smooth={true}
                  duration={800}
                  className="cursor-pointer group"
                >
                  <h5 className="text-[18px] text-white group-hover:text-cyan-400 transition-colors font-medium">
                    {block.header}
                  </h5>
                </ScrollLink>
              ) : (
                <Link href={block.link} className="group">
                  <h5 className="text-[18px] text-white group-hover:text-cyan-400 transition-colors font-medium flex items-center justify-center lg:justify-start gap-1.5">
                    {block.header} <BookOpen size={14} className="opacity-60" />
                  </h5>
                </Link>
              )}
              <p className="text-[14px] text-[#68727d] leading-relaxed">
                {block.description}
              </p>
            </motion.div>
          ))}

          {/* Resume Link */}
          <motion.div
            className="w-full sm:w-[45%] max-w-[320px] flex flex-col gap-2 text-center lg:text-left"
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            variants={{
              hidden: { opacity: 0, y: 30 },
              visible: {
                opacity: 1,
                y: 0,
                transition: { duration: 0.5, delay: 0.4 },
              },
            }}
          >
            <a
              href={resumeLink}
              target="_blank"
              rel="noopener noreferrer"
              className="group"
            >
              <h5 className="text-[18px] text-white group-hover:text-cyan-400 transition-colors font-medium">
                Resume
              </h5>
            </a>
            <p className="text-[14px] text-[#68727d] leading-relaxed">
              Download my updated CV to review qualifications and history.
            </p>
          </motion.div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;