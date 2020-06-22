import { isWeb } from "src/Helpers/platform";
export var canvasScript =
  `
  var canvas = document.getElementById("signatureCanvas");
  var rect = canvas.getBoundingClientRect();
  var width = window.innerWidth;
  var height = window.innerHeight;
  if (!` +
  isWeb +
  `) {
    width = document.body.clientWidth;
    height = document.body.clientHeight;
  }
  canvas.width = width;
  canvas.height = height;
  var ctx = canvas.getContext("2d");

  function getTouchCoords(e) {
    var touch = e.changedTouches[0];
    var x = touch.clientX - rect.left;
    var y = touch.clientY - rect.top;
    return { x: x, y: y };
  }

  function getMouseCoords(e) {
    var x = e.clientX - rect.x;
    var y = e.clientY - rect.y;
    return { x: x, y: y };
  }

  var isMouseDown = false;
  canvas.addEventListener("mousedown", function(e) {
    e.preventDefault();
    ctx.beginPath();
    ctx.lineWidth = 2;
    isMouseDown = true;
    var coords = getMouseCoords(e);
    ctx.moveTo(coords.x, coords.y);
  });

  canvas.addEventListener("mousemove", function(e) {
    e.preventDefault();
    if (isMouseDown) {
      var coords = getMouseCoords(e);
      ctx.lineTo(coords.x, coords.y);
      ctx.stroke();
    }
  });

  canvas.addEventListener("mouseup", function(e) {
    e.preventDefault();
    isMouseDown = false;
    window.parent.postMessage(canvas.toDataURL(), "*")
  });

  canvas.addEventListener("touchstart", function(e) {
    e.preventDefault();
    ctx.beginPath();
    ctx.lineWidth = 2;
    var coords = getTouchCoords(e);
    ctx.moveTo(coords.x, coords.y);
  });

  canvas.addEventListener("touchmove", function(e) {
    e.preventDefault();
    var coords = getTouchCoords(e);
    ctx.lineTo(coords.x, coords.y);
    ctx.stroke();
  });

  canvas.addEventListener("touchend", function(e) {
    e.preventDefault();
    window.ReactNativeWebView.postMessage(canvas.toDataURL());
  });`;
