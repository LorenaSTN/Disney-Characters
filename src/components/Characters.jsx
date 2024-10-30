import "../scss/main/Characters.scss";

function Characters({ characterInfo, onCharacterClick }) {
  const handleImageError = (event) => {
    event.target.src = fallbackImage;
  };

  return (
    <li className="characters__card" onClick={onCharacterClick}>
      <h4 className="characters__name">{characterInfo.name}</h4>
      <img
        className="characters__photo"
        src={characterInfo.image}
        alt={characterInfo.name}
        onError={handleImageError}
      />
    </li>
  );
}

export default Characters;
