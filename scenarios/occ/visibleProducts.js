import http from "k6/http";
import { check } from "k6";
import { environment } from "../../k6.config.js";

export function getVisibleProducts(country, maxPage, pageSize = 10) {
  let listOfProducts = [];
  let pageNumber = 0;
  const baseSiteId = `Site_${country}`;
  const locale = `en_${country}`;
  do {
    const visibleProductsResponse = fetchVisibleProducts(
      baseSiteId,
      locale,
      pageNumber,
      pageSize
    );
    check(visibleProductsResponse, {
      visibleProductsResponse: (r) => r.status === 200,
    });
    !maxPage
      ? (maxPage = JSON.parse(visibleProductsResponse.body).totalPageCount)
      : maxPage;
    const products = JSON.parse(visibleProductsResponse.body).products;
    listOfProducts.push(...products);
    pageNumber++;
  } while (pageNumber < maxPage);

  // Filter test products
  listOfProducts = listOfProducts.filter(
    (product) => !product.url.includes("test")
  );
  listOfProducts = listOfProducts.map((product) => {
    const { code, url } = product;
    return { code, url, baseSiteId, locale };
  });

  return listOfProducts;
}

export function fetchVisibleProducts(baseSiteId, locale, pageNumber, pageSize) {
  const visibleProductsUrl = `${environment.BASE_URL}/api/${baseSiteId}/products/visible`;
  return http.get(
    `${visibleProductsUrl}?pageSize=${pageSize}&page=${pageNumber}`,
    {
      headers: { "X-Accept-Language": locale },
      tags: { type: "occ" },
    }
  );
}
