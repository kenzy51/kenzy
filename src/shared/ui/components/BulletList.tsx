import React from "react";

const BulletList = ({ text }: { text: string }) => {
  return (
    <ul className="list-disc pl-5 space-y-2 text-sm">
      {text
        .split("\n")
        .map((line, i) => line.trim())
        .filter((line) => line.length > 0)
        .map((line, i) => (
          <li key={i}>{line}</li>
        ))}
    </ul>
  );
};

export default BulletList;
