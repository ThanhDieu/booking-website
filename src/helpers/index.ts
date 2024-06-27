import { useState } from 'react';
export const capitalize = (text: string) => text.charAt(0).toUpperCase() + text.substr(1);

export const clamp = (value: number) => Math.max(0, value);

export const isBetween = (value: number, floor: number, ceil: number) =>
  value >= floor && value <= ceil;

export const getCurrentYear = () => {
  return new Date().getFullYear();
};
