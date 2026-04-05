import React from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { FileText } from "lucide-react";
import { cn } from "@/lib/utils";

interface ResumeViewerProps {
  triggerClassName?: string;
  triggerVariant?: "nav-link" | "pill";
  triggerLabel?: string;
}

const ResumeViewer: React.FC<ResumeViewerProps> = ({
  triggerClassName,
  triggerVariant = "nav-link",
  triggerLabel = "Resume",
}) => {
  const dropboxUrl = "https://www.dropbox.com/scl/fi/giyf06z67js3d5zxuy2w9/TParsana-Resume-Mar26.pdf?rlkey=3dxgd96luyiqo30meua1zmhv8&st=rfkh9vq7&raw=1";
  const isPillTrigger = triggerVariant === "pill";

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button 
          variant={isPillTrigger ? "ghost" : "link"}
          className={cn(
            isPillTrigger
              ? "h-9 rounded-full bg-white px-4 text-sm font-semibold text-black shadow-[0_1px_0_rgba(255,255,255,0.3)_inset,0_12px_24px_rgba(0,0,0,0.22)] transition-transform duration-300 hover:scale-[1.02] hover:bg-white/95 hover:text-black"
              : "px-3 py-2 text-sm font-medium transition-colors relative after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:bg-primary after:transition-all hover:after:w-full flex items-center",
            triggerClassName
          )}
        >
          {triggerLabel} <FileText className={cn("ml-1", isPillTrigger ? "h-4 w-4" : "h-3 w-3")} />
        </Button>
      </DialogTrigger>

      <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden">
        <DialogHeader>
          <DialogTitle>Resume</DialogTitle>
          <DialogDescription className="flex items-center justify-between">
            <span>View my professional resume</span>
            <span className="text-xs font-mono text-muted-foreground">
              Last Modified: Apr 2026
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
