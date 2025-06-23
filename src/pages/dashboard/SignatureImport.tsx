import { useCallback, useEffect, useRef, useState } from "react";
import { firmaService } from "../../services/firma";
import { SignatureImportView } from "./views/SignatureImportView";

export const SignatureImport = () => {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const controllerRef = useRef<AbortController | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  const download = async (abortSignal: AbortSignal): Promise<void> => {
    setLoading(true);
    setError(null);
    try {
      const file: Blob | null = await firmaService.getFirmaImange(abortSignal);
      if (file != null) {
        setImageUrl(URL.createObjectURL(file));
      }
      setLoading(false);
    } catch (err) {
      console.log(err);
      if (!(err instanceof DOMException && err.name === "AbortError")) {
        if (err instanceof Error) {
          if (err.message !== "no hay ninguna imagen") {
            setError(err as Error);
          }
        }
      }
      setLoading(false);
    }
  };

  const startDownload = useCallback(() => {
    const controller = new AbortController();
    controllerRef.current = controller;
    download(controller.signal);
  }, []);

  useEffect(() => {
    startDownload();
    return () => {
      if (process.env.NODE_ENV === "development") return; // skip React StrictMode
      controllerRef.current?.abort();
    };
  }, [startDownload]);

  if (loading)
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
          onClick={startDownload}
          className="mt-4 px-6 py-2 bg-red-600 text-white rounded-lg shadow-md hover:bg-red-700 transition"
        >
          Retry
        </button>
      </div>
    );

  return <SignatureImportView image={imageUrl} />;
};
