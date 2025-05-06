export interface DocumentoDto {
  codigo_proceso: string;
  descripcion_proceso: string;
  codigo_trabajador: string;
  anio?: string;
  mes?: string;
  item?: string;
  estado?: string;
  nombre_pdf?: string;
  signed_pdf_name?: string;
  signature_timestamp?: string;
  created_at?: string;
}
