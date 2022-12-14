import Head from 'next/head'
import ProductList from './productList'

export default function Home({productData}) {

  return (
    <div>
      <Head>
        <title>Ecommerce</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <ProductList productData = {productData} />
    </div>
  )
}

//Get product using getServerSideProps from localhost api
export const getServerSideProps = async () => {

  const data = await fetch("http://localhost:3000/api/getProduct");
  const productData = await data.json();

  return {
    props: {
      productData
    },
  };
};

