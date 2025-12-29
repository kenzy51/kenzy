import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <meta
        name="google-site-verification"
        content="VgDRz5M8tNsT6gLPg4D6D7UmgkNA1AM2pqjnh70aX4k"
      />
      <link
        href="https://fonts.googleapis.com/css2?family=Raleway:wght@100;200;300;400;500;600;700;800&display=swap"
        rel="stylesheet"
      />{" "}
      <link
        href="https://fonts.googleapis.com/css2?family=Manrope:wght@100;200;300;400;500;600;700;800&display=swap"
        rel="stylesheet"
      />
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css"
      />
      <link href="../output.css" rel="stylesheet" />
      <Head />
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
