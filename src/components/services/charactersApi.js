const fallbackImage =
  "https://i.pinimg.com/originals/64/4c/c2/644cc20b9413cfbe982e252a6ea21e58.jpg";

const checkImage = async (url) => {
  try {
    const response = await fetch(url, { method: "HEAD" });
    if (!response.ok) throw new Error("Image not found");
    return url;
  } catch (error) {
    console.error("Error checking image:", error);
    return fallbackImage;
  }
};

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
      return await Promise.all(
        data.data.map(async (character) => {
          const imageUrl = character.imageUrl || fallbackImage;
          return {
            name: character.name,
            image: await checkImage(imageUrl),
            films: character.films[0],
            videogame: character.videoGames,
            id: character._id,
          };
        })
      );
    }
    return [];
  } catch (error) {
    console.error("Error fetching characters:", error);
    return [];
  }
};

export default charactersApi;
