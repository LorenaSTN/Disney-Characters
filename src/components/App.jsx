import "../scss/App.scss";
import CharactersList from "./CharactersList";
import { useEffect, useState } from "react";
import charactersApi from "./services/charactersApi";
import { Route, Routes, Link } from "react-router-dom";
import localStorage from "./services/localStorage";

function App() {
  const [characters, setCharacters] = useState([]);
  const [searchValue, setSearchValue] = useState(
    localStorage.get("searchValue", "")
  );
  const [inputValue, setInputValue] = useState(
    localStorage.get("inputValue", "")
  );
  const [selectedCharacter, setSelectedCharacter] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [favourites, setFavourites] = useState(
    localStorage.get("favourites", [])
  );

  const fetchCharacters = async (name = "") => {
    if (!name.trim()) {
      setCharacters([]);
      return;
    }

    const data = await charactersApi(name);
    setCharacters(data);
  };

  useEffect(() => {
    if (searchValue) {
      fetchCharacters(searchValue);
    }
  }, [searchValue]);

  useEffect(() => {
    localStorage.set("searchValue", searchValue);
    localStorage.set("inputValue", inputValue);
    localStorage.set("favourites", favourites);
  });

  const handleSearchSubmit = (ev) => {
    ev.preventDefault();
    setSearchValue(inputValue);
  };

  const handleCharacterClick = (character) => {
    setSelectedCharacter(character);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedCharacter(null);
  };

  const addToFavourites = () => {
    if (
      selectedCharacter &&
      !favourites.find((fav) => fav.id === selectedCharacter.id)
    ) {
      setFavourites([...favourites, selectedCharacter]);
    }
    closeModal();
  };

  const removeFromFavourites = (characterId) => {
    setFavourites(favourites.filter((fav) => fav.id !== characterId));
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
                inputValue={inputValue}
                setInputValue={setInputValue}
                handleSearchSubmit={handleSearchSubmit}
                handleCharacterClick={handleCharacterClick}
                closeModal={closeModal}
                isModalOpen={isModalOpen}
                selectedCharacter={selectedCharacter}
                addToFavourites={addToFavourites}
                removeFromFavourites={removeFromFavourites}
                favourites={favourites}
              />
            </main>
          }
        />
      </Routes>
    </>
  );
}

export default App;
