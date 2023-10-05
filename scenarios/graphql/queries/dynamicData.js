import { graphqlRequest } from "../helpers.js";

export function fetchDynamicData(product) {
  const payload = `{"operationName":"ProductDynamicData"}`;
  graphqlRequest(payload);
}
