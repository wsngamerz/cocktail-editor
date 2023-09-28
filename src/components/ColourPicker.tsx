import ReactColorPicker from "react-best-gradient-color-picker";

type ColourPickerProps = {
  value: string;
  onChange: (value: string) => void;
}

export default function ColourPicker({ value, onChange }: ColourPickerProps) {
  // const {  } = useColorPicker(value, onChange);

  return (
    <div>
      <ReactColorPicker
        className="mx-auto"
        onChange={onChange}
        value={value}
        hideEyeDrop
        hideColorGuide
        hideGradientType
      />
    </div>
  );
}