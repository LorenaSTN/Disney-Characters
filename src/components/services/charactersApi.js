const fallbackImage =
  "https://i.pinimg.com/originals/64/4c/c2/644cc20b9413cfbe982e252a6ea21e58.jpg";

const fetchCharactersData = async (name) => {
  const url = `https://api.disneyapi.dev/character?name=${name}`;
  const response = await fetch(url);
  if (!response.ok) throw new Error("Failed to fetch characters");
  return response.json();
};

const charactersApi = async (name = "") => {
  if (!name.trim()) return [];

  try {
    const data = await fetchCharactersData(name);
    if (data.data && Array.isArray(data.data)) {
      return data.data.map((character) => ({
        name: character.name,
        image: character.imageUrl || fallbackImage,
        films: character.films,
        tvshows: character.tvShows,
        videogame: character.videoGames,
        parkAttractions: character.parkAttractions,
        id: character._id,
      }));
    }
    return [];
  } catch (error) {
    console.error("Error fetching characters:", error);
    return [];
  }
};

export default charactersApi;
