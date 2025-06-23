import { FC, useCallback, useRef, useState } from "react";
import Cropper, { Area } from "react-easy-crop";
import { getCroppedImg } from "../../../utils/cropImage2";
import { no_image_placeholder } from "../../../assets";
import classNames from "classnames";
import { firmaService } from "../../../services/firma";
import toast from "react-hot-toast";
import { RotateCcw, RotateCw } from "lucide-react";

type Mode = "view" | "crop";
export const SignatureImportView: FC<{ image: string | null }> = ({
  image,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [loading, setLoadingUpload] = useState(false);
  const [mode, setMode] = useState<Mode>("view");
  const [previewUrl, setPreviewUrl] = useState<string | null>(image);

  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [rotation, setRotation] = useState(0);

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

    const croppedBlob = await getCroppedImg(
      selectedImage,
      croppedAreaPixels,
      rotation,
      {
        output: { width: 860, height: 860 / 2 },
      },
    );

    if (croppedBlob == null) {
      toast.error("no se pudo procesar la imange");
      return;
    }
    const id = toast.loading("Guardando firma...");
    try {
      setLoadingUpload(true);
      await firmaService.uploadFirmaImange(croppedBlob);
      setPreviewUrl(URL.createObjectURL(croppedBlob));
      setMode("view");
      toast.success("Firma guardada correctamente", { id });
    } catch (e) {
      const message =
        typeof e === "string"
          ? e
          : e instanceof Error
            ? e.message
            : "Error al guardar la firma";
      toast.error(message, { id });
    } finally {
      setLoadingUpload(false);
    }
  };

  return (
    <div className="w-full h-full px-5 py-8 flex flex-col items-center">
      <h1 className="text-2xl font-bold mb-6">Firma</h1>
      <p className="text-sm text-muted-foreground text-center max-w-[860px] mb-4">
        Esta imagen será utilizada como firma visual en los documentos que
        firmes digitalmente desde el sistema.
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
                "cursor-pointer",
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
            <button
              className="btn btn-primary"
              onClick={() => inputRef.current?.click()}
            >
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
              rotation={rotation}
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
            <div className="grid xl:grid-cols-2 items-center gap-4">
              <div className="flex flex-col">
                <label className="text-sm font-medium mb-2">
                  Zoom: {zoom.toFixed(1)}x
                </label>
                <input
                  type="range"
                  min={1}
                  max={3}
                  step={0.1}
                  value={zoom}
                  onChange={e => setZoom(parseFloat(e.target.value))}
                  className="w-full range range-sm range-primary"
                />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <button
                  className="btn btn-outline"
                  onClick={() => setRotation(r => r - 90)}
                >
                  <RotateCcw className="w-4 h-4 mr-2" />
                  <span> Rotar Izquierda</span>
                </button>
                <button
                  className="btn btn-outline"
                  onClick={() => setRotation(r => r + 90)}
                >
                  <RotateCw className="w-4 h-4 mr-2" />
                  <span> Rotar Derecha</span>
                </button>
              </div>
            </div>

            <div className="flex justify-end gap-4 pt-4">
              <button className="btn btn-ghost" onClick={() => setMode("view")}>
                Cancelar
              </button>
              <button
                className="btn btn-primary disabled:opacity-50"
                onClick={handleSave}
                disabled={loading}
              >
                {loading ? "Guardando..." : "Guardar"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
