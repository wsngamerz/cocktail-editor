import { useEffect, useState } from "react";
import { getDegrees, getGradientType, isUpperCase } from "../utils/utils";
import { formatInputValues, getColors, high, low } from "../utils/formatters";
import { rgb2cmyk } from "../utils/converters";
import { config } from "../constants";

const { defaultColor, defaultGradient } = config;
var tc = require("tinycolor2");

export const useColorPicker = (value: string, onChange: (x: string) => void) => {
  // if (!value || !onChange) {
  //   console.log(
  //     'RBGCP ERROR - YOU MUST PASS A VALUE AND CALLBACK TO THE useColorPicker HOOK'
  //   )
  // }

  const isGradient = value?.includes("gradient");
  const gradientType = getGradientType(value);
  const degrees = getDegrees(value);
  const degreeStr =
    gradientType === "linear-gradient" ? `${degrees}deg` : "circle";
  const colors = getColors(value);
  const indexedColors = colors?.map((c: any, i: number) => ({ ...c, index: i }));
  const currentColorObj =
    indexedColors?.filter((c: any) => isUpperCase(c.value))[0] || indexedColors[0];
  const currentColor = currentColorObj?.value;
  const selectedPoint = currentColorObj?.index;
  const currentLeft = currentColorObj?.left;
  const [previousColors, setPreviousColors] = useState([]);

  const getGradientObject = () => {
    if (value) {
      if (isGradient) {
        return {
          isGradient: true,
          gradientType: gradientType,
          degrees: degreeStr,
          colors: colors?.map((c: any) => ({ ...c, value: c.value?.toLowerCase() }))
        };
      } else {
        return {
          isGradient: false,
          gradientType: null,
          degrees: null,
          colors: colors?.map((c: any) => ({ ...c, value: c.value?.toLowerCase() }))
        };
      }
    } else {
      console.log(
        "RBGCP ERROR - YOU MUST PASS A VALUE AND CALLBACK TO THE useColorPicker HOOK"
      );
    }
  };

  const tiny = tc(currentColor);
  const { r, g, b, a } = tiny.toRgb();
  const { h, s, l } = tiny.toHsl();

  useEffect(() => {
    if (tc(currentColor)?.isValid()) {
      if (previousColors[0] !== currentColor) {
        // @ts-ignore
        setPreviousColors([currentColor, ...previousColors?.slice(0, 19)]);
      }
    }
  }, [currentColor, previousColors]);

  const setLinear = () => {
    const remaining = value.split(/,(.+)/)[1];
    onChange(`linear-gradient(90deg, ${remaining}`);
  };

  const setRadial = () => {
    const remaining = value.split(/,(.+)/)[1];
    onChange(`radial-gradient(circle, ${remaining}`);
  };

  const setDegrees = (newDegrees: number) => {
    const remaining = value.split(/,(.+)/)[1];
    onChange(
      `linear-gradient(${formatInputValues(
        newDegrees,
        0,
        360
      )}deg, ${remaining}`
    );
    if (gradientType !== "linear-gradient") {
      console.log(
        "Warning: you are updating degrees when the gradient type is not linear. This will change the gradients type which may be undesired"
      );
    }
  };

  const setSolid = (startingColor: string) => {
    let newValue = startingColor || defaultColor;
    onChange(newValue);
  };

  const setGradient = (startingGradiant: string) => {
    let newValue = startingGradiant || defaultGradient;
    onChange(newValue);
  };

  const createGradientStr = (newColors: any[]) => {
    let sorted = newColors.sort((a, b) => a.left - b.left);
    let colorString = sorted?.map((cc) => `${cc?.value} ${cc.left}%`);
    onChange(`${gradientType}(${degreeStr}, ${colorString.join(", ")})`);
  };

  const handleGradient = (newColor: string, left = currentLeft) => {
    let remaining = colors?.filter((c: any) => !isUpperCase(c.value));
    let newColors = [
      { value: newColor.toUpperCase(), left: left },
      ...remaining
    ];
    createGradientStr(newColors);
  };

  const handleChange = (newColor: string) => {
    if (isGradient) {
      handleGradient(newColor);
    } else {
      onChange(newColor);
    }
  };

  const setR = (newR: number) => {
    let newVal = formatInputValues(newR, 0, 255);
    handleChange(`rgba(${newVal}, ${g}, ${b}, ${a})`);
  };

  const setG = (newG: number) => {
    let newVal = formatInputValues(newG, 0, 255);
    handleChange(`rgba(${r}, ${newVal}, ${b}, ${a})`);
  };

  const setB = (newB: number) => {
    let newVal = formatInputValues(newB, 0, 255);
    handleChange(`rgba(${r}, ${g}, ${newVal}, ${a})`);
  };

  const setA = (newA: number) => {
    let newVal = formatInputValues(newA, 0, 100);
    handleChange(`rgba(${r}, ${g}, ${b}, ${newVal / 100})`);
  };

  const setHue = (newHue: number) => {
    let newVal = formatInputValues(newHue, 0, 360);
    let tinyNew = tc({ h: newVal, s: s, l: l });
    let { r, g, b } = tinyNew.toRgb();
    handleChange(`rgba(${r}, ${g}, ${b}, ${a})`);
  };

  const setSaturation = (newSat: number) => {
    let newVal = formatInputValues(newSat, 0, 100);
    let tinyNew = tc({ h: h, s: newVal / 100, l: l });
    let { r, g, b } = tinyNew.toRgb();
    handleChange(`rgba(${r}, ${g}, ${b}, ${a})`);
  };

  const setLightness = (newLight: number) => {
    let newVal = formatInputValues(newLight, 0, 100);
    let tinyNew = tc({ h: h, s: s, l: newVal / 100 });
    if (tinyNew?.isValid()) {
      let { r, g, b } = tinyNew.toRgb();
      handleChange(`rgba(${r}, ${g}, ${b}, ${a})`);
    } else {
      console.log(
        "The new color was invalid, perhaps the lightness you passed in was a decimal? Please pass the new value between 0 - 100"
      );
    }
  };

  const valueToHSL = () => {
    return tiny.toHslString();
  };

  const valueToHSV = () => {
    return tiny.toHsvString();
  };

  const valueToHex = () => {
    return tiny.toHexString();
  };

  const valueToCmyk = () => {
    let { c, m, y, k } = rgb2cmyk(r, g, b);
    return `cmyk(${c}, ${m}, ${y}, ${k})`;
  };

  const setSelectedPoint = (index: number) => {
    if (isGradient) {
      let newGradStr = colors?.map((cc: any, i: number) => ({
        ...cc,
        value: i === index ? high(cc) : low(cc)
      }));
      createGradientStr(newGradStr);
    } else {
      console.log(
        "This function is only relevant when the picker is in gradient mode"
      );
    }
  };

  const addPoint = (left: number) => {
    let newColors = [
      ...colors.map((c: any) => ({ ...c, value: low(c) })),
      { value: currentColor, left: left }
    ];
    createGradientStr(newColors);
    if (!left) {
      console.log(
        "You did not pass a stop value (left amount) for the new color point so it defaulted to 50"
      );
    }
  };

  const deletePoint = (index: number) => {
    if (colors?.length > 2) {
      let pointToDelete = index || selectedPoint;
      let remaining = colors?.filter((rc: any, i: number) => i !== pointToDelete);
      createGradientStr(remaining);
      if (!index) {
        console.log(
          "You did not pass in the index of the point you wanted to delete so the function default to the currently selected point"
        );
      }
    } else {
      console.log(
        "A gradient must have atleast two colors, disable your delete button when necessary"
      );
    }
  };

  const setPointLeft = (left: number) => {
    handleGradient(currentColor, formatInputValues(left, 0, 100));
  };

  const rgbaArr = [r, g, b, a];
  const hslArr = [h, s, l];

  return {
    setLinear,
    setRadial,
    setDegrees,
    setSolid,
    setGradient,
    setR,
    setG,
    setB,
    setA,
    setHue,
    setSaturation,
    setLightness,
    valueToHSL,
    valueToHSV,
    valueToHex,
    valueToCmyk,
    setSelectedPoint,
    addPoint,
    deletePoint,
    selectedPoint,
    isGradient,
    gradientType,
    degrees,
    setPointLeft,
    currentLeft,
    rgbaArr,
    hslArr,
    previousColors,
    getGradientObject
  };
};
