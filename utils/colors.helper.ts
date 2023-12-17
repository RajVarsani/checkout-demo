import { useBrandStore } from "@/store/brand.store";
import { generateColorsMap } from "@mantine/colors-generator";

export const getColorWithOpacity = (color: string, opacity: number): string => {
  const mapC = generateColorsMap(color);
  const primaryCol = mapC.colors[mapC.baseColorIndex];
  const rgbaValue = primaryCol._rgb._unclipped;

  return `rgba(${rgbaValue[0]}, ${rgbaValue[1]}, ${rgbaValue[2]}, ${opacity})`;
};

export const getPrimaryColorWithOpacity = (opacity: number): string => {
  const color = useBrandStore.getState().metadata.theme["--primary"];
  return getColorWithOpacity(color, opacity);
};
