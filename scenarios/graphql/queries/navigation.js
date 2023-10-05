import { graphqlRequest } from '../helpers.js';

export function fetchNavigation(product) {
  const payload = `{"operationName":"Navigation"}`;
  graphqlRequest(payload);
}
