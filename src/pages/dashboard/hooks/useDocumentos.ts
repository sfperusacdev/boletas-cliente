import { QueryKey, useQuery, useQueryClient } from "@tanstack/react-query";
import { useMemo } from "react";
import { DocumentosService } from "../../../services/envio_documentos";
import { DocumentoDto } from "../../../types/documentos";

export const useDocumentos = (carpeta?: string) => {
  const queryKey: QueryKey = useMemo(() => ["LISTA/DOCUMENTOS", carpeta], [carpeta]);
  const queryClient = useQueryClient();
  const { data, error, isFetching, isError } = useQuery<DocumentoDto[], Error>({
    queryKey,
    queryFn: ({ signal }) => DocumentosService.getDocumentos(signal),
  });
  const refresh = () => queryClient.invalidateQueries({ queryKey: queryKey });

  return {
    documentos: data ?? [],
    refresh,
    isFetching,
    error,
    isError,
  };
};
