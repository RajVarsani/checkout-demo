"use client";

import { useBrandStore } from "@/store/brand.store";
import { generateColorsMap } from "@mantine/colors-generator";
import {
  MantineProvider,
  createTheme,
  defaultVariantColorsResolver,
  parseThemeColor,
} from "@mantine/core";
import { IBrandMetadata } from "../interfaces/IBrandMetadata";

type colorList = [
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string
];
function ClientProviders({
  brandMetadata,
  children,
}: {
  brandMetadata: IBrandMetadata;
  children: any;
}) {
  const primaryColorsMap = generateColorsMap(brandMetadata.theme["--primary"]);

  useBrandStore.setState({
    metadata: brandMetadata,
  });

  return (
    <MantineProvider
      theme={createTheme({
        primaryColor: "brand",
        colors: {
          brand: primaryColorsMap.colors as colorList,
        },
        primaryShade: 9,
        black: brandMetadata.theme["--foreground"],
        white: brandMetadata.theme["--background"],
        variantColorResolver: (input) => {
          const defaultResolvedColors = defaultVariantColorsResolver(input);
          const parsedColor = parseThemeColor({
            color: input.color || input.theme.primaryColor,
            theme: input.theme,
          });

          console.log(
            parsedColor.isThemeColor,
            parsedColor.color === "brand",
            input.variant === "filled",
            parsedColor.color,
            input.color
          );
          // Overried the foreground color for filled primary components
          if (
            parsedColor.isThemeColor &&
            parsedColor.color === "brand" &&
            input.variant === "filled"
          ) {
            return {
              ...defaultResolvedColors,
              color: brandMetadata.theme["--primary-foreground"],
            };
          }

          return defaultResolvedColors;
        },
      })}
    >
      {children}
    </MantineProvider>
  );
}

export default ClientProviders;
