import { IBrandMetadata } from "@/interfaces/IBrandMetadata";
import DEFAULT_BRAND_METADATA from "@/utils/defaultBrandMetadata";
import { create } from "zustand";

type Store = {
  metadata: IBrandMetadata;
};

export const useBrandStore = create<Store>((set) => ({
  metadata: DEFAULT_BRAND_METADATA,
}));
