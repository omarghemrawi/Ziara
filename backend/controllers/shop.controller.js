import axios from "axios";

export const getShops = async (req, res) => {
  const { city } = req.query;
  const apiKey = process.env.API_KEY_GOOGLE_PLACES;

  const query = city
    ? `souvenir shops in ${city} Lebanon`
    : `souvenir shops in Lebanon`;

  const url = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${encodeURIComponent(
    query
  )}&key=${apiKey}`;

  try {
    const response = await axios.get(url);
    const filtered = filterPlaces(response.data.results); // Assuming you already have this helper
    res.status(200).json({ places: filtered });
  } catch (error) {
    console.error("Google Places API - Shops:", error.message);
    res.status(500).json({ error: "Failed to fetch souvenir shops" });
  }
};
