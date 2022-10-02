import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/globals.css';
import React, { useState, useEffect } from "react";
import Script from 'next/script';
import Header from './header';
import Context from './context';

export default function MyApp({ Component, pageProps }) {

  const [showChild, setShowChild] = useState(false);

  useEffect(() => {
    setShowChild(true);
  }, []);

  if (!showChild) {
    return null;
  }

  if (typeof window === 'undefined') {
    return <></>;
  }

  else {

    return (
      <div>
        <Script async src='https://kit.fontawesome.com/a076d05399.js' crossorigin='anonymous' />

        <Context>
          <Header />
          <Component {...pageProps} />
        </Context>
      </div>
    );
  }
}

