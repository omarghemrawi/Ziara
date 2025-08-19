import axios from "axios";

// Helper to filter and standardize place data
const filterPlaces = (places) => {
  return places.map((place) => ({
    place_id: place.place_id,
    name: place.name,
    lat: place.geometry?.location?.lat,
    lng: place.geometry?.location?.lng,
    address: place.vicinity,
    rating: place.rating,
    types: place.types,
    photo_reference: place.photos?.[0]?.photo_reference || null,
  }));
};

// -------------------- GET NEARBY PLACES --------------------
export const getNearbyPlaces = async (req, res) => {
  const { latitude, longitude } = req.query;
  const apiKey = process.env.API_KEY_GOOGLE_PLACES;

  if (!latitude || !longitude) {
    return res.status(400).json({ error: "Latitude and longitude are required" });
  }

  const radius = 1500;

  try {
    const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${latitude},${longitude}&radius=${radius}&key=${apiKey}`;
    const response = await axios.get(url);

    const filtered = filterPlaces(response.data.results).filter(
      (place) => place.rating && place.rating >= 4.5
    );

    res.status(200).json({ places: filtered });
  } catch (error) {
    console.error("Google Places error:", error.message);
    res.status(500).json({ error: "Failed to fetch nearby places" });
  }
};

// -------------------- GET NEARBY RESTAURANTS --------------------
export const getNearbyRestaurants = async (req, res) => {
  const { latitude, longitude } = req.query;
  const apiKey = process.env.API_KEY_GOOGLE_PLACES;

  if (!latitude || !longitude) {
    return res.status(400).json({ error: "Latitude and longitude are required" });
  }

  const radius = 10000;
  const type = "restaurant";

  try {
    const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${latitude},${longitude}&radius=${radius}&type=${type}&key=${apiKey}`;
    const response = await axios.get(url);

    const filtered = filterPlaces(response.data.results).filter(
      (place) => place.rating && place.rating >= 3.5
    );

    res.status(200).json({ restaurants: filtered });
  } catch (error) {
    console.error("Google Places error:", error.message);
    res.status(500).json({ error: "Failed to fetch restaurants" });
  }
};

// -------------------- GET NEARBY TOURISTIC PLACES --------------------
export const getNearbyTouristicPlaces = async (req, res) => {
  const { latitude, longitude } = req.query;
  const apiKey = process.env.API_KEY_GOOGLE_PLACES;

  if (!latitude || !longitude) {
    return res.status(400).json({ error: "Latitude and longitude are required" });
  }

  const radius = 3500;
  const type = "tourist_attraction";

  try {
    const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${latitude},${longitude}&radius=${radius}&type=${type}&key=${apiKey}`;
    const response = await axios.get(url);

    const filtered = filterPlaces(response.data.results).filter(
      (place) => place.rating && place.rating >= 4.0
    );

    res.status(200).json({ touristPlaces: filtered });
  } catch (error) {
    console.error("Google Places error:", error.message);
    res.status(500).json({ error: "Failed to fetch tourist places" });
  }
};

// -------------------- GET NEARBY RELIGIOUS PLACES --------------------
export const getNearbyReligiousPlaces = async (req, res) => {
  const { latitude, longitude } = req.query;
  const apiKey = process.env.API_KEY_GOOGLE_PLACES;

  if (!latitude || !longitude) {
    return res.status(400).json({ error: "Latitude and longitude are required" });
  }

  const radius = 1500;
  const types = ["church", "mosque"]; // can add more if needed

  try {
    // Fetch all types in parallel
    const requests = types.map((type) => {
      const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${latitude},${longitude}&radius=${radius}&type=${type}&key=${apiKey}`;
      return axios.get(url);
    });

    const responses = await Promise.all(requests);

    // Merge results and remove duplicates
    const placesMap = new Map();
    responses.forEach((response) => {
      response.data.results.forEach((place) => {
        placesMap.set(place.place_id, place);
      });
    });

    const uniquePlaces = Array.from(placesMap.values());

    // Filter by rating
    const filtered = filterPlaces(uniquePlaces).filter(
      (place) => place.rating && place.rating >= 4.0
    );

    res.status(200).json({ religiousPlaces: filtered });
  } catch (error) {
    console.error("Google Places error:", error.message);
    res.status(500).json({ error: "Failed to fetch religious places" });
  }
};
