import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import Footer from "../components/Footer";
import ResultGrid from "../components/ResultGrid";

export default function Home({ catGiphys }) {
  const [formInputs, setFormInputs] = useState({});
  const [searchTerm, setSearchTerm] = useState("cats");
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    setSearchResults(catGiphys);
  }, [catGiphys]);

  const handleInputs = (event) => {
    const { name, value } = event.target;
    setFormInputs({ ...formInputs, [name]: value });
  };

  const search = async (event) => {
    event.preventDefault();
    let catGiphys = await fetch(
      `https://cataas.com/api/cats?tags=${formInputs.searchTerm}&limit=10`
    );
    catGiphys = await catGiphys.json();
    catGiphys = catGiphys.map((gif) => `https://cataas.com/cat/${gif.id}`);
    setSearchResults(catGiphys);
    setSearchTerm(formInputs.searchTerm);
  };

  return (
    <div className="container">
      <Head>
        <title>Giphy search app</title>
        <link rel="icon" href="/favicon.ico" />
        <meta
          name="description"
          content="Love cats? We do too. Use our advanced cat search to find the perfect cat for any occasion"
        ></meta>
      </Head>

      <main className="main">
        <h1 className="title">Giphy search app</h1>
        <form onSubmit={search}>
          <input
            type="text"
            name="searchTerm"
            onChange={handleInputs}
            required
          />
          <button>Search</button>
        </form>
        <h1>Search results for: {searchTerm}</h1>
        <Link href="/search/[searchTerm]" as={`/search/${searchTerm}`}>
          <a>{`http://localhost:3000/search/${searchTerm}`}</a>
        </Link>
        <ResultGrid searchResults={searchResults} />
      </main>
      <Footer />
    </div>
  );
}

export async function getStaticProps() {
  let catGiphys = await fetch("https://cataas.com/api/cats?limit=10");
  catGiphys = await catGiphys.json();
  catGiphys = catGiphys.map((gif) => `https://cataas.com/cat/${gif.id}`);
  return { props: { catGiphys } };
}
