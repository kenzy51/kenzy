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


const descSrm =
  "A catering SaaS for multi-branch restaurants with tools for managing employees, events, and catering orders at each location.";

type CardType = {
  url: string | any;
  title: string;
  description?: string;
  technologies?: Array<any>;
  id: number;
  link?: string;
  longDesc?: any;
};

export const cards: CardType[] = [
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
    description: "jalGroup",
    link: "https://jalgroupasia.kg/",
    id: 1,
  },
  {
    url: "/images/portfolio/barca.png",
    title: "Barca experience KG",
    link: "https://experience.barcelona.kg/",
    description: "barca",
    technologies: [antd, nest, postgres, redux, react, git],
    id: 2,
  },
  {
    url: "/images/portfolio/ergotech.png",
    title: "Fusion Web",
    technologies: [next, react, git, framer],
    link: "https://fusionweb.vercel.app/",
    description: "ergo",
    id: 3,
  },
  {
    url: "/images/portfolio/effafa.png",
    title: "Effafa",
    technologies: [next, react, git, framer],
    description: "effafa",
    link: "https://effafa.com/",
    id: 4,
  },
  {
    url: "/images/portfolio/myPost.png",
    title: "My Post",
    link: "https://kyrgyz-post.vercel.app/",
    technologies: [postgres, react, git, framer, mui, nest],
    description: "myPost",
    id: 5,
  },
  {
    url: "/images/portfolio/tenloc.png",
    link: " https://tenloc-pi.vercel.app/",
    title: "Tenloc",
    description: "tenloc",
    technologies: [react, git],
    id: 6,
  },
  {
    url: "/images/portfolio/tunukOi.png",
    link: "https://ku-tengri-landing.vercel.app/",
    title: "Tunuk-Oi",
    description: "tunuk",
    technologies: [react, git],
    id: 7,
  },
  {
    url: "/images/portfolio/dataxway.jpg",
    link: "https://dataxway-front.vercel.app/",
    title: "Dataxway",
    description: "dataxway",
    technologies: [next, react, git, framer],
    id: 7,
  },
];
