import { Button } from "@/components/ui/button";
import { ZoomIn, ZoomOut, ChevronLeft, ChevronRight, ExternalLink } from "lucide-react";
import { useState } from "react";

interface PdfViewerProps {
  pdfUrl: string;
}

export const PdfViewer = ({ pdfUrl }: PdfViewerProps) => {
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [scale, setScale] = useState<number>(100);

  const handleZoomIn = () => {
    setScale((prev) => Math.min(prev + 20, 200));
  };

  const handleZoomOut = () => {
    setScale((prev) => Math.max(prev - 20, 50));
  };

  const handlePrevPage = () => {
    setPageNumber((prev) => Math.max(prev - 1, 1));
  };

  const handleNextPage = () => {
    setPageNumber((prev) => prev + 1);
  };

  const handleOpenExternal = () => {
    window.open(pdfUrl, "_blank");
  };

  return (
    <div className="h-full flex flex-col bg-muted/30">
      {/* PDF Controls */}
      <div className="flex items-center justify-between p-4 border-b border-border bg-background">
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handlePrevPage}
            disabled={pageNumber <= 1}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <span className="text-sm text-muted-foreground min-w-[80px] text-center">
            Page {pageNumber}
          </span>
          <Button
            variant="outline"
            size="sm"
            onClick={handleNextPage}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={handleZoomOut}>
            <ZoomOut className="h-4 w-4" />
          </Button>
          <span className="text-sm text-muted-foreground min-w-[60px] text-center">
            {scale}%
          </span>
          <Button variant="outline" size="sm" onClick={handleZoomIn}>
            <ZoomIn className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="sm" onClick={handleOpenExternal} title="Open in new tab">
            <ExternalLink className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* PDF Display */}
      <div className="flex-1 overflow-auto">
        <iframe
          src={`${pdfUrl}#page=${pageNumber}&zoom=${scale}&toolbar=0&navpanes=0`}
          className="w-full h-full border-0"
          title="Lease Document"
        />
      </div>
    </div>
  );
};
