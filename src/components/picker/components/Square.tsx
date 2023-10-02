import React, { useEffect, useRef, useState } from "react";
import usePaintSquare from "../hooks/usePaintSquare";
import { usePicker } from "../context";

const Square = () => {
  const {
    x,
    y,
    handleColor,
    internalHue,
    squareSize,
    squareHeight
  } = usePicker();
  const [dragging, setDragging] = useState(false);
  const canvas = useRef<HTMLCanvasElement>(null);
  usePaintSquare(canvas, internalHue, squareSize, squareHeight);

  const handleChange = (e: React.MouseEvent) => {
    const ctx = canvas?.current?.getContext("2d", { willReadFrequently: true });
    handleColor(e, ctx);
  };

  const stopDragging = () => {
    setDragging(false);
  };

  const handleMove = (e: React.MouseEvent) => {
    if (dragging) {
      handleChange(e);
    }
  };

  const handleClick = (e: React.MouseEvent) => {
    if (!dragging) {
      handleChange(e);
    }
  };

  const handleMouseDown = () => {
    setDragging(true);
  };

  const handleCanvasDown = (e: React.MouseEvent) => {
    setDragging(true);
    handleChange(e);
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
      className="relative cursor-crosshair"
      onMouseDown={handleCanvasDown}
      onMouseMove={handleMove}
      onMouseUp={stopDragging}
    >
      <div
        style={{ left: x, top: y }}
        className="handle"
        onMouseDown={handleMouseDown}
      />
      <canvas
        className="rounded"
        ref={canvas}
        width={`${squareSize}px`}
        height={`${squareHeight}px`}
        id="paintSquare"
        onClick={handleClick}
      />
    </div>
  );
};

export default Square;
