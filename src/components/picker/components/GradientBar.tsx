import React, { useEffect, useState } from "react";
import { getHandleValue } from "../utils/utils";
import { usePicker } from "../context";

const GradientBar = () => {
  const {
    currentColor,
    addPoint,
    colors,
    value,
    handleGradient,
    selectedColor,
    setInFocus
  } = usePicker();
  const [dragging, setDragging] = useState(false);
  const [barWidth, setBarWidth] = useState(0);

  const barRef = React.useRef<HTMLDivElement>(null);

  function force90degLinear(color: string) {
    return color.replace(
      /(radial|linear)-gradient\([^,]+,/,
      "linear-gradient(90deg,"
    );
  }

  useEffect(() => {
    if (barRef.current) {
      setBarWidth(barRef.current.clientWidth);
    }
  }, [barRef]);

  useEffect(() => {
    let selectedEl = window?.document?.getElementById(
      `gradient-handle-${selectedColor}`
    );
    selectedEl?.focus();
  }, [selectedColor]);

  const stopDragging = () => {
    setDragging(false);
  };

  const handleDown = (e: React.MouseEvent) => {
    if (!dragging) {
      addPoint(e);
      setDragging(true);
    }
  };

  const handleMove = (e: React.MouseEvent) => {
    if (dragging) {
      handleGradient(currentColor, getHandleValue(e));
    }
  };

  const handleUp = () => {
    stopDragging();
  };

  useEffect(() => {
    window.addEventListener("mouseup", handleUp);

    return () => {
      window.removeEventListener("mouseup", handleUp);
    };
  });

  return (
    <div className="w-full relative box-border" id="gradient-bar">
      <div
        ref={barRef}
        className="w-full h-4 rounded-full"
        style={{
          backgroundImage: force90degLinear(value)
        }}
        onMouseDown={handleDown}
        onMouseMove={handleMove}
      />
      {colors?.map((c, i) => (
        <Handle
          i={i}
          left={c.left}
          width={barWidth}
          key={`${i}-${c}`}
          setInFocus={setInFocus}
          setDragging={setDragging}
        />
      ))}
    </div>
  );
};

export default GradientBar;

type HandleProps = {
  left: number;
  width: number;
  i: number;
  setDragging: (b: boolean) => void;
  setInFocus: (s: string | null) => void;
}

export const Handle = ({ left, i, setDragging, setInFocus, width }: HandleProps) => {
  const { setSelectedColor, selectedColor } = usePicker();
  const isSelected = selectedColor === i;
  const leftMultiplyer = (width - 18) / 100;

  const handleDown = (e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedColor(i);
    setDragging(true);
  };

  const handleFocus = () => {
    setInFocus("gpoint");
    setSelectedColor(i);
  };

  const handleBlur = () => {
    setInFocus(null);
  };

  return (
    <div
      tabIndex={0}
      onBlur={handleBlur}
      onFocus={handleFocus}
      id={`gradient-handle-${i}`}
      onMouseDown={(e) => handleDown(e)}
      style={{ left: left * leftMultiplyer }}
      className="absolute top-0.5 outline-none z-50"
    >
      <div
        className="handle flex justify-center items-center"
        style={handleStyle(isSelected)}
      >
        {isSelected && (
          <div
            style={{
              width: 5,
              height: 5,
              borderRadius: "50%",
              background: "white"
            }}
          />
        )}
      </div>
    </div>
  );
};

const handleStyle = (isSelected: boolean) => {
  return {
    boxShadow: isSelected ? "0px 0px 5px 1px rgba(86, 140, 245,.95)" : "",
    border: isSelected ? "2px solid white" : "2px solid rgba(255,255,255,.75)"
  };
};
