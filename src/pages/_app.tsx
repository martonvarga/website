import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { appWithTranslation } from "next-i18next";
import Head from "next/head";

function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta
          name="description"
          content="Varga Márton magántanár weboldala. Matematika vizsgafelkészítés és magánoktatás."
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
      <Component {...pageProps} />
    </>
  );
}

export default appWithTranslation(App);
