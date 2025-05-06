import { download, get } from "../lib/http";
import { DocumentoDto } from "../types/documentos";

export const DocumentosService = {
  getDocumentos: async (signal: AbortSignal) => {
    return get<DocumentoDto[]>({
      path: "/api/v1/public/documentos",
      abortSignal: signal,
    });
  },
  downloadPdf: async (pdfname: string, progress?: (progress: number) => void) => {
    return await download({
      path: `/api/v1/procesos/documentos/download/${pdfname}`,
      progress: (p) => progress?.(p),
    });
  },
  signPDF: async (pdfname: string) => {
    return get<DocumentoDto[]>({
      path: `/api/v1/public/sign/documento/${pdfname}`,
    });
  },
};
