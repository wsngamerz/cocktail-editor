import React, { useEffect, useRef, useState } from "react";
import { usePicker } from "../context";
import { getHandleValue } from "../utils/utils";
import { usePaintBright, usePaintLight, usePaintSat } from "../hooks/usePaintHue";
import tinycolor  from "tinycolor2";

type AdvancedControlsProps = {
  openAdvanced: boolean
}

const AdvancedControls = ({ openAdvanced }: AdvancedControlsProps) => {
  const { tinyColor, hue, l, handleChange, s, opacity, squareSize } =
    usePicker();
  const { v, s: vs } = tinyColor.toHsv();
  const satRef = useRef(null);
  const lightRef = useRef(null);
  const brightRef = useRef(null);
  usePaintSat(satRef, hue, l * 100, squareSize);
  usePaintLight(lightRef, hue, s * 100, squareSize);
  usePaintBright(brightRef, hue, s * 100, squareSize);

  const satDesat = (value: number) => {
    const { r, g, b } = tinycolor({ h: hue, s: value / 100, l }).toRgb();
    handleChange(`rgba(${r},${g},${b},${opacity})`);
  };

  const setLight = (value: number) => {
    const { r, g, b } = tinycolor({ h: hue, s, l: value / 100 }).toRgb();
    handleChange(`rgba(${r},${g},${b},${opacity})`);
  };

  const setBright = (value: number) => {
    const { r, g, b } = tinycolor({ h: hue, s: vs * 100, v: value }).toRgb();
    handleChange(`rgba(${r},${g},${b},${opacity})`);
  };

  return (
    <div
      style={{
        height: openAdvanced ? 98 : 0,
        width: "100%",
        transition: "all 120ms linear"
      }}
    >
      <div style={{display: openAdvanced ? "" : "none" }}>
        <AdvBar
          value={s}
          reffy={satRef}
          callback={satDesat}
          openAdvanced={openAdvanced}
          label="Saturation"
        />
        <AdvBar
          value={l}
          reffy={lightRef}
          label="Lightness"
          callback={setLight}
          openAdvanced={openAdvanced}
        />
        <AdvBar
          value={v}
          reffy={brightRef}
          label="Brightness"
          callback={setBright}
          openAdvanced={openAdvanced}
        />
      </div>
    </div>
  );
};

export default AdvancedControls;

type AdvBarProps = {
  value: number
  callback: (value: number) => void
  reffy: React.MutableRefObject<HTMLCanvasElement | null>
  openAdvanced: boolean
  label: string
}

const AdvBar = ({ value, callback, reffy, openAdvanced, label }: AdvBarProps) => {
  const { squareSize } = usePicker();
  const [dragging, setDragging] = useState(false);
  const [handleTop, setHandleTop] = useState(2);
  const [barWidth, setBarWidth] = useState(0);

  useEffect(() => {
    if (!reffy?.current) return;
    setHandleTop(reffy?.current?.offsetTop);
    setBarWidth(reffy?.current?.clientWidth);
  }, [openAdvanced, reffy]);

  const stopDragging = () => {
    setDragging(false);
  };

  const handleMove = (e: React.MouseEvent) => {
    if (dragging) {
      callback(getHandleValue(e));
    }
  };

  const handleClick = (e: React.MouseEvent) => {
    if (!dragging) {
      callback(getHandleValue(e));
    }
  };

  const handleDown = () => {
    setDragging(true);
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
    <div className="w-full py-0.5">
      <div
        className="cursor-ew-resize relative"
        onMouseMove={handleMove}
      >
        <div
          className="handle"
          style={{ left: value * (barWidth - 16), top: handleTop }}
          onMouseDown={handleDown}
        />
        <div
          style={{
            textAlign: "center",
            color: "#fff",
            fontSize: 12,
            fontWeight: 500,
            lineHeight: 1,
            position: "absolute",
            left: "50%",
            transform: "translate(-50%, 0%)",
            top: handleTop + 2,
            zIndex: 10,
            textShadow: "1px 1px 1px rgba(0,0,0,.6)"
          }}
          onMouseMove={handleMove}
          onClick={handleClick}
        >
          {label}
        </div>
        <canvas
          className="relative w-full rounded-full"
          ref={reffy}
          width={`${squareSize}px`}
          height="16px"
          onClick={handleClick}
        />
      </div>
    </div>
  );
};
