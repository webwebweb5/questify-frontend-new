import useSWR from 'swr';
import { useMemo } from 'react';

import { fetcher, endpoints } from 'src/utils/axios';

export function useGetReportBySubmissionId(submissionId) {
  const URL = submissionId ? [endpoints.report.get, { params: { submissionId } }] : '';

  const { data, isLoading, error, isValidating } = useSWR(URL, fetcher);

  const memoizedValue = useMemo(
    () => ({
      report: data || {},
      reportLoading: isLoading,
      reportError: error,
      reportValidating: isValidating,
    }),
    [data, error, isLoading, isValidating]
  );

  return memoizedValue;
}

export function useGetGivenScoreByQuestionId(questionId) {
  // First, fetch the submission data using the questionId
  const submissionURL = questionId ? [endpoints.submission.get, { params: { questionId } }] : '';

  const {
    data: submissionData,
    isLoading: submissionLoading,
    error: submissionError,
    isValidating: submissionValidating,
  } = useSWR(submissionURL, fetcher);

  // Extract submissionId from the submission data
  const submissionId = submissionData?.data?.submissionId; // Assuming you want the first submission if multiple are returned

  // Then, fetch the report data using the submissionId
  const reportURL = submissionId ? [endpoints.report.get, { params: { submissionId } }] : '';

  const {
    data: reportData,
    isLoading: reportLoading,
    error: reportError,
    isValidating: reportValidating,
  } = useSWR(reportURL, fetcher);

  // Extract givenScore from the report data
  const givenScore = reportData?.givenScore;

  const memoizedValue = useMemo(
    () => ({
      reportData,
      givenScore,
      submissionLoading,
      submissionError,
      submissionValidating,
      reportLoading,
      reportError,
      reportValidating,
    }),
    [
      reportData,
      givenScore,
      submissionLoading,
      submissionError,
      submissionValidating,
      reportLoading,
      reportError,
      reportValidating,
    ]
  );

  return memoizedValue;
}
