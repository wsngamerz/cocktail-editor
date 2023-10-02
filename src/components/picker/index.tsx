import React, { useEffect, useRef, useState } from "react";
import PickerContextWrapper from "./context";
import Picker from "./components/Picker";
import "./styles.css"

const WIDTH = 300;
const HEIGHT = 300;

type ColourPickerProps = {
  value: string;
  onChange: (value: string) => void;
}

function ColorPicker({ value, onChange }: ColourPickerProps) {
  const contRef = useRef<HTMLDivElement>(null);
  const [bounds, setBounds] = useState({});

  useEffect(() => {
    if (!contRef?.current) return;
    setBounds(contRef?.current?.getBoundingClientRect());
  }, []);

  return (
    <div ref={contRef} className="w-full">
      <PickerContextWrapper
        bounds={bounds}
        value={value}
        onChange={onChange}
        squareSize={WIDTH}
        squareHeight={HEIGHT}
        hideOpacity={false}
      >
        <Picker
          hideControls={false}
          hideInputs={false}
          hidePresets={false}
          hideOpacity={false}
          hideHue={false}
          presets={[]}
          hideEyeDrop={false}
          hideAdvancedSliders={false}
          hideColorGuide={false}
          hideInputType={false}
          hideColorTypeBtns={false}
          hideGradientType={false}
          hideGradientAngle={false}
          hideGradientStop={false}
          hideGradientControls={false}
        />
      </PickerContextWrapper>
    </div>
  );
}

export default ColorPicker;
