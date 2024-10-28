import "../scss/App.scss";
import CharactersList from "./CharactersList";
import { useEffect, useState } from "react";
import charactersApi from "./services/charactersApi";
import { Route, Routes, Link } from "react-router-dom";

function App() {
  const [characters, setCharacters] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchCharacters = async (name = "") => {
    if (!name.trim()) {
      setCharacters([]);
      return;
    }

    const data = await charactersApi(name);

    const updatedCharacters = await Promise.all(
      data.map(async (character) => {
        const imageSrc = await checkImage(character.image);
        return { ...character, image: imageSrc };
      })
    );

    setCharacters(updatedCharacters);
  };

  const checkImage = async (imageUrl) => {
    try {
      const response = await fetch(imageUrl, { method: "HEAD" });
      if (response.ok) {
        return imageUrl;
      }
    } catch {}

    return "https://m.media-amazon.com/images/I/719t3jd2NeL.png";
  };

  useEffect(() => {
    fetchCharacters(searchTerm);
  }, [searchTerm]);

  const handleSearchChange = (ev) => {
    setSearchTerm(ev.target.value);
  };

  const handleSearchSubmit = (ev) => {
    ev.preventDefault();
    fetchCharacters(searchTerm);
  };

  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <header className="app__header">
                <div className="app__section1">
                  <div className="app__titles">
                    <h4 className="app__subtitle">Search for your</h4>
                    <h1 className="app__title">Disney Character</h1>
                    <p className="app__p">
                      Explore, search, and discover your favorite Disney
                      characters! Use our filters to dive into the magical world
                      of Disney and find all the characters that have captured
                      your heart.
                    </p>
                    <div className="app__section1__button">
                      <Link to={"/search"}>
                        <button className="app__button">Start</button>
                      </Link>
                    </div>
                  </div>
                </div>
                <div className="app__section2"></div>
              </header>
            </>
          }
        />
        <Route
          path="/search"
          element={
            <main className="app__main">
              <CharactersList
                characters={characters}
                handleSearchChange={handleSearchChange}
                handleSearchSubmit={handleSearchSubmit}
                searchTerm={searchTerm}
              />
            </main>
          }
        />
      </Routes>
    </>
  );
}

export default App;
