import { canvasScript } from "./canvasScript";
import { isWeb } from "../../Helpers/platform";

const canvas = isWeb
  ? `<canvas id="signatureCanvas" height=800></canvas>`
  : `<canvas id="signatureCanvas" height=""></canvas>`;

export const canvasHTML = `<html>
    <body>
      ${canvas}
      <script>
        ${canvasScript}
      </script>
    </body>
  </html>`;
