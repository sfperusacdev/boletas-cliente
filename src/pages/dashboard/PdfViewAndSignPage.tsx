import { useEffect, useRef, useState } from "react";
import { DocumentosService } from "../../services/envio_documentos";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { use100vh } from "react-div-100vh";
import { ArrowDownToLine, CircleArrowLeft, PencilLine, ZoomIn, ZoomOut } from "lucide-react";
import { Document, Page } from "react-pdf";
import { useScreenSize } from "../../hooks/useScreenSize";
import { useMutation } from "@tanstack/react-query";
import classNames from "classnames";
import { useConfirmModal } from "../../hooks/useConfirmModal";
import toast from "react-hot-toast";
import { saveBlob } from "../../utils/blob";

export const PdfViewAndSignPage = () => {
  const location = useLocation();
  const { openModal } = useConfirmModal();
  const { isMobile } = useScreenSize();
  let height = use100vh();
  height ??= window.innerHeight;

  const navigate = useNavigate();
  const { pdfname: pdfnamePath, estado } = useParams<{ pdfname: string; estado: string }>();

  const [pendiente, setDocumentoPendiente] = useState(estado === "published");
  const [pdfname, setPdfName] = useState(pdfnamePath);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | string | null>(null);
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [numPages, setNumPages] = useState<number | null>(null);
  const [scale, setScale] = useState(1.0);
  const done = useRef(false);

  const mutation = useMutation({
    mutationFn: DocumentosService.signPDF,
    onSuccess: ({ signed_pdf_name }) => {
      toast.success("Documento firmado correctamente.");
      setDocumentoPendiente(false);
      navigate(`/dashboard/pdf/${signed_pdf_name}/signed`, { replace: true });
      setPdfName(signed_pdf_name);
      done.current = false;
    },
    onError: (err) => toast.error(`Error al firmar el documento: ${err.message}`),
  });

  const handleSignDocument = async () => {
    if (!pdfname) {
      alert("No se ha seleccionado ningún documento para firmar.");
      return;
    }
    const userConfirmed = await openModal("Confirmar Firma", "¿Estás seguro de que deseas firmar este documento?");
    if (!userConfirmed) return;
    mutation.mutate(pdfname);
  };

  useEffect(() => {
    if (done.current) return;
    done.current = true;
    (async () => {
      if (pdfname == null) {
        setError("No PDF name provided");
        setLoading(false);
        return;
      }

      try {
        const pdfBlob = await DocumentosService.downloadPdf(pdfname);
        setPdfFile(new File([pdfBlob], pdfname, { type: "application/pdf" }));
        setLoading(false);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An unknown error occurred");
        setLoading(false);
      }
    })();
  }, [pdfname]);

  if (loading) return <div className="flex items-center justify-center h-screen">Loading...</div>;

  if (error != null)
    return (
      <div className="flex items-center justify-center h-screen text-red-500">
        Error: {typeof error === "string" ? error : error.message}
      </div>
    );
  if (pdfFile == null) return <div className="flex items-center justify-center h-screen">Unable to load PDF.</div>;

  return (
    <div className={classNames("w-full relative bg-base-100")} style={{ height: isMobile ? height - 72 : height }}>
      <div className="absolute bg-black/20 w-full h-10 top-0 flex justify-between items-center px-4 z-10">
        <CircleArrowLeft
          className="w-5 h-5 cursor-pointer select-none"
          onClick={() => {
            if (location.state?.from === "_link") {
              navigate("/dashboard", { replace: true });
              return;
            }
            navigate(-1);
          }}
        />

        <div className="flex items-center gap-2">
          <button className="btn btn-sm btn-ghost" onClick={() => saveBlob(pdfFile.name, pdfFile)}>
            <ArrowDownToLine className="w-5 h-5" />
          </button>
          <div className="w-2" />
          <button className="btn btn-sm btn-ghost" onClick={() => setScale((prev) => Math.min(prev + 0.1, 3))}>
            <ZoomIn className="w-5 h-5" />
          </button>
          <button className="btn btn-sm btn-ghost" onClick={() => setScale((prev) => Math.max(prev - 0.1, 0.5))}>
            <ZoomOut className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="overflow-auto flex flex-col items-center gap-4 h-full pt-10">
        <Document
          file={pdfFile}
          onLoadSuccess={({ numPages }) => setNumPages(numPages)}
          loading="Loading PDF..."
          error="Error while loading PDF"
          className="flex flex-col items-center w-full"
        >
          {Array.from(new Array(numPages), (_, index) => (
            <Page
              key={`page_${index + 1}`}
              pageNumber={index + 1}
              width={isMobile ? window.innerWidth : 800}
              scale={scale}
              className="shadow-md rounded-lg border border-base-300"
            />
          ))}
        </Document>
      </div>
      {pendiente && (
        <div className="absolute bottom-0 h-20 w-full flex justify-center items-center gap-4 z-[9999]">
          <button className="btn btn-primary flex items-center gap-2" onClick={handleSignDocument} disabled={loading}>
            {mutation.isPending ? (
              <div className="spinner-border spinner-border-sm" role="status">
                <span className="visually-hidden">Firmando...</span>
              </div>
            ) : (
              <>
                <span>Firmar Documento</span>
                <PencilLine />
              </>
            )}
          </button>
        </div>
      )}
    </div>
  );
};
