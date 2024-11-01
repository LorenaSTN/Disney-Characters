import "../scss/main/Characters.scss";

const fallbackImage =
  "https://i.pinimg.com/originals/64/4c/c2/644cc20b9413cfbe982e252a6ea21e58.jpg";

function Characters({ characterInfo, onCharacterClick }) {
  const handleImageError = (event) => {
    event.target.src = fallbackImage;
  };

  return (
    <div className="card">
      <li className="characters__card" onClick={onCharacterClick}>
        <div className="front">
          <h4 className="characters__name">{characterInfo.name}</h4>
          <img
            className="characters__photo"
            src={characterInfo.image}
            alt={characterInfo.name}
            onError={handleImageError}
          />
        </div>
        <div className="back">
          <h4 className="back__title">{characterInfo.name}</h4>

          {characterInfo.films && characterInfo.films.length > 0 && (
            <p>
              <strong>Film:</strong>
              {characterInfo.films.map((film, index) => (
                <span key={index} style={{ display: "block" }}>
                  {film}
                  {index < characterInfo.films.length - 1 && ","}
                </span>
              ))}
            </p>
          )}

          {characterInfo.tvshows && characterInfo.tvshows.length > 0 && (
            <p>
              <strong>TV Show:</strong>
              {characterInfo.tvshows.map((show, index) => (
                <span key={index} style={{ display: "block" }}>
                  {show}
                  {index < characterInfo.tvshows.length - 1 && ","}
                </span>
              ))}
            </p>
          )}

          {characterInfo.videogame && characterInfo.videogame.length > 0 && (
            <p>
              <strong>Video Game:</strong>
              {characterInfo.videogame.map((game, index) => (
                <span key={index} style={{ display: "block" }}>
                  {game}
                  {index < characterInfo.videogame.length - 1 && ","}
                </span>
              ))}
            </p>
          )}
        </div>
      </li>
    </div>
  );
}

export default Characters;
