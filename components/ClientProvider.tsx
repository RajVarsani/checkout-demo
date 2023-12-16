"use client";

import { useBrandStore } from "@/store/brand.store";
import { generateColorsMap } from "@mantine/colors-generator";
import { MantineProvider, createTheme } from "@mantine/core";
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
      })}
    >
      {children}
    </MantineProvider>
  );
}

export default ClientProviders;
