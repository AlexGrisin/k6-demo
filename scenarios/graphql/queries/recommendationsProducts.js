import { graphqlRequest } from "../helpers.js";

export function fetchRecommendationsProducts(product, recommendedProducts) {
  const productCodes = recommendedProducts
    .split(",")
    .map((product) => `"${product}"`)
    .join(",");
  const payload = `{"operationName":"Products"}`;
  graphqlRequest(payload);
}
