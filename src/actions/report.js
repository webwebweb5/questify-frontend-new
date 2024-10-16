import useSWR from 'swr';
import { useMemo } from 'react';

import axiosInstance, { fetcher, endpoints } from 'src/utils/axios';

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

  const { data, isLoading, error, isValidating } = useSWR(URL, fetcher, {
    shouldRetryOnError: false,
    revalidateOnFocus: false,
  });

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

export const updateReport = async (submissionId, score) => {
  const res = await axiosInstance.put(
    `${endpoints.report.update}?submissionId=${submissionId}`,
    score
  );
  return res.data;
};

export async function exportReport(laboratoryId) {
  const res = await axiosInstance.get(`${endpoints.export}?laboratoryId=${laboratoryId}`, {
    responseType: 'blob',
  });

  return res.data;
}
