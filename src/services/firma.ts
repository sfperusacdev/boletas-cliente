import { download, postFromData } from "../lib/http";

export const firmaService = {
  getFirmaImange: async (abortSignal: AbortSignal): Promise<Blob | null> => {
    return download({
      abortSignal,
      path: "/api/v1/public/firma/jpg",
      progress: () => {},
    });
  },
  uploadFirmaImange: async (imange: Blob) => {
    const formData = new FormData();
    formData.append("image", imange);
    return postFromData({ path: "/api/v1/public/firma/jpg", body: formData });
  },
};
