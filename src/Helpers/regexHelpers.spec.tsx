import { parseDataUrl } from "./regexHelpers";
const base64DataUrl = "data:text/plain;base64,SGVsbG8sIFdvcmxbase64kIQ%3D%3D";
const htmlDataUrl = "data:text/html,<script>alert(';base64,');</script>";

it("should parse data url", () => {
  expect(parseDataUrl(base64DataUrl)).toEqual({
    mimeType: "text/plain",
    isBase64: true,
    url: "SGVsbG8sIFdvcmxbase64kIQ%3D%3D",
  });
  expect(parseDataUrl(htmlDataUrl)).toEqual({
    mimeType: "text/html",
    isBase64: false,
    url: "<script>alert(';base64,');</script>",
  });
});
