import { useSuspenseQuery } from '@tanstack/react-query';
import type { CurrentUser } from '@/types';

const currentUserQueryKey = ['currentUser'] as const;

async function delay(ms: number) {
  return new Promise<void>((resolve) => setTimeout(resolve, ms));
}

/**
  Simulated API fetch for the current authenticated user.
  Returns hardcoded data for now.
*/
export async function fetchCurrentUser(): Promise<CurrentUser> {
  // Simulate a small network delay
  await delay(300);

  // Hardcoded user aligns with the UI label "Sandra Weber"
  return {
    username: 'sweber',
    firstName: 'Sandra',
    lastName: 'Weber',
    email: 'sandra.weber@example.com',
  };
}

/**
 * React Query hook to retrieve the current authenticated user.
 * Currently returns hardcoded data (fetch-on-render) and can be swapped
 * to a real API call later without changing the consumer API.
 */
export function useCurrentUser(): CurrentUser {
  const { data } = useSuspenseQuery({
    queryKey: currentUserQueryKey,
    queryFn: fetchCurrentUser,
    staleTime: 5 * 60 * 1000, // cache as fresh for 5 minutes
    gcTime: 30 * 60 * 1000, // garbage collect after 30 minutes
    refetchOnWindowFocus: false,
  });

  return data;
}
