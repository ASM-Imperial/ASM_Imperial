import { useEffect, useRef } from "react";

export default function OnTheRoadLayer({ layers , imgref }) {
  const canvasRefs = useRef([]);
  const offscreenRefs = useRef([]);
  const containerRef = useRef(null);

  // Load all images once — prevents blinking on color change
  useEffect(() => {
    layers.forEach((layer, index) => {
      const offscreen = document.createElement("canvas");
      offscreenRefs.current[index] = offscreen;

      const img = new Image();
      img.src = layer.src;

      img.onload = () => {
        offscreen.width = img.width;
        offscreen.height = img.height;
        const ctx = offscreen.getContext("2d");
        ctx.drawImage(img, 0, 0);
        redraw(); // draw once when image loads
      };
    });
  }, []);

   console.log("canvasref:", canvasRefs);
  useEffect(() => {
    imgref.current = containerRef.current;
  }, []);

  // Redraw function without blinking
  const redraw = () => {
    const container = containerRef.current;
    if (!container) return;

    const cw = container.offsetWidth;
    const ch = container.offsetHeight;

    layers.forEach((layer, index) => {
      const canvas = canvasRefs.current[index];
      const offscreen = offscreenRefs.current[index];

      if (!canvas || !offscreen) return;

      const ctx = canvas.getContext("2d");

      // Set visible canvas size to wrapper size
      canvas.width = cw;
      canvas.height = ch;

      // DRAW the pre-rendered layer stretched
      ctx.drawImage(offscreen, 0, 0, cw, ch);

      // APPLY COLOR without clearing canvas → no blinking
      if (layer.color) {
        ctx.globalCompositeOperation = "source-in";
        ctx.fillStyle = layer.color;
        ctx.fillRect(0, 0, cw, ch);
        ctx.globalCompositeOperation = "source-over";
      }
    });
  };

  // Recolor only — no re-loading of images → no blink!
  useEffect(() => {
    redraw();
  }, [layers]);

  return (
    <div
      ref={containerRef}
      style={{
        position: "relative",
        width: "100%",
        height: "100%",
      }}
    >
      {layers.map((_, index) => (
        <canvas
          key={index}
          ref={(el) => (canvasRefs.current[index] = el)}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
          }}
        />
      ))}
    </div>
  );
}
