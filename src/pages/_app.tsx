// Next
import type { AppProps } from "next/app";
import localFont from "next/font/local";

// React
import React from "react";

// Context
import { AppContextProvider } from "../../context/AppContext";

// Styles
import "@/styles/globals.scss";

// Layout
import DefaultLayout from "../../components/layout/DefaultLayout";

// https://gist.github.com/gaearon/e7d97cdf38a2907924ea12e4ebdf3c85?permalink_comment_id=3886909#gistcomment-3886909
if (typeof window === "undefined") React.useLayoutEffect = React.useEffect;

const disketMono = localFont({
  variable: "--disket-mono",
  preload: true,
  display: "swap",
  fallback: ["monospace", "arial"],
  src: [
    {
      path: "../fonts/disket-mono-regular-webfont.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../fonts/disket-mono-bold-webfont.woff2",
      weight: "700",
      style: "normal",
    },
  ],
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className={disketMono.variable}>
      <AppContextProvider>
        <DefaultLayout>
          <Component {...pageProps} />
        </DefaultLayout>
      </AppContextProvider>
    </div>
  );
}
