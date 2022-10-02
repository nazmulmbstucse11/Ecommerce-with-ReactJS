import Document, { Html, Head, Main, NextScript } from 'next/document'

class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <meta property='custom' content='nazmul' />
        </Head>

        <body>
          <Main />
          <NextScript />
          <div id="portal-root"></div>
        </body>
      </Html>
    )
  }
}

export default MyDocument;