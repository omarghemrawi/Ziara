import axios from 'axios';

export const refreshUser = userId => async dispatch => {
  try {
    const res = await axios.get(`http://192.168.0.103:5000/api/user/${userId}`);
    dispatch({
      type: 'SET_USER',
      payload: res.data.user,
    });
  } catch (err) {
    console.error('Failed to refresh user:', err);
  }
};
