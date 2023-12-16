"use client";

import { generateColors } from "@mantine/colors-generator";
import { createTheme } from "@mantine/core";

export const theme = (options: {
  colors: {
    primary: string;
    primaryForeground: string;
    foreground: string;
    background: string;
  };
}) =>
  createTheme({
    colors: {
      primary: generateColors(options.colors.primary),
    },
    /* Put your mantine theme override here */
  });
