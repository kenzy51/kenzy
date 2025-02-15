import React, { useRef, useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { motion } from "framer-motion";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination, FreeMode } from "swiper/modules";
import { useInView } from "react-intersection-observer";

import styles from "./styles.module.scss";
import Image from "next/image";
// import react from "../../puv/images/skills/react.png";
import react from "../../../../public/images/skills/react.png";

import js from "../../../../public/images/skills/javascript-3.png";
import html from "../../../../public/images/skills/html.png";
import git from "../../../../public/images/skills/git.png";
import css from "../../../../public/images/skills/css.png";
import node from "../../../../public/images/skills/node.png";
import mongo from "../../../../public/images/skills/mongodb.svg";
import nest from "../../../../public/images/skills/nest.png";
import ts from "../../../../public/images/skills/ts.png";
import next from "../../../../public/images/skills/nextjs3.webp";
import useMediaQuery from "@/shared/hooks/useMediaQuery";

const images = [react, js, html, git, css, node, mongo, nest, ts, next];

const slideVariants = {
  hidden: { opacity: 0, y: -150 },
  visible: { opacity: 1, x: 0, y: 0, transition: { duration: 0.5 } },
};

export const Slider = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
  });

  useEffect(() => {
    if (inView) {
      console.log("Component is in view!");
    }
  }, [inView]);
  const isMobile = useMediaQuery("exsm");
  const isTablet = useMediaQuery("md");
  const slidesPerV = isMobile ? 2 : isTablet ? 3 : 4; 
  return (
    <>
      <div ref={ref}>
        <Swiper
          loop={true}
          slidesPerView={slidesPerV}
          spaceBetween={10}
          grabCursor={true}
          freeMode={true}
          modules={[FreeMode, Pagination]}
          className="mySwiper"
        >
          {images.map((image, index) => (
            <SwiperSlide key={index} className={styles.slide}>
              <motion.div
                className={styles.block}
                variants={{
                  hidden: { opacity: 0, y: -150 },
                  visible: {
                    opacity: 1,
                    x: 0,
                    y: 0,
                    transition: { duration: 0.3, delay: index * 0.2 },
                  },
                }}
                initial="hidden"
                animate={inView ? "visible" : "hidden"}
              >
                {image && <Image src={image} alt="" className={styles.image} />}
              </motion.div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </>
  );
};
