import { IOrderDetails } from "@/interfaces/ICheckout";
import API_CONSTANTS from "@/utils/api.constants";

export const getOrderDetails = async (): Promise<{
  data: IOrderDetails;
  ok: boolean;
}> => {
  const response = await fetch(API_CONSTANTS.GET_ORDER_DETAILS, {
    cache: "no-store", // not caching the data to always get new data
  });

  if (!response.ok) {
    throw new Error("Error fetching order details");
  }

  let data = await response.json();
  return { data, ok: true };
};
