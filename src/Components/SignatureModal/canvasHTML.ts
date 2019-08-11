import { canvasScript } from "./canvasScript";

export const canvasHTML = `<html>
    <body>
      <canvas id="signatureCanvas"></canvas>
      <script>
        ${canvasScript}
      </script>
    </body>
  </html>`;
