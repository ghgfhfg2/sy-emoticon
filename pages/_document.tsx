import Document, { Html, Head, Main, NextScript } from "next/document";

class MyDocument extends Document {
  render() {
    return (
      <Html lang="ko">
        <Head>
          <title>
            특수문자(텍스트) 이모티콘 모음 - Text Emoticon collection
          </title>
          <meta
            name="keywords"
            content="Text,Emoticon,Text Emoticon,Kaomoji,Face Emoticon,Face,Instagram Emoticon,Lenny Face,Lenny,Symbol,Text Symbol,Artful,Face Type,Designed Text,이모티콘,특수기호,인싸티콘,특수문자,텍대,텍스트"
          />
          <meta
            name="description"
            content="텍스트와 특수문자로 이루어진 이모티콘을 보다 쉽게 관리해 보세요.!"
          />
          <meta
            name="viewport"
            content="initial-scale=1.0, width=device-width"
          />
          <meta
            property="og:site_name"
            content="텍스트 이모티콘 모음 - Text Emoticon collection"
          />
          <meta
            property="og:title"
            content="텍스트 이모티콘 모음 - Text Emoticon collection"
          />
          <meta property="og:url" content="https://emoticon.sooyadev.com/" />
          <meta property="og:type" content="website" />
          <meta name="theme-color" content="#3182CE" />
          <link rel="manifest" href="/manifest.json" />
          <script
            async
            src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6788425959877259"
            crossOrigin="anonymous"
          ></script>
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
