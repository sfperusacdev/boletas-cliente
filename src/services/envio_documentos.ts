import { download, get, post } from "../lib/http";
import { BasicUsuarioDocumentoDto, DocumentoDto } from "../types/documentos";

export const DocumentosService = {
  getDocumentoResumen: async (empresa: string, codigo: string, signal: AbortSignal) => {
    return get<BasicUsuarioDocumentoDto[]>({
      path: `/api/v1/public/documentos/${empresa}/${codigo}`,
      abortSignal: signal,
    });
  },
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
    return get<{ signed_pdf_name: string }>({
      path: `/api/v1/public/sign/documento/${pdfname}`,
    });
  },
  //log
  logOpenLink: async (data: { codigo: string; empresa: string; metodo: string; referencia: string }) => {
    await post({
      path: "/api/v1/public/_open_link/event",
      body: { record_codigo: data.codigo, empresa: data.empresa, method: data.metodo, referer: data.referencia },
    });
  },
};
