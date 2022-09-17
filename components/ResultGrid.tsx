import Image from "next/image";

export default function ResultGrid({ searchResults }) {
  return (
    <div className="cat-gifs">
      {searchResults.map((data, index) => (
        <div key={index}>
          <Image
            className="cat-image"
            src={data}
            alt={""}
            width={"400px"}
            height={"200px"}
            quality={"100"}
          />
        </div>
      ))}
    </div>
  );
}
