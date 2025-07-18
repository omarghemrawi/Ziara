import axios from "axios";

export const log = async (req, res) => {
  const apiKey = process.env.API_KEY_GOOGLE_PLACES;
  console.log(apiKey);
  return res.status(200).json({ res: process.env.API_KEY_GOOGLE_PLACES });
};

export const getRestaurants = async (req, res) => {
  const { city } = req.query;
  const apiKey = process.env.API_KEY_GOOGLE_PLACES;

  const query = city
    ? `restaurants in ${city} Lebanon`
    : `restaurants in Lebanon`;

  const url = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${encodeURIComponent(
    query
  )}&key=${apiKey}`;

  try {
    const response = await axios.get(url);
    res.status(200).json({ places: response.data.results });
  } catch (error) {
    console.error("Google Places API - Restaurants:", error.message);
    res.status(500).json({ error: "Failed to fetch restaurants" });
  }
};

export const getTouristAttractions = async (req, res) => {
  const { city } = req.query;
  const apiKey = process.env.API_KEY_GOOGLE_PLACES;

  const query = city
    ? `tourist attractions in ${city} Lebanon`
    : `tourist attractions in Lebanon`;

  const url = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${encodeURIComponent(
    query
  )}&key=${apiKey}`;

  try {
    const response = await axios.get(url);
    res.status(200).json({ places: response.data.results });
  } catch (error) {
    console.error("Google Places API - Tourist:", error.message);
    res.status(500).json({ error: "Failed to fetch tourist places" });
  }
};

export const getReligiousPlaces = async (req, res) => {
  const { city } = req.query;
  const apiKey = process.env.API_KEY_GOOGLE_PLACES;

  const query = city
    ? `churches and mosques in ${city} Lebanon`
    : `churches and mosques in Lebanon`;

  const url = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${encodeURIComponent(
    query
  )}&key=${apiKey}`;

  try {
    const response = await axios.get(url);
    res.status(200).json({ places: response.data.results });
  } catch (error) {
    console.error("Google Places API - Religious:", error.message);
    res.status(500).json({ error: "Failed to fetch religious places" });
  }
};
