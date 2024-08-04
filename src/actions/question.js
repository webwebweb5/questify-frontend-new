import { useMemo } from 'react';
import useSWR, { mutate } from 'swr';

import axiosInstance, { fetcher, endpoints } from 'src/utils/axios';

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

export function useGetLaboratoryById(laboratoryId) {
  const URL = laboratoryId ? [endpoints.laboratory.details, { params: { laboratoryId } }] : '';

  const { data, isLoading, error, isValidating } = useSWR(URL, fetcher);

  const memoizedValue = useMemo(
    () => ({
      laboratory: data?.data || {},
      laboratoryLoading: isLoading,
      laboratoryError: error,
      laboratoryValidating: isValidating,
      mutateLaboratory: () => mutate(URL),
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
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

export async function createTestCase(questionId, testCaseData) {
  const res = await axiosInstance.post(
    `${endpoints.testCase.create}?questionId=${questionId}`,
    testCaseData
  );

  return res.data;
}
