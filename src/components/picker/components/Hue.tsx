import React, { useEffect, useRef, useState } from "react";
import { usePicker } from "../context";
import usePaintHue from "../hooks/usePaintHue";

const Hue = () => {
  const barRef = useRef<HTMLCanvasElement>(null);
  const { handleHue, internalHue, squareSize } = usePicker();
  const [dragging, setDragging] = useState(false);
  usePaintHue(barRef, squareSize);
  const [handleTop, setHandleTop] = useState(2);
  const [barWidth, setBarWidth] = useState(0);

  useEffect(() => {
    if (!barRef?.current) return;
    setHandleTop(barRef?.current?.offsetTop);
    setBarWidth(barRef?.current?.clientWidth);
  }, [barRef]);

  const stopDragging = () => {
    setDragging(false);
  };

  const handleDown = () => {
    setDragging(true);
  };

  const handleMove = (e: React.MouseEvent) => {
    if (dragging) {
      handleHue(e);
    }
  };

  const handleClick = (e: React.MouseEvent) => {
    if (!dragging) {
      handleHue(e);
    }
  };

  useEffect(() => {
    const handleUp = () => {
      stopDragging();
    };

    window.addEventListener("mouseup", handleUp);

    return () => {
      window.removeEventListener("mouseup", handleUp);
    };
  }, []);

  return (
    <div
      className="mt-4 relative cursor-ew-resize"
      onMouseMove={handleMove}
    >
      <div
        className="handle"
        style={{
          left: internalHue * ((barWidth - 16) / 360),
          top: handleTop
        }}
        onMouseDown={handleDown}
      />
      <canvas
        ref={barRef}
        width={`${squareSize}px`}
        height="14px"
        className="w-full relative rounded-full align-top"
        onClick={handleClick}
      />
    </div>
  );
};

export default Hue;
