import useSWR from 'swr';
import { useMemo } from 'react';

import axiosInstance, { fetcher, endpoints } from 'src/utils/axios';

// --------------------------Submissions---------------------------------

export function useGetSubmissionsByQuestionId(questionId) {
  const URL = questionId ? [endpoints.submission.get, { params: { questionId } }] : '';

  const { data, isLoading, error, isValidating } = useSWR(URL, fetcher);

  const memoizedValue = useMemo(
    () => ({
      submission: data?.data || {},
      submissionLoading: isLoading,
      submissionError: error,
      submissionValidating: isValidating,
    }),
    [data?.data, error, isLoading, isValidating]
  );

  return memoizedValue;
}

export function useGetSubmissionsAndTestCases(questionId) {
  const submissionURL = questionId ? [endpoints.submission.get, { params: { questionId } }] : '';
  const testCaseURL = questionId ? [endpoints.testCase.list, { params: { questionId } }] : '';

  const {
    data: submissionData,
    isLoading: submissionLoading,
    error: submissionError,
    isValidating: submissionValidating,
  } = useSWR(submissionURL, fetcher, {
    shouldRetryOnError: false,
    revalidateOnFocus: false,
  });

  const {
    data: testCaseData,
    isLoading: testCaseLoading,
    error: testCaseError,
    isValidating: testCaseValidating,
  } = useSWR(testCaseURL, fetcher, {
    shouldRetryOnError: false,
    revalidateOnFocus: false,
  });

  const memoizedValue = useMemo(
    () => ({
      submissions: submissionData?.data || {},
      testCases: testCaseData?.data || [],
      loading: submissionLoading || testCaseLoading,
      error: submissionError || testCaseError,
      validating: submissionValidating || testCaseValidating,
    }),
    [
      submissionData?.data,
      testCaseData?.data,
      submissionLoading,
      testCaseLoading,
      submissionError,
      testCaseError,
      submissionValidating,
      testCaseValidating,
    ]
  );

  return memoizedValue;
}

// ----------------------------------------------------------------------

export const updateAndExecuteSubmission = async (questionId, testCaseId, language, code) => {
  // update
  await axiosInstance.put(
    `/api/v1/submission?questionId=${questionId}&language=${language}&submissionStatus=ACTIVE`,
    code,
    {
      headers: {
        'Content-Type': 'text/plain',
      },
    }
  );

  // execute
  const res = await axiosInstance.post(
    `/api/v1/submission/execute?language=${language}&questionId=${questionId}&testCaseId=${testCaseId}`
  );
  return res.data;
};

export const updateSubmission = async (questionId, language, code) => {
  const res = await axiosInstance.put(
    `/api/v1/submission?questionId=${questionId}&language=${language}&submissionStatus=ACTIVE`,
    code,
    {
      headers: {
        'Content-Type': 'text/plain',
      },
    }
  );
  return res.data;
};

// ----------------------------------------------------------------------

export const submitSubmission = async (submissionId) => {
  const res = await axiosInstance.post(
    `${endpoints.submission.submit}?submissionId=${submissionId}`
  );
  return res.data;
};
