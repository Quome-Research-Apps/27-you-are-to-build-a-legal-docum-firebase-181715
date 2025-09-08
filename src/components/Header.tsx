import { FileText } from 'lucide-react';

export function Header() {
  return (
    <header className="border-b bg-card/50 sticky top-0 z-10 backdrop-blur-sm">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-8">
        <div className="flex items-center gap-3">
          <FileText className="h-7 w-7 text-primary" />
          <h1 className="font-headline text-2xl font-bold text-primary">
            LegiMate
          </h1>
        </div>
        <p className="hidden text-sm text-muted-foreground md:block">Your Personal Document Library</p>
      </div>
    </header>
  );
}
