import React, { useState } from "react";
import Characters from "./Characters";
import "../scss/main/CharactersList.scss";
import { Link } from "react-router-dom";

function CharactersList({
  characters,
  handleSearchChange,
  searchTerm,
  handleSearchSubmit,
}) {
  const [selectedCharacter, setSelectedCharacter] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [favorites, setFavorites] = useState([]);

  const handleCharacterClick = (character) => {
    setSelectedCharacter(character);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedCharacter(null);
  };

  const addToFavorites = () => {
    if (
      selectedCharacter &&
      !favorites.find((fav) => fav.id === selectedCharacter.id)
    ) {
      setFavorites([...favorites, selectedCharacter]);
    }
    closeModal();
  };

  const removeFromFavorites = (characterId) => {
    setFavorites(favorites.filter((fav) => fav.id !== characterId));
  };

  const charactersElements = characters.map((character) => (
    <Characters
      key={character.id}
      characterInfo={character}
      onCharacterClick={() => handleCharacterClick(character)}
    />
  ));

  const favoriteElements = favorites.map((favorite) => (
    <li key={favorite.id} className="favouritesList__item">
      <span>{favorite.name}</span>
      <button
        onClick={() => removeFromFavorites(favorite.id)}
        className="favouritesList__remove"
      >
        <i className="fa-solid fa-xmark"></i>
      </button>
    </li>
  ));

  return (
    <>
      {isModalOpen && (
        <div className="modal">
          <div className="modal__content">
            <h3>Add {selectedCharacter.name} to Favorites?</h3>
            <button onClick={addToFavorites} className="modal__button">
              Yes
            </button>
            <button onClick={closeModal} className="modal__button">
              No
            </button>
          </div>
        </div>
      )}
      <section className="loader">
        <div></div>
        <div></div>
        <div></div>
      </section>
      <div className="charactersList__container">
        <section className="charactersList1">
          <div className="charactersList1__title">
            <h2>Favourite's List:</h2>
          </div>
          <ul className="favouritesList">
            {favorites.length > 0 ? (
              favoriteElements
            ) : (
              <p className="favouritesList__p">
                No favourite characters added yet.
              </p>
            )}
          </ul>
        </section>
        <section className="charactersList2">
          <div className="charactersList__home">
            <Link to={"/"}>
              <button className="app__button">
                <i className="fa-solid fa-house"></i>
              </button>
            </Link>
          </div>
          <div className="charactersList__text">
            <form action="" onSubmit={handleSearchSubmit}>
              <input
                id="name"
                type="text"
                placeholder="Character's name"
                value={searchTerm}
                onChange={handleSearchChange}
                className="charactersList__input"
              />
              <button type="submit" className="charactersList__button">
                Search
              </button>
            </form>
          </div>
          <ul className="charactersList">{charactersElements}</ul>
        </section>
      </div>
    </>
  );
}

export default CharactersList;
