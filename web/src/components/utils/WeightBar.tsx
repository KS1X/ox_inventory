import React, { useMemo, useState, useEffect } from 'react';
import clsx from 'clsx'; // If not using this yet, install or use template strings

const colorChannelMixer = (colorChannelA: number, colorChannelB: number, amountToMix: number) =>
  colorChannelA * amountToMix + colorChannelB * (1 - amountToMix);

const colorMixer = (rgbA: number[], rgbB: number[], amountToMix: number) =>
  `rgb(${colorChannelMixer(rgbA[0], rgbB[0], amountToMix)}, ${colorChannelMixer(rgbA[1], rgbB[1], amountToMix)}, ${colorChannelMixer(rgbA[2], rgbB[2], amountToMix)})`;

const COLORS = {
  primaryColor: [231, 76, 60],   // Red
  secondColor: [39, 174, 96],    // Green
  accentColor: [255,119,0],  // orange
};

const WeightBar: React.FC<{ percent: number; durability?: boolean }> = ({ percent, durability }) => {
  const [pulse, setPulse] = useState(false);

  const color = useMemo(() => {
    if (durability) {
      return percent < 50
        ? colorMixer(COLORS.accentColor, COLORS.primaryColor, percent / 100)
        : colorMixer(COLORS.secondColor, COLORS.accentColor, percent / 100);
    }
  
    // Gradually blend from green to red as weight increases
    return colorMixer(COLORS.secondColor, COLORS.primaryColor, percent / 100);
  }, [durability, percent]);

  // Trigger pulse animation when weight updates
  useEffect(() => {
    setPulse(true);
    const timeout = setTimeout(() => setPulse(false), 300); // Pulse duration
    return () => clearTimeout(timeout);
  }, [percent]);

  return (
    <div className={durability ? 'durability-bar' : 'weight-bar'}>
      <div
        className={pulse ? 'weight-bar-fill pulse' : 'weight-bar-fill'}
        style={{
          visibility: percent > 0 ? 'visible' : 'hidden',
          height: '100%',
          width: `${percent}%`,
          backgroundColor: color,
          transition: 'width 400ms ease-in-out, background-color 300ms ease-in-out',
          borderRadius: '3px',
        }}
      ></div>
    </div>
  );
};

export default WeightBar;
