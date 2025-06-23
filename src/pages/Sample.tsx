import { useState } from "react";
// import { useResizeObserver } from "@wojtekmaj/react-hooks";
import { Document, Page } from "react-pdf";

const maxWidth = 800;

export default function Sample() {
  const [file, setFile] = useState<string | File | null>("./sample.pdf");
  const [numPages, setNumPages] = useState<number>();
  // const [containerRef, setContainerRef] = useState<HTMLElement | null>(null);
  const [containerWidth] = useState<number>();

  // const onResize = useCallback<ResizeObserverCallback>((entries) => {
  //   const [entry] = entries;
  //   if (entry) setContainerWidth(entry.contentRect.width);
  // }, []);

  // useResizeObserver(containerRef, {}, onResize);

  const onFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const nextFile = event.target.files?.[0];
    if (nextFile) setFile(nextFile);
  };

  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
  };

  return (
    <div>
      <header>
        <h1>react-pdf sample</h1>
      </header>
      <div>
        <label htmlFor="file">Load PDF:</label>
        <input type="file" onChange={onFileChange} />
        <div style={{ border: "2px solid #000", padding: "10px" }}>
          <Document file={file} onLoadSuccess={onDocumentLoadSuccess}>
            {Array.from({ length: numPages ?? 0 }, (_, index) => (
              <Page
                key={index}
                pageNumber={index + 1}
                width={
                  containerWidth ? Math.min(containerWidth, maxWidth) : maxWidth
                }
              />
            ))}
          </Document>
        </div>
      </div>
    </div>
  );
}
