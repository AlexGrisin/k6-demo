const SLICE = __ENV.SLICE ? __ENV.SLICE : 'acc';

export const environment = {
  BASE_URL: `https://${SLICE}-www.site.com`,
  GRAPHQL_HUB_URL: `https://${SLICE}-www.site.com/hub`,
  COUNTRIES: ['NL', 'AE'],
};
