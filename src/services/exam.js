import axios from 'axios';
import { BASE_URL } from './baseUrl';

export const getExamDetails = async (examId) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/exam-details`,
      { exam_id: examId },
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
    console.error(`Error fetching details for exam ID ${examId}:`, error);
    throw error;
  }
};

export const fetchSubscriptionList = async () => {
  let _data = await axios.post(
    `${BASE_URL}/subscription-list`,
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

export const fetchQuizDetails = async (token, quizid) => {
  let _data = await axios.post(
    `${BASE_URL}/students/quize-details`,
    {
      exam_quizze_id: quizid,
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

export const fetchQuizQuestions = async (token, quizid, offset) => {
  let _data = await axios.post(
    `${BASE_URL}/students/quize-question`,
    {
      exam_quizze_id: quizid,
      offset: offset,
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

export const QuizQuestionsSubmit = async (token, data) => {
  let _data = await axios.post(
    `${BASE_URL}/students/quize-exam-submit`,
    data,

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

export const fetchSeriesDetails = async (token, quizid, setid) => {
  let _data = await axios.post(
    `${BASE_URL}/students/series-details`,
    {
      exam_series_id: quizid,
      series_set_id: setid,
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

export const fetchSeriesQuestions = async (token, quizid, setid, offset) => {
  let _data = await axios.post(
    `${BASE_URL}/students/series-question`,
    {
      exam_series_id: quizid,
      series_set_id: setid,
      offset: offset,
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

export const SeriesQuestionsSubmit = async (token, data) => {
  let _data = await axios.post(
    `${BASE_URL}/students/series-exam-submit`,
    data,

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

export const getStudentResult = async (token, result) => {
  let _data = await axios.post(
    `${BASE_URL}/students/my-results-details`,
    {
      result_id: result,
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

export const getStudentAllResult = async (
  token,
  searchName,
  from_date,
  to_date,
  limit,
  offset,
) => {
  let _data = await axios.post(
    `${BASE_URL}/students/my-results`,
    {
      searchName: searchName,
      from_date: from_date,
      to_date: to_date,
      limit: limit,
      offset: offset,
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
