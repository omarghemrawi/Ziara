import axios from "axios";
import Client from "../models/client.js"
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

export const getRestaurants = async (req, res) => {

  try {
    const resp = await Client.find({ serviceType: "restaurant" });
    if (resp.length > 0) {
     return res.status(200).json({ places: resp });
    } else {
return res.status(404).json({ message: "No restaurants found" });
    }

  } catch (error) {
    return res.status(500).json({ error: "Failed to fetch restaurants" });
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
    const filtered = filterPlaces(response.data.results);
    res.status(200).json({ places: filtered });
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
    const filtered = filterPlaces(response.data.results);
    res.status(200).json({ places: filtered });
  } catch (error) {
    console.error("Google Places API - Religious:", error.message);
    res.status(500).json({ error: "Failed to fetch religious places" });
  }
};


export const getAllPlaces = async (req, res) => {

  try {
    const resp = await Client.find();
    if (resp.length > 0) {
     return res.status(200).json({ places: resp });
    } else {
return res.status(404).json({ message: "No Places found" });
    }

  } catch (error) {
    return res.status(500).json({ error: "Failed to fetch restaurants" });
  }

};



  // const { city } = req.query;
  // const apiKey = process.env.API_KEY_GOOGLE_PLACES;

  // const query = city
  //   ? `restaurants in ${city} Lebanon`
  //   : `restaurants in Lebanon`;

  // const url = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${encodeURIComponent(
  //   query
  // )}&key=${apiKey}`;

  // try {
  //   const response = await axios.get(url);
  //   const filtered = filterPlaces(response.data.results);
  //   res.status(200).json({ places: filtered });
  // } catch (error) {
  //   console.error("Google Places API - Restaurants:", error.message);
  //   res.status(500).json({ error: "Failed to fetch restaurants" });
  // }