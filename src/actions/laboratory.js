import useSWR from 'swr';
import { useMemo } from 'react';

import { fetcher, endpoints } from 'src/utils/axios';

// ----------------------------------------------------------------------

const swrOptions = {
  revalidateIfStale: false,
  revalidateOnFocus: false,
  revalidateOnReconnect: false,
};

// ----------------------------------------------------------------------

export function useGetLaboratories() {
  const URL = endpoints.laboratory.list;

  const { data, isLoading, error, isValidating } = useSWR(URL, fetcher, swrOptions);

  const memoizedValue = useMemo(
    () => ({
      laboratories: data?.data || [],
      laboratoriesLoading: isLoading,
      laboratoriesError: error,
      laboratoriesValidating: isValidating,
      laboratoriesEmpty: !isLoading && !data?.data.length,
    }),
    [data?.data, error, isLoading, isValidating]
  );

  return memoizedValue;
}

// ----------------------------------------------------------------------

export function useGetLaboratoryById(laboratoryId) {
  const URL = laboratoryId ? [endpoints.laboratory.details, { params: { laboratoryId } }] : '';

  const { data, isLoading, error, isValidating } = useSWR(URL, fetcher, swrOptions);

  const memoizedValue = useMemo(
    () => ({
      laboratory: data?.data || {},
      laboratoryLoading: isLoading,
      laboratoryError: error,
      laboratoryValidating: isValidating,
    }),
    [data?.data, error, isLoading, isValidating]
  );

  return memoizedValue;
}

// ----------------------------------------------------------------------
