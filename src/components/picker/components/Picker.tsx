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
  hideAdvancedSliders?: boolean;
  hideColorGuide?: boolean;
  hideInputType?: boolean;
  hideColorTypeBtns?: boolean;
}

const Picker = ({
                  hideControls,
                  hideInputs,
                  hidePresets,
                  hideOpacity,
                  hideHue,
                  presets,
                  hideAdvancedSliders,
                  hideColorGuide,
                  hideInputType,
                  hideColorTypeBtns
                }: PickerProps) => {
  const { isGradient } = usePicker();

  return (
    <div className="select-none grid grid-cols-1 gap-2" id="rbgcp-wrapper">
      <div className="flex gap-2">
        <Square />
        {!hidePresets && <Presets presets={presets} />}
      </div>
      {!hideControls && (
        <Controls
          hideAdvancedSliders={hideAdvancedSliders}
          hideColorGuide={hideColorGuide}
          hideInputType={hideInputType}
          hideColorTypeBtns={hideColorTypeBtns}
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
