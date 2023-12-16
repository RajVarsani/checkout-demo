import ClientProviders from "@/components/ClientProvider";
import { IBrandMetadata } from "@/interfaces/IBrandMetadata";
import { fetchBrandMetadata } from "@/services/brand.service";
import { ColorSchemeScript } from "@mantine/core";
import "@mantine/core/styles.css";
import { Metadata } from "next";



export async function generateMetadata(): Promise<Metadata> {
  const brandMetadataRes = await fetchBrandMetadata();

  return {
    title: brandMetadataRes.data.merchantName,
  };
}

export default async function RootLayout({ children }: { children: any }) {
  let brandMetadata = await fetchBrandMetadata();

  return (
    <html lang="en">
      <head>
        <ColorSchemeScript />
        <link rel="shortcut icon" href={brandMetadata.data.merchantLogo} />
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, user-scalable=no"
        />
      </head>
      <body>
        <ClientProviders brandMetadata={brandMetadata.data}>
          {children}
        </ClientProviders>
      </body>
    </html>
  );
}
