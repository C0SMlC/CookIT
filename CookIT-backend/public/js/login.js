/* eslint-disable */
import axios from 'axios';
import { showAlert } from './alerts';
export const login = async (email, password) => {
  try {
    const res = await axios({
      method: 'POST',
      url: '/users/login',
      data: {
        email,
        password,
      },
    });

    if (res.data.status === 'success') {
      showAlert('Logged In Successfully!', 'success');
      localStorage.setItem('uid', res.data.data.user.uid);

      window.setTimeout(() => {
        location.assign('/app');
      }, 1500);
    }
  } catch (error) {
    showAlert(error.response.data.message, 'error');
  }
};

export const logout = async () => {
  try {
    const res = await axios({
      method: 'GET',
      url: '/users/logout',
    });
    if (res.data.status === 'success') {
      window.setTimeout(() => {
        location.assign('/');
      }, 1000);
    }
  } catch (error) {
    showAlert(error.response.data.message, 'error');
  }
};
