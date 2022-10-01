import React from "react";
import App from "next/app";
import "styles/scss/nextjs-material-kit.scss?v=1.2.0";
import '@szhsin/react-menu/dist/index.css';
import Script from 'next/script'

export default class MyApp extends App {
  componentDidMount() {
    var next = document.getElementById("__next");
    next.className +='nextjs'
  }
  static async getInitialProps({ Component, router, ctx }) {
    let pageProps = {};

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }

    return { pageProps };
  }
  render() {
    const { Component, pageProps } = this.props;

    return (
      <React.Fragment>
        <Script
                strategy="afterInteractive"
          >
            {
             `
                var _mtm = window._mtm = window._mtm || [];
                _mtm.push({'mtm.startTime': (new Date().getTime()), 'event': 'mtm.Start'});
                var d=document, g=d.createElement('script'), s=d.getElementsByTagName('script')[0];
                g.async=true; g.src='https://analytics.azcourses.io/js/container_tNj8OYKr.js'; s.parentNode.insertBefore(g,s);
             `
            }
          </Script>
        <Component {...pageProps} />
      </React.Fragment>
    );
  }
}
