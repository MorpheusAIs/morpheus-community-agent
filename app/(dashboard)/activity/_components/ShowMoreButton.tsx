'use client';

import { useTransition } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';

type ShowMoreButtonProps = {
  totalCount: number;
  currentCount: number;
  pageSize?: number;
};

export function ShowMoreButton({ totalCount, currentCount, pageSize = 20 }: ShowMoreButtonProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  if (currentCount >= totalCount) return null;

  function handleShowMore() {
    startTransition(() => {
      const params = new URLSearchParams(searchParams);
      params.set('limit', String(currentCount + pageSize));
      router.push(`/activity?${params.toString()}`, { scroll: false });
    });
  }

  return (
    <div className="flex justify-center pt-2">
      <Button variant="outline" size="sm" onClick={handleShowMore} disabled={isPending}>
        {isPending ? 'Loading...' : `Show more (${totalCount - currentCount} remaining)`}
      </Button>
    </div>
  );
}
