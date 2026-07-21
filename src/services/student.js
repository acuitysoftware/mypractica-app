import axios from 'axios';
import { BASE_URL } from './baseUrl';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

export const getStudentDashboard = async (token) => {
  let _data = await axios.post(
    `${BASE_URL}/students/dashboard`,
    {},

    {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `Bearer ${token}`,
      },
    },
  );
  //console.log("course list", _data?.data?.course);

  return _data?.data;
};

export const fetchcourselist = async () => {
  let _data = await axios.post(
    `${BASE_URL}/courses-list`,
    {},

    {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        // 'Authorization': `Bearer ${token}`,
      },
    },
  );
  //console.log("course list", _data?.data?.course);

  return _data?.data?.data;
};

export const getExamList = async (examid) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/exam-list${examid ? `?category_id=${examid}` : ''}`,
      {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          // Include Authorization header if authentication is required
          // 'Authorization': 'Bearer YOUR_AUTH_TOKEN',
        },
      },
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching exam list:', error);
    throw error;
  }
};

export const getStudentSchedule = async (token) => {
  let _data = await axios.post(
    `${BASE_URL}/students/my-schedules`,
    {},

    {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `Bearer ${token}`,
      },
    },
  );
  //console.log("course list", _data?.data?.course);

  return _data?.data;
};

export const getStudentSubs = async (token) => {
  let _data = await axios.post(
    `${BASE_URL}/students/my-subscriptions`,
    {},
    {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `Bearer ${token}`,
      },
    },
  );
  //console.log("course list", _data?.data?.course);

  return _data?.data;
};

export const getStudentProfile = async (token) => {
  let _data = await axios.post(
    `${BASE_URL}/students/get-profile`,
    {},

    {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `Bearer ${token}`,
      },
    },
  );
  //console.log("course list", _data?.data?.course);

  return _data?.data;
};

export const updateStudentProfile = async (
  token,
  address,
  education,
  state_id,
  city_id,
  category_id,
  image,
) => {
  try {
    const formData = new FormData();
    formData.append('address', address);
    formData.append('education', education);
    formData.append('state_id', state_id);
    formData.append('city_id', city_id);

    // Ensure category_id is an array
    if (Array.isArray(category_id)) {
      category_id.forEach((id) => {
        formData.append('category_id[]', id);
      });
    } else {
      throw new Error('Category ID must be an array.');
    }
    if (image) {
      formData.append('image', image);
    }
    const response = await axios.post(
      `${BASE_URL}/students/update-profile`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
          Accept: 'application/json',
          Authorization: `Bearer ${token}`,
        },
      },
    );
    console.log(image);
    return response.data;
  } catch (error) {
    console.error(
      'Error updating profile:',
      error?.response?.data || error.message,
    );
    throw new Error('Failed to update profile.');
  }
};

export const getSubcriptionfromid = async (token, id, tid) => {
  let _data = await axios.post(
    `${BASE_URL}/students/subscription-purchase`,
    {
      subscription_id: id,
      transaction_id: tid,
    },

    {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `Bearer ${token}`,
      },
    },
  );
  //console.log("course list", _data?.data?.course);

  return _data?.data;
};

export const schedulePurchase = async (token, data) => {
  let _data = await axios.post(
    `${BASE_URL}/students/session-purchased`,

    data,
    {
      headers: {
        // "Content-Type": "application/json",
        Accept: 'application/json',
        Authorization: `Bearer ${token}`,
      },
    },
  );
  //console.log("course list", _data?.data?.course);

  return _data?.data;
};
