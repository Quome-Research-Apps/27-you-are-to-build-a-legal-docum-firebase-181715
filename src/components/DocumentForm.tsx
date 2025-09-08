'use client';

import { useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import type { Template } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import { Save, X } from 'lucide-react';

interface DocumentFormProps {
  selectedTemplate: Template;
  onSaveDocument: (documentName: string, documentText: string) => void;
  onCancel: () => void;
}

type FormValues = {
  [key: string]: string;
};

export default function DocumentForm({ selectedTemplate, onSaveDocument, onCancel }: DocumentFormProps) {
  const { register, handleSubmit, getValues, formState: { errors } } = useForm<FormValues>();
  const [isSaveModalOpen, setSaveModalOpen] = useState(false);
  const [documentName, setDocumentName] = useState('');
  const { toast } = useToast();

  const placeholders = useMemo(() => {
    const matches = selectedTemplate.content.match(/\[(.*?)\]/g);
    return [...new Set(matches?.map(p => p.slice(1, -1)) || [])];
  }, [selectedTemplate]);

  const generateDocumentText = () => {
    const values = getValues();
    let text = selectedTemplate.content;
    placeholders.forEach(placeholder => {
      const regex = new RegExp(`\\[${placeholder}\\]`, 'g');
      text = text.replace(regex, values[placeholder] || `[${placeholder}]`);
    });
    return text;
  };
  
  const handleOpenSaveModal = () => {
    setSaveModalOpen(true);
  };

  const handleConfirmSave = () => {
    if (!documentName.trim()) {
      toast({
        title: 'Error',
        description: 'Please provide a name for the document.',
        variant: 'destructive',
      });
      return;
    }
    const documentText = generateDocumentText();
    onSaveDocument(documentName, documentText);
    setSaveModalOpen(false);
    setDocumentName('');
  };

  return (
    <>
      <Card className="shadow-lg animate-in fade-in-50 duration-500">
        <CardHeader>
          <div className="flex justify-between items-start">
            <div>
              <CardTitle className="font-headline text-2xl">Fill in the Details</CardTitle>
              <CardDescription>For: {selectedTemplate.name}</CardDescription>
            </div>
            <Button variant="ghost" size="icon" onClick={onCancel} aria-label="Cancel">
              <X className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>
        <form onSubmit={handleSubmit(handleOpenSaveModal)}>
          <CardContent className="space-y-4">
            {placeholders.map((placeholder) => (
              <div key={placeholder} className="grid w-full items-center gap-1.5">
                <Label htmlFor={placeholder} className="font-headline">{placeholder}</Label>
                <Input
                  id={placeholder}
                  {...register(placeholder, { required: `${placeholder} is required.` })}
                  placeholder={`Enter ${placeholder}`}
                  aria-invalid={errors[placeholder] ? "true" : "false"}
                />
                {errors[placeholder] && <p role="alert" className="text-sm text-destructive">{errors[placeholder]?.message}</p>}
              </div>
            ))}
          </CardContent>
          <CardFooter>
            <Button type="submit" className="w-full bg-accent hover:bg-accent/90 text-accent-foreground">
              <Save className="mr-2 h-4 w-4" />
              Generate and Save Document
            </Button>
          </CardFooter>
        </form>
      </Card>
      
      <Dialog open={isSaveModalOpen} onOpenChange={setSaveModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="font-headline">Name Your Document</DialogTitle>
            <DialogDescription>Give this document a unique name for easy identification in your library.</DialogDescription>
          </DialogHeader>
          <div className="space-y-2 py-4">
            <Label htmlFor="documentName">Document Name</Label>
            <Input
              id="documentName"
              value={documentName}
              onChange={(e) => setDocumentName(e.target.value)}
              placeholder="e.g., NDA with Acme Corp"
              autoFocus
              onKeyDown={(e) => e.key === 'Enter' && handleConfirmSave()}
            />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setSaveModalOpen(false)}>Cancel</Button>
            <Button onClick={handleConfirmSave} className="bg-accent hover:bg-accent/90 text-accent-foreground">Save</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
