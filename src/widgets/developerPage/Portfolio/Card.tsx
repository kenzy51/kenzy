import useMediaQuery from "@/shared/hooks/useMediaQuery";
import Image from "next/image";
import { useState } from "react";
import styles from "./portfolio.module.scss";
import { CardType } from "./constants";

interface CardFunction {
  card: CardType;
  onSelect: () => void;
}
export const Card = ({ card, onSelect }: CardFunction) => {
  const [open, setOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const isMobile = useMediaQuery("exsm");
  const mobileStyles = isMobile
    ? "group h-[340px] w-[100%] overflow-hidden bg-neutral-200 rounded-[20px] relative"
    : "group h-[450px] w-[450px] overflow-hidden bg-neutral-200 rounded-[20px] relative";

  const mobileStylesforP = isMobile
    ? "bg-gradient-to-br from-white/40 to-black/30 p-8 text-2xl font-semibold uppercase text-white backdrop-blur-lg rounded-2xl "
    : "bg-gradient-to-br from-white/40 to-black/30 p-8 text-5xl font-semibold uppercase text-white backdrop-blur-lg rounded-2xl ";

      const mobileStylesforwP = isMobile
    ? "rounded-2xl overflow-hidden bg-white/10 backdrop-blur-lg border border-white/20 p-4 z-10"
    : "rounded-2xl overflow-hidden bg-white/10 backdrop-blur-lg border border-white/20 p-4 z-10";

  const hasLink = card?.link && card?.link.trim() !== "";

  return (
    <>
      {hasLink ? (
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
                        <Image
                          src={image}
                          className={styles.image}
                          alt="tech"
                        />
                      </div>
                    ))}
                  </div>

                  <div className="mt-4 flex justify-center">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.preventDefault(); 
                        onSelect();
                      }}
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
      ) : (
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
              <div className={ `absolute inset-0 z-20 grid p-5 place-content-center bg-black/70 transition-opacity duration-300 `}>
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
                    type="button"
                    onClick={onSelect}
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
      )}
    </>
  );
};
