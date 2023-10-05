import { graphqlRequest } from "../helpers.js";

export function fetchCommonData(locale) {
  const payload = `{"operationName":"CommonData"}`;
  graphqlRequest(payload);
}
