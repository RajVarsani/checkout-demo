"use client";

import { IBrandMetadata } from "@/interfaces/IBrandMetadata";
import { useBrandStore } from "@/store/brand.store";
import { getColorWithOpacity } from "@/utils/colors.helper";
import { generateColorsMap } from "@mantine/colors-generator";
import {
  MantineColorShade,
  MantineProvider,
  createTheme,
  defaultVariantColorsResolver,
  parseThemeColor,
} from "@mantine/core";
import { Notifications } from "@mantine/notifications";

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
        shadows: {
          xs: `0px 1px 2px ${getColorWithOpacity(
            brandMetadata.theme["--primary"],
            0.1
          )}`,
          sm: `0px 2px 4px ${getColorWithOpacity(
            brandMetadata.theme["--primary"],
            0.1
          )}`,
          md: `0px 3px 8px ${getColorWithOpacity(
            brandMetadata.theme["--primary"],
            0.15
          )}`,
          lg: `0px 4px 16px ${getColorWithOpacity(
            brandMetadata.theme["--primary"],
            0.2
          )}`,
          xl: `0px 5px 20px ${getColorWithOpacity(
            brandMetadata.theme["--primary"],
            0.25
          )}`,
        },
        colors: {
          brand: primaryColorsMap.colors as colorList,
        },
        defaultRadius: 20,
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
      <Notifications />
      {children}
    </MantineProvider>
  );
}

export default ClientProviders;
