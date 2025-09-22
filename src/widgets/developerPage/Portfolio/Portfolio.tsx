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
import jira from "../../../../public/images/skills/jira.png";

import mui from "../../../../public/images/skills/mui.png";
import mongo from "../../../../public/images/skills/mongodb.svg";
import { Card } from "./Card";
import useMediaQuery from "@/shared/hooks/useMediaQuery";

const Example = () => {
  const [selectedCard, setSelectedCard] = useState<CardType | null>(null);
  return (
    <div id="portfolio">
      <HorizontalScrollCarousel onSelectCard={setSelectedCard} />
      <AnimatePresence>
        {selectedCard && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
            onClick={() => setSelectedCard(null)}
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
                onClick={() => setSelectedCard(null)}
                className="absolute top-3 right-3 text-white text-2xl hover:scale-110 transition"
              >
                ×
              </button>

              <h2 className="text-2xl font-bold mb-4">{selectedCard.title}</h2>
              <div className="prose prose-invert mb-4 text-base leading-relaxed">
                <ReactMarkdown>
                  {selectedCard?.longDesc || selectedCard?.description}
                </ReactMarkdown>
              </div>

              {selectedCard?.technologies && (
                <div className="flex gap-3 flex-wrap mb-4">
                  {selectedCard.technologies.map((tech, index) => (
                    <div
                      key={index}
                      className="w-10 h-10 relative rounded-md overflow-hidden"
                    >
                      <Image src={tech} alt="tech" fill />
                    </div>
                  ))}
                </div>
              )}

              {selectedCard?.link && <ButtonLink link={selectedCard.link} />}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const HorizontalScrollCarousel = ({
  onSelectCard,
}: {
  onSelectCard: (card: CardType) => void;
}) => {
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
      technologies: [mui, nest, mongo, redux, react, git,jira],
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
      technologies: [antd, nest, postgres, redux, react, git,jira],
      description: t("jalGroup"),
      link: "https://jalgroupasia.kg/",
      id: 1,
    },
    {
      url: "/images/portfolio/barca.png",
      title: "Barca experience KG",
      link: "https://experience.barcelona.kg/",
      description: t("barca"),
      technologies: [antd, nest, postgres, redux, react,jira, git],
      id: 2,
    },
    {
      url: "/images/portfolio/ergotech.png",
      title: "Fusion Web",
      technologies: [next, react, git,jira, framer],
      link: "https://fusionweb.vercel.app/",
      description: t("ergo"),
      id: 3,
    },
    {
      url: "/images/portfolio/effafa.png",
      title: "Effafa",
      technologies: [next, react, git,jira, framer],
      description: t("effafa"),
      link: "https://effafa.com/",
      id: 4,
    },
    {
      url: "/images/portfolio/myPost.png",
      title: "My Post",
      link: "https://kyrgyz-post.vercel.app/",
      technologies: [postgres, react, git, framer, mui, jira,nest],
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
      link: "https://dataxway.com/",
      title: "Dataxway",
      description: t("dataxway"),
      technologies: [next, react, git, framer],
      id: 7,
    },
  ];
  const isSmall = useMediaQuery("sm");
  return isSmall ? (
    <div className="flex flex-col justify-center items-center gap-7 px-8">
      <motion.h3
        className=" font-bold "
        style={{ color: "white" }}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
      >
        Let's see my works
      </motion.h3>

      {cards.map((card) => {
        return (
          <Card card={card} key={card.id} onSelect={() => onSelectCard(card)} />
        );
      })}
    </div>
  ) : (
    <div>
      <section ref={targetRef} className="relative h-[300vh]">
        <div className="sticky top-0 flex h-screen overflow-hidden items-center">
          <motion.div style={{ x }} className="flex gap-4">
            <div className={styles.skill} ref={ref}>
              <motion.h3
                className="white"
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
                className="white"
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
              return (
                <Card
                  card={card}
                  key={card.id}
                  onSelect={() => onSelectCard(card)}
                />
              );
            })}
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Example;

export type CardType = {
  url: string | any;
  title: string;
  description?: string;
  technologies?: Array<any>;
  id: number;
  link?: string;
  longDesc?: any;
};
