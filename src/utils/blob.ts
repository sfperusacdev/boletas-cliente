export const saveBlob = (function () {
  const a = document.createElement("a");
  return function (name: string, blob: Blob) {
    const url = window.URL.createObjectURL(blob);
    a.href = url;
    a.download = name;
    a.click();
    window.URL.revokeObjectURL(url);
  };
})();
