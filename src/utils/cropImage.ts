// import { Area } from "react-easy-crop";
// export const getCroppedImg = async (imageSrc: string, crop: Area, outputWidth: number): Promise<Blob> => {
//   const image = await loadImage(imageSrc);
//   const canvas = document.createElement("canvas");
//   const scaleX = image.naturalWidth / image.width;
//   const scaleY = image.naturalHeight / image.height;

//   const width = outputWidth;
//   const height = outputWidth / 2;

//   canvas.width = width;
//   canvas.height = height;

//   const ctx = canvas.getContext("2d")!;
//   ctx.drawImage(
//     image,
//     crop.x * scaleX,
//     crop.y * scaleY,
//     crop.width * scaleX,
//     crop.height * scaleY,
//     0,
//     0,
//     width,
//     height
//   );

//   return new Promise((resolve) => canvas.toBlob((blob) => resolve(blob!), "image/jpeg", 0.95));
// };

// const loadImage = (url: string): Promise<HTMLImageElement> =>
//   new Promise((res, rej) => {
//     const img = new Image();
//     img.src = url;
//     img.onload = () => res(img);
//     img.onerror = rej;
//   });

import { Area } from "react-easy-crop";

export const getCroppedImg = async (
  imageSrc: string,
  crop: Area,
  outputWidth: number,
  rotation: number = 0
): Promise<Blob> => {
  const image = await loadImage(imageSrc);
  const radians = (rotation * Math.PI) / 180;

  const canvas = document.createElement("canvas");
  const width = outputWidth;
  const height = outputWidth / 2;

  canvas.width = width;
  canvas.height = height;

  const ctx = canvas.getContext("2d")!;
  ctx.translate(width / 2, height / 2);
  ctx.rotate(radians);

  const scaleX = image.naturalWidth / image.width;
  const scaleY = image.naturalHeight / image.height;

  ctx.drawImage(
    image,
    crop.x * scaleX,
    crop.y * scaleY,
    crop.width * scaleX,
    crop.height * scaleY,
    -width / 2,
    -height / 2,
    width,
    height
  );

  return new Promise((resolve) => canvas.toBlob((blob) => resolve(blob!), "image/jpeg", 0.95));
};

const loadImage = (url: string): Promise<HTMLImageElement> =>
  new Promise((res, rej) => {
    const img = new Image();
    img.src = url;
    img.onload = () => res(img);
    img.onerror = rej;
  });
