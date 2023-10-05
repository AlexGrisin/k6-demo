import { graphqlRequest } from "../helpers.js";
import { environment } from "../../../k6.config.js";

export function fetchMetaInfoPaymentMethods(product) {
  const payload = `{"operationName":"MetaInfoPaymentMethods"}`;
  graphqlRequest(payload);
}
