'use client';

import { useEffect } from 'react';
import { AlertOctagon, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';

type ErrorProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function GlobalError({ error, reset }: ErrorProps) {
  useEffect(() => {
    console.error('Unhandled error:', error);
  }, [error]);

  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-6 text-center">
      <div className="rounded-full bg-destructive/10 p-4">
        <AlertOctagon className="h-8 w-8 text-destructive" />
      </div>
      <h1 className="mt-6 text-2xl font-semibold">Something went wrong</h1>
      <p className="mt-2 max-w-md text-sm text-muted-foreground">
        An unexpected error occurred. If this keeps happening, try refreshing the page or contact
        support.
      </p>
      {error.digest && (
        <p className="mt-3 font-mono text-xs text-muted-foreground/50">Error ID: {error.digest}</p>
      )}
      <Button variant="outline" className="mt-6" onClick={reset}>
        <RotateCcw className="mr-2 h-4 w-4" />
        Try again
      </Button>
    </div>
  );
}
