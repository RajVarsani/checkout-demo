import ClientProviders from "@/components/ClientProvider";
import "@/global.css";
import { fetchBrandMetadata } from "@/services/brand.service";
import { ColorSchemeScript } from "@mantine/core";
import "@mantine/core/styles.css";
import "@mantine/dates/styles.css";
import "@mantine/notifications/styles.css";
import { Metadata } from "next";
import { Manrope } from "next/font/google";

const fontData = Manrope({
  subsets: ["latin-ext"],
  weight: ["300", "400", "500", "600", "700"],
});

export async function generateMetadata(): Promise<Metadata> {
  const brandMetadataRes = await fetchBrandMetadata();

  return {
    title: brandMetadataRes.data.merchantName,
  };
}

export default async function RootLayout({ children }: { children: any }) {
  let brandMetadata = await fetchBrandMetadata();

  return (
    <html lang="en" className={fontData.className}>
      <head>
        <ColorSchemeScript />
        <link rel="shortcut icon" href={brandMetadata.data.merchantLogo} />
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, user-scalable=no"
        />
      </head>
      <body>
        <ClientProviders
          brandMetadata={brandMetadata.data}
          fontFamily={fontData.style.fontFamily}
        >
          {children}
        </ClientProviders>
      </body>
    </html>
  );
}
