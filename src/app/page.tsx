'use client';

import { useState } from 'react';
import type { Template, SavedDocument } from '@/lib/types';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { TEMPLATES } from '@/lib/templates';
import { Header } from '@/components/Header';
import TemplateSelector from '@/components/TemplateSelector';
import DocumentForm from '@/components/DocumentForm';
import DocumentLibrary from '@/components/DocumentLibrary';
import DocumentViewer from '@/components/DocumentViewer';
import { useToast } from '@/hooks/use-toast';

export default function Home() {
  const [savedDocuments, setSavedDocuments] = useLocalStorage<SavedDocument[]>('legimate_documents', []);
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(null);
  const [viewingDocument, setViewingDocument] = useState<SavedDocument | null>(null);
  const { toast } = useToast();

  const handleSaveDocument = (documentName: string, documentText: string) => {
    const newDocument: SavedDocument = {
      id: new Date().toISOString() + Math.random(),
      documentName,
      documentText,
    };
    setSavedDocuments([...savedDocuments, newDocument]);
    setSelectedTemplate(null); // Reset selection
    toast({
      title: 'Success!',
      description: `Document "${documentName}" has been saved.`,
    });
  };
  
  const handleDeleteDocument = (id: string) => {
    const docToDelete = savedDocuments.find(doc => doc.id === id);
    setSavedDocuments(savedDocuments.filter(doc => doc.id !== id));
    setViewingDocument(null);
     if (docToDelete) {
      toast({
        title: 'Deleted',
        description: `"${docToDelete.documentName}" has been deleted.`,
        variant: 'destructive',
      });
    }
  };

  return (
    <div className="flex min-h-screen w-full flex-col bg-background font-body">
      <Header />
      <main className="flex-1 p-4 md:p-8">
        <div className="container mx-auto grid grid-cols-1 gap-8 lg:grid-cols-5">
          <div className="lg:col-span-2 flex flex-col gap-8">
            <TemplateSelector
              templates={TEMPLATES}
              selectedTemplate={selectedTemplate}
              onSelectTemplate={setSelectedTemplate}
            />
            {selectedTemplate && (
              <DocumentForm
                key={selectedTemplate.name} // To reset form state on template change
                selectedTemplate={selectedTemplate}
                onSaveDocument={handleSaveDocument}
                onCancel={() => setSelectedTemplate(null)}
              />
            )}
          </div>
          <div className="lg:col-span-3">
            <DocumentLibrary
              documents={savedDocuments}
              onViewDocument={setViewingDocument}
            />
          </div>
        </div>
      </main>
      {viewingDocument && (
        <DocumentViewer
          document={viewingDocument}
          onClose={() => setViewingDocument(null)}
          onDelete={handleDeleteDocument}
        />
      )}
    </div>
  );
}
