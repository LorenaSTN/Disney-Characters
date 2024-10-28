import "../scss/main/Characters.scss";

function Characters({ characterInfo }) {
  return (
    <li className="characters__card">
      <h4 className="characters__name">{characterInfo.name}</h4>
      <img
        className="characters__photo"
        src={characterInfo.image}
        alt={characterInfo.name}
      />
    </li>
  );
}

export default Characters;
