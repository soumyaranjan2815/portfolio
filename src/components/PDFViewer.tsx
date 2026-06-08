import React, { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Download, ExternalLink, Loader2, BookOpen, FileText } from "lucide-react";

interface PDFViewerProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  pdfUrl: string;
  doi?: string;
  journal?: string;
  abstract?: string;
}

export default function PDFViewer({
  isOpen,
  onClose,
  title,
  pdfUrl,
  doi,
  journal,
  abstract,
}: PDFViewerProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Reset loading state when the PDF URL changes or dialog reopens
  useEffect(() => {
    if (isOpen) {
      setIsLoading(true);
      // Safety timeout: auto-clear loading overlay after 2 seconds in case browser onLoad event doesn't fire
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [pdfUrl, isOpen]);

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-5xl w-[92vw] h-[85vh] flex flex-col p-6 gap-4 bg-background/95 backdrop-blur-md border border-border shadow-2xl rounded-2xl overflow-hidden">
        <DialogHeader className="flex flex-col gap-1.5 border-b border-border pb-4 shrink-0 pr-6">
          <div className="flex items-center gap-2 text-xs font-mono text-primary font-medium">
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
            {journal || "Scientific Publication"}
          </div>
          <DialogTitle className="text-xl font-display font-bold leading-tight text-foreground text-left line-clamp-2">
            {title}
          </DialogTitle>
          {doi && (
            <a
              href={`https://doi.org/${doi}`}
              target="_blank"
              rel="noreferrer"
              className="text-xs text-muted-foreground hover:text-primary transition inline-flex items-center gap-1 w-fit mt-1"
            >
              DOI: {doi} <ExternalLink className="w-3 h-3" />
            </a>
          )}
        </DialogHeader>

        {/* Toolbar & Action Buttons */}
        <div className="flex flex-wrap items-center justify-between gap-3 bg-secondary/30 p-3 rounded-xl border border-border/50 shrink-0">
          <span className="text-xs text-muted-foreground hidden sm:inline-flex items-center gap-1.5 font-mono">
            <FileText className="w-3.5 h-3.5" /> PDF Document Reader
          </span>
          <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
            <a href={pdfUrl} download className="flex-1 sm:flex-initial">
              <Button
                variant="outline"
                size="sm"
                className="w-full gap-1.5 rounded-lg border-border hover:bg-background/80 hover:border-primary/50 cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" /> Download
              </Button>
            </a>
            <a href={pdfUrl} target="_blank" rel="noreferrer" className="flex-1 sm:flex-initial">
              <Button
                size="sm"
                className="w-full gap-1.5 bg-primary hover:bg-primary/95 text-primary-foreground font-medium rounded-lg shadow-sm cursor-pointer"
              >
                <ExternalLink className="w-3.5 h-3.5" /> Open Tab
              </Button>
            </a>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 min-h-0 w-full relative bg-secondary/10 border border-border/40 rounded-xl overflow-hidden flex items-center justify-center">
          {isMobile ? (
            /* Mobile Fallback View */
            <div className="max-w-md p-6 text-center flex flex-col items-center justify-center gap-4 h-full overflow-y-auto">
              <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mb-2 shadow-inner border border-primary/10">
                <BookOpen className="w-8 h-8" />
              </div>
              <h3 className="font-semibold text-lg text-foreground">
                Interactive Reader on Mobile
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Mobile browsers do not support rendering interactive PDFs directly. Please use the
                options above to view or download the paper.
              </p>
              {abstract && (
                <div className="mt-4 p-4 rounded-xl bg-background/50 border border-border/50 text-left">
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-primary font-mono mb-2">
                    Abstract Preview
                  </h4>
                  <p className="text-xs text-muted-foreground leading-relaxed line-clamp-6">
                    {abstract}
                  </p>
                </div>
              )}
            </div>
          ) : (
            /* Desktop PDF Embed */
            <>
              {isLoading && (
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-background/60 backdrop-blur-sm z-10 transition-opacity duration-300">
                  <Loader2 className="w-8 h-8 text-primary animate-spin" />
                  <span className="text-xs font-mono text-muted-foreground">
                    Loading manuscript...
                  </span>
                </div>
              )}
              <iframe
                src={pdfUrl}
                className="w-full h-full border-none rounded-xl"
                title={title}
                onLoad={() => setIsLoading(false)}
              />
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
