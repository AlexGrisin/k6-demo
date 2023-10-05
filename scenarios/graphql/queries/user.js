import { graphqlRequest } from "../helpers.js";

export function fetchUser(jar) {
  const payload = `{"operationName":"User"}`;
  graphqlRequest(payload, jar);
}
