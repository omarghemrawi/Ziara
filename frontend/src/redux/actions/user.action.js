import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Config from 'react-native-config';
const API_URL = Config.API_URL;
export const refreshUser = userId => async dispatch => {
  try {
    const token = await AsyncStorage.getItem('token');

    const res = await axios.get(
      `http://192.168.0.101:5000/api/user/${userId}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      },
    );
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
