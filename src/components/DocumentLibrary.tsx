import type { SavedDocument } from '@/lib/types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { File, Inbox } from 'lucide-react';

interface DocumentLibraryProps {
  documents: SavedDocument[];
  onViewDocument: (document: SavedDocument) => void;
}

export default function DocumentLibrary({ documents, onViewDocument }: DocumentLibraryProps) {
  const sortedDocuments = [...documents].reverse();

  return (
    <Card className="shadow-lg h-full">
      <CardHeader>
        <CardTitle className="font-headline text-2xl">Document Library</CardTitle>
        <CardDescription>View and manage your saved documents.</CardDescription>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[450px] pr-4">
          {sortedDocuments.length > 0 ? (
            <div className="space-y-3">
              {sortedDocuments.map((doc) => (
                <div
                  key={doc.id}
                  className="flex items-center justify-between rounded-lg border p-3 hover:bg-muted/50 transition-colors"
                >
                  <div className="flex items-center gap-3 overflow-hidden">
                    <File className="h-5 w-5 text-primary flex-shrink-0" />
                    <span className="font-medium font-headline truncate" title={doc.documentName}>{doc.documentName}</span>
                  </div>
                  <Button variant="outline" size="sm" onClick={() => onViewDocument(doc)} className="flex-shrink-0">
                    View
                  </Button>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center text-center text-muted-foreground h-[200px]">
              <Inbox className="h-12 w-12 mb-4" />
              <h3 className="text-lg font-semibold font-headline">Library is Empty</h3>
              <p className="text-sm">Select a template to create your first document.</p>
            </div>
          )}
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
