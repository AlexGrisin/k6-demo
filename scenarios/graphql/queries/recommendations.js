import { graphqlRequest } from '../helpers.js';

export function fetchRecommendations(product) {
  const payload = `{"operationName":"Recommendations"}`;
  const response = graphqlRequest(payload);
  return !response ? '' : JSON.parse(response.body).data.recommendations.productCodes;
}
