import Document, {
  Html,
  Head,
  Main,
  NextScript,
  DocumentContext,
} from "next/document";

class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps, locale: ctx.locale };
  }

  render() {
    const currentLang = this.props.locale || "en";

    return (
      <Html
        lang={currentLang}
        className="scroll-smooth bg-black selection:bg-cyan-500/30 selection:text-white"
      >
        <Head>
          <meta charSet="utf-8" />
          {/* Clean Favicon Setup for Google & Modern Browsers */}
          <link rel="icon" href="/mylogo.png" sizes="any" />
          <link rel="icon" type="image/png" sizes="32x32" href="/mylogo.png" />
          <link rel="icon" type="image/png" sizes="48x48" href="/mylogo.png" />
          <link rel="apple-touch-icon" href="/mylogo.png" />
          <link rel="shortcut icon" href="/mylogo.png" />
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link
            rel="preconnect"
            href="https://fonts.gstatic.com"
            crossOrigin="anonymous"
          />

          <link
            href="https://fonts.googleapis.com/css2?family=Raleway:wght@100;200;300;400;500;600;700;800&family=Manrope:wght@100;200;300;400;500;600;700;800&display=swap"
            rel="stylesheet"
          />

          <link
            rel="stylesheet"
            href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css"
            integrity="sha512-1ycn6IcaQQ40/MKBW2W4Rhis/DbILU74C1vSrLJxCq57o941Ym01SwNsOMqvEBFlcgUa6xLiPY/NS5R+E6ztJQ=="
            crossOrigin="anonymous"
            referrerPolicy="no-referrer"
          />
        </Head>
        <body className="antialiased bg-black text-white selection:bg-cyan-500/20">
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
