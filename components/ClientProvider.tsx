"use client";

import { IBrandMetadata } from "@/interfaces/IBrandMetadata";
import { useBrandStore } from "@/store/brand.store";
import { generateColorsMap } from "@mantine/colors-generator";
import {
  MantineColorShade,
  MantineProvider,
  createTheme,
  defaultVariantColorsResolver,
  parseThemeColor,
} from "@mantine/core";

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
  fontFamily,
  children,
}: {
  brandMetadata: IBrandMetadata;
  fontFamily: string;
  children: any;
}) {
  const primaryColorsMap = generateColorsMap(brandMetadata.theme["--primary"]);

  useBrandStore.setState({
    metadata: brandMetadata,
  });

  return (
    <MantineProvider
      theme={createTheme({
        fontFamily: fontFamily,
        headings: {
          fontFamily: fontFamily,
        },
        primaryColor: "brand",
        colors: {
          brand: primaryColorsMap.colors as colorList,
        },
        defaultRadius: 9999,
        primaryShade: primaryColorsMap.baseColorIndex as MantineColorShade,
        black: brandMetadata.theme["--foreground"],
        white: brandMetadata.theme["--background"],
        variantColorResolver: (input) => {
          const defaultResolvedColors = defaultVariantColorsResolver(input);
          const parsedColor = parseThemeColor({
            color: input.color || input.theme.primaryColor,
            theme: input.theme,
          });

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
