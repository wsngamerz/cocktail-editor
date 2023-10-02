import React from "react";
import Hue from "./Hue";
import Inputs from "./Inputs";
import Square from "./Square";
import Opacity from "./Opacity";
import Presets from "./Presets";
import Controls from "./Controls";
import GradientBar from "./GradientBar";
import { usePicker } from "../context";

type PickerProps = {
  hideControls?: boolean;
  hideInputs?: boolean;
  hidePresets?: boolean;
  hideOpacity?: boolean;
  hideHue?: boolean;
  presets?: string[];
  hideEyeDrop?: boolean;
  hideAdvancedSliders?: boolean;
  hideColorGuide?: boolean;
  hideInputType?: boolean;
  hideColorTypeBtns?: boolean;
  hideGradientType?: boolean;
  hideGradientAngle?: boolean;
  hideGradientStop?: boolean;
  hideGradientControls?: boolean;
}

const Picker = ({
                  hideControls,
                  hideInputs,
                  hidePresets,
                  hideOpacity,
                  hideHue,
                  presets,
                  hideEyeDrop,
                  hideAdvancedSliders,
                  hideColorGuide,
                  hideInputType,
                  hideColorTypeBtns,
                  hideGradientType,
                  hideGradientAngle,
                  hideGradientStop,
                  hideGradientControls
                }: PickerProps) => {
  const { isGradient } = usePicker();

  return (
    <div style={{ userSelect: "none" }} id="rbgcp-wrapper">
      <div className="flex gap-2">
        <Square />
        {!hidePresets && <Presets presets={presets} />}
      </div>
      {!hideControls && (
        <Controls
          hideEyeDrop={hideEyeDrop}
          hideAdvancedSliders={hideAdvancedSliders}
          hideColorGuide={hideColorGuide}
          hideInputType={hideInputType}
          hideColorTypeBtns={hideColorTypeBtns}
          hideGradientControls={hideGradientControls}
          hideGradientType={hideGradientType}
          hideGradientAngle={hideGradientAngle}
          hideGradientStop={hideGradientStop}
        />
      )}
      {isGradient && <GradientBar />}
      {!hideHue && <Hue />}
      {!hideOpacity && <Opacity />}
      {!hideInputs && <Inputs />}
    </div>
  );
};

export default Picker;
