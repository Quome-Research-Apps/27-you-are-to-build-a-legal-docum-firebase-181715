import type { SavedDocument } from '@/lib/types';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
  SheetClose
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Copy, Trash2 } from 'lucide-react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

interface DocumentViewerProps {
  document: SavedDocument;
  onClose: () => void;
  onDelete: (id: string) => void;
}

export default function DocumentViewer({ document, onClose, onDelete }: DocumentViewerProps) {
  const { toast } = useToast();

  const handleCopy = () => {
    navigator.clipboard.writeText(document.documentText);
    toast({
      title: 'Copied!',
      description: 'Document text has been copied to your clipboard.',
    });
  };

  return (
    <Sheet open={!!document} onOpenChange={(open) => !open && onClose()}>
      <SheetContent className="w-full sm:max-w-2xl flex flex-col p-0">
        <SheetHeader className="p-6 pb-4">
          <SheetTitle className="font-headline text-2xl">{document.documentName}</SheetTitle>
          <SheetDescription>View, copy, or delete your saved document.</SheetDescription>
        </SheetHeader>
        <div className="flex-1 min-h-0 px-6">
          <ScrollArea className="h-full rounded-md border">
            <pre className="p-4 text-sm font-mono whitespace-pre-wrap break-words">
              {document.documentText}
            </pre>
          </ScrollArea>
        </div>
        <SheetFooter className="p-6 bg-muted/50 mt-auto flex flex-col-reverse sm:flex-row sm:justify-between items-center gap-2">
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="destructive" className="w-full sm:w-auto">
                  <Trash2 className="mr-2 h-4 w-4" />
                  Delete Document
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle className="font-headline">Are you absolutely sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete the document "{document.documentName}".
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={() => onDelete(document.id)}>Continue</AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>

            <div className="flex gap-2 w-full sm:w-auto">
                <Button variant="secondary" onClick={handleCopy} className="w-full">
                    <Copy className="mr-2 h-4 w-4" />
                    Copy Text
                </Button>
                <SheetClose asChild>
                    <Button variant="outline" className="w-full">Close</Button>
                </SheetClose>
            </div>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
