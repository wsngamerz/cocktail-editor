import React, { createContext, useContext, useEffect, useState } from "react";
import {
  compareGradients,
  computePickerPosition,
  computeSquareXY,
  getDegrees,
  getGradientType,
  getHandleValue,
  getNewHsl,
  isUpperCase
} from "./utils/utils";
import { getColors, high, low } from "./utils/formatters";
import { config } from "./constants";
import tinycolor from "tinycolor2";

type PickerState = {
  x: number;
  y: number;
  s: number;
  l: number;
  r: number;
  g: number;
  b: number;
  hue: number;
  hsvS: number;
  hsvV: number;
  value: string;
  colors: any[];
  degrees: number;
  inFocus: string;
  opacity: number;
  onChange: (value: string) => void;
  addPoint: (e: any) => void;
  inputType: string;
  nextPoint: () => void;
  tinyColor: any;
  handleHue : (e: any) => void;
  setInFocus: (value: string) => void;
  isGradient: boolean;
  offsetLeft: number;
  squareSize: number;
  hideOpacity: boolean;
  handleColor: (e: any, ctx: any) => void;
  currentLeft: number;
  deletePoint: () => void;
  internalHue: number;
  squareHeight: number;
  setInputType: (value: string) => void;
  gradientType: string;
  handleChange: (value: string) => void;
  currentColor: string;
  selectedColor: number;
  handleOpacity: (e: any) => void;
  setInternalHue: (value: number) => void;
  previousColors: string[];
  handleGradient: (newColor: string, left: number) => void;
  setSelectedColor: (index: number) => void;
  internalOnChange: (newValue: string) => void;
  previousGradients: string[];
}

const { crossSize } = config;
const PickerContext = createContext<PickerState>({});

type PickerContextWrapperProps = {
  children: React.ReactNode;
  bounds: any;
  value: string;
  onChange: (value: string) => void;
  squareSize: number;
  squareHeight: number;
  hideOpacity: boolean;
}

