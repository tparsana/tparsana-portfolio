
import React from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { FileText } from "lucide-react";
import { cn } from "@/lib/utils";

interface ResumeViewerProps {
  triggerClassName?: string;
}

const ResumeViewer: React.FC<ResumeViewerProps> = ({ triggerClassName }) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button 
          variant="link" 
          className={cn("px-3 py-2 text-sm font-medium hover:text-primary transition-colors relative after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:bg-primary after:transition-all hover:after:w-full flex items-center", 
            triggerClassName
          )}
        >
          Resume <FileText className="h-3 w-3 ml-1" />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-auto">
        <DialogHeader>
          <DialogTitle>Resume</DialogTitle>
          <DialogDescription>
            View my professional resume
          </DialogDescription>
        </DialogHeader>
        <div className="mt-4">
          <img 
            src="/lovable-uploads/b9a581e3-cfdb-4614-9018-f55726ba64a5.png" 
            alt="Tanish Parsana Resume" 
            className="w-full h-auto rounded-md shadow-md" 
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ResumeViewer;
