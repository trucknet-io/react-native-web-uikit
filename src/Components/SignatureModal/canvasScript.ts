export const canvasScript = `
    let bodyWidth = document.body.clientWidth;
    let bodyHeight = document.body.clientHeight;
    if(!bodyWidth) {
      bodyWidth = window.innerWidth;
    }
    if(!bodyHeight) {
      bodyHeight = window.innerHeight;
    }

    const canvasWidth = bodyWidth;
    const canvasHeight = bodyHeight;

    const canvas = document.getElementById("signatureCanvas");
    canvas.width = canvasWidth;
    canvas.height = canvasHeight;
    const ctx = canvas.getContext("2d");

    const getTouchCoords = (e) => {
       const touch = e.changedTouches[0];
       const rect = canvas.getBoundingClientRect();
       const x = touch.clientX - rect.left;
       const y = touch.clientY - rect.top;
       return { x, y }
    }

    const getMouseCoords = (e) => {
       const rect = canvas.getBoundingClientRect();
       const x = e.clientX - rect.left;
       const y = e.clientY - rect.top;
       return { x, y }
    }

    let isMouseDown = false;
    canvas.addEventListener("mousedown", function (e) {
      e.preventDefault();
      ctx.beginPath();
      ctx.lineWidth = 2;
      isMouseDown = true;
      const coords = getMouseCoords(e);
      ctx.moveTo(coords.x, coords.y);
    });

    canvas.addEventListener("mousemove", function (e) {
      e.preventDefault();
      if(isMouseDown) {
        const coords = getMouseCoords(e);
        ctx.lineTo(coords.x, coords.y);
        ctx.stroke();
      }
    });

    canvas.addEventListener("mouseup", function (e) {
      e.preventDefault();
      isMouseDown = false;
      console.log(window);
      window.parent.postMessage(canvas.toDataURL())
    });

    canvas.addEventListener("touchstart", function (e) {
      e.preventDefault();
      ctx.beginPath();
      ctx.lineWidth = 2;
      const coords = getTouchCoords(e);
      ctx.moveTo(coords.x, coords.y);
    });

    canvas.addEventListener("touchmove", function (e) {
      e.preventDefault();
      const coords = getTouchCoords(e);
      ctx.lineTo(coords.x, coords.y);
      ctx.stroke();
    });

    canvas.addEventListener("touchend", function (e) {
      e.preventDefault();
      window.ReactNativeWebView.postMessage(canvas.toDataURL());
    });
  `;
