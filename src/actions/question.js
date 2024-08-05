import useSWR from 'swr';
import { useMemo } from 'react';

import axiosInstance, { fetcher, endpoints } from 'src/utils/axios';

// ----------------------------------------------------------------------

export function useGetQuestionById(questionId) {
  const URL = questionId ? [endpoints.question.details, { params: { questionId } }] : '';

  const { data, isLoading, error, isValidating } = useSWR(URL, fetcher);

  const memoizedValue = useMemo(
    () => ({
      question: data?.data || {},
      questionLoading: isLoading,
      questionError: error,
      questionValidating: isValidating,
    }),
    [data?.data, error, isLoading, isValidating]
  );

  return memoizedValue;
}

// ----------------------------------------------------------------------

export function useGetQuestionsProf(laboratoryId) {
  const URL = laboratoryId ? [endpoints.question.list, { params: { laboratoryId } }] : '';

  const { data, isLoading, error, isValidating } = useSWR(URL, fetcher);

  const memoizedValue = useMemo(
    () => ({
      questions: data?.data || [],
      questionsLoading: isLoading,
      questionsError: error,
      questionsValidating: isValidating,
      questionsEmpty: !isLoading && !data?.data.length,
    }),
    [data?.data, error, isLoading, isValidating]
  );

  return memoizedValue;
}

// ----------------------------------------------------------------------

export async function createQuestion(laboratoryId, questionData) {
  const res = await axiosInstance.post(
    `${endpoints.question.create}?laboratoryId=${laboratoryId}`,
    questionData
  );

  return res.data;
}

export async function updateQuestion(questionId, questionData) {
  const res = await axiosInstance.put(
    `${endpoints.question.update}?questionId=${questionId}`,
    questionData
  );

  return res.data;
}

// ----------------------------------------------------------------------

export function useGetALlTestCases(questionId) {
  const URL = questionId ? [endpoints.testCase.list, { params: { questionId } }] : '';

  const { data, isLoading, error, isValidating } = useSWR(URL, fetcher);

  const memoizedValue = useMemo(
    () => ({
      testCases: data?.data || [],
      testCasesLoading: isLoading,
      testCasesError: error,
      testCasesValidating: isValidating,
      testCasesEmpty: !isLoading && !data?.data.length,
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [data?.data, error, isLoading, isValidating]
  );

  return memoizedValue;
}

// ----------------------------------------------------------------------

export async function createTestCase(questionId, testCaseData) {
  const res = await axiosInstance.post(
    `${endpoints.testCase.create}?questionId=${questionId}`,
    testCaseData
  );

  return res.data;
}

export async function updateTestCase(testCaseId, testCaseData) {
  const res = await axiosInstance.put(
    `${endpoints.testCase.update}?testCaseId=${testCaseId}`,
    testCaseData
  );

  return res.data;
}
