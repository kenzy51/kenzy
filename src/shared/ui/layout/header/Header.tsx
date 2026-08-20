// components/Header.tsx
import React from "react";
import logo from "../../../../../public/mylogo.png";
import Image from "next/image";
import Container from "../../container/Container";
import { Link as ScrollLink } from "react-scroll";
import Link from "next/link";
import { useRouter } from "next/router";
import github from "../../../../../public/images/githubW.svg";
import linkedin from "../../../../../public/images/socIcons/linkedin.webp";
import { useTranslations } from "next-intl";
import LanguageSelector from "@/components/LanguageSelector";

const Header = () => {
  const t = useTranslations();
  const router = useRouter();

  // Route state checks
  const isBlogRoute = router.pathname.startsWith("/blog");
  const isStudioRoute = router.pathname.startsWith("/studio");
  const isLifestyle = router.pathname.startsWith("/lifestyle");
  const isWorksRoute = router.pathname.startsWith("/works");

  const navTargets = ["bio", "skills", "experience", "portfolio", "contact"];

  // Hide header only for Studio routes
  if (isStudioRoute) return null;

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 w-full border-b border-neutral-900/40 backdrop-blur-xl py-4 transition-colors duration-500 ${
          isLifestyle
            ? "bg-[#FAF7F2]/60" // Lifestyle page background color
            : "bg-black/60" // Default black for other pages
        }`}
        style={{
          fontFamily: "var(--font-brandon), 'Brandon Grotesque', sans-serif",
        }}
      >
        <Container>
          <div className="flex items-center justify-between h-12 w-full">
            <div className="flex items-center transition-transform duration-200 hover:scale-[1.02]">
              <Link href="/">
                <h5
                  className={`bold leading-5 transition-colors duration-500 
                    text-sm sm:text-base lg:text-lg 
                    ${
                      isBlogRoute
                        ? "text-white"
                        : isLifestyle
                          ? "text-[#1C1A17]"
                          : "text-white"
                    }
                  `}
                >
                  KANAT NAZAROV
                </h5>
              </Link>
            </div>

            <nav className="flex items-center gap-2">
              {/* Works / Portfolio Link */}
              <Link
                href="/works"
                className={`text-[9px] uppercase font-bold tracking-[0.2em] px-3 py-1.5 rounded border transition-all ${
                  isWorksRoute
                    ? "bg-white text-black border-white"
                    : isLifestyle
                      ? "bg-[#FAF7F2] text-[#1C1A17] border-[#1C1A17]/20 hover:bg-[#1C1A17] hover:text-white"
                      : "bg-neutral-950/40 text-neutral-400 border-neutral-800/80 hover:text-white hover:border-neutral-700"
                }`}
              >
                Works
              </Link>

              {/* Blog Link */}
              <Link
                href="/blog"
                className={`text-[9px] uppercase font-bold tracking-[0.2em] px-3 py-1.5 rounded border transition-all ${
                  isBlogRoute
                    ? "bg-black text-white border-black"
                    : isLifestyle
                      ? "bg-[#FAF7F2] text-[#1C1A17] border-[#1C1A17]/20 hover:bg-[#1C1A17] hover:text-white"
                      : "bg-neutral-950/40 text-neutral-400 border-neutral-800/80 hover:text-white hover:border-neutral-700"
                }`}
              >
                Blog
              </Link>

              {/* Life Link */}
              <Link
                href="/lifestyle"
                className={`text-[9px] uppercase font-bold tracking-[0.2em] px-3 py-1.5 rounded border transition-all ${
                  isLifestyle
                    ? "bg-[#1C1A17] text-white border-[#1C1A17]"
                    : isBlogRoute
                      ? "bg-white text-black border-white"
                      : "bg-neutral-950/40 text-neutral-400 border-neutral-800/80 hover:text-white hover:border-neutral-700"
                }`}
              >
                Life
              </Link>

              {/* Aesthetic Language Selector */}
              <div
                className={`pl-2 border-l ${
                  isLifestyle ? "border-[#1C1A17]/20" : "border-neutral-800"
                }`}
              >
                <LanguageSelector />
              </div>
            </nav>
          </div>
        </Container>
      </header>

      {/* Only show navigation/sidebars on main homepage routes */}
      {!isBlogRoute && !isLifestyle && !isWorksRoute && (
        <>
          <nav
            className="lg:hidden fixed top-[80px] left-0 right-0 z-40 w-full bg-black/80 backdrop-blur-md border-b border-neutral-900 overflow-x-auto scrollbar-none py-3 px-4 flex items-center justify-start gap-6 whitespace-nowrap mask-image-horizontal"
            style={{
              fontFamily:
                "var(--font-brandon), 'Brandon Grotesque', sans-serif",
            }}
          >
            {navTargets.map((target) => (
              <ScrollLink
                key={target}
                to={target}
                smooth={true}
                duration={500}
                spy={true}
                offset={-140}
                className="text-[11px] font-bold uppercase tracking-[0.15em] text-neutral-400 transition-colors duration-200 cursor-pointer"
                activeClass="!text-cyan-400 border-b border-cyan-400 pb-1"
              >
                {target === "bio" ? "about" : t(target)}
              </ScrollLink>
            ))}
          </nav>

          <aside
            className="hidden lg:flex fixed right-12 top-1/2 -translate-y-1/2 z-50 flex flex-col items-center gap-8 mix-blend-difference"
            style={{
              fontFamily:
                "var(--font-brandon), 'Brandon Grotesque', sans-serif",
            }}
          >
            <nav className="flex flex-col gap-8 items-center">
              {navTargets.map((target) => (
                <ScrollLink
                  key={target}
                  to={target}
                  smooth={true}
                  duration={500}
                  spy={true}
                  className="cursor-pointer opacity-40 hover:opacity-100 transition-all duration-300 text-white relative"
                  activeClass="!opacity-100 [&>span]:text-cyan-400"
                >
                  <span className="text-[11px] font-bold uppercase tracking-[0.2em] transition-colors duration-200">
                    {target === "bio" ? "about" : t(target)}
                  </span>
                </ScrollLink>
              ))}
            </nav>

            <div className="flex flex-col items-center gap-4 mt-4 pt-4 border-t border-neutral-800/60 w-full">
              <a
                href="https://github.com/kanatnazarovdev"
                target="_blank"
                rel="noopener noreferrer"
                className="opacity-50 hover:opacity-100 hover:scale-110 transition-all duration-200"
              >
                <Image alt="Github" src={github} width={18} height={18} />
              </a>
              <a
                href="https://www.linkedin.com/in/kanatnazarov"
                target="_blank"
                rel="noopener noreferrer"
                className="opacity-50 hover:opacity-100 hover:scale-110 transition-all duration-200"
              >
                <Image alt="LinkedIn" src={linkedin} width={18} height={18} />
              </a>
            </div>
          </aside>
        </>
      )}
    </>
  );
};

export default Header;