import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Config from 'react-native-config';
const API_URL = Config.API_URL;
export const refreshUser = userId => async dispatch => {
  try {
    const token = await AsyncStorage.getItem('token');

    const res = await axios.get(`${API_URL}/api/user/${userId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    dispatch({
      type: 'SET_USER',
      payload: res.data.user,
    });
  } catch (err) {
    console.error('Failed to refresh user:', err);
  }
};

export const setPlacesRefresh = value => ({
  type: 'SET_PLACES_REFRESH',
  payload: value,
});

export const clearUser = () => ({
  type: 'CLEAR_USER',
});
