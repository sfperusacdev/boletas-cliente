import { FC, useCallback, useEffect, useRef, useState } from "react";
import Cropper, { Area } from "react-easy-crop";
import { getCroppedImg } from "../../utils/cropImage";
import { no_image_placeholder } from "../../assets";
import classNames from "classnames";
import { firmaService } from "../../services/firma";
import toast from "react-hot-toast";

export const SignatureImport = () => {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const controllerRef = useRef<AbortController | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
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
      if (!(err instanceof DOMException && err.name === "AbortError")) {
        if (err instanceof Error) {
          if (err.message !== "no hay ninguna imagen") {
            setError(err as Error);
          }
        }
      }
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
      controllerRef.current?.abort();
    };
  }, [startDownload]);

  if (loading) return <div className="flex items-center justify-center h-screen">Loading...</div>;
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

type Mode = "view" | "crop";
const SignatureImportView: FC<{ image: string | null }> = ({ image }) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [loading, setLoadingUpload] = useState(false);
  const [mode, setMode] = useState<Mode>("view");
  const [previewUrl, setPreviewUrl] = useState<string | null>(image);

  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);

  const onCropComplete = useCallback((_croppedArea: Area, pixels: Area) => {
    setCroppedAreaPixels(pixels);
  }, []);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      setSelectedImage(reader.result as string);
      setMode("crop");
    };
    reader.readAsDataURL(file);
  };

  const handleSave = async () => {
    if (!selectedImage || !croppedAreaPixels) return;

    const croppedBlob = await getCroppedImg(selectedImage, croppedAreaPixels, 860);
    const id = toast.loading("Guardando firma...");

    try {
      setLoadingUpload(true);
      await firmaService.uploadFirmaImange(croppedBlob);
      setPreviewUrl(URL.createObjectURL(croppedBlob));
      setMode("view");
      toast.success("Firma guardada correctamente", { id });
    } catch (e) {
      const message = typeof e === "string" ? e : e instanceof Error ? e.message : "Error al guardar la firma";
      toast.error(message, { id });
    } finally {
      setLoadingUpload(false);
    }
  };

  return (
    <div className="w-full h-full px-4 py-8 flex flex-col items-center">
      <h1 className="text-2xl font-bold mb-6">Firma</h1>
      <p className="text-sm text-muted-foreground text-center max-w-[860px] mb-4">
        Esta imagen será utilizada como firma visual en los documentos que firmes digitalmente desde el sistema.
      </p>

      {mode === "view" && (
        <div className="w-full max-w-[860px] space-y-4">
          <div className="relative aspect-[2/1] rounded-lg shadow-2xl bg-white overflow-hidden">
            <img
              src={previewUrl || no_image_placeholder}
              alt="Firma"
              className="w-full h-full object-contain bg-white"
            />

            <label
              htmlFor="fileInput"
              className={classNames(
                "absolute inset-0",
                "flex items-center justify-center",
                "transition duration-200",
                "cursor-pointer"
              )}
            />
            <input
              ref={inputRef}
              type="file"
              id="fileInput"
              accept="image/png,image/jpeg"
              onChange={handleImageChange}
              className="hidden"
            />
          </div>
          <div className="pt-8 flex justify-center">
            <button className="btn btn-primary" onClick={() => inputRef.current?.click()}>
              Subir Firma
            </button>
          </div>
        </div>
      )}

      {mode === "crop" && selectedImage && (
        <div className="w-full max-w-[860px] space-y-4">
          <div className="relative aspect-[2/1] rounded-lg shadow-2xl bg-white overflow-hidden">
            <Cropper
              image={selectedImage}
              crop={crop}
              zoom={zoom}
              aspect={2 / 1}
              onCropChange={setCrop}
              onZoomChange={setZoom}
              onCropComplete={onCropComplete}
              restrictPosition={false}
              cropShape="rect"
              showGrid={false}
              style={{
                containerStyle: {
                  backgroundImage:
                    "linear-gradient(45deg, #ccc 25%, transparent 25%), linear-gradient(-45deg, #ccc 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #ccc 75%), linear-gradient(-45deg, transparent 75%, #ccc 75%)",
                  backgroundSize: "20px 20px",
                  backgroundPosition: "0 0, 0 10px, 10px -10px, -10px 0px",
                },
                mediaStyle: {
                  backgroundColor: "transparent",
                },
              }}
            />
          </div>

          <div className="flex flex-col gap-3">
            <label className="text-sm font-medium">Zoom: {zoom.toFixed(1)}x</label>
            <input
              type="range"
              min={1}
              max={3}
              step={0.1}
              value={zoom}
              onChange={(e) => setZoom(parseFloat(e.target.value))}
              className="range range-primary"
            />

            <div className="flex justify-end gap-4 pt-2">
              <button className="btn btn-ghost" onClick={() => setMode("view")}>
                Cancelar
              </button>
              <button className="btn btn-primary disabled:opacity-50" onClick={handleSave} disabled={loading}>
                {loading ? "Guardando..." : "Guardar"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
