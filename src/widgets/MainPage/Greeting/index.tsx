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
  // Combine all words into a single string with additional spaces for pauses
  const combinedWords = words.join("    "); // Four spaces for longer pauses
  const [currentText, setCurrentText] = useState("");
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (index < combinedWords.length) {
      // Set a timeout to add the next character to the current text
      const timeoutId = setTimeout(() => {
        setCurrentText((text) => text + combinedWords.charAt(index));
        setIndex((index) => index + 1);
      }, 40); // 70 ms for the speed of characters appearing

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
