import React, { useState } from "react";
import { InputsIcon, PaletteIcon, SlidersIcon } from "./icon";
import { usePicker } from "../context";
import EyeDropper from "./EyeDropper";
import { config } from "../constants";
import AdvancedControls from "./AdvancedControls";
import ComparibleColors from "./ComparibleColors";
import GradientControls from "./GradientControls";
import { ac, controlBtn, df } from "../style";
import { cn } from "@/lib/utils";

var { defaultColor, defaultGradient } = config;

type ControlsProps = {
  hideEyeDrop?: boolean
  hideAdvancedSliders?: boolean
  hideColorGuide?: boolean
  hideInputType?: boolean
  hideColorTypeBtns?: boolean
  hideGradientControls?: boolean
  hideGradientType?: boolean
  hideGradientAngle?: boolean
  hideGradientStop?: boolean
}

const Controls = ({
                    hideEyeDrop,
                    hideAdvancedSliders,
                    hideColorGuide,
                    hideInputType,
                    hideColorTypeBtns,
                    hideGradientControls,
                    hideGradientType,
                    hideGradientAngle,
                    hideGradientStop
                  }: ControlsProps) => {
  const {
    isGradient,
    internalOnChange,
    previousColors,
    previousGradients,
    handleChange
  } = usePicker();
  const [openAdvanced, setOpenAdvanced] = useState(false);
  const [openComparibles, setOpenComparibles] = useState(false);
  const [openInputType, setOpenInputType] = useState(false);
  const noTools =
    hideEyeDrop && hideAdvancedSliders && hideColorGuide && hideInputType;

  const solidColor = previousColors?.[0] || defaultColor;
  const gradientColor = previousGradients?.[0] || defaultGradient;

  const setSolid = () => {
    internalOnChange(solidColor);
  };

  const setGradient = () => {
    internalOnChange(gradientColor);
  };

  const allRightControlsHidden = hideEyeDrop && hideAdvancedSliders && hideColorGuide && hideInputType;

  return (
    <div className="pt-4">
      <div className="w-full flex justify-between items-center">
        <div
          className={cn("rounded p-1 flex justify-center items-center", internalCardStyles())}
        >
          {!hideColorTypeBtns && (
            <>
              <div
                className={cn("cursor-pointer rounded px-2 py-1", controlButtonStyles(!isGradient))}
                onClick={setSolid}
              >
                Solid
              </div>
              <div
                className={cn("cursor-pointer rounded px-2 py-1", controlButtonStyles(isGradient))}
                onClick={setGradient}
              >
                Gradient
              </div>
            </>
          )}
        </div>

        {!allRightControlsHidden && (
          <div
            className={cn("flex justify-end items-center p-1 rounded", noTools ? "hidden" : "", internalCardStyles())}
          >
            {!hideEyeDrop && (
              <div className="cursor-pointer dark:invert">
                <EyeDropper
                  onSelect={handleChange}
                  buttonStyle={{
                    width: 30,
                    height: 24,
                    borderRadius: 4,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center"
                  }}
                />
              </div>
            )}
            <div
              className={cn("rounded justify-center items-center", controlButtonStyles(openAdvanced), hideAdvancedSliders ? "hidden" : "flex")}
              style={{
                width: 30,
                height: 24,
                display: hideAdvancedSliders ? "none" : "flex"
              }}
              onClick={() => setOpenAdvanced(!openAdvanced)}
            >
              <SlidersIcon color={openAdvanced ? "#568CF5" : ""} />
            </div>
            <div
              className={cn("justify-center items-center", controlButtonStyles(openComparibles), hideColorGuide ? "hidden" : "flex")}
              style={{
                width: 30,
                height: 24,
                borderRadius: 4
              }}
              onClick={() => setOpenComparibles(!openComparibles)}
            >
              <PaletteIcon color={openComparibles ? "#568CF5" : ""} />
            </div>
            <div
              className={cn("relative justify-center items-center", controlButtonStyles(openInputType), hideInputType ? "hidden" : "flex")}
              style={{
                width: 30,
                height: 24,
                borderRadius: 4
              }}
              onClick={() => setOpenInputType(!openInputType)}
            >
              <InputsIcon color={openInputType ? "#568CF5" : ""} />
              <InputTypeDropdown
                openInputType={openInputType}
                setOpenInputType={setOpenInputType}
              />
            </div>
          </div>
        )}

      </div>
      {!hideAdvancedSliders && <AdvancedControls openAdvanced={openAdvanced} />}
      {!hideColorGuide && (
        <ComparibleColors openComparibles={openComparibles} />
      )}
      {(isGradient && !hideGradientControls) && (
        <GradientControls
          hideGradientType={hideGradientType}
          hideGradientAngle={hideGradientAngle}
          hideGradientStop={hideGradientStop}
        />
      )}
    </div>
  );
};

export default Controls;

type InputTypeDropdownProps = {
  openInputType: boolean
  setOpenInputType: (x: boolean) => void
}

const InputTypeDropdown = ({ openInputType, setOpenInputType }: InputTypeDropdownProps) => {
  const { inputType, setInputType } = usePicker();
  const vTrans = openInputType
    ? "visibility 0ms linear"
    : "visibility 100ms linear 150ms";
  const zTrans = openInputType
    ? "z-index 0ms linear"
    : "z-index 100ms linear 150ms";
  const oTrans = openInputType
    ? "opacity 120ms linear"
    : "opacity 150ms linear 50ms";

  const handleInputType = (e: React.MouseEvent, val: string) => {
    if (openInputType) {
      e.stopPropagation();
      setInputType(val);
      setOpenInputType(false);
    }
  };

  return (
    <div
      className={cn("input-dropdown", openInputType ? "visible" : "hidden")}
      style={{
        transition: `${oTrans}, ${vTrans}, ${zTrans}`
      }}
    >
      <div
        className={cn("flex justify-center items-center relative", controlButtonStyles(inputType === "rgb"))}
        onClick={e => handleInputType(e, "rgb")}
      >
        RGB
      </div>
      <div
        style={{
          ...df,
          ...ac,
          ...controlBtn,
          ...controlBtnStyles(inputType === "hsl")
        }}
        onClick={e => handleInputType(e, "hsl")}
      >
        HSL
      </div>
      <div
        style={{
          ...df,
          ...ac,
          ...controlBtn,
          ...controlBtnStyles(inputType === "hsv")
        }}
        onClick={e => handleInputType(e, "hsv")}
      >
        HSV
      </div>
      <div
        style={{
          ...df,
          ...ac,
          ...controlBtn,
          ...controlBtnStyles(inputType === "cmyk")
        }}
        onClick={e => handleInputType(e, "cmyk")}
      >
        CMYK
      </div>
    </div>
  );
};

export const controlBtnStyles = (selected: boolean) => {
  return {
    background: selected ? "white" : "rgba(255,255,255,0)",
    color: selected ? "#568CF5" : "rgb(86,86,86)",
    boxShadow: selected
      ? "1px 1px 3px rgba(0,0,0,.2)"
      : "1px 1px 3px rgba(0,0,0,0)"
  };
};

export const controlButtonStyles = (selected: boolean) => {
  return cn("text-xs font-bold", selected ? "bg-gray-200 dark:bg-gray-800 text-gray-900 dark:text-gray-100" : "text-gray-600 dark:text-gray-500");
};

export const internalCardStyles = () => "bg-gray-50 border border-gray-200 dark:bg-gray-900 dark:border-none";