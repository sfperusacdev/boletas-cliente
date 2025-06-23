import { Navigate, useParams } from "react-router-dom";
import { FC, useEffect, useMemo, useRef } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { DocumentosService } from "../services/envio_documentos";

type QryPrms = { empresa: string; record_codigo: string; origin: string };
export const EntryPointRedirectLink = () => {
  const { empresa, origin, record_codigo } = useParams<QryPrms>();

  if (empresa == null || origin == null || record_codigo == null)
    return <Navigate to={"/dashboard"} replace />;
  return (
    <EntryPointRedirect
      empresa={empresa}
      origin={origin}
      record_codigo={record_codigo}
    />
  );
};

const EntryPointRedirect: FC<QryPrms> = ({
  empresa,
  origin,
  record_codigo,
}) => {
  // region log
  const logdone = useRef(false);
  useEffect(() => {
    if (logdone.current) return;
    const logOpenLink = async () => {
      try {
        await DocumentosService.logOpenLink({
          codigo: record_codigo,
          empresa,
          metodo: origin,
          referencia: window.location.href,
        });
      } catch (error) {
        console.error("Failed to log open link:", error);
      } finally {
        logdone.current = true;
      }
    };
    logOpenLink();
  }, [empresa, origin, record_codigo]);

  // region data
  const queryKey = useMemo(
    () => ["RESUMEN_INFO_DOC_RECORD", empresa, origin, record_codigo],
    [empresa, origin, record_codigo],
  );
  const queryClient = useQueryClient();
  const { data, error, isLoading } = useQuery({
    queryKey: queryKey,
    queryFn: ({ signal }) =>
      DocumentosService.getDocumentoResumen(empresa, record_codigo, signal),
  });
  const onRetry = () => queryClient.invalidateQueries({ queryKey });

  if (isLoading)
    return (
      <div className="flex items-center justify-center h-screen">
        Loading...
      </div>
    );
  if (error != null)
    return (
      <div className="flex flex-col items-center justify-center h-screen text-red-500">
        <p>Error: {typeof error === "string" ? error : error.message}</p>
        <button
          onClick={onRetry}
          className="mt-4 px-6 py-2 bg-red-600 text-white rounded-lg shadow-md hover:bg-red-700 transition"
        >
          Retry
        </button>
      </div>
    );

  if (data == null || data.length === 0)
    return <Navigate to={"/dashboard"} replace />;
  if (data[0].signed_pdf_name) {
    return (
      <Navigate
        to={`/dashboard/pdf/${data[0].signed_pdf_name}/${data[0].estado}`}
        replace
        state={{ from: "_link" }}
      />
    );
  }

  if (data[0].nombre_pdf)
    return (
      <Navigate
        to={`/dashboard/pdf/${data[0].nombre_pdf}/${data[0].estado}`}
        replace
        state={{ from: "_link" }}
      />
    );
  return (
    <div className="flex flex-col items-center justify-center h-screen text-red-500">
      <button
        onClick={onRetry}
        className="mt-4 px-6 py-2 bg-red-600 text-white rounded-lg shadow-md hover:bg-red-700 transition"
      >
        Retry
      </button>
    </div>
  );
};
