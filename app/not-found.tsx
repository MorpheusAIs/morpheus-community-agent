import { ArrowLeft, Search } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function NotFound() {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center gap-4 text-center">
      <Search className="h-10 w-10 text-muted-foreground/50" />
      <div>
        <h1 className="text-lg font-medium">Page not found</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          The page you're looking for doesn't exist.
        </p>
      </div>
      <Button variant="outline" size="sm" asChild>
        <Link href="/">
          <ArrowLeft className="mr-1 h-3 w-3" /> Back to dashboard
        </Link>
      </Button>
    </div>
  );
}
