import type { Template } from '@/lib/types';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { FileText } from 'lucide-react';

interface TemplateSelectorProps {
  templates: Template[];
  selectedTemplate: Template | null;
  onSelectTemplate: (template: Template) => void;
}

export default function TemplateSelector({ templates, selectedTemplate, onSelectTemplate }: TemplateSelectorProps) {
  return (
    <Card className="shadow-lg border-2 border-transparent hover:border-accent/50 transition-colors duration-300">
      <CardHeader>
        <CardTitle className="font-headline text-2xl">Select a Template</CardTitle>
        <CardDescription>Choose a document to get started.</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        {templates.map((template) => (
          <div
            key={template.name}
            className={cn(
              "rounded-lg border bg-card p-4 cursor-pointer transition-all duration-200 hover:bg-accent/10 hover:shadow-md",
              selectedTemplate?.name === template.name && "ring-2 ring-offset-2 ring-offset-background ring-accent"
            )}
            onClick={() => onSelectTemplate(template)}
            tabIndex={0}
            role="button"
            aria-pressed={selectedTemplate?.name === template.name}
            onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && onSelectTemplate(template)}
          >
            <div className="flex items-center gap-4">
              <FileText className="h-6 w-6 text-accent" />
              <div className="flex flex-col">
                <span className="font-headline font-semibold">{template.name}</span>
                <p className="text-sm text-muted-foreground">
                  {template.content.trim().substring(0, 60)}...
                </p>
              </div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
