import http from 'k6/http';
import { check } from 'k6';
import { parseHTML } from 'k6/html';
import { environment } from '../../k6.config.js';

export function openPDP(product) {
  const productUrl = `${environment.BASE_URL}/${product.locale.toLowerCase()}${product.url}`;
  const pdpResponse = http.get(productUrl, { tags: { type: 'pdp' } });
  check(pdpResponse, {
    'pdp open': r => {
      console.log(productUrl, r.status, `${r.timings.duration}ms`);
      return r.status === 200;
    },
  });
  return pdpResponse;
}

export function getProductsSize(pdpResponse) {
  const doc = parseHTML(pdpResponse.body);
  const width = doc.find('[data-testid="width-size"]').first().text();
  const length = doc.find('[data-testid="length-size"]').first().text();
  return { width, length };
}
