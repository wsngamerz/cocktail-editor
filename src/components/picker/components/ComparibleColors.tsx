import React from "react";
import { usePicker } from "../context";
import { df, jfe } from "../style";
import { Instance } from "tinycolor2";

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
    <div
      style={{
        height: openComparibles ? 216 : 0,
        width: "100%",
        transition: "all 120ms linear"
      }}
    >
      <div
        className="relative"
        style={{
          paddingTop: 11,
          display: openComparibles ? "" : "none"
        }}
      >
        <div
          style={{
            textAlign: "center",
            color: "#323136",
            fontSize: 13,
            fontWeight: 600,
            position: "absolute",
            top: 6.5,
            left: 2
          }}
        >
          Color Guide
        </div>
        <div
          style={{
            textAlign: "center",
            color: "#323136",
            fontSize: 12,
            fontWeight: 500,
            marginTop: 3
          }}
        >
          Analogous
        </div>
        <div style={{ borderRadius: 5, overflow: "hidden", ...df }}>
          {analogous?.map((c, key) => (
            <div
              key={key}
              style={{ width: "20%", height: 30, background: c.toHexString() }}
              onClick={() => handleClick(c)}
            />
          ))}
        </div>
        <div
          style={{
            textAlign: "center",
            color: "#323136",
            fontSize: 12,
            fontWeight: 500,
            marginTop: 3
          }}
        >
          Monochromatic
        </div>
        <div style={{ borderRadius: 5, overflow: "hidden", ...df, ...jfe }}>
          {monochromatic?.map((c, key) => (
            <div
              key={key}
              style={{ width: "20%", height: 30, background: c.toHexString() }}
              onClick={() => handleClick(c)}
            />
          ))}
        </div>
        <div
          style={{
            textAlign: "center",
            color: "#323136",
            fontSize: 12,
            fontWeight: 500,
            marginTop: 3
          }}
        >
          Triad
        </div>
        <div style={{ borderRadius: 5, overflow: "hidden", ...df, ...jfe }}>
          {triad?.map((c, key) => (
            <div
              key={key}
              style={{
                width: "calc(100% / 3)",
                height: 28,
                background: c.toHexString()
              }}
              onClick={() => handleClick(c)}
            />
          ))}
        </div>
        <div
          style={{
            textAlign: "center",
            color: "#323136",
            fontSize: 12,
            fontWeight: 500,
            marginTop: 3
          }}
        >
          Tetrad
        </div>
        <div style={{ borderRadius: 5, overflow: "hidden", ...df, ...jfe }}>
          {tetrad?.map((c, key) => (
            <div
              key={key}
              style={{ width: "25%", height: 28, background: c.toHexString() }}
              onClick={() => handleClick(c)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ComparibleColors;
