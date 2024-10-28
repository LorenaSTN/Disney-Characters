function charactersApi(name = "") {
  const url = `https://api.disneyapi.dev/character?name=${encodeURIComponent(
    name
  )}`;

  return fetch(url)
    .then((res) => res.json())
    .then((data) => {
      const characters = data.data.map((character) => {
        return {
          name: character.name,
          image: character.imageUrl
            ? character.imageUrl
            : "https://m.media-amazon.com/images/I/719t3jd2NeL.png",
          enemies: character.enemies,
          allies: character.allies,
          films: character.films[0],
          videogame: character.videoGames,
          id: character._id,
        };
      });
      return characters;
    });
}

export default charactersApi;
