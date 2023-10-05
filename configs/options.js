const thresholds = {
  checks: ['rate>0.99'],
  'http_req_duration{type:occ}': ['p(90)<5000'],
  'http_req_duration{type:pdp}': ['p(90)<5000'],
  'http_req_duration{type:graphql}': ['p(90)<1000'],
};

export const testTypes = {
  DEBUG: {
    vus: 1,

    thresholds,

    setupTimeout: '5m',

    // Custom properties
    visibleProductsMaxPages: 1,
  },
  SMOKE: {
    duration: '5m',
    vus: 30,

    thresholds,

    setupTimeout: '5m',

    // Custom properties
    visibleProductsMaxPages: 10,
  },
  LOAD: {
    duration: '60m',
    vus: 100,

    thresholds,

    setupTimeout: '5m',

    // Custom properties
    visibleProductsMaxPages: 100,
  },
};
