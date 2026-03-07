'use client';

import type { ReactNode } from 'react';
import { useActiveStreams } from './ActiveStreamsContext';

export function ActivityCardGlow({
  threadKey,
  children,
}: {
  threadKey?: string;
  children: ReactNode;
}) {
  const { activeThreadKeys } = useActiveStreams();
  const isActive = threadKey ? activeThreadKeys.includes(threadKey) : false;

  if (!isActive) return children;

  return (
    <div className="rounded-xl ring-2 ring-green-500/40 [&_[data-slot=card]]:border-transparent [&_[data-slot=card]]:bg-green-500/5">
      {children}
    </div>
  );
}
