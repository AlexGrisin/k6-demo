import { graphqlRequest } from "../helpers.js";

export function fetchShippingEstimates(product) {
  const payload = `{"operationName":"ShippingEstimates"}`;
  graphqlRequest(payload);
}
