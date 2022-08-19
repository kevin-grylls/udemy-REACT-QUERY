import { toast } from '@chakra-ui/react';
import { useQuery, useQueryClient } from 'react-query';

import type { Treatment } from '../../../../../shared/types';
import { axiosInstance } from '../../../axiosInstance';
import { queryKeys } from '../../../react-query/constants';
import { useCustomToast } from '../../app/hooks/useCustomToast';

// for when we need a query function for useQuery
async function getTreatments(): Promise<Treatment[]> {
  const { data } = await axiosInstance.get('/treatments');
  return data;
}

export function useTreatments(): Treatment[] {
  const fallback = [];
  const { data } = useQuery(queryKeys.treatments, getTreatments, {
    staleTime: 600000, // 10 minutes
    cacheTime: 900000, // 15 minutes (doesn't make )
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    // onError: (error) => {
    //   const title =
    //     error instanceof Error
    //       ? error.message
    //       : 'error connecting to the server';
    //   toast({ title, status: 'error' });
    // },
  });
  return data;
}

export function usePrefetchTreatments() {
  const queryClient = useQueryClient();
  queryClient.prefetchQuery(queryKeys.treatments, getTreatments, {
    staleTime: 600000, // 10 minutes
    cacheTime: 900000, // 15 minutes (doesn't make sense for staleTime to exceed cacheTime)
  });
}
