'use client';

import { useEffect } from 'react';
import { AlertCircle, ArrowLeft, RotateCcw } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

type ErrorProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function ConversationError({ error, reset }: ErrorProps) {
  useEffect(() => {
    console.error('Conversation error:', error);
  }, [error]);

  return (
    <div className="p-4">
      <Button variant="ghost" size="sm" className="mb-3" asChild>
        <Link href="/activity">
          <ArrowLeft className="mr-1 h-3 w-3" /> Activity
        </Link>
      </Button>
      <Card>
        <CardContent className="flex flex-col items-center justify-center py-8 text-center">
          <AlertCircle className="h-8 w-8 text-destructive/50" />
          <h2 className="mt-3 text-base font-medium">Failed to load conversation</h2>
          <p className="mt-1 max-w-sm text-sm text-muted-foreground">
            {error.message || 'Something went wrong while loading this conversation.'}
          </p>
          <Button variant="outline" size="sm" className="mt-4" onClick={reset}>
            <RotateCcw className="mr-1.5 h-3 w-3" />
            Try again
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
