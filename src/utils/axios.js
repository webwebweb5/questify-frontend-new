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
  },
  question: {
    list: '/api/v1/question/laboratory',
    create: '/api/v1/question',
    update: '/api/v1/question',
    details: '/api/v1/question',
    delete: '/api/v1/question',
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
  },
  logging: '/api/v1/submission/log',
};
