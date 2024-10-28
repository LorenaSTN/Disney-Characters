import Characters from "./Characters";
import "../scss/main/CharactersList.scss";

function CharactersList({
  characters,
  handleSearchChange,
  searchTerm,
  handleSearchSubmit,
}) {
  const charactersElements = characters.map((character) => {
    return <Characters key={character.id} characterInfo={character} />;
  });

  return (
    <>
      <section className="loader">
        <div></div>
        <div></div>
        <div></div>
      </section>
      <section>
        <div className="charactersList__text">
          <form action="" onSubmit={handleSearchSubmit}>
            {/* <label className="charactersList__label" htmlFor="name">
              Character
            </label> */}
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
    </>
  );
}

export default CharactersList;
