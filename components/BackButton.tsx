'use client';

import { useRouter } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function BackButton({ fallbackHref, children }: { fallbackHref: string; children: React.ReactNode }) {
  const router = useRouter();

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={() => {
        if (window.history.length > 1) {
          router.back();
        } else {
          router.push(fallbackHref as any);
        }
      }}
    >
      <ArrowLeft className="mr-1 h-3 w-3" /> {children}
    </Button>
  );
}
