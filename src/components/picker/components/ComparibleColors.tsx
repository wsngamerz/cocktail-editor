import React from "react";
import { usePicker } from "../context";
import { Instance } from "tinycolor2";
import { cn } from "@/lib/utils";
import { internalCardStyles } from "@/components/picker/components/Controls";

type ComparibleColorsProps = {
  openComparibles: boolean;
}

const ComparibleColors = ({ openComparibles }: ComparibleColorsProps) => {
  const { tinyColor, handleChange } = usePicker();

  const analogous: Instance[] = tinyColor.analogous();
  const monochromatic: Instance[] = tinyColor.monochromatic();
  const triad: [Instance, Instance, Instance] = tinyColor.triad();
  const tetrad: [Instance, Instance, Instance, Instance] = tinyColor.tetrad();

  const handleClick = (tiny: Instance) => {
    let { r, g, b, a } = tiny.toRgb();
    handleChange(`rgba(${r},${g},${b},${a})`);
  };

  return (
    <div className="w-full text-gray-900 dark:text-gray-300">
      <div className={cn("relative pt-3 rounded p-2 grid grid-cols-1 gap-1", openComparibles ? "visible" : "hidden", internalCardStyles())}>
        <h2 className="w-full text-center font-semibold">
          Color Guide
        </h2>

        <ColourCategory label="Analogous" colours={analogous} handleClick={handleClick} />
        <ColourCategory label="Monochromatic" colours={monochromatic} handleClick={handleClick} />
        <ColourCategory label="Triad" colours={triad} handleClick={handleClick} />
        <ColourCategory label="Tetrad" colours={tetrad} handleClick={handleClick} />
      </div>
    </div>
  );
};

type ColourCategoryProps = {
  label: string;
  colours: Instance[];
  handleClick: (tiny: Instance) => void;
}

function ColourCategory({ label, handleClick, colours }: ColourCategoryProps) {
  return (
    <>
      <div className="text-center text-sm">
        {label}
      </div>
      <div className="rounded-sm overflow-hidden flex">
        {colours?.map((c, key) => (
          <div
            className="grow h-8"
            key={key}
            style={{ background: c.toHexString() }}
            onClick={() => handleClick(c)}
          />
        ))}
      </div>
    </>
  );
}

export default ComparibleColors;
