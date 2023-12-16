class APIConstants {
  static BASE_URL = "https://groww-intern-assignment.vercel.app/v1/api/";

  static GET_BRAND_METADATA = APIConstants.BASE_URL + "merchant-metadata/";
  static GET_ORDER_DETAILS = APIConstants.BASE_URL + "order-details/";
}

const API_CONSTANTS = Object.freeze(APIConstants);
export default API_CONSTANTS;
