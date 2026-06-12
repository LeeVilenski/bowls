import { useEffect } from "react";
import "../styles/globals.css";

export default function App({ Component, pageProps }) {
  useEffect(() => {
    if (process.env.NODE_ENV === "production" && "serviceWorker" in navigator) {
      navigator.serviceWorker.register("/sw.js").catch(() => {});
    }
  }, []);
  return <Component {...pageProps} />;
}
