import axios from 'axios';

export const refreshUser = userId => async dispatch => {
  try {
    const res = await axios.post(`http://10.0.2.2:5000/user/getUser`, {
      id: userId,
    });
    dispatch({
      type: 'SET_USER',
      payload: res.data,
    });
  } catch (err) {
    console.error('Failed to refresh user:', err);
  }
};
