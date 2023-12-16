export interface IBrandThemeColors {
  "--background": string;
  "--foreground": string;
  "--primary": string;
  "--primary-foreground": string;
}

export interface IBrandMetadata {
  merchantName: string;
  merchantLogo: string;
  theme: IBrandThemeColors;
}
