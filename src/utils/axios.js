import axios from 'axios';

import { CONFIG } from 'src/config-global';

// ----------------------------------------------------------------------

const axiosInstance = axios.create({ baseURL: CONFIG.site.serverUrl });

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject((error.response && error.response.data) || 'Something went wrong!')
);

export default axiosInstance;

// ----------------------------------------------------------------------

export const fetcher = async (args) => {
  try {
    const [url, config] = Array.isArray(args) ? args : [args];

    const res = await axiosInstance.get(url, { ...config });

    return res.data;
  } catch (error) {
    console.error('Failed to fetch:', error);
    throw error;
  }
};

// ----------------------------------------------------------------------

export const updateLaboratory = async (laboratoryId, data) => {
  try {
    const res = await axiosInstance.put(
      `${endpoints.laboratory.update}?laboratoryId=${laboratoryId}`,
      data
    );
    return res.data;
  } catch (error) {
    console.error('Update Laboratory Error:', error);
    throw error;
  }
};

// ----------------------------------------------------------------------

export const endpoints = {
  laboratory: {
    list: '/api/v1/laboratory/',
    details: '/api/v1/laboratory',
    create: '/api/v1/laboratory/',
    delete: '/api/v1/laboratory',
    update: '/api/v1/laboratory',
    removeStudent: '/api/v1/laboratory/remove',
    assignQuestion: '/api/v1/laboratory/assign-question',
  },
  question: {
    list: '/api/v1/question/laboratory',
    create: '/api/v1/question',
    update: '/api/v1/question',
    details: '/api/v1/question',
    delete: '/api/v1/question',
    student: '/api/v1/question/assignment',
  },
  testCase: {
    create: '/api/v1/testcase',
    list: '/api/v1/testcase/question',
    update: '/api/v1/testcase',
  },
  student: {
    list: '/api/v1/student',
  },
  submission: {
    get: '/api/v1/submission',
    submit: '/api/v1/submission/submit',
  },
  logging: '/api/v1/submission/log',
  join: '/api/v1/laboratory/join',
  report: {
    get: '/api/v1/report',
    getAll: '/api/v1/report/laboratory',
    update: '/api/v1/report',
  },
};
