import { IBrandMetadata } from "@/interfaces/IBrandMetadata";
import API_CONSTANTS from "../utils/api.constants";
import DEFAULT_BRAND_METADATA from "@/utils/defaultBrandMetadata";

export const fetchBrandMetadata = async (): Promise<{
  data: IBrandMetadata;
  ok: boolean;
}> => {
  const response = await fetch(API_CONSTANTS.GET_BRAND_METADATA, {
    next: { revalidate: 60 }, // Revalidate at most every minute
  });

  if (!response.ok) {
    return {
      data: DEFAULT_BRAND_METADATA,
      ok: false,
    };
  }

  let data = await response.json();
  return { data, ok: true };
};