export default function PickerContextWrapper({
                                               children,
                                               bounds,
                                               value,
                                               onChange,
                                               squareSize,
                                               squareHeight,
                                               hideOpacity
                                             }: PickerContextWrapperProps) {
  const offsetLeft = bounds?.x;
  const isGradient = value?.includes("gradient");
  const gradientType = getGradientType(value);
  const degrees = getDegrees(value);
  const degreeStr =
    gradientType === "linear-gradient" ? `${degrees}deg` : "circle";
  const colors = getColors(value);
  const indexedColors = colors?.map((c, i) => ({ ...c, index: i }));
  const currentColorObj =
    indexedColors?.filter((c) => isUpperCase(c.value))[0] || indexedColors[0];
  const currentColor = currentColorObj?.value;
  const selectedColor = currentColorObj?.index;
  const currentLeft = currentColorObj?.left;
  const [tinyColor, setTinyColor] = useState(tinycolor(currentColor));
  const [inputType, setInputType] = useState("rgb");

  const { r, g, b, a: opacity } = tinyColor.toRgb();
  const { h, s, l } = tinyColor.toHsl();
  const { s: hsvS, v: hsvV } = tinyColor.toHsv();
  const [internalHue, setInternalHue] = useState(Math.round(h));
  const hue = Math.round(h);
  const [x, y] = computeSquareXY([hue, s, l], squareSize, squareHeight);
  const [previousColors, setPreviousColors] = useState([]);
  const [previousGradients, setPreviousGradients] = useState([]);
  const [inFocus, setInFocus] = useState("");
  // const [undoLog, setUndoLog] = useState(0)

  const internalOnChange = (newValue) => {
    if (newValue !== value) {
      if (isGradient) {
        if (!compareGradients(previousGradients[0], value)) {
          setPreviousGradients([value, ...previousGradients?.slice(0, 8)]);
        }
      } else {
        setPreviousColors([value, ...previousColors?.slice(0, 8)]);
      }

      onChange(newValue);
    }
  };

  useEffect(() => {
    setTinyColor(tinycolor(currentColor));
    setInternalHue(hue);
  }, [currentColor, hue]);

  const createGradientStr = (newColors) => {
    let sorted = newColors.sort((a, b) => a.left - b.left);
    let colorString = sorted?.map((cc) => `${cc?.value} ${cc.left}%`);
    internalOnChange(`${gradientType}(${degreeStr}, ${colorString.join(", ")})`);
  };

  const handleGradient = (newColor, left = currentLeft) => {
    let remaining = colors?.filter((c) => !isUpperCase(c.value));
    let newColors = [
      { value: newColor.toUpperCase(), left: left },
      ...remaining
    ];
    createGradientStr(newColors);
  };

  const handleChange = (newColor) => {
    if (isGradient) {
      handleGradient(newColor);
    } else {
      internalOnChange(newColor);
    }
  };

  const handleOpacity = (e) => {
    let newO = getHandleValue(e) / 100;
    let newColor = `rgba(${r}, ${g}, ${b}, ${newO})`;
    handleChange(newColor);
  };

  const handleHue = (e) => {
    let newHue = getHandleValue(e) * 3.6;
    let newHsl = getNewHsl(newHue, s, l, opacity, setInternalHue);
    handleChange(newHsl);
  };

  const handleColor = (e, ctx) => {
    const [x, y] = computePickerPosition(e);
    const x1 = Math.min(x + crossSize / 2, squareSize - 1);
    const y1 = Math.min(y + crossSize / 2, squareHeight - 1);
    const [r, g, b] = ctx.getImageData(x1, y1, 1, 1).data;
    let newColor = `rgba(${r}, ${g}, ${b}, ${opacity})`;
    handleChange(newColor);
  };

  const setSelectedColor = (index) => {
    let newGradStr = colors?.map((cc, i) => ({
      ...cc,
      value: i === index ? high(cc) : low(cc)
    }));
    createGradientStr(newGradStr);
  };

  const addPoint = (e) => {
    let left = getHandleValue(e);
    let newColors = [
      ...colors.map((c) => ({ ...c, value: low(c) })),
      { value: currentColor, left: left }
    ]?.sort((a, b) => a.left - b.left);
    createGradientStr(newColors);
  };

  const deletePoint = () => {
    if (colors?.length > 2) {
      let formatted = colors?.map((fc, i) => ({
        ...fc,
        value: i === selectedColor - 1 ? high(fc) : low(fc)
      }));
      let remaining = formatted?.filter((rc, i) => i !== selectedColor);
      createGradientStr(remaining);
    }
  };

  const nextPoint = () => {
    if (selectedColor !== colors?.length - 1) {
      setSelectedColor(selectedColor + 1);
    }
  };

  useEffect(() => {
    window.addEventListener("click", handleClickFocus);

    return () => {
      window.removeEventListener("click", handleClickFocus);
    };
  }, [inFocus, value]);

  const handleClickFocus = (e) => {
    let formattedPath = e?.path?.map((el) => el.id);

    if (formattedPath?.includes("gradient-bar")) {
      setInFocus("gpoint");
    } else if (formattedPath?.includes("rbgcp-input")) {
      setInFocus("input");
    } else if (formattedPath?.includes("rbgcp-wrapper")) {
      setInFocus("picker");
    } else {
      setInFocus(null);
    }
  };

  const pickerState = {
    x,
    y,
    s,
    l,
    r,
    g,
    b,
    hue,
    hsvS,
    hsvV,
    value,
    colors,
    degrees,
    inFocus,
    opacity,
    onChange,
    addPoint,
    inputType,
    nextPoint,
    tinyColor,
    handleHue,
    setInFocus,
    isGradient,
    offsetLeft,
    squareSize,
    hideOpacity,
    handleColor,
    currentLeft,
    deletePoint,
    internalHue,
    squareHeight,
    setInputType,
    gradientType,
    handleChange,
    currentColor,
    selectedColor,
    handleOpacity,
    setInternalHue,
    previousColors,
    handleGradient,
    setSelectedColor,
    internalOnChange,
    previousGradients
  };

  return (
    <PickerContext.Provider value={pickerState}>
      {children}
    </PickerContext.Provider>
  );
}

export function usePicker() {
  return useContext(PickerContext);
}
