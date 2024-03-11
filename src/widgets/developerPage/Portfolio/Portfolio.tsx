import { motion, useTransform, useScroll } from "framer-motion";
import { useEffect, useRef, useState } from "react";

import styles from "./portfolio.module.scss";
import { useInView } from "react-intersection-observer";
import antd from "../../../../public/images/skills/antd.png";
import Image from "next/image";
import react from "../../../../public/images/skills/react.png";
import redux from "../../../../public/images/skills/redux-icon.webp";
import nest from "../../../../public/images/skills/nest.png";
import postgres from "../../../../public/images/skills/postgres.png";
import git from "../../../../public/images/skills/git.png";
import next from "../../../../public/images/skills/next.png";
import framer from "../../../../public/images/skills/framer.png";
import fsd from "../../../../public/images/skills/fsd.avif";

// portfolio
import jalgroup from "../../../../public/images/portfolio/jalGroup.png";
import ButtonLink from "@/shared/ui/buttons/buttonLink";

const Example = () => {
  return (
    <div>
      <HorizontalScrollCarousel />
    </div>
  );
};

const HorizontalScrollCarousel = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
  });

  useEffect(() => {
    if (inView) {
      console.log("Component is in view!");
    }
  }, [inView]);
  const targetRef = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  const x = useTransform(scrollYProgress, [0, 1], ["2%", "-95%"]);

  return (
    <section ref={targetRef} className="relative h-[300vh]">
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        <motion.div style={{ x }} className="flex gap-4">
          <div className={styles.skill} ref={ref}>
            <motion.h3
              variants={{
                hidden: { opacity: 0, x: -50 },
                visible: {
                  opacity: 1,
                  x: 0,
                  y: 0,
                  transition: { duration: 0.5, delay: 0.5 },
                },
              }}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
            >
              Let's see
            </motion.h3>
            <motion.h4
              variants={{
                hidden: { opacity: 0, x: -50 },
                visible: {
                  opacity: 1,
                  x: 0,
                  y: 0,
                  transition: { duration: 0.3, delay: 0.8 },
                },
              }}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
            >
              my works
            </motion.h4>

            <p className={styles.small}>
              I've played a key role in developing impactful projects. Here's a
              curated selection showcasing my expertise and the achieved
              results.
            </p>
          </div>
          {cards.map((card) => {
            return <Card card={card} key={card.id} />;
          })}
        </motion.div>
      </div>
    </section>
  );
};

const AdditionalBlock = ({ card }: any) => {
  return (
    <div className="absolute inset-0 z-20 grid p-5 place-content-center bg-black/70 transition-opacity duration-300 opacity-0 group-hover:opacity-100">
      <p className={styles.text}>{card?.description}</p>
      <div className="flex gap-4 mt-[20px]">
        {card?.technologies?.map((image: any, index: any) => (
          <div className={styles.imageBlock}>
            <Image key={index} src={image} className={styles.image} alt="asd" />
          </div>
        ))}
      </div>
      <div className={styles.forButton}>
        {card?.link && <ButtonLink link={card.link} />}
      </div>
    </div>
  );
};

const Card = ({ card }: { card: CardType }) => {
  const [isHovered, setIsHovered] = useState(false);
  return (
    <div
      key={card.id}
      className="group  h-[450px] w-[450px] overflow-hidden bg-neutral-200 rounded-[20px] relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        style={{
          backgroundImage: `url(${card.url})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
        className="absolute inset-0 z-0 transition-transform duration-300 group-hover:scale-110"
      ></div>
      <div className="absolute inset-0 z-10 grid place-content-center">
        {isHovered ? (
          <AdditionalBlock info={card} />
        ) : (
          <p className="bg-gradient-to-br from-white/40 to-black/90 p-8 text-6xl font-semibold uppercase text-white backdrop-blur-lg">
            {card.title}
          </p>
        )}
      </div>
      <AdditionalBlock card={card} />
    </div>
  );
};
export default Example;

type CardType = {
  url: string | any;
  title: string;
  description?: string;
  technologies?: Array<any>;
  id: number;
  link?: string;
};

const cards: CardType[] = [
  {
    url: "/images/portfolio/jalGroup.png", // Update the URL
    title: "Jal Group Asia",
    technologies: [antd, nest, postgres, redux, react, git, fsd],
    description:
      "Jal Group Asia - is a platform building modern residential complexes, green areas, public spaces, and more.",
    link: "https://mfc.barcelona.kg/",
    id: 1,
  },
  {
    url: "/images/portfolio/barca.png",
    title: "Barca experience KG",
    link: "https://experience.barcelona.kg/",
    description:
      "Barca Experience KG - is a kyrgyz barcelona academy, which is inherited by official barcelona academy.",
    technologies: [antd, nest, postgres, redux, react, git, fsd],
    id: 2,
  },
  {
    url: "/images/portfolio/ergotech.png",
    title: "Ergotech io",
    technologies: [next, react, git, framer],
    link: "https://ergotech.io/",
    description:
      "ErgoTech.io - is a company, which specializes in developing cross-platform mobile applications, dynamic web solutions, and a spectrum of innovative technologies to meet diverse business needs",
    id: 3,
  },
  {
    url: "/imgs/abstract/4.jpg",
    title: "",
    id: 4,
  },
  {
    url: "/imgs/abstract/5.jpg",
    title: "Title 5",
    id: 5,
  },
  {
    url: "/imgs/abstract/6.jpg",
    title: "Title 6",
    id: 6,
  },
  {
    url: "/imgs/abstract/7.jpg",
    title: "Title 7",
    id: 7,
  },
];
