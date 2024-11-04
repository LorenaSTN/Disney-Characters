import React, { useState } from "react";
import Characters from "./Characters";
import "../scss/main/CharactersList.scss";
import { Link } from "react-router-dom";

function CharactersList({
  characters,
  inputValue,
  setInputValue,
  handleSearchSubmit,
  handleCharacterClick,
  closeModal,
  isModalOpen,
  selectedCharacter,
  addToFavourites,
  removeFromFavourites,
  favourites,
}) {
  const [isDuplicateModal, setIsDuplicateModal] = useState(false);

  const handleAddToFavourites = () => {
    if (
      selectedCharacter &&
      !favourites.find((fav) => fav.id === selectedCharacter.id)
    ) {
      addToFavourites();
    } else {
      setIsDuplicateModal(true);
    }
    closeModal();
  };

  const closeDuplicateModal = () => {
    setIsDuplicateModal(false);
  };

  const charactersElements = characters.map((character) => (
    <Characters
      key={character.id}
      characterInfo={character}
      onCharacterClick={() => handleCharacterClick(character)}
    />
  ));

  const favouriteElements = favourites.map((favourite) => (
    <li key={favourite.id} className="favouritesList__item">
      <span className="favouritesList__span">{favourite.name}</span>
      <button
        onClick={() => removeFromFavourites(favourite.id)}
        className="favouritesList__remove"
      >
        <i className="fa-solid fa-xmark"></i>
      </button>
    </li>
  ));

  return (
    <>
      {isModalOpen && selectedCharacter && (
        <div className="modal">
          <div className="modal__content">
            <h3>Add {selectedCharacter.name} to Favourites?</h3>
            <button onClick={handleAddToFavourites} className="modal__button">
              Yes
            </button>
            <button onClick={closeModal} className="modal__button">
              No
            </button>
          </div>
        </div>
      )}

      {isDuplicateModal && selectedCharacter && (
        <div className="modal">
          <div className="modal__content">
            <h3>{selectedCharacter.name} is already in Favourites!</h3>
            <button onClick={closeDuplicateModal} className="modal__button">
              OK
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
            <h2>Favs</h2>
          </div>
          <ul className="favouritesList">
            {favourites.length > 0 ? (
              favouriteElements
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
            <form onSubmit={handleSearchSubmit}>
              <input
                type="text"
                placeholder="Character's name"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
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
