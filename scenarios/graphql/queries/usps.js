import { graphqlRequest } from "../helpers.js";

export function fetchUSPs(product) {
  const payload = `{"operationName":"Usps"}`;
  graphqlRequest(payload);
}
