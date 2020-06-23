import { canvasScript } from "./canvasScript";
const canvas = `<canvas id="signatureCanvas" style="display:flex; flex-grow: 1"></canvas>`;

export const canvasHTML = `
      ${canvas}
      <script>
        ${canvasScript}
      </script>`;
