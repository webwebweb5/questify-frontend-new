import useSWR from 'swr';
import { useMemo } from 'react';

import { fetcher, endpoints } from 'src/utils/axios';

export function useGetReportBySubmissionId(submissionId) {
  const URL = submissionId ? [endpoints.report.get, { params: { submissionId } }] : '';

  const { data, isLoading, error, isValidating } = useSWR(URL, fetcher);

  const memoizedValue = useMemo(
    () => ({
      report: data?.data || {},
      reportLoading: isLoading,
      reportError: error,
      reportValidating: isValidating,
    }),
    [data, error, isLoading, isValidating]
  );

  return memoizedValue;
}

export function useGetReportsByLaboratoryId(laboratoryId) {
  const URL = laboratoryId ? [endpoints.report.getAll, { params: { laboratoryId } }] : '';

  const { data, isLoading, error, isValidating } = useSWR(URL, fetcher);

  const memoizedValue = useMemo(
    () => ({
      reports: data?.data || [],
      reportsLoading: isLoading,
      reportsError: error,
      reportsValidating: isValidating,
    }),
    [data, error, isLoading, isValidating]
  );

  return memoizedValue;
}

export function useGetReportByQuestionId(questionId) {
  const URL = questionId ? [endpoints.report.get, { params: { questionId } }] : '';

  const { data, isLoading, error, isValidating } = useSWR(URL, fetcher);

  const memoizedValue = useMemo(
    () => ({
      report: data?.data || {},
      reportLoading: isLoading,
      reportError: error,
      reportValidating: isValidating,
    }),
    [data, error, isLoading, isValidating]
  );

  return memoizedValue;
}
