import {
  motion,
  useTransform,
  useScroll,
  AnimatePresence,
} from "framer-motion";
import ReactMarkdown from "react-markdown";
import { useEffect, useRef, useState } from "react";
import { useInView } from "react-intersection-observer";
import Image from "next/image";
import { useTranslations } from "next-intl";
import useMediaQuery from "@/shared/hooks/useMediaQuery";
import ButtonLink from "@/shared/ui/buttons/buttonLink";
import styles from "./portfolio.module.scss";

// skills
import antd from "../../../../public/images/skills/antd.png";
import react from "../../../../public/images/skills/react.png";
import redux from "../../../../public/images/skills/redux-icon.webp";
import nest from "../../../../public/images/skills/nest.png";
import postgres from "../../../../public/images/skills/postgres.png";
import git from "../../../../public/images/skills/git.png";
import next from "../../../../public/images/skills/next.png";
import framer from "../../../../public/images/skills/framer.png";
import mui from "../../../../public/images/skills/mui.png";
import mongo from "../../../../public/images/skills/mongodb.svg";

const Example = () => {
  return (
    <div id="portfolio">
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

  const t = useTranslations();
  const descSrm =
    "A catering SaaS for multi-branch restaurants with tools for managing employees, events, and catering orders at each location.";

  const cards: CardType[] = [
    {
      url: "/images/portfolio/saas.png",
      title: "SaaS CRM System",
      technologies: [mui, nest, mongo, redux, react, git],
      description: descSrm,
      longDesc: `
A full-stack catering management platform built for restaurant chains.

- **Employee Management** – role-based assignments
- **Event Scheduling** – booking, staffing
- **Catering Orders** – menu customization
- **Branch Analytics** – performance dashboards
`,
      id: 11,
    },

    {
      url: "/images/portfolio/jalgroupNew.png",
      title: "Jal Group Asia",
      technologies: [antd, nest, postgres, redux, react, git],
      description: t("jalGroup"),
      link: "https://jalgroupasia.kg/",
      id: 1,
    },
    {
      url: "/images/portfolio/barca.png",
      title: "Barca experience KG",
      link: "https://experience.barcelona.kg/",
      description: t("barca"),
      technologies: [antd, nest, postgres, redux, react, git],
      id: 2,
    },
    {
      url: "/images/portfolio/ergotech.png",
      title: "Fusion Web",
      technologies: [next, react, git, framer],
      link: "https://fusionweb.vercel.app/",
      description: t("ergo"),
      id: 3,
    },
    {
      url: "/images/portfolio/effafa.png",
      title: "Effafa",
      technologies: [next, react, git, framer],
      description: t("effafa"),
      link: "https://effafa.com/",
      id: 4,
    },
    {
      url: "/images/portfolio/myPost.png",
      title: "My Post",
      link: "https://kyrgyz-post.vercel.app/",
      technologies: [postgres, react, git, framer, mui, nest],
      description: t("myPost"),
      id: 5,
    },
    {
      url: "/images/portfolio/tenloc.png",
      link: " https://tenloc-pi.vercel.app/",
      title: "Tenloc",
      description: t("tenloc"),
      technologies: [react, git],
      id: 6,
    },
    {
      url: "/images/portfolio/tunukOi.png",
      link: "https://ku-tengri-landing.vercel.app/",
      title: "Tunuk-Oi",
      description: t("tunuk"),
      technologies: [react, git],
      id: 7,
    },
    {
      url: "/images/portfolio/dataxway.jpg",
      link: "https://dataxway-front.vercel.app/",
      title: "Dataxway",
      description: t("dataxway"),
      technologies: [next, react, git, framer],
      id: 7,
    },
  ];

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
                  transition: { duration: 0.3, delay: 0.8 },
                },
              }}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
            >
              my works
            </motion.h4>

            <p className={styles.small}>{t("worksDescription")}</p>
          </div>
          {cards.map((card) => {
            return <Card card={card} key={card.id} />;
          })}
        </motion.div>
      </div>
    </section>
  );
};

const Card = ({ card }: { card: CardType }) => {
  const [open, setOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const isMobile = useMediaQuery("exsm");

  const mobileStyles = isMobile
    ? "group h-[250px] w-[250px] overflow-hidden bg-neutral-200 rounded-[20px] relative"
    : "group h-[450px] w-[450px] overflow-hidden bg-neutral-200 rounded-[20px] relative";

  const mobileStylesforP = isMobile
    ? "bg-gradient-to-br from-white/40 to-black/90 p-8 text-2xl font-semibold uppercase text-white backdrop-blur-lg"
    : "bg-gradient-to-br from-white/40 to-black/90 p-8 text-5xl font-semibold uppercase text-white backdrop-blur-lg";

  return (
    <>
      <div
        className={mobileStyles}
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
            <div className="absolute inset-0 z-20 grid p-5 place-content-center bg-black/70 transition-opacity duration-300">
              <p className={styles.text}>{card.description}</p>

              <div className="flex gap-4 mt-[20px] flex-wrap justify-center">
                {card?.technologies?.map((image: any, index: number) => (
                  <div key={index} className={styles.imageBlock}>
                    <Image src={image} className={styles.image} alt="tech" />
                  </div>
                ))}
              </div>

              <div className="mt-4 flex justify-center">
                <button
                  onClick={() => setOpen(true)}
                  className="px-4 py-2 rounded-lg bg-white/30 backdrop-blur-md border border-white/40 text-white font-semibold hover:bg-white/40 transition"
                >
                  See more
                </button>
              </div>
            </div>
          ) : (
            <p className={mobileStylesforP}>{card.title}</p>
          )}
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
            onClick={() => setOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="relative w-[90%] max-w-lg rounded-2xl bg-white/20 backdrop-blur-xl border border-white/30 shadow-2xl p-6 text-white"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setOpen(false)}
                className="absolute top-3 right-3 text-white text-2xl hover:scale-110 transition"
              >
                ×
              </button>

              <h2 className="text-2xl font-bold mb-4">{card.title}</h2>
              <div className="prose prose-invert mb-4 text-base leading-relaxed">
                <ReactMarkdown>
                  {card?.longDesc ? card.longDesc : card.description}
                </ReactMarkdown>
              </div>

              {card.technologies && (
                <div className="flex gap-3 flex-wrap mb-4">
                  {card.technologies.map((tech, index) => (
                    <div
                      key={index}
                      className="w-10 h-10 relative rounded-md overflow-hidden"
                    >
                      <Image src={tech} alt="tech" fill />
                    </div>
                  ))}
                </div>
              )}

              {card.link && <ButtonLink link={card.link} />}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
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
  longDesc?: any;
};
