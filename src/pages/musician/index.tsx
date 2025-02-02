import Layout from "@/shared/ui/layout";
import React from "react";
import Image from "next/image";
import Container from "@/shared/ui/container/Container";
import Link from "next/link";
import { motion } from "framer-motion";
import "@/styles/Home.module.css";

import meWithGuitar from "./assets/me.jpg";

const Index = () => {
  return (
    <Layout>
      <header className="w-full flex justify-between items-center px-8 py-5 bg-opacity-80 backdrop-blur-md fixed top-0 left-0 right-0 z-50">
        <div className="flex items-center space-x-3">
          <h1 className="text-2xl font-semibold text-white tracking-wider">
            Kenzy
          </h1>
        </div>
        <nav className="flex space-x-8">
          <Link
            href="#about"
            className="text-white hover:text-gray-300 transition duration-200"
          >
            About
          </Link>
          <Link
            href="#music"
            className="text-white hover:text-gray-300 transition duration-200"
          >
            Music
          </Link>
          <Link
            href="#contact"
            className="text-white hover:text-gray-300 transition duration-200"
          >
            Contact
          </Link>
        </nav>
      </header>

      <Container>
        <motion.div
          className="relative flex flex-col items-center text-center justify-center h-screen mt-[100px]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <div className="absolute inset-0 bg-gradient-to-br"></div>

          <div className="relative z-10 space-y-6">
            <Image
              src={meWithGuitar}
              alt="Kenzy playing guitar"
              width={400}
              height={400}
              className="shadow-lg"
            />

            <h1 className="text-5xl font-bold text-white tracking-wider">
              Kenzy
            </h1>
            <p className="text-lg text-gray-300">
              🎸 Guitarist & Pianist | Rock & Blues
              <br />
              🌆 Based in NYC | Passionate About Music
            </p>
          </div>
        </motion.div>

        <section id="about" className="py-20 text-center">
          <motion.h2
            className="text-4xl font-bold text-white"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            About Me
          </motion.h2>
          <motion.p
            className="text-lg text-gray-300 mt-4 max-w-3xl mx-auto leading-relaxed text-start"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
          >
            Kenzy grew up surrounded by music, drawn to its power from an early
            age. His journey began in music school, where he studied piano,
            mastering the intricacies of melody and harmony. But his artistic
            vision expanded beyond the classical world—he found himself
            captivated by the raw energy of rock and the deep emotion of blues.
            <br />
            <br />
            Seeking a way to express his own voice, he picked up the guitar,
            immersing himself in the sounds of legendary musicians who shaped
            the genres. What started as an exploration quickly became a passion,
            leading him to craft a sound that is both soulful and electrifying.
            <br />
            <br />
            Through the years, Kenzy has refined his artistry, performing in
            intimate venues and shaping his music into something deeply
            personal. With every note, every chord, and every song, he creates
            more than just music—he tells a story of passion, evolution, and the
            pursuit of true artistic expression.
          </motion.p>
        </section>

        <section id="music" className="py-20 text-center">
          <motion.h2
            className="text-4xl font-bold text-white"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            My Music
          </motion.h2>
          <motion.p
            className="text-lg text-gray-300 mt-4 max-w-3xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
          >
            🎵 Listen to my latest releases on
            <a href="https://www.youtube.com/@Kenzyyourplayer"> YouTube.</a>
          </motion.p>
        </section>

        <section id="contact" className="py-20 text-center">
          <motion.h2
            className="text-4xl font-bold text-white"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            Get in Touch
          </motion.h2>
          <motion.p
            className="text-lg text-gray-300 mt-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
          >
            📩 Email:{" "}
            <a href="mailto:your-email@gmail.com" className="text-blue-400">
              nazarovkanat7@gmail.com
            </a>
          </motion.p>
          <motion.p
            className="mt-2 text-gray-300"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
          >
            📱 Follow me on{" "}
            <a href="https://instagram.com/itiskenzy" className="text-blue-400">
              Instagram
            </a>
          </motion.p>
        </section>
      </Container>
    </Layout>
  );
};

export default Index;
