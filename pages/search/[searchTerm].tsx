import Head from "next/head";
import React from "react";
import Link from "next/link";
import Footer from "../../components/Footer";
import ResultGrid from "../../components/ResultGrid";

interface ISearch {
  searchTerm: string;
  giphys: string[];
}

const Search: React.FC<ISearch> = ({ searchTerm, giphys }) => {
  return (
    <>
      <Head>
        <title>Search result for: {searchTerm}</title>
        <link rel="icon" href="/favicon.ico" />
        <link rel="stylesheet" href="/styles.css" />
      </Head>
      <p>
        Go{" "}
        <Link href="/">
          <a>home</a>
        </Link>
      </p>
      <h1>Search results for: {searchTerm} </h1>

      <ResultGrid searchResults={giphys} />
      <Footer />
    </>
  );
};

export async function getServerSideProps(context) {
  const searchTerm = context.params.searchTerm;
  let catGiphys = await fetch(
    `https://cataas.com/api/cats?tags=${searchTerm}&limit=10`
  );
  catGiphys = await catGiphys.json();

  // @ts-ignore
  catGiphys = catGiphys.map((gif) => `https://cataas.com/cat/${gif.id}`);

  return { props: { searchTerm, giphys: catGiphys } };
}

export default Search;
