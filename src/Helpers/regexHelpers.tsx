export type ParsedDataUrlType = {
  mimeType: string;
  isBase64: boolean;
  url: string;
};

export const parseDataUrl = (data: string): ParsedDataUrlType => {
  const dataUrl = data.replace(/(.*?),/, "");
  const dataBeforeUrl = data.replace(dataUrl, "");
  const isBase64 = dataBeforeUrl.includes("base64");
  const afterMimeTypeStringRegexp = isBase64 ? /((;base64).*)/ : /((,).*)/;
  const mimeType = data.replace(afterMimeTypeStringRegexp, "").replace(/(data:)/, "");

  return {
    mimeType,
    isBase64,
    url: dataUrl,
  };
};
