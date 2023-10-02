import React from "react";
import { usePicker } from "../context";
import { formatInputValues } from "../utils/formatters";
import { internalCardStyles } from "./Controls";
import TrashIcon, { DegreesIcon, StopIcon } from "./icon";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

const GradientControls = () => {
  const { deletePoint } = usePicker();

  return (
    <div
      className={cn("flex justify-between rounded box-border py-0.5 px-1", internalCardStyles())}
    >
      <DegreePicker />
      <StopPicker />
      <div className="flex items-center justify-center px-2 dark:invert" onClick={deletePoint}>
        <TrashIcon />
      </div>
    </div>
  );
};

export default GradientControls;

const StopPicker = () => {
  const { currentLeft, handleGradient, currentColor } = usePicker();

  const handleMove = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleGradient(currentColor, formatInputValues(+e.target.value || 0, 0, 100));
  };

  return (
    <div className="flex items-center">
      <div className="dark:invert">
        <StopIcon />
      </div>
      <Input className="input-contained" type="number" value={currentLeft} onChange={handleMove} />
    </div>
  );
};

const DegreePicker = () => {
  const { degrees, internalOnChange, value } = usePicker();

  const handleDegrees = (e: React.ChangeEvent<HTMLInputElement>) => {
    let newValue = formatInputValues(+e.target.value, 0, 360);
    const remaining = value.split(/,(.+)/)[1];
    internalOnChange(`linear-gradient(${newValue || 0}deg, ${remaining}`);
  };

  return (
    <div className="relative flex items-center">
      <div className="px-1 dark:invert">
        <DegreesIcon />
      </div>
      <Input className="input-contained" type="number" value={degrees} onChange={handleDegrees} />
    </div>
  );
};