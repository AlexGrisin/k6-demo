import { graphqlRequest } from "../helpers.js";

export function fetchStyleVariants(product) {
  const payload = `{"operationName":"StyleVariants"}`;
  graphqlRequest(payload);
}
