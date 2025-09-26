import {
  motion,
  useTransform,
  useScroll,
  AnimatePresence,
} from "framer-motion";
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
import { CardType } from "./constants";
import BulletList from "@/shared/ui/components/BulletList";

const Example = () => {
  const [selectedCard, setSelectedCard] = useState<CardType | null>(null);
  const [activeTab, setActiveTab] = useState<
    "problem" | "solution" | "outcome"
  >("problem");
  useEffect(() => {
    if (selectedCard) {
      setActiveTab("problem");
    }
  }, [selectedCard]);
  const RenderedContent = () => {
    if (!selectedCard) return null;
    switch (activeTab) {
      case "problem":
        return <div className="text-sm">{selectedCard.problem}</div>;
      case "solution":
        return <div className="text-sm"> {selectedCard.solution}</div>;
      case "outcome":
        return <BulletList text={selectedCard.outcome || ""} />;
    }
  };

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
              className="relative w-[90%] max-w-3xl rounded-2xl bg-white/20 backdrop-blur-xl border border-white/30 shadow-2xl p-6 text-white"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedCard(null)}
                className="absolute top-3 right-3 text-white text-2xl hover:scale-150 transition"
              >
                ×
              </button>
              <h2 className="text-2xl font-bold mb-4">{selectedCard.title}</h2>
              <div className="prose prose-invert mb-4 text-base leading-relaxed">
                <div className="flex border-b border-white/30 mb-4 ">
                  {["problem", "solution", "outcome"].map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab as any)}
                      className={`px-4 py-2 text-sm font-medium transition ${
                        activeTab === tab
                          ? "border-b-2 border-cyan-400 text-cyan-400"
                          : "text-gray-300 hover:text-white"
                      }`}
                    >
                      {tab.charAt(0).toUpperCase() + tab.slice(1)}
                    </button>
                  ))}
                </div>
              </div>
              <RenderedContent />
              <br />
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
      technologies: [mui, nest, mongo, redux, react, git],
      description: descSrm,
      problem:
        "Multi-branch restaurants were struggling to manage operations across different locations. Employee scheduling, catering orders, and event coordination were fragmented, often tracked in spreadsheets or disconnected tools. Managers had no unified dashboard for performance analytics, which caused inefficiencies and delays.",
      solution: `I built a full-stack SaaS platform that centralized restaurant operations into one system. 
   The frontend was developed with React, Redux, and MUI to deliver a responsive, intuitive interface. 
   On the backend, I used NestJS with PostgreSQL and MongoDB to handle relational data and flexible content storage. 
   The system included role-based employee management, event scheduling with resource allocation, customizable catering orders, 
   and real-time analytics dashboards, giving managers a single source of truth across all branches.`,
      outcome: ` 
    Reduced scheduling and order management overhead by ~40%
    Improved operational visibility across 20+ restaurant branches
    Enabled 5,000+ staff and managers to coordinate seamlessly in one platform
    Provided scalable foundation for future modules like inventory and billing
    `,
      id: 11,
    },

    {
      url: "/images/portfolio/jalgroupNew.png",
      title: "Jal Group Asia",
      technologies: [antd, next, mongo, redux, react, git, jira],
      description: t("jalGroup"),
      problem:
        " The client’s existing site was static and hard to maintain. They needed a dynamic site to support frequent updates, campaigns, and content changes without developer intervention.",
      solution: `I rebuilt their site using Next.js with CMS integration. Implemented dynamic routing, on-demand content fetching, image optimization, and SEO best practices. Also added admin interfaces so non-technical users could update content.`,
      outcome: ` 
   Content updates now take minutes instead of developer cycles
   Improved SEO rankings and page speed
   Lower maintenance burden for the client
    `,
      link: "https://jalgroupasia.kg/",
      id: 1,
    },
    {
      url: "/images/portfolio/barca.png",
      title: "Barca experience KG",
      link: "https://experience.barcelona.kg/",
      description: t("barca"),
      technologies: [antd, nest, postgres, redux, react, jira, git],
      problem: `  The Barcelona Academy in Bishkek needed both a public-facing website to showcase programs/events and an internal CRM to manage students, registrations, and communications.
The team had mostly junior developers who required technical guidance, and there was no structured system for code quality, reviews, or delivery.`,
solution:`Acted as senior developer and team lead, mentoring juniors and conducting code reviews to maintain high standards.

Designed and implemented a CRM system using NestJS + MongoDB to handle student data, registrations, and staff workflows.

Built the frontend with React + Ant Design, ensuring a professional and responsive UI.

Integrated role-based access control for staff/admin, and set up clear Git workflows with CI/CD to improve collaboration.`,
outcome:`Launched a production-ready academy website and CRM used daily by staff.
         Juniors gained skills and confidence from mentorship, improving team velocity.
          Academy staff saved significant time by consolidating student management into one platform.

Delivered a scalable system ready for future modules (payments, attendance tracking, reporting).`,
      id: 2,
    },
    {
      url: "/images/portfolio/ergotech.png",
      title: "Fusion Web",
      technologies: [next, react, git, jira, framer],
      link: "https://fusionweb.vercel.app/",
      description: t("ergo"),
      id: 3,
    },
    {
      url: "/images/portfolio/effafa.png",
      title: "Effafa",
      technologies: [next, react, git, jira, framer],
      description: t("effafa"),
      link: "https://effafa.com/",
      id: 4,
    },
    {
      url: "/images/portfolio/myPost.png",
      title: "My Post",
      link: "https://kyrgyz-post.vercel.app/",
      technologies: [postgres, react, git, framer, mui, jira, nest],
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
        style={{ color: "white", fontSize: "25px" }}
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
