import { graphqlRequest } from "../helpers.js";

export function addToCart(product, size, jar) {
  const payload = `{"operationName":"AddToCart"}`;
  graphqlRequest(payload, jar);
}
