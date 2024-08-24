import { useMemo } from 'react';
import useSWR, { mutate } from 'swr';

import axiosInstance, { fetcher, endpoints } from 'src/utils/axios';

// ----------------------------------------------------------------------

// const swrOptions = {
//   revalidateIfStale: false,
//   revalidateOnFocus: false,
//   revalidateOnReconnect: false,
// };

// ----------------------------------------------------------------------

export function useGetLaboratories() {
  const URL = endpoints.laboratory.list;

  const { data, isLoading, error, isValidating } = useSWR(URL, fetcher);

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

export function useGetStudentByLaboratoryId(laboratoryId) {
  const URL = laboratoryId ? [endpoints.laboratory.details, { params: { laboratoryId } }] : '';

  const { data, isLoading, error, isValidating } = useSWR(URL, fetcher);

  const memoizedValue = useMemo(
    () => ({
      students: data?.data?.students || [],
      studentsLoading: isLoading,
      studentsError: error,
      studentsValidating: isValidating,
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [data?.data, error, isLoading, isValidating]
  );

  return memoizedValue;
}

// ----------------------------------------------------------------------

export async function createLaboratory(laboratoryData) {
  const res = await axiosInstance.post(`${endpoints.laboratory.create}`, laboratoryData);

  return res.data;
}

// ----------------------------------------------------------------------

export async function deleteLaboratory(laboratoryId) {
  const res = await axiosInstance.delete(
    `${endpoints.laboratory.delete}?laboratoryId=${laboratoryId}`
  );

  return res.data;
}

// ----------------------------------------------------------------------

export async function updateLaboratory(laboratoryId, laboratoryData) {
  const res = await axiosInstance.put(
    `${endpoints.laboratory.update}?laboratoryId=${laboratoryId}`,
    laboratoryData
  );

  return res.data;
}

// ----------------------------------------------------------------------

export const removeStudentFromLaboratory = async (laboratoryId, studentId) => {
  const res = await axiosInstance.delete(
    `${endpoints.laboratory.removeStudent}?laboratoryId=${laboratoryId}&studentId=${studentId}`
  );
  return res.data;
};

// ----------------------------------------------------------------------

export const assignLaboratory = async (laboratoryId) => {
  const res = await axiosInstance.get(
    `${endpoints.laboratory.assignQuestion}?laboratoryId=${laboratoryId}`
  );
  return res.data;
};
