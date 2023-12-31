import { formatInputValues } from "./formatters";
import { config } from "../constants";
import tc from "tinycolor2";
import React from "react";

const { barSize, crossSize } = config;

export function getHandleValue(e: React.MouseEvent) {
  const { offsetLeft, clientWidth } = safeBounds(e);
  let pos = e.clientX - offsetLeft - barSize / 2;
  let adjuster = clientWidth - 18;
  let bounded = formatInputValues(pos, 0, adjuster);
  return Math.round(bounded / (adjuster / 100));
}

export function computeSquareXY(hsl: number[], squareSize: number, squareHeight: number) {
  const s = hsl[1] * 100;
  const l = hsl[2] * 100;
  const t = (s * (l < 50 ? l : 100 - l)) / 100;
  const s1 = Math.round((200 * t) / (l + t)) | 0;
  const b1 = Math.round(t + l);
  const x = (squareSize / 100) * s1 - crossSize / 2;
  const y = squareHeight - (squareHeight / 100) * b1 - crossSize / 2;
  return [x, y];
}

export function computePickerPosition(e: React.MouseEvent) {
  const { offsetLeft, offsetTop, clientWidth, clientHeight } = safeBounds(e);
  const getX = () => {
    let xPos = e.clientX - offsetLeft - crossSize / 2;
    return formatInputValues(xPos, -9, clientWidth - 10);
  };
  const getY = () => {
    let yPos = e.clientY - offsetTop - crossSize / 2;
    return formatInputValues(yPos, -9, clientHeight - 10);
  };

  return [getX(), getY()];
}

export const getDegrees = (value: string) => {
  let s1 = value?.split(",")[0];
  return parseInt(s1?.split("(")[1]?.slice(0, -3));
};

export const getGradientType = (value: string) => {
  return value?.split("(")[0];
};

export const getNewHsl = (newHue: number, s: number, l: number, o: number, setInternalHue: (x: number) => void) => {
  setInternalHue(newHue);
  let tiny = tc({ h: newHue, s: s, l: l });
  let { r, g, b } = tiny.toRgb();
  return `rgba(${r}, ${g}, ${b}, ${o})`;
};

export const safeBounds = (e: React.MouseEvent) => {
  // @ts-ignore
  let client = e.target.parentNode.getBoundingClientRect();

  // @ts-ignore
  let className = e.target.className;
  let adjuster = className === "c-resize ps-rl" ? 15 : 0;
  return {
    offsetLeft: client?.x + adjuster,
    offsetTop: client?.y,
    clientWidth: client?.width,
    clientHeight: client?.height
  };
};

export const isUpperCase = (str: string) => {
  return str?.[0] === str?.[0]?.toUpperCase();
};

export const compareGradients = (g1: string, g2: string) => {
  let ng1 = g1?.toLowerCase()?.replaceAll(" ", "");
  let ng2 = g2?.toLowerCase()?.replaceAll(" ", "");

  return ng1 === ng2;
};
