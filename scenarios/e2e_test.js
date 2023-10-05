import { sleep } from 'k6';
import { htmlReport } from 'https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js';
import { textSummary } from 'https://jslib.k6.io/k6-summary/0.0.2/index.js';
import { fetchShippingEstimates } from './graphql/queries/shippingEstimates.js';
import { fetchUSPs } from './graphql/queries/usps.js';
import { fetchDynamicData } from './graphql/queries/dynamicData.js';
import { fetchStyleVariants } from './graphql/queries/styleVariants.js';
import { fetchUser } from './graphql/queries/user.js';
import { fetchCommonData } from './graphql/queries/commonData.js';
import { fetchNavigation } from './graphql/queries/navigation.js';
import { fetchMetaInfoPaymentMethods } from './graphql/queries/metaInfoPaymentMethods.js';
import { fetchRecommendations } from './graphql/queries/recommendations.js';
import { fetchRecommendationsProducts } from './graphql/queries/recommendationsProducts.js';
import { getVisibleProducts } from './occ/visibleProducts.js';
import { openPDP, getProductsSize } from './pages/productDetailPage.js';
import { prefetch } from './graphql/helpers.js';
import { addToCart } from './graphql/mutations/cart.js';
import { environment } from '../k6.config.js';

export const options = {
  stages: [
    { vus: 1 }, // debug
    // { duration: '1m', target: 10 }, // ramp up
    // { duration: '4m', target: 10 },
  ],

  thresholds: {
    'http_req_duration{type:occ}': ['p(90)<5000'],
    'http_req_duration{type:pdp}': ['p(90)<5000'],
    'http_req_duration{type:graphql}': ['p(90)<1000'],
  },
};

export function setup() {
  let data = {};
  for (let country of environment.COUNTRIES) {
    data[`products_${country}`] = getVisibleProducts(country, 100, 10);
  }
  return data;
}

export default function (data) {
  const country = environment.COUNTRIES[getRandomNumber(0, environment.COUNTRIES.length - 1)];
  const products = data[`products_${country}`];
  const product = products[getRandomNumber(0, products.length - 1)];

  const jar = prefetch(product.locale);

  const pdpResponse = openPDP(product);
  const productSize = getProductsSize(pdpResponse);

  fetchShippingEstimates(product);
  fetchUSPs(product);
  fetchDynamicData(product);
  fetchStyleVariants(product);
  fetchUser();
  fetchCommonData(product.locale);

  sleep(getRandomNumber(2, 5));

  // Scroll below the fold (Lazy loaded components)
  const recommendedProducts = fetchRecommendations(product);
  fetchNavigation(product);
  fetchMetaInfoPaymentMethods(product);
  fetchRecommendationsProducts(product, recommendedProducts);

  sleep(getRandomNumber(2, 5));

  if (Math.floor(Math.random() * 10) < 2) {
    addToCart(product, `${productSize.width}${productSize.length}`, jar);
  }
}

function getRandomNumber(min, max) {
  return Math.round(Math.random() * (max - min) + min);
}

// more reports: https://k6.io/docs/results-output/end-of-test/custom-summary/
// export function handleSummary(data) {
//   console.log('Preparing the end-of-test summary...');

//   return {
//     stdout: textSummary(data, { indent: '', enableColors: true }),
//     'artifacts/k6-report.html': htmlReport(data),
//   };
// }
