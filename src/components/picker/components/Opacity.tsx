import React, { useEffect, useRef, useState } from "react";
import { usePicker } from "../context";
import { checkered } from "../style";

const Opacity = () => {
  const { handleOpacity, opacity, tinyColor } = usePicker();
  const [dragging, setDragging] = useState(false);
  const { r, g, b } = tinyColor.toRgb();
  const bg = `linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(${r},${g},${b},.5) 100%)`;
  const barRef = useRef<HTMLDivElement>(null);
  const [barWidth, setBarWidth] = useState(0);

  useEffect(() => {
    if (!barRef?.current) return;
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
      handleOpacity(e);
    }
  };

  const handleClick = (e: React.MouseEvent) => {
    if (!dragging) {
      handleOpacity(e);
    }
  };

  let left = barWidth - 16;

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
      onMouseDown={handleDown}
      onMouseMove={handleMove}
      className="my-4 cursor-ew-resize relative h-4"
      ref={barRef}
    >
      <div className="h-4 w-full" style={{ ...checkered }} />
      <div className="handle top-0"
           style={{ left: left * opacity }} />
      <div
        className="absolute top-0 left-0 w-full h-full rounded"
        style={{ background: bg }}
        onClick={handleClick}
      />
    </div>
  );
};

export default Opacity;
