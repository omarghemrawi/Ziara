import axios from "axios";

export const getNearbyPlaces = async (req, res) => {
  const { latitude, longitude } = req.body;
  const apiKey = process.env.API_KEY_GOOGLE_PLACES;

  if (!latitude || !longitude) {
    return res
      .status(400)
      .json({ error: "Latitude and longitude are required" });
  }

  const radius = 1500;

  try {
    const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${latitude},${longitude}&radius=${radius}&key=${apiKey}`;

    const response = await axios.get(url);
    res.status(200).json({ places: response.data });
  } catch (error) {
    console.error("Google Places error:", error.message);
    res.status(500).json({ error: "Failed to fetch nearby places" });
  }
};

export const getNearbyRestaurants = async (req, res) => {
  const { latitude, longitude } = req.body;
  const apiKey = process.env.API_KEY_GOOGLE_PLACES;

  if (!latitude || !longitude) {
    return res
      .status(400)
      .json({ error: "Latitude and longitude are required" });
  }

  const radius = 1500;
  const type = "restaurant";

  try {
    const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${latitude},${longitude}&radius=${radius}&type=${type}&key=${apiKey}`;
    const response = await axios.get(url);
    res.status(200).json({ restaurants: response.data.results });
  } catch (error) {
    console.error("Google Places error:", error.message);
    res.status(500).json({ error: "Failed to fetch restaurants" });
  }
};

export const getNearbyTouristicPlaces = async (req, res) => {
  const { latitude, longitude } = req.body;
  const apiKey = process.env.API_KEY_GOOGLE_PLACES;

  if (!latitude || !longitude) {
    return res
      .status(400)
      .json({ error: "Latitude and longitude are required" });
  }

  const radius = 3500;
  const type = "tourist_attraction";

  try {
    const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${latitude},${longitude}&radius=${radius}&type=${type}&key=${apiKey}`;
    const response = await axios.get(url);
    res.status(200).json({ touristPlaces: response.data.results });
  } catch (error) {
    console.error("Google Places error:", error.message);
    res.status(500).json({ error: "Failed to fetch tourist places" });
  }
};

export const getNearbyReligiousPlaces = async (req, res) => {
  const { latitude, longitude } = req.body;
  const radius = 1500;
  const apiKey = process.env.API_KEY_GOOGLE_PLACES;

  if (!latitude || !longitude) {
    return res
      .status(400)
      .json({ error: "Latitude and longitude are required" });
  }

  // List of religious place types supported by Google Places
  const types = ["church", "mosque"];

  try {
    const requests = types.map((type) => {
      const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${latitude},${longitude}&radius=${radius}&type=${type}&key=${apiKey}`;
      return axios.get(url);
    });

    // Send all requests in parallel and wait for all to finish before continuing
    const responses = await Promise.all(requests);

    // Merge results and remove duplicates using place_id
    const placesMap = new Map();
    responses.forEach((response) => {
      response.data.results.forEach((place) => {
        placesMap.set(place.place_id, place);
      });
    });

    // Final result
    const uniquePlaces = Array.from(placesMap.values());

    res.status(200).json({ religiousPlaces: uniquePlaces });
  } catch (error) {
    console.error("Google Places error:", error.message);
    res.status(500).json({ error: "Failed to fetch religious places" });
  }
};
