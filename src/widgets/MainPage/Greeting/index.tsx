import React, { useState, useEffect } from "react";
import styles from "./Greeting.module.scss";

const Greeting = () => {
  const words = [
    "Hello, world.",
    "My name is Kenzy.",
    "I am a Software Developer",
    "...and also a Musician.",
    "Choose your Kenzy below",
  ];
  const combinedWords = words.join("    "); 
  const [currentText, setCurrentText] = useState("");
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (index < combinedWords.length) {
      const timeoutId = setTimeout(() => {
        setCurrentText((text) => text + combinedWords.charAt(index));
        setIndex((index) => index + 1);
      }, 40); 

      return () => clearTimeout(timeoutId);
    }
  }, [index, combinedWords.length]);

  return (
    <div className={styles.main}>
      <p>{currentText}</p>
    </div>
  );
};

export default Greeting;
