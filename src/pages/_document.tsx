import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <link
        href="https://fonts.googleapis.com/css2?family=Raleway:wght@100;200;300;400;500;600;700;800&display=swap"
        rel="stylesheet"
      />{" "}
      <link
        href="https://fonts.googleapis.com/css2?family=Manrope:wght@100;200;300;400;500;600;700;800&display=swap"
        rel="stylesheet"
      />
        <link href="../output.css" rel="stylesheet"/>

      <Head />
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
