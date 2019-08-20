import { canvasScript } from "./canvasScript";
import { isWeb } from "../../Helpers/platform";
import { Dimensions } from "react-native";

const height = Dimensions.get("window").height;

const canvas = isWeb
  ? `<canvas id="signatureCanvas" height=${height * 0.8}></canvas>`
  : `<canvas id="signatureCanvas"></canvas>`;

export const canvasHTML = `<html>
    <body>
      ${canvas}
      <script>
        ${canvasScript}
      </script>
    </body>
  </html>`;
