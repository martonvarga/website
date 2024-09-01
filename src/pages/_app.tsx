import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { appWithTranslation } from "next-i18next";
import Head from "next/head";
import Script from "next/script";

function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta
          name="description"
          content="Elindult a jelentkezés a központi felvételire felkészítő kurzusaimra! A helyek korlátozott számban elérhetőek, ne maradj le, jelentkezz mihamarabb!"
        />
        <meta
          name="keywords"
          content="Varga Márton, magántanár, matematika, vizsgafelkészítés, magánoktatás, Budapest, magyar nyelv, Budapest XIII. kerület, Újlipót,
         legjobb magántanár,oktatás, közgazdász, hallgató, felkészítés, középiskola, egyetem, emelt szintű érettségi, központi felvételi, zárthelyi vizsgák"
        />
        <meta name="author" content="Varga Márton" />
        <link rel="icon" href="/images/logob.png" type="image/x-icon"></link>
        <link
          as="font"
          rel="preload"
          href="/fonts/Hubot-Sans.woff2"
          crossOrigin=""
          type="font/woff2"
        />
        <title>Varga Márton magántanár</title>
      </Head>
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=AW-16604278618`}
      />
      <Script
        id="gtag-init"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'AW-16604278618');
            `,
        }}
      />
      <Component {...pageProps} />
    </>
  );
}

export default appWithTranslation(App);
