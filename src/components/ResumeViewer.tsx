import React from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { FileText } from "lucide-react";
import { cn } from "@/lib/utils";

interface ResumeViewerProps {
  triggerClassName?: string;
}

const ResumeViewer: React.FC<ResumeViewerProps> = ({ triggerClassName }) => {
  const dropboxUrl = "https://www.dropbox.com/scl/fi/e0jal6faxjd5zds7xm4k4/TParsana-Resume-Feb-26.pdf?rlkey=bol6adzz29hpewlhr8uy64bho&st=67u7evna&raw=1";

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button 
          variant="link" 
          className={cn(
            "px-3 py-2 text-sm font-medium hover:text-primary transition-colors relative after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:bg-primary after:transition-all hover:after:w-full flex items-center", 
            triggerClassName
          )}
        >
          Resume <FileText className="h-3 w-3 ml-1" />
        </Button>
      </DialogTrigger>

      <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden">
        <DialogHeader>
          <DialogTitle>Resume</DialogTitle>
          <DialogDescription className="flex items-center justify-between">
            <span>View my professional resume</span>
            <span className="text-xs font-mono text-muted-foreground">
              Last Modified: Feb 2026
            </span>
          </DialogDescription>
        </DialogHeader>

        <div className="mt-4 w-full h-[75vh]">
          <iframe
            src={dropboxUrl}
            title="Tanish Parsana Resume"
            className="w-full h-full rounded-md border"
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ResumeViewer;
