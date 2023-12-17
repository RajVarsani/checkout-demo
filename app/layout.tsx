import ClientProviders from "@/components/ClientProvider";
import "@/global.css";
import { fetchBrandMetadata } from "@/services/brand.service";
import { ColorSchemeScript } from "@mantine/core";
import "@mantine/core/styles.css";
import { Metadata } from "next";
import { Manrope } from "next/font/google";
import Image from "next/image";

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
        {/* {randomImage.response.results.map((image: any, index: number) => {
          return (
            <Image
              src={image.urls.small}
              width={200}
              height={200}
              alt="Test"
              key={index}
            />
          );
        })} */}
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
