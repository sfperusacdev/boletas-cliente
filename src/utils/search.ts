const normalizeString = (str?: string): string =>
  (str ?? "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();

export function searchAndFilterData<T>(data: T[], pattern: string | number | undefined): T[] {
  const searchLower = normalizeString(String(pattern ?? "").trim());
  if (searchLower.length < 2) return data;

  return data.filter((item) =>
    Object.entries(item!).some(([key, value]) => {
      if (value == null) return false;
      let valueStr = normalizeString(String(value));
      if (typeof value === "number") valueStr = `#${valueStr}`;
      if (key.endsWith("codigo") && !valueStr.startsWith("#")) valueStr = `.${valueStr}`;
      return valueStr.includes(searchLower);
    })
  );
}
